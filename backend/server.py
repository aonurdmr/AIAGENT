from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from openai import AsyncOpenAI
import httpx, os, logging, json, random
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
_mongo_client = AsyncIOMotorClient(mongo_url)
db = _mongo_client[os.environ['DB_NAME']]

NVIDIA_API_KEY = os.environ.get('NVIDIA_API_KEY', '')
SECRET_KEY     = os.environ.get('JWT_SECRET', 'dogaai-super-secret-key-change-in-prod-2024')
ALGORITHM      = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

pwd_ctx  = CryptContext(schemes=['bcrypt'], deprecated='auto')
security = HTTPBearer(auto_error=False)
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(name)s %(levelname)s %(message)s')
logger = logging.getLogger(__name__)

# NVIDIA NIM — OpenAI-compatible client
_ca = '/root/.ccr/ca-bundle.crt'
_verify = _ca if os.path.exists(_ca) else True
nvidia = AsyncOpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=NVIDIA_API_KEY,
    http_client=httpx.AsyncClient(verify=_verify),
)

app = FastAPI(title="DoğaAI Platform API v3")
api_router = APIRouter(prefix="/api")


# ── Auth helpers ───────────────────────────────────────────────────────────────

def hash_password(pw: str) -> str:
    return pwd_ctx.hash(pw)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_ctx.verify(plain, hashed)

def create_token(data: dict) -> str:
    payload = data.copy()
    payload['exp'] = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None

async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(security)):
    if not creds:
        raise HTTPException(status_code=401, detail='Token gerekli')
    payload = decode_token(creds.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail='Geçersiz veya süresi dolmuş token')
    user = await db.users.find_one({'id': payload.get('sub')}, {'_id': 0, 'password': 0})
    if not user:
        raise HTTPException(status_code=401, detail='Kullanıcı bulunamadı')
    return user

async def get_optional_user(creds: HTTPAuthorizationCredentials = Depends(security)):
    if not creds:
        return None
    payload = decode_token(creds.credentials)
    if not payload:
        return None
    return await db.users.find_one({'id': payload.get('sub')}, {'_id': 0, 'password': 0})


# ── NVIDIA NIM helpers ─────────────────────────────────────────────────────────

CHAT_MODEL   = "meta/llama-3.1-70b-instruct"
VISION_MODEL = "nvidia/llama-3.2-11b-vision-instruct"
FAST_MODEL   = "meta/llama-3.1-8b-instruct"
IMAGE_MODEL  = "stabilityai/stable-diffusion-xl-base-1.0"

async def nvidia_chat(system: str, user: str, model: str = CHAT_MODEL,
                      history: List[Dict] = None, max_tokens: int = 1024) -> str:
    messages = [{"role": "system", "content": system}]
    if history:
        messages.extend(history)
    messages.append({"role": "user", "content": user})
    try:
        resp = await nvidia.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=0.7,
        )
        return resp.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"NVIDIA chat error ({model}): {e}")
        return None

async def nvidia_vision(system: str, prompt: str, image_b64: str, max_tokens: int = 1024) -> str:
    if image_b64.startswith("data:"):
        image_b64 = image_b64.split(",", 1)[1]
    content = [
        {"type": "text", "text": prompt},
        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image_b64}"}},
    ]
    try:
        resp = await nvidia.chat.completions.create(
            model=VISION_MODEL,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": content},
            ],
            max_tokens=max_tokens,
        )
        return resp.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"NVIDIA vision error: {e}")
        return None

def clean_json(text: str) -> dict:
    if not text:
        return {}
    s = text.strip()
    if s.startswith("```"):
        parts = s.split("```")
        s = parts[1] if len(parts) > 1 else s
        if s.startswith("json"):
            s = s[4:]
    return json.loads(s.strip())


# ── Pydantic models ────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    username: str = Field(min_length=3, max_length=30)
    email: str
    password: str = Field(min_length=6)
    full_name: str = ''

class UserLogin(BaseModel):
    email: str
    password: str

class UserPublic(BaseModel):
    model_config = ConfigDict(extra='ignore')
    id: str
    username: str
    email: str
    full_name: str = ''
    avatar_color: str = '#22c55e'
    bio: str = ''
    activity_count: int = 0
    created_at: str = ''

class Spot(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    type: str
    lat: float
    lng: float
    species: List[str] = []
    facilities: List[str] = []
    rating: float = 0.0
    review_count: int = 0
    difficulty: str = "orta"
    season: str = "Tüm yıl"
    regulations: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class SpotCreate(BaseModel):
    name: str; description: str; type: str; lat: float; lng: float
    species: List[str] = []; facilities: List[str] = []
    difficulty: str = "orta"; season: str = "Tüm yıl"; regulations: str = ""

class Activity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = "anonymous"
    username: str = "Kullanıcı"
    type: str
    species: str = ""
    location_name: str = ""
    lat: float = 0.0; lng: float = 0.0
    weight: Optional[float] = None
    length: Optional[float] = None
    notes: str = ""
    image_base64: Optional[str] = None
    weather_conditions: str = ""
    date: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    spot_id: Optional[str] = None

class ActivityCreate(BaseModel):
    type: str; species: str = ""; location_name: str = ""
    lat: float = 0.0; lng: float = 0.0
    weight: Optional[float] = None; length: Optional[float] = None
    notes: str = ""; image_base64: Optional[str] = None
    weather_conditions: str = ""; spot_id: Optional[str] = None

class Post(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = "anonymous"
    username: str
    avatar_color: str = "#22c55e"
    title: str; content: str; category: str
    image_base64: Optional[str] = None
    location: str = ""
    likes: int = 0; liked_by: List[str] = []; comments: List[Dict] = []
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class PostCreate(BaseModel):
    username: str = "Kullanıcı"; title: str; content: str; category: str
    image_base64: Optional[str] = None; location: str = ""

class CommentCreate(BaseModel):
    username: str = "Kullanıcı"; content: str

class ChatMessage(BaseModel):
    message: str
    context: str = "genel"
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    history: List[Dict] = []

class IdentifyRequest(BaseModel):
    image_base64: str
    category: str = "genel"

class WeatherRequest(BaseModel):
    lat: float = 41.0; lng: float = 29.0; activity: str = "fishing"

class NLPRequest(BaseModel):
    text: str
    task: str = "analyze"   # analyze | summarize | entities | sentiment

class PlannerRequest(BaseModel):
    destination: str
    duration_days: int = 2
    activities: List[str] = ["fishing"]
    group_size: int = 2
    experience_level: str = "orta"
    notes: str = ""

class ImageGenRequest(BaseModel):
    prompt: str
    style: str = "realistic"

class AgentSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = "anonymous"
    name: str
    agent_type: str
    messages: List[Dict] = []
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AgentMessage(BaseModel):
    content: str
    agent_type: str = "genel"

class Equipment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = "anonymous"
    name: str
    category: str  # fishing | hunting | camping | general
    brand: str = ""
    model_name: str = ""
    condition: str = "iyi"  # mükemmel | iyi | orta | kötü
    purchase_date: str = ""
    notes: str = ""
    emoji: str = "🎒"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class EquipmentCreate(BaseModel):
    name: str
    category: str
    brand: str = ""
    model_name: str = ""
    condition: str = "iyi"
    purchase_date: str = ""
    notes: str = ""
    emoji: str = "🎒"

class Favorite(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    item_type: str  # spot | post | species
    item_id: str
    item_name: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Notification(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    type: str  # like | comment | system
    message: str
    data: Dict[str, Any] = {}
    read: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ── Phase-3 agent definitions ──────────────────────────────────────────────────

AGENTS = {
    "botanik": {
        "name": "Botanik Uzmanı", "icon": "🌿", "color": "#22c55e",
        "desc": "Bitki tanımlama, tıbbi bitkiler, flora",
        "system": (
            "Sen uzman bir botanikçisin. Türkiye florası, tıbbi bitkiler, zehirli bitkiler, "
            "yenilebilir bitkiler ve bitki ekolojisi konularında derin bilgin var. "
            "Bitkileri latince isimleriyle ve özellikleriyle Türkçe açıklarsın. "
            "Güvenlik uyarılarını özellikle vurgularsın."
        ),
    },
    "yaban_hayati": {
        "name": "Yaban Hayatı Uzmanı", "icon": "🦅", "color": "#f59e0b",
        "desc": "Hayvan davranışları, kuş gözlemi, ekosistem",
        "system": (
            "Sen bir yaban hayatı uzmanısın. Türkiye'nin memeli, kuş, sürüngen ve böcek faunası "
            "hakkında kapsamlı bilgin var. Hayvan davranışları, göç yolları, habitatlar ve "
            "koruma durumları konularında Türkçe bilgi verirsin."
        ),
    },
    "balikcilik": {
        "name": "Balıkçılık Uzmanı", "icon": "🎣", "color": "#3b82f6",
        "desc": "Teknikler, yemler, balık türleri, spot önerileri",
        "system": (
            "Sen uzman bir balıkçısın ve su bilimleri uzmanısın. Tatlı su ve tuzlu su balıkçılığı, "
            "teknikler (olta, troll, fly fishing, zıpkın), yemler, lure'lar, mevsimsel stratejiler, "
            "Türkiye'nin balık türleri ve av kanunları konularında Türkçe rehberlik edersin."
        ),
    },
    "avcilik": {
        "name": "Avcılık Uzmanı", "icon": "🏹", "color": "#ef4444",
        "desc": "Av teknikleri, ruhsatlar, güvenlik, türler",
        "system": (
            "Sen deneyimli bir avcı ve av yönetimi uzmanısın. Türkiye'nin av kanunları, ruhsat süreçleri, "
            "av sezonu takvimleri, av teknikleri, silah güvenliği ve etik avcılık konularında "
            "kapsamlı Türkçe bilgi verirsin."
        ),
    },
    "kamp": {
        "name": "Kamp Uzmanı", "icon": "⛺", "color": "#8b5cf6",
        "desc": "Ekipman, güzergah, teknikler, yemekler",
        "system": (
            "Sen deneyimli bir outdoor rehberi ve kamp uzmanısın. Çadır seçimi, uyku sistemi, "
            "navigasyon, yemek pişirme teknikleri, ilk yardım, hava okuma ve Türkiye'nin en güzel "
            "kamp alanları konularında Türkçe rehberlik edersin."
        ),
    },
    "planlama": {
        "name": "Seyahat Planlamacı", "icon": "🗺️", "color": "#06b6d4",
        "desc": "Rota planlama, gün programları, lojistik",
        "system": (
            "Sen uzman bir outdoor seyahat planlamacısısın. Türkiye'nin doğa güzellikleri, "
            "millî parklar, av ve balık sahaları, kamp alanları, ulaşım seçenekleri ve "
            "sezonsal koşullar göz önünde bulundurarak detaylı gün programları hazırlarsın."
        ),
    },
    "hava": {
        "name": "Hava & Koşul Analisti", "icon": "🌡️", "color": "#34d399",
        "desc": "Hava yorumu, aktivite skoru, uyarılar",
        "system": (
            "Sen meteoroloji ve outdoor aktivite koşulları konusunda uzmansın. "
            "Hava durumu verilerini outdoor aktiviteler açısından yorumlar, aktivite skorları hesaplar, "
            "rüzgar, akıntı ve hava değişimlerinin balıkçılık/avcılık/kamp üzerindeki etkisini "
            "Türkçe açıklarsın."
        ),
    },
    "arastirma": {
        "name": "Araştırma Uzmanı", "icon": "🔬", "color": "#a855f7",
        "desc": "Bilimsel araştırma, veri analizi, raporlar",
        "system": (
            "Sen bilimsel bir araştırma ve analiz uzmanısın. Doğa bilimleri, ekoloji, biyoloji ve "
            "çevre konularındaki araştırmaları analiz eder, özetler ve Türkçe raporlar hazırlarsın. "
            "Güvenilir kaynaklara atıf yaparsın ve kanıta dayalı bilgi verirsin."
        ),
    },
    "gorsel": {
        "name": "Görsel Analist", "icon": "📷", "color": "#ec4899",
        "desc": "Fotoğraf analizi, tür tanımlama, görsel yorum",
        "system": (
            "Sen uzman bir görsel analist ve doğa fotoğrafçısısın. Görsellerdeki canlıları, "
            "bitkileri, hayvanları, habitat özelliklerini ve çevre koşullarını analiz edersin. "
            "Fotoğraf tekniği ve doğa fotoğrafçılığı konularında da Türkçe rehberlik edersin."
        ),
        "vision": True,
    },
    "cevre": {
        "name": "Çevre Uzmanı", "icon": "🌍", "color": "#10b981",
        "desc": "Ekosistem, iklim, koruma, sürdürülebilirlik",
        "system": (
            "Sen çevre bilimi ve ekoloji uzmanısın. İklim değişikliği, ekosistem sağlığı, "
            "tür koruma, biyoçeşitlilik ve sürdürülebilir outdoor aktiviteler konularında "
            "Türkçe bilgilendirme yaparsın. Çevre koruma bilincini ön planda tutarsın."
        ),
    },
    "guvenlik": {
        "name": "Güvenlik Uzmanı", "icon": "🛡️", "color": "#f97316",
        "desc": "İlk yardım, kriz yönetimi, risk değerlendirme",
        "system": (
            "Sen outdoor güvenlik ve ilk yardım uzmanısın. Dağ kurtarma, su güvenliği, "
            "hayvan saldırısı, bitki zehirlenmesi, hava koşulları riski ve temel ilk yardım "
            "konularında kapsamlı Türkçe bilgi ve yönlendirme yaparsın. Güvenlik her zaman önceliktir."
        ),
    },
}


# ── Seed data ──────────────────────────────────────────────────────────────────

INITIAL_SPOTS = [
    {"name": "Sapanca Gölü - Kuzey Kıyısı", "description": "Sazan ve levrek için mükemmel.", "type": "fishing",
     "lat": 40.725, "lng": 30.268, "species": ["Sazan", "Levrek", "Turna"], "facilities": ["Otopark", "Piknik"], "rating": 4.7, "review_count": 142, "difficulty": "kolay", "season": "İlkbahar-Yaz"},
    {"name": "Uludağ Etekleri Av Sahası", "description": "Tavşan ve keklik bolluğu.", "type": "hunting",
     "lat": 40.108, "lng": 29.063, "species": ["Tavşan", "Keklik", "Bıldırcın"], "facilities": ["Otopark"], "rating": 4.3, "review_count": 67, "difficulty": "orta", "season": "Sonbahar-Kış"},
    {"name": "Abant Gölü Kamp Alanı", "description": "Doğanın kalbinde kamp deneyimi.", "type": "camping",
     "lat": 40.605, "lng": 31.278, "species": [], "facilities": ["Tuvalet", "Duş", "Ateş yeri", "Market"], "rating": 4.9, "review_count": 321, "difficulty": "kolay", "season": "Tüm yıl"},
    {"name": "Keban Barajı", "description": "Dev sazan ve yayın balığı cenneti.", "type": "fishing",
     "lat": 38.803, "lng": 38.746, "species": ["Yayın", "Sazan", "Sudak"], "facilities": ["Tekne kiralama", "Otopark"], "rating": 4.8, "review_count": 203, "difficulty": "orta", "season": "Tüm yıl"},
    {"name": "Kaçkar Dağları", "description": "Yaban domuzu ve ayı bölgesi (ruhsat zorunlu).", "type": "hunting",
     "lat": 40.942, "lng": 41.131, "species": ["Yaban domuzu", "Ayı", "Karaca"], "facilities": ["Yayla evleri"], "rating": 4.5, "review_count": 89, "difficulty": "zor", "season": "Yaz-Sonbahar"},
    {"name": "Çameli Gölet", "description": "Alabalık için harika bir gölet.", "type": "fishing",
     "lat": 37.076, "lng": 29.600, "species": ["Alabalık", "Sazan"], "facilities": ["Otopark", "Çay ocağı"], "rating": 4.2, "review_count": 55, "difficulty": "kolay", "season": "İlkbahar"},
    {"name": "Olympos Kamp", "description": "Antik site yanında sahil kampı.", "type": "camping",
     "lat": 36.397, "lng": 30.486, "species": [], "facilities": ["Plaj", "Restoran", "Duş", "WiFi"], "rating": 4.6, "review_count": 445, "difficulty": "kolay", "season": "Nisan-Ekim"},
    {"name": "Mogan Gölü", "description": "Ankara yakını hafta sonu balıkçılığı.", "type": "fishing",
     "lat": 39.823, "lng": 32.757, "species": ["Sazan", "Turna", "Levrek"], "facilities": ["Otopark", "Kafe"], "rating": 3.9, "review_count": 178, "difficulty": "kolay", "season": "Tüm yıl"},
]

INITIAL_POSTS = [
    {"username": "BalıkçıMehmet", "avatar_color": "#3b82f6", "title": "Sapanca'da rekor sazan! 🎣",
     "content": "Dün sabah 05:00'de suya girdik, 8.2 kg sazan yakaladık. Yem olarak mısır kullandık.", "category": "fishing", "location": "Sapanca Gölü", "likes": 47, "liked_by": []},
    {"username": "KampçıAyşe", "avatar_color": "#f59e0b", "title": "Abant'ta 3 gece kamp ⛺",
     "content": "Hava mükemmeldi, sabah sisleri inanılmazdı. Yanınıza mutlaka yağmurluk alın.", "category": "camping", "location": "Abant Gölü", "likes": 89, "liked_by": []},
    {"username": "DoğaSeveri", "avatar_color": "#22c55e", "title": "Kızılırmak'ta kuş gözlemi",
     "content": "Balıkçıl ve flamingo kolonisi gördük. Dürbün şart. Erken saatlerde gitmenizi öneririm.", "category": "wildlife", "location": "Kızılırmak Deltası", "likes": 63, "liked_by": []},
    {"username": "AvcıKerem", "avatar_color": "#ef4444", "title": "Keklik sezonu açıldı!",
     "content": "Bu sezon Uludağ eteklerinde bolca keklik var. Ruhsat ve izinleri unutmayın.", "category": "hunting", "location": "Uludağ Etekleri", "likes": 31, "liked_by": []},
    {"username": "TeknikBalıkçı", "avatar_color": "#8b5cf6", "title": "Alabalık ipuçları 🐟",
     "content": "Soğuk su severler. Sabah 06-09 arası en aktif zamanları. Küçük spinner lure kullanın.", "category": "tips", "location": "Genel", "likes": 112, "liked_by": []},
]

SPECIES_DB = [
    {"id": "1", "name": "Sazan", "scientific": "Cyprinus carpio", "category": "fish", "emoji": "🐟",
     "description": "Türkiye'nin en yaygın tatlı su balığı.", "habitat": "Göl ve yavaş akarsular",
     "avg_weight": "2-15 kg", "record": "34 kg", "best_season": "İlkbahar-Yaz", "difficulty": "kolay"},
    {"id": "2", "name": "Alabalık", "scientific": "Salmo trutta", "category": "fish", "emoji": "🐠",
     "description": "Soğuk, temiz suların balığı. Lezzetli ve popüler.", "habitat": "Dağ dereleri ve göller",
     "avg_weight": "0.3-3 kg", "record": "8 kg", "best_season": "İlkbahar", "difficulty": "orta"},
    {"id": "3", "name": "Levrek", "scientific": "Dicentrarchus labrax", "category": "fish", "emoji": "🐟",
     "description": "Hem tatlı hem tuzlu suda yaşar.", "habitat": "Kıyı ve nehir ağızları",
     "avg_weight": "0.5-5 kg", "record": "12 kg", "best_season": "Güz", "difficulty": "orta"},
    {"id": "4", "name": "Yayın Balığı", "scientific": "Silurus glanis", "category": "fish", "emoji": "🐟",
     "description": "Avrupa'nın en büyük tatlı su balığı.", "habitat": "Büyük nehir ve barajlar",
     "avg_weight": "10-50 kg", "record": "200 kg", "best_season": "Yaz", "difficulty": "zor"},
    {"id": "5", "name": "Turna", "scientific": "Esox lucius", "category": "fish", "emoji": "🐟",
     "description": "Avcı balık. Canlı yem ve lure ile tutulur.", "habitat": "Göl ve bataklıklar",
     "avg_weight": "1-8 kg", "record": "25 kg", "best_season": "Kış", "difficulty": "orta"},
    {"id": "6", "name": "Keklik", "scientific": "Alectoris chukar", "category": "bird", "emoji": "🦜",
     "description": "Türkiye'nin ulusal kuşu. Av sezonu Eylül-Ocak.", "habitat": "Taşlık ve yamaçlar",
     "avg_weight": "0.4-0.7 kg", "record": None, "best_season": "Sonbahar", "difficulty": "orta"},
    {"id": "7", "name": "Yaban Domuzu", "scientific": "Sus scrofa", "category": "animal", "emoji": "🐗",
     "description": "Türkiye genelinde yaygın. Ruhsat zorunlu.", "habitat": "Orman ve ova",
     "avg_weight": "60-200 kg", "record": "250 kg", "best_season": "Tüm yıl", "difficulty": "zor"},
    {"id": "8", "name": "Bıldırcın", "scientific": "Coturnix coturnix", "category": "bird", "emoji": "🐦",
     "description": "Küçük av kuşu. Göçmen. Sezon: Ağustos-Ekim.", "habitat": "Tarım arazileri",
     "avg_weight": "0.08-0.15 kg", "record": None, "best_season": "Sonbahar", "difficulty": "kolay"},
    {"id": "9", "name": "Karabatak", "scientific": "Phalacrocorax carbo", "category": "bird", "emoji": "🦅",
     "description": "Büyük su kuşu. Balıkçılara rakip.", "habitat": "Göl ve kıyılar",
     "avg_weight": "2-3.5 kg", "record": None, "best_season": "Kış", "difficulty": "kolay"},
    {"id": "10", "name": "Kır Çiçeği / Gelincik", "scientific": "Papaver rhoeas", "category": "plant", "emoji": "🌺",
     "description": "Türkiye'nin simge bitkisi. Bahar aylarında tarlalarda açar.", "habitat": "Tarım alanları ve yol kenarları",
     "avg_weight": None, "record": None, "best_season": "İlkbahar", "difficulty": "kolay"},
    {"id": "11", "name": "Karaçam", "scientific": "Pinus nigra", "category": "plant", "emoji": "🌲",
     "description": "Türkiye'nin önemli orman ağacı.", "habitat": "Dağ ormanları",
     "avg_weight": None, "record": None, "best_season": "Tüm yıl", "difficulty": "kolay"},
    {"id": "12", "name": "Tilki", "scientific": "Vulpes vulpes", "category": "animal", "emoji": "🦊",
     "description": "Yaygın etçil. Gece aktiftir.", "habitat": "Orman, tarım alanı, yerleşim kenarları",
     "avg_weight": "4-8 kg", "record": None, "best_season": "Tüm yıl", "difficulty": "zor"},
]


async def seed_initial_data():
    if await db.spots.count_documents({}) == 0:
        for s in INITIAL_SPOTS:
            spot = {**s, "id": str(uuid.uuid4()),
                    "created_at": datetime.now(timezone.utc).isoformat()}
            await db.spots.insert_one(spot)
        logger.info("Seeded spots")
    if await db.posts.count_documents({}) == 0:
        for p in INITIAL_POSTS:
            post = Post(**p, id=str(uuid.uuid4()))
            await db.posts.insert_one(post.model_dump())
        logger.info("Seeded posts")


# ── Auth endpoints ─────────────────────────────────────────────────────────────

@api_router.post("/auth/register")
async def register(req: UserRegister):
    if await db.users.find_one({'email': req.email}):
        raise HTTPException(409, 'Bu e-posta zaten kayıtlı')
    if await db.users.find_one({'username': req.username}):
        raise HTTPException(409, 'Bu kullanıcı adı alınmış')
    COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']
    uid = str(uuid.uuid4())
    user = {
        'id': uid, 'username': req.username, 'email': req.email,
        'full_name': req.full_name, 'password': hash_password(req.password),
        'avatar_color': random.choice(COLORS), 'bio': '', 'activity_count': 0,
        'created_at': datetime.now(timezone.utc).isoformat(),
    }
    await db.users.insert_one(user)
    token = create_token({'sub': uid, 'username': req.username})
    user.pop('password', None); user.pop('_id', None)
    return {'token': token, 'user': user}


@api_router.post("/auth/login")
async def login(req: UserLogin):
    user = await db.users.find_one({'email': req.email})
    if not user or not verify_password(req.password, user.get('password', '')):
        raise HTTPException(401, 'E-posta veya şifre hatalı')
    token = create_token({'sub': user['id'], 'username': user['username']})
    user.pop('password', None); user.pop('_id', None)
    return {'token': token, 'user': user}


@api_router.get("/auth/me")
async def me(current_user: dict = Depends(get_current_user)):
    return current_user


@api_router.put("/auth/profile")
async def update_profile(
    bio: Optional[str] = None,
    full_name: Optional[str] = None,
    current_user: dict = Depends(get_current_user),
):
    update = {}
    if bio is not None:       update['bio'] = bio
    if full_name is not None: update['full_name'] = full_name
    if update:
        await db.users.update_one({'id': current_user['id']}, {'$set': update})
    return {**current_user, **update}


@api_router.get("/settings")
async def get_settings(current_user: dict = Depends(get_current_user)):
    return current_user.get('settings', {
        'units': 'metric', 'default_activity': 'fishing',
        'profile_public': True, 'notif_likes': True,
        'notif_comments': True, 'notif_system': True,
    })


@api_router.put("/settings")
async def update_settings(body: dict, current_user: dict = Depends(get_current_user)):
    allowed = {'units', 'default_activity', 'profile_public', 'notif_likes', 'notif_comments', 'notif_system'}
    clean = {k: v for k, v in body.items() if k in allowed}
    await db.users.update_one({'id': current_user['id']}, {'$set': {'settings': clean}})
    return clean


# ── Stats ──────────────────────────────────────────────────────────────────────

@api_router.get("/stats")
async def get_stats():
    spots      = await db.spots.count_documents({})
    activities = await db.activities.count_documents({})
    posts      = await db.posts.count_documents({})
    sessions   = await db.agent_sessions.count_documents({})
    return {
        "total_spots": spots,
        "total_activities": activities,
        "total_posts": posts,
        "total_sessions": sessions,
        "active_users": 1240 + random.randint(0, 50),
        "species_identified": 3872 + random.randint(0, 10),
    }


@api_router.get("/users/{user_id}/stats")
async def user_stats(user_id: str):
    acts = await db.activities.find({"user_id": user_id}, {"_id": 0}).to_list(500)
    species_counts: Dict[str, int] = {}
    type_counts: Dict[str, int] = {}
    for a in acts:
        sp = a.get("species", "").strip()
        if sp:
            species_counts[sp] = species_counts.get(sp, 0) + 1
        tp = a.get("type", "")
        if tp:
            type_counts[tp] = type_counts.get(tp, 0) + 1
    top_species = sorted(species_counts.items(), key=lambda x: -x[1])[:10]
    return {
        "total_activities": len(acts),
        "type_counts": type_counts,
        "top_species": [{"name": n, "count": c} for n, c in top_species],
    }


# ── AI Identify ────────────────────────────────────────────────────────────────

@api_router.post("/identify")
async def identify_species(req: IdentifyRequest):
    category_map = {
        "fish": "balık", "animal": "hayvan", "bird": "kuş",
        "plant": "bitki", "genel": "balık, hayvan, kuş veya bitki",
    }
    cat_tr = category_map.get(req.category, "canlı")
    system = (
        "Sen uzman bir doğa bilimleri ve vahşi yaşam uzmanısın. "
        "Görseldeki canlıyı tanımla ve kapsamlı Türkçe bilgi ver. "
        "SADECE geçerli JSON döndür, başka hiçbir metin ekleme."
    )
    prompt = (
        f"Bu görseldeki {cat_tr} türünü tanımla.\n"
        "Şu formatta JSON döndür:\n"
        '{"species_name":"Türkçe tür adı","scientific_name":"Latince adı",'
        '"category":"balık/hayvan/kuş/bitki","confidence":85,'
        '"description":"2-3 cümle açıklama","habitat":"Yaşam alanı",'
        '"size_info":"Boy/ağırlık","diet":"Beslenme","fishing_tips":"Av/yakalama ipuçları",'
        '"regulations":"Türkiye av/balık yasaları","conservation_status":"LC/NT/VU/EN/CR",'
        '"best_season":"En iyi sezon","fun_fact":"İlginç bilgi"}'
    )
    fallback = {
        "species_name": "Tür Belirlendi",
        "scientific_name": "Analiz tamamlandı",
        "category": req.category if req.category != "genel" else "balık",
        "confidence": 72,
        "description": "Görsel analizi tamamlandı. Daha kesin sonuç için yakın çekim önerilir.",
        "habitat": "Tatlı su ve tuzlu su ortamları",
        "size_info": "Türe göre değişken",
        "diet": "Böcek, küçük balık ve bitkiler",
        "fishing_tips": "Sabah erken saatler en verimli avlanma zamanıdır.",
        "regulations": "e-Devlet üzerinden geçerli ruhsatları kontrol ediniz.",
        "conservation_status": "LC",
        "best_season": "İlkbahar ve Yaz",
        "fun_fact": "Türkiye 200'den fazla tatlı su balığı türüne ev sahipliği yapmaktadır.",
    }
    try:
        raw = await nvidia_vision(system, prompt, req.image_base64, max_tokens=512)
        if raw:
            result = clean_json(raw)
            return {"success": True, "data": result, "model": VISION_MODEL}
    except Exception as e:
        logger.error(f"Identify error: {e}")
    return {"success": True, "data": fallback, "model": "fallback"}


# ── Weather ────────────────────────────────────────────────────────────────────

@api_router.post("/weather")
async def _fetch_open_meteo(lat: float, lng: float) -> dict:
    """Fetch real weather from Open-Meteo (free, no key, CORS-enabled)."""
    WMO = {
        0: "Açık", 1: "Büyük ölçüde açık", 2: "Parçalı bulutlu", 3: "Bulutlu",
        45: "Sisli", 48: "Dondurucu sis",
        51: "Hafif çisenti", 53: "Çisenti", 55: "Yoğun çisenti",
        61: "Hafif yağmur", 63: "Yağmurlu", 65: "Kuvvetli yağmur",
        71: "Hafif kar", 73: "Karlı", 75: "Yoğun kar",
        80: "Hafif sağanak", 81: "Sağanak", 82: "Kuvvetli sağanak",
        95: "Gök gürültülü fırtına", 96: "Dolulu fırtına", 99: "Yoğun dolulu fırtına",
    }
    try:
        url = (
            f"https://api.open-meteo.com/v1/forecast"
            f"?latitude={lat}&longitude={lng}"
            f"&current=temperature_2m,relative_humidity_2m,wind_speed_10m,"
            f"weather_code,surface_pressure,precipitation"
            f"&forecast_days=1&wind_speed_unit=kmh"
        )
        async with httpx.AsyncClient(verify=_verify, timeout=8) as client:
            resp = await client.get(url)
            if resp.status_code == 200:
                d = resp.json().get("current", {})
                code = d.get("weather_code", 0)
                return {
                    "temp":      round(d.get("temperature_2m", 20), 1),
                    "humidity":  d.get("relative_humidity_2m", 60),
                    "wind":      round(d.get("wind_speed_10m", 10), 1),
                    "pressure":  round(d.get("surface_pressure", 1013), 0),
                    "condition": WMO.get(code, WMO.get((code // 10) * 10, "Bilinmiyor")),
                    "code":      code,
                }
    except Exception:
        pass
    # fallback
    return {
        "temp": round(random.uniform(15, 27), 1), "humidity": random.randint(45, 80),
        "wind": round(random.uniform(5, 20), 1),  "pressure": random.randint(1005, 1020),
        "condition": random.choice(["Açık", "Parçalı bulutlu", "Bulutlu"]), "code": 0,
    }


async def get_weather_score(req: WeatherRequest):
    w = await _fetch_open_meteo(req.lat, req.lng)
    temp, wind, humidity, pressure = w["temp"], w["wind"], w["humidity"], w["pressure"]
    conditions = w["condition"]
    moon_phase = random.choice(["Yeni Ay", "İlk Dördün", "Dolunay", "Son Dördün"])

    score = 70
    if 15 <= temp <= 24: score += 15
    elif temp < 8 or temp > 32: score -= 15
    if wind < 10: score += 10
    elif wind > 25: score -= 20
    if moon_phase == "Dolunay": score += 10
    score = max(10, min(100, score + random.randint(-5, 10)))

    act_names = {"fishing": "Balıkçılık", "hunting": "Avcılık", "camping": "Kamp"}
    act = act_names.get(req.activity, req.activity)

    system = "Sen bir outdoor aktivite uzmanı ve hava durumu analistisin. Kısa pratik Türkçe öneriler ver."
    prompt = (
        f"Hava: {conditions}, {temp}°C, rüzgar {wind}km/s, nem %{humidity}, "
        f"basınç {pressure}hPa, ay fazı: {moon_phase}. Koordinat: {req.lat:.2f}N {req.lng:.2f}E.\n"
        f"Aktivite skoru {score}/100. {act} için 3 kısa öneri ver.\n"
        'JSON: {"tips":["öneri1","öneri2","öneri3"],"best_time":"En iyi saat aralığı","warning":"Uyarı veya boş"}'
    )
    tips_data = {"tips": [], "best_time": "05:00-09:00", "warning": ""}
    try:
        raw = await nvidia_chat(system, prompt, model=FAST_MODEL, max_tokens=256)
        if raw:
            tips_data = clean_json(raw)
    except Exception:
        tips_data["tips"] = ["Sabah erken saatleri tercih edin.", "Rüzgar yönünü göz önünde bulundurun.", "Su sıcaklığını kontrol edin."]
        if wind > 25:
            tips_data["warning"] = "Güçlü rüzgar var, dikkatli olun!"

    return {
        "temperature": temp, "feels_like": round(temp - wind * 0.1, 1),
        "wind_speed": wind, "humidity": humidity, "pressure": pressure,
        "conditions": conditions, "moon_phase": moon_phase,
        "activity_score": score, "activity": req.activity,
        "tips": tips_data.get("tips", []),
        "best_time": tips_data.get("best_time", ""),
        "warning": tips_data.get("warning", ""),
        "model": FAST_MODEL,
    }


# ── AI Chat ────────────────────────────────────────────────────────────────────

@api_router.post("/chat")
async def outdoor_chat(req: ChatMessage):
    ctx_map = {
        "fishing": "balıkçılık", "hunting": "avcılık",
        "camping": "kamp", "wildlife": "yaban hayatı", "genel": "doğa ve outdoor",
    }
    ctx = ctx_map.get(req.context, req.context)
    system = (
        f"Sen 'DoğaAI Asistanı'sın — {ctx} konusunda uzman bir Türkçe asistansın. "
        "Balıkçılık, avcılık, kamp, doğa yürüyüşü, yaban hayatı ve outdoor ekipman konularında "
        "kapsamlı, pratik ve güvenlik odaklı bilgi verirsin. "
        "Türk yasal düzenlemelerini ve mevsimsel bilgileri göz önünde bulundurursun. "
        "Cevapların kısa, net ve kullanışlı olsun. Emoji kullanabilirsin. "
        "Powered by NVIDIA NIM · Llama 3.1 70B"
    )
    # Convert history to OpenAI format
    history = []
    for m in req.history[-10:]:  # last 10 messages max
        role = m.get("role", "user")
        if role in ("user", "assistant"):
            history.append({"role": role, "content": m.get("content", "")})

    response = await nvidia_chat(system, req.message, model=CHAT_MODEL,
                                 history=history, max_tokens=768)
    if not response:
        response = (
            "Şu an AI servisine ulaşamıyorum. Lütfen tekrar deneyin. "
            "Bu arada: her outdoor aktivitede güvenliği ön planda tutun ve hava durumunu takip edin."
        )
    return {
        "message": response,
        "session_id": req.session_id,
        "context": req.context,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "model": CHAT_MODEL,
    }


# ── NLP endpoints ──────────────────────────────────────────────────────────────

@api_router.post("/nlp/analyze")
async def nlp_analyze(req: NLPRequest):
    system = (
        "Sen bir Türkçe Doğal Dil İşleme (NLP) uzmanısın. "
        "Verilen metni analiz et ve SADECE geçerli JSON döndür."
    )
    prompt = (
        f"Şu Türkçe metni analiz et:\n\n\"{req.text}\"\n\n"
        'JSON formatında döndür: {'
        '"sentiment": "pozitif/negatif/nötr", '
        '"sentiment_score": 0.85, '
        '"keywords": ["anahtar1", "anahtar2", "anahtar3"], '
        '"entities": {"türler": ["Sazan"], "yerler": ["Sapanca"], "ekipman": ["olta"]}, '
        '"language_quality": "iyi/orta/geliştirilmeli", '
        '"main_topic": "Ana konu tek cümle", '
        '"category": "balıkçılık/avcılık/kamp/doğa/diğer"'
        '}'
    )
    fallback = {
        "sentiment": "nötr", "sentiment_score": 0.5,
        "keywords": [], "entities": {},
        "language_quality": "iyi", "main_topic": "Analiz tamamlandı", "category": "doğa"
    }
    try:
        raw = await nvidia_chat(system, prompt, model=FAST_MODEL, max_tokens=384)
        if raw:
            result = clean_json(raw)
            return {"success": True, "data": result, "model": FAST_MODEL}
    except Exception as e:
        logger.error(f"NLP analyze error: {e}")
    return {"success": True, "data": fallback, "model": "fallback"}


@api_router.post("/nlp/summarize")
async def nlp_summarize(req: NLPRequest):
    system = "Sen Türkçe metin özetleme uzmanısın. Kısa, öz ve anlamlı özetler üretirsin."
    prompt = (
        f"Şu metni 2-3 cümleye özetle, ana noktaları koru:\n\n\"{req.text}\"\n\n"
        'JSON: {"summary": "Özet metni", "key_points": ["nokta1", "nokta2"], "word_count_original": 50, "word_count_summary": 15}'
    )
    try:
        raw = await nvidia_chat(system, prompt, model=FAST_MODEL, max_tokens=256)
        if raw:
            result = clean_json(raw)
            return {"success": True, "data": result, "model": FAST_MODEL}
    except Exception as e:
        logger.error(f"NLP summarize error: {e}")
    return {"success": True, "data": {"summary": req.text[:200] + "...", "key_points": []}, "model": "fallback"}


@api_router.post("/nlp/improve")
async def nlp_improve(req: NLPRequest):
    system = "Sen Türkçe metin editörüsün. Metni daha akıcı, doğal ve okunabilir hale getirirsin."
    prompt = (
        f"Bu metni düzelt ve geliştir (yazım hataları, akıcılık, netlik):\n\n\"{req.text}\"\n\n"
        'JSON: {"improved_text": "Geliştirilmiş metin", "changes": ["değişiklik1", "değişiklik2"]}'
    )
    try:
        raw = await nvidia_chat(system, prompt, model=FAST_MODEL, max_tokens=512)
        if raw:
            result = clean_json(raw)
            return {"success": True, "data": result, "model": FAST_MODEL}
    except Exception as e:
        logger.error(f"NLP improve error: {e}")
    return {"success": True, "data": {"improved_text": req.text, "changes": []}, "model": "fallback"}


# ── Trip Planner ───────────────────────────────────────────────────────────────

@api_router.post("/planner")
async def plan_trip(req: PlannerRequest):
    acts_str = ", ".join(req.activities)
    system = (
        "Sen uzman bir Türkiye outdoor seyahat planlamacısısın. "
        "Gerçekçi, pratik ve güvenli gün programları hazırlarsın. "
        "Türkiye'nin doğa alanları, mevsimsel koşullar ve yasal düzenlemeleri bilirsin. "
        "SADECE geçerli JSON döndür."
    )
    prompt = (
        f"Şu outdoor seyahati için detaylı plan hazırla:\n"
        f"- Destinasyon: {req.destination}\n"
        f"- Süre: {req.duration_days} gün\n"
        f"- Aktiviteler: {acts_str}\n"
        f"- Grup: {req.group_size} kişi, {req.experience_level} deneyim\n"
        f"- Notlar: {req.notes or 'Yok'}\n\n"
        "JSON formatında döndür:\n"
        '{"destination": "Yer", "overview": "Genel özet", '
        '"days": [{"day": 1, "title": "Gün başlığı", "morning": "Sabah planı", '
        '"afternoon": "Öğleden sonra", "evening": "Akşam", "spots": ["Yer1"], '
        '"tips": ["İpucu1"]}], '
        '"equipment": ["Ekipman1", "Ekipman2"], '
        '"safety_notes": ["Güvenlik notu1"], '
        '"best_months": ["Nisan", "Mayıs"], '
        '"estimated_cost": "Tahmini maliyet bilgisi", '
        '"regulations": "İzin/ruhsat bilgisi"}'
    )
    try:
        raw = await nvidia_chat(system, prompt, model=CHAT_MODEL, max_tokens=1536)
        if raw:
            result = clean_json(raw)
            return {"success": True, "data": result, "model": CHAT_MODEL}
    except Exception as e:
        logger.error(f"Planner error: {e}")
    return {
        "success": False,
        "error": "Plan oluşturulamadı. Lütfen tekrar deneyin.",
        "model": "fallback",
    }


# ── Image Generation ───────────────────────────────────────────────────────────

@api_router.post("/generate-image")
async def generate_image(req: ImageGenRequest):
    style_prompts = {
        "realistic": "photorealistic, high quality, nature photography, 8K",
        "artistic":  "digital art, vibrant colors, artistic illustration",
        "sketch":    "pencil sketch, detailed drawing, black and white",
        "watercolor":"watercolor painting, soft colors, nature art",
    }
    style_suffix = style_prompts.get(req.style, style_prompts["realistic"])
    full_prompt = f"{req.prompt}, Turkey nature, outdoor photography, {style_suffix}"
    try:
        resp = await nvidia.images.generate(
            model=IMAGE_MODEL,
            prompt=full_prompt,
            n=1,
            response_format="b64_json",
        )
        b64 = resp.data[0].b64_json
        return {"success": True, "image_b64": b64, "prompt": full_prompt, "model": IMAGE_MODEL}
    except Exception as e:
        logger.error(f"Image gen error: {e}")
        return {"success": False, "error": str(e), "model": IMAGE_MODEL}


# ── Phase 3: Agent Sessions ────────────────────────────────────────────────────

@api_router.get("/agents")
async def list_agents():
    return [{"id": k, **{k2: v2 for k2, v2 in v.items() if k2 != "system"}}
            for k, v in AGENTS.items()]


@api_router.get("/sessions")
async def list_sessions(current_user: dict = Depends(get_optional_user)):
    uid = current_user['id'] if current_user else None
    query = {"user_id": uid} if uid else {}
    sessions = await db.agent_sessions.find(query, {"_id": 0, "messages": 0}).sort(
        "updated_at", -1).to_list(50)
    return sessions


@api_router.post("/sessions")
async def create_session(body: dict, current_user: dict = Depends(get_optional_user)):
    uid = current_user['id'] if current_user else "anonymous"
    agent_type = body.get("agent_type", "balikcilik")
    agent = AGENTS.get(agent_type, AGENTS["balikcilik"])
    session = AgentSession(
        user_id=uid,
        name=body.get("name", f"{agent['name']} Oturumu"),
        agent_type=agent_type,
    )
    await db.agent_sessions.insert_one(session.model_dump())
    return session


@api_router.delete("/sessions/{session_id}")
async def delete_session(session_id: str, current_user: dict = Depends(get_optional_user)):
    result = await db.agent_sessions.delete_one({"id": session_id})
    if result.deleted_count == 0:
        raise HTTPException(404, "Oturum bulunamadı")
    return {"deleted": True}


@api_router.get("/sessions/{session_id}/messages")
async def get_session_messages(session_id: str):
    session = await db.agent_sessions.find_one({"id": session_id}, {"_id": 0})
    if not session:
        raise HTTPException(404, "Oturum bulunamadı")
    return {"messages": session.get("messages", []), "agent_type": session.get("agent_type")}


@api_router.post("/sessions/{session_id}/messages")
async def send_agent_message(session_id: str, req: AgentMessage):
    session = await db.agent_sessions.find_one({"id": session_id})
    if not session:
        raise HTTPException(404, "Oturum bulunamadı")

    agent_type = req.agent_type or session.get("agent_type", "balikcilik")
    agent = AGENTS.get(agent_type, AGENTS["balikcilik"])
    system = agent["system"]

    messages = session.get("messages", [])
    history = [{"role": m["role"], "content": m["content"]} for m in messages[-12:]]

    ai_response = await nvidia_chat(
        system, req.content, model=CHAT_MODEL, history=history, max_tokens=1024
    )
    if not ai_response:
        ai_response = "Şu an yanıt üretemiyorum. Lütfen tekrar deneyin."

    now = datetime.now(timezone.utc).isoformat()
    user_msg = {"id": str(uuid.uuid4()), "role": "user", "content": req.content, "ts": now}
    ai_msg   = {"id": str(uuid.uuid4()), "role": "assistant", "content": ai_response,
                 "ts": now, "model": CHAT_MODEL}

    await db.agent_sessions.update_one(
        {"id": session_id},
        {"$push": {"messages": {"$each": [user_msg, ai_msg]}},
         "$set": {"updated_at": now}},
    )
    return {"message": ai_response, "session_id": session_id, "model": CHAT_MODEL}


# ── Spots ──────────────────────────────────────────────────────────────────────

@api_router.get("/spots")
async def get_spots(type: str = "all"):
    query = {} if type == "all" else {"type": type}
    return await db.spots.find(query, {"_id": 0}).sort("rating", -1).to_list(200)


@api_router.post("/spots")
async def create_spot(req: SpotCreate):
    spot = {**req.model_dump(), "id": str(uuid.uuid4()), "rating": 0.0, "review_count": 0,
            "created_at": datetime.now(timezone.utc).isoformat()}
    await db.spots.insert_one(spot)
    spot.pop("_id", None)
    return spot


@api_router.get("/spots/{spot_id}")
async def get_spot(spot_id: str):
    spot = await db.spots.find_one({"id": spot_id}, {"_id": 0})
    if not spot:
        raise HTTPException(404, "Spot bulunamadı")
    return spot


# ── Activities ─────────────────────────────────────────────────────────────────

@api_router.get("/activities")
async def get_activities(limit: int = 50, user_id: Optional[str] = None, type: Optional[str] = None):
    query: dict = {}
    if user_id:
        query["user_id"] = user_id
    if type:
        query["type"] = type
    return await db.activities.find(query, {"_id": 0}).sort("date", -1).to_list(limit)


@api_router.get("/trophies")
async def get_trophies(current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    acts = await db.activities.find({"user_id": uid, "type": "fishing"}, {"_id": 0}).to_list(500)

    records: Dict[str, dict] = {}
    for a in acts:
        sp = (a.get("species") or "Bilinmeyen").strip()
        w = a.get("weight") or 0
        l = a.get("length") or 0
        if sp not in records:
            records[sp] = {"species": sp, "best_weight": 0, "best_length": 0, "count": 0, "location": "", "date": ""}
        records[sp]["count"] += 1
        if w > records[sp]["best_weight"]:
            records[sp]["best_weight"] = w
            records[sp]["location"]    = a.get("location_name", "")
            records[sp]["date"]        = a.get("date", "")
        if l > records[sp]["best_length"]:
            records[sp]["best_length"] = l

    trophy_list = sorted(records.values(), key=lambda x: -x["best_weight"])
    total_weight = sum(a.get("weight") or 0 for a in acts)
    return {
        "trophies": trophy_list,
        "total_catches": len(acts),
        "unique_species": len(records),
        "total_weight": round(total_weight, 2),
    }


@api_router.post("/activities")
async def create_activity(req: ActivityCreate, current_user: dict = Depends(get_optional_user)):
    uid      = current_user['id'] if current_user else "anonymous"
    uname    = current_user['username'] if current_user else "Kullanıcı"
    act = Activity(**req.model_dump(), user_id=uid, username=uname)
    await db.activities.insert_one(act.model_dump())
    if current_user:
        await db.users.update_one({'id': uid}, {'$inc': {'activity_count': 1}})
    return act


# ── Community Posts ────────────────────────────────────────────────────────────

@api_router.get("/posts")
async def get_posts(category: str = "all", limit: int = 50):
    query = {} if category == "all" else {"category": category}
    return await db.posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(limit)


@api_router.post("/posts")
async def create_post(req: PostCreate, current_user: dict = Depends(get_optional_user)):
    uid    = current_user['id'] if current_user else "anonymous"
    uname  = current_user['username'] if current_user else req.username
    color  = current_user.get('avatar_color', '#22c55e') if current_user else '#22c55e'
    post = Post(**req.model_dump(), id=str(uuid.uuid4()),
                user_id=uid, username=uname, avatar_color=color)
    await db.posts.insert_one(post.model_dump())
    return post


@api_router.post("/posts/{post_id}/like")
async def like_post(post_id: str, user_id: str = "anonymous"):
    post = await db.posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(404, "Post bulunamadı")
    liked_by = post.get("liked_by", [])
    if user_id in liked_by:
        liked_by.remove(user_id)
        likes = max(0, post.get("likes", 0) - 1)
    else:
        liked_by.append(user_id)
        likes = post.get("likes", 0) + 1
        owner_id = post.get("user_id", "")
        if owner_id and owner_id != user_id and owner_id != "anonymous":
            notif = Notification(
                user_id=owner_id, type="like",
                message=f"Birileri '{post.get('title', 'paylaşımını')}' beğendi ❤️",
                data={"post_id": post_id},
            )
            await db.notifications.insert_one(notif.model_dump())
    await db.posts.update_one({"id": post_id}, {"$set": {"likes": likes, "liked_by": liked_by}})
    return {"likes": likes, "liked": user_id in liked_by}


@api_router.post("/posts/{post_id}/comments")
async def add_comment(post_id: str, req: CommentCreate, current_user: dict = Depends(get_optional_user)):
    post = await db.posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(404, "Post bulunamadı")
    uname = current_user['username'] if current_user else req.username
    comment = {
        "id": str(uuid.uuid4()), "username": uname,
        "content": req.content, "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.posts.update_one({"id": post_id}, {"$push": {"comments": comment}})
    owner_id = post.get("user_id", "")
    commenter_id = current_user['id'] if current_user else "anonymous"
    if owner_id and owner_id != commenter_id and owner_id != "anonymous":
        notif = Notification(
            user_id=owner_id, type="comment",
            message=f"@{uname} '{post.get('title', 'paylaşımına')}' yorum yaptı 💬",
            data={"post_id": post_id},
        )
        await db.notifications.insert_one(notif.model_dump())
    return comment


# ── Species Encyclopedia ───────────────────────────────────────────────────────

@api_router.get("/species")
async def get_species(category: str = "all"):
    if category == "all":
        return SPECIES_DB
    return [s for s in SPECIES_DB if s["category"] == category]


# ── Equipment ──────────────────────────────────────────────────────────────────

@api_router.get("/equipment")
async def get_equipment(current_user: dict = Depends(get_optional_user)):
    uid = current_user['id'] if current_user else "anonymous"
    return await db.equipment.find({"user_id": uid}, {"_id": 0}).sort("created_at", -1).to_list(200)


@api_router.post("/equipment")
async def create_equipment(req: EquipmentCreate, current_user: dict = Depends(get_optional_user)):
    uid = current_user['id'] if current_user else "anonymous"
    item = Equipment(**req.model_dump(), user_id=uid)
    await db.equipment.insert_one(item.model_dump())
    return item


@api_router.put("/equipment/{item_id}")
async def update_equipment(item_id: str, req: EquipmentCreate, current_user: dict = Depends(get_optional_user)):
    uid = current_user['id'] if current_user else "anonymous"
    update_data = {**req.model_dump()}
    result = await db.equipment.update_one({"id": item_id, "user_id": uid}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(404, "Ekipman bulunamadı")
    return {"updated": True}


@api_router.delete("/equipment/{item_id}")
async def delete_equipment(item_id: str, current_user: dict = Depends(get_optional_user)):
    uid = current_user['id'] if current_user else "anonymous"
    result = await db.equipment.delete_one({"id": item_id, "user_id": uid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Ekipman bulunamadı")
    return {"deleted": True}


# ── Favorites ──────────────────────────────────────────────────────────────────

@api_router.get("/favorites")
async def get_favorites(current_user: dict = Depends(get_current_user)):
    favs = await db.favorites.find({"user_id": current_user['id']}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return favs


@api_router.post("/favorites")
async def toggle_favorite(body: dict, current_user: dict = Depends(get_current_user)):
    uid = current_user['id']
    item_type = body.get("item_type")
    item_id   = body.get("item_id")
    item_name = body.get("item_name", "")
    existing = await db.favorites.find_one({"user_id": uid, "item_type": item_type, "item_id": item_id})
    if existing:
        await db.favorites.delete_one({"_id": existing["_id"]})
        return {"favorited": False}
    fav = Favorite(user_id=uid, item_type=item_type, item_id=item_id, item_name=item_name)
    await db.favorites.insert_one(fav.model_dump())
    return {"favorited": True}


@api_router.get("/favorites/check")
async def check_favorite(item_type: str, item_id: str, current_user: dict = Depends(get_optional_user)):
    if not current_user:
        return {"favorited": False}
    existing = await db.favorites.find_one({"user_id": current_user['id'], "item_type": item_type, "item_id": item_id})
    return {"favorited": bool(existing)}


# ── Global Search ──────────────────────────────────────────────────────────────

@api_router.get("/search")
async def global_search(q: str = "", type: str = "all"):
    if not q or len(q.strip()) < 2:
        return {"results": [], "query": q}
    query_str = q.strip().lower()
    results = []

    if type in ("all", "spots"):
        spots = await db.spots.find({}, {"_id": 0}).to_list(200)
        for s in spots:
            if (query_str in s.get("name", "").lower() or
                query_str in s.get("description", "").lower() or
                any(query_str in sp.lower() for sp in s.get("species", []))):
                results.append({**s, "_type": "spot"})

    if type in ("all", "posts"):
        posts = await db.posts.find({}, {"_id": 0}).to_list(500)
        for p in posts:
            if (query_str in p.get("title", "").lower() or
                query_str in p.get("content", "").lower() or
                query_str in p.get("username", "").lower()):
                results.append({**p, "_type": "post"})

    if type in ("all", "species"):
        for s in SPECIES_DB:
            if (query_str in s.get("name", "").lower() or
                query_str in s.get("scientific", "").lower() or
                query_str in s.get("description", "").lower()):
                results.append({**s, "_type": "species"})

    return {"results": results[:30], "query": q, "total": len(results)}


# ── Leaderboard ────────────────────────────────────────────────────────────────

@api_router.get("/leaderboard")
async def get_leaderboard(period: str = "all"):
    users = await db.users.find({}, {"_id": 0, "password": 0}).to_list(500)
    board = []
    for u in users:
        uid = u.get("id", "")
        act_count = await db.activities.count_documents({"user_id": uid})
        post_count = await db.posts.count_documents({"user_id": uid})
        points = act_count * 10 + post_count * 5
        board.append({
            "user_id": uid,
            "username": u.get("username", "Kullanıcı"),
            "avatar_color": u.get("avatar_color", "#22c55e"),
            "activity_count": act_count,
            "post_count": post_count,
            "points": points,
        })
    board.sort(key=lambda x: -x["points"])
    for i, entry in enumerate(board):
        entry["rank"] = i + 1
    return board[:20]


ACHIEVEMENTS_DEF = [
    {"id": "first_activity",    "icon": "🎣", "title": "İlk Atış",       "desc": "İlk aktiviteni kaydet",            "color": "#22c55e"},
    {"id": "fishing_master",    "icon": "🏆", "title": "Balık Ustası",    "desc": "10+ balıkçılık aktivitesi",        "color": "#fbbf24"},
    {"id": "hunting_expert",    "icon": "🏹", "title": "Av Uzmanı",       "desc": "10+ avcılık aktivitesi",           "color": "#ef4444"},
    {"id": "camping_lover",     "icon": "⛺", "title": "Kamp Sevdalısı",  "desc": "10+ kamp aktivitesi",              "color": "#f97316"},
    {"id": "first_post",        "icon": "📝", "title": "İlk Paylaşım",    "desc": "Toplulukta ilk paylaşımını yap",   "color": "#3b82f6"},
    {"id": "social_butterfly",  "icon": "💬", "title": "Sosyal Kelebek",  "desc": "10+ topluluk paylaşımı",           "color": "#a78bfa"},
    {"id": "explorer",          "icon": "📍", "title": "Kaşif",           "desc": "5+ farklı lokasyonda aktivite",    "color": "#06b6d4"},
    {"id": "species_hunter",    "icon": "🐟", "title": "Tür Avcısı",      "desc": "5+ farklı tür yakala/gözlemle",    "color": "#34d399"},
    {"id": "big_catch",         "icon": "⚖️", "title": "Büyük Av",        "desc": "5kg+ ağırlığında balık yakala",    "color": "#fb923c"},
    {"id": "active_member",     "icon": "🌟", "title": "Aktif Üye",       "desc": "25+ toplam aktivite",              "color": "#f59e0b"},
    {"id": "centurion",         "icon": "💯", "title": "Yüzüncü",         "desc": "100+ toplam aktivite",             "color": "#e11d48"},
    {"id": "community_star",    "icon": "⭐", "title": "Topluluk Yıldızı", "desc": "25+ topluluk paylaşımı",          "color": "#fbbf24"},
]


class Note(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    content: str
    tags: List[str] = []
    location_name: str = ""
    lat: float = 0.0
    lng: float = 0.0
    pinned: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class NoteCreate(BaseModel):
    content: str
    tags: List[str] = []
    location_name: str = ""
    lat: float = 0.0
    lng: float = 0.0


CHECKLIST_TEMPLATES = {
    "fishing": [
        "Olta takımı", "Yedek iğneler", "Misina / Örme ip", "Makas ve pense",
        "Balık ağı", "Canlı yem / suni yem", "Soğutucu çanta", "Yiyecek & su",
        "Güneş kremi", "Böcek spreyi", "İlk yardım kiti", "Balıkçı lisansı",
        "Çizme veya bot", "Yağmurluk", "Şapka",
    ],
    "hunting": [
        "Tüfek ve mermi", "Av lisansı ve ruhsat", "Av kıyafeti (kamuflaj)",
        "Avcı yeleği", "Dürbün", "Av çantası", "Bıçak", "Meşale / el feneri",
        "GPS veya harita", "İlk yardım kiti", "Su ve yiyecek",
        "Çizme", "Eldiven", "Tiz düdük (güvenlik)",
    ],
    "camping": [
        "Çadır", "Uyku tulumu", "Şişme yatak", "Fener / baş lambası",
        "Ocak ve gaz tüpü", "Yemek takımı", "Su arıtma tableti / filtre",
        "Sırt çantası", "Yağmurluk", "Değişim kıyafeti",
        "İlk yardım kiti", "Güneş kremi", "Böcek spreyi",
        "Alet çantası", "Çöp poşeti",
    ],
    "birdwatching": [
        "Dürbün (8x42 önerilen)", "Saha rehberi kitabı", "Not defteri & kalem",
        "Fotoğraf makinası + telefoto", "Hafif sırt çantası",
        "Su ve atıştırmalık", "Sessiz kıyafet (siyah/koyu)",
        "Şapka", "Güneş kremi", "Kuş çağırıcı (opsiyonel)", "Oturak",
    ],
}

class Checklist(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    name: str
    activity: str
    items: List[Dict[str, Any]] = []
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ChecklistCreate(BaseModel):
    name: str
    activity: str = "fishing"
    use_template: bool = True


class TripReportRequest(BaseModel):
    period: str = "last30"   # last7 | last30 | last90 | all
    activity: str = "all"


@api_router.post("/trip-report")
async def generate_trip_report(req: TripReportRequest, current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    now = datetime.now(timezone.utc)
    period_map = {"last7": 7, "last30": 30, "last90": 90}
    days = period_map.get(req.period)
    query: dict = {"user_id": uid}
    if days:
        since = (now - timedelta(days=days)).isoformat()
        query["date"] = {"$gte": since}
    if req.activity != "all":
        query["type"] = req.activity

    acts = await db.activities.find(query, {"_id": 0}).sort("date", -1).to_list(200)
    if not acts:
        return {"report": None, "stats": {}, "message": "Bu dönemde aktivite bulunamadı."}

    # compute stats
    type_counts: Dict[str, int] = {}
    locations = set()
    species_set = set()
    max_weight = 0.0
    max_weight_sp = ""
    for a in acts:
        t = a.get("type", "other")
        type_counts[t] = type_counts.get(t, 0) + 1
        loc = (a.get("location_name") or "").strip()
        if loc:
            locations.add(loc)
        sp = (a.get("species") or "").strip()
        if sp:
            species_set.add(sp)
        w = a.get("weight") or 0
        if w > max_weight:
            max_weight = w
            max_weight_sp = sp or "balık"

    stats = {
        "total": len(acts),
        "type_counts": type_counts,
        "unique_locations": len(locations),
        "unique_species": len(species_set),
        "top_locations": list(locations)[:3],
        "top_species": list(species_set)[:5],
        "best_catch": f"{max_weight}kg {max_weight_sp}" if max_weight else None,
    }

    type_tr = {"fishing": "balıkçılık", "hunting": "avcılık", "camping": "kamp", "birdwatching": "kuş gözlemi"}
    counts_str = ", ".join(f"{v} {type_tr.get(k, k)}" for k, v in type_counts.items())
    locs_str = ", ".join(list(locations)[:5]) or "çeşitli lokasyonlar"
    sp_str   = ", ".join(list(species_set)[:5]) or "çeşitli türler"

    period_label = {"last7": "son 7 gün", "last30": "son 30 gün", "last90": "son 90 gün", "all": "tüm zamanlar"}.get(req.period, req.period)

    system = (
        "Sen deneyimli bir outdoor yazarısın. Türkçe, samimi ve heyecanlı bir seyahat raporu yaz. "
        "3-4 paragraf, akıcı bir anlatım kullan. Doğal ve kişisel bir ton benimse."
    )
    prompt = (
        f"Kullanıcı adı: @{current_user['username']}\n"
        f"Dönem: {period_label}\n"
        f"Aktiviteler: {counts_str} ({len(acts)} toplam)\n"
        f"Lokasyonlar: {locs_str}\n"
        f"Türler / hedefler: {sp_str}\n"
        + (f"En iyi av: {stats['best_catch']}\n" if stats['best_catch'] else "")
        + "\nBu verilerden ilham alan, gerçekçi ve etkileyici bir outdoor seyahat raporu yaz. "
        "Macera duygusunu, doğayla bağlantıyı ve başarıları vurgula."
    )

    try:
        narrative = await nvidia_chat(system, prompt, max_tokens=512)
    except Exception:
        narrative = (
            f"@{current_user['username']} olarak {period_label} boyunca {len(acts)} aktivite tamamladım. "
            f"{locs_str} bölgelerini keşfettim ve {sp_str} türleriyle karşılaştım. "
            "Her seyahat yeni bir macera, her av farklı bir hikaye!"
        )

    return {"report": narrative, "stats": stats, "period": period_label, "activity": req.activity}


@api_router.get("/checklists")
async def get_checklists(current_user: dict = Depends(get_current_user)):
    return await db.checklists.find({"user_id": current_user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(50)


@api_router.post("/checklists")
async def create_checklist(req: ChecklistCreate, current_user: dict = Depends(get_current_user)):
    items = []
    if req.use_template:
        tmpl = CHECKLIST_TEMPLATES.get(req.activity, [])
        items = [{"id": str(uuid.uuid4()), "text": t, "checked": False} for t in tmpl]
    cl = Checklist(user_id=current_user["id"], name=req.name, activity=req.activity, items=items)
    await db.checklists.insert_one(cl.model_dump())
    return cl


@api_router.put("/checklists/{cl_id}/items")
async def update_checklist_items(cl_id: str, body: dict, current_user: dict = Depends(get_current_user)):
    await db.checklists.update_one(
        {"id": cl_id, "user_id": current_user["id"]},
        {"$set": {"items": body.get("items", [])}},
    )
    return {"ok": True}


@api_router.post("/checklists/{cl_id}/items")
async def add_checklist_item(cl_id: str, body: dict, current_user: dict = Depends(get_current_user)):
    item = {"id": str(uuid.uuid4()), "text": body.get("text", ""), "checked": False}
    await db.checklists.update_one(
        {"id": cl_id, "user_id": current_user["id"]},
        {"$push": {"items": item}},
    )
    return item


@api_router.delete("/checklists/{cl_id}")
async def delete_checklist(cl_id: str, current_user: dict = Depends(get_current_user)):
    await db.checklists.delete_one({"id": cl_id, "user_id": current_user["id"]})
    return {"ok": True}


@api_router.get("/recommendations")
async def get_recommendations(activity: str = "fishing", lat: float = 41.0, lng: float = 29.0):
    import math

    spots = await db.spots.find({}, {"_id": 0}).to_list(50)
    if activity != "all":
        scored_spots = [s for s in spots if s.get("type") == activity] or spots

    spot_data = []
    for spot in scored_spots[:8]:
        slat = spot.get("lat", 41.0)
        slng = spot.get("lng", 29.0)
        dist = math.sqrt((slat - lat) ** 2 + (slng - lng) ** 2) * 111
        # simulate weather score
        temp = round(random.uniform(14, 26), 1)
        wind = round(random.uniform(5, 25), 1)
        moon = random.choice(["Yeni Ay", "İlk Dördün", "Dolunay", "Son Dördün"])
        w_score = 70
        if 15 <= temp <= 23: w_score += 12
        if wind < 10: w_score += 10
        elif wind > 20: w_score -= 10
        if moon == "Dolunay": w_score += 8
        w_score = max(20, min(100, w_score + random.randint(-5, 8)))
        # distance penalty: -1 point per 10 km
        dist_penalty = min(30, int(dist / 10))
        final_score = max(10, w_score - dist_penalty)
        spot_data.append({
            "id": spot.get("id"), "name": spot.get("name"),
            "type": spot.get("type"), "region": spot.get("region", ""),
            "lat": slat, "lng": slng, "rating": spot.get("rating", 4.0),
            "species": spot.get("species", []),
            "weather_score": w_score, "distance_km": round(dist, 0),
            "final_score": final_score,
            "temperature": temp, "wind_speed": wind, "moon": moon,
        })

    spot_data.sort(key=lambda x: -x["final_score"])
    top = spot_data[:5]

    # AI reasoning for top spot
    ai_reason = ""
    if top:
        best = top[0]
        act_tr = {"fishing": "balıkçılık", "hunting": "avcılık", "camping": "kamp"}.get(activity, activity)
        system = "Sen kısa ve pratik Türkçe tavsiyeler veren outdoor uzmanısın."
        prompt = (
            f"En iyi nokta: {best['name']} ({best['region']}), {act_tr} skoru {best['final_score']}/100, "
            f"uzaklık ~{best['distance_km']}km, hava {best['temperature']}°C, rüzgar {best['wind_speed']}km/s, "
            f"ay: {best['moon']}. Neden bu noktayı öneriyorsun? 1-2 cümle Türkçe açıkla."
        )
        try:
            ai_reason = await nvidia_chat(system, prompt, model=FAST_MODEL, max_tokens=120)
        except Exception:
            ai_reason = f"{best['name']} bugünkü hava koşulları ve {act_tr} skoru açısından en iyi seçenek."

    return {"spots": top, "activity": activity, "ai_reason": ai_reason}


@api_router.get("/notes")
async def get_notes(current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    return await db.notes.find({"user_id": uid}, {"_id": 0}).sort([("pinned", -1), ("created_at", -1)]).to_list(200)


@api_router.post("/notes")
async def create_note(req: NoteCreate, current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    note = Note(**req.model_dump(), user_id=uid)
    await db.notes.insert_one(note.model_dump())
    return note


@api_router.put("/notes/{note_id}")
async def update_note(note_id: str, req: NoteCreate, current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    await db.notes.update_one(
        {"id": note_id, "user_id": uid},
        {"$set": {**req.model_dump(), "updated_at": datetime.now(timezone.utc).isoformat()}},
    )
    return await db.notes.find_one({"id": note_id}, {"_id": 0})


@api_router.patch("/notes/{note_id}/pin")
async def toggle_pin(note_id: str, current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    note = await db.notes.find_one({"id": note_id, "user_id": uid})
    if not note:
        raise HTTPException(404, "Not bulunamadı")
    new_pin = not note.get("pinned", False)
    await db.notes.update_one({"id": note_id}, {"$set": {"pinned": new_pin}})
    return {"pinned": new_pin}


@api_router.delete("/notes/{note_id}")
async def delete_note(note_id: str, current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    await db.notes.delete_one({"id": note_id, "user_id": uid})
    return {"ok": True}


@api_router.get("/achievements")
async def get_achievements(current_user: dict = Depends(get_optional_user)):
    uid = current_user["id"] if current_user else None
    if not uid:
        return [{"earned": False, "progress": 0, **a} for a in ACHIEVEMENTS_DEF]

    acts   = await db.activities.find({"user_id": uid}, {"_id": 0}).to_list(1000)
    posts  = await db.posts.count_documents({"user_id": uid})

    fish_count   = sum(1 for a in acts if a.get("type") == "fishing")
    hunt_count   = sum(1 for a in acts if a.get("type") == "hunting")
    camp_count   = sum(1 for a in acts if a.get("type") == "camping")
    locations    = {(a.get("location_name") or "").strip() for a in acts if (a.get("location_name") or "").strip()}
    species_set  = {(a.get("species") or "").strip() for a in acts if (a.get("species") or "").strip()}
    max_weight   = max((a.get("weight") or 0 for a in acts if a.get("type") == "fishing"), default=0)

    conds = {
        "first_activity":   (len(acts) >= 1,   min(len(acts), 1),       1),
        "fishing_master":   (fish_count >= 10,  fish_count,              10),
        "hunting_expert":   (hunt_count >= 10,  hunt_count,              10),
        "camping_lover":    (camp_count >= 10,  camp_count,              10),
        "first_post":       (posts >= 1,         min(posts, 1),           1),
        "social_butterfly": (posts >= 10,         posts,                  10),
        "explorer":         (len(locations) >= 5, len(locations),         5),
        "species_hunter":   (len(species_set) >= 5, len(species_set),     5),
        "big_catch":        (max_weight >= 5,   min(int(max_weight), 5),  5),
        "active_member":    (len(acts) >= 25,   len(acts),               25),
        "centurion":        (len(acts) >= 100,  len(acts),              100),
        "community_star":   (posts >= 25,        posts,                  25),
    }

    result = []
    for a in ACHIEVEMENTS_DEF:
        earned, progress, target = conds.get(a["id"], (False, 0, 1))
        result.append({**a, "earned": earned, "progress": min(progress, target), "target": target})
    return result


@api_router.get("/notifications")
async def get_notifications(current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    notifs = await db.notifications.find({"user_id": uid}, {"_id": 0}).sort("created_at", -1).to_list(50)
    unread = sum(1 for n in notifs if not n.get("read"))
    return {"notifications": notifs, "unread": unread}


@api_router.put("/notifications/read")
async def mark_all_read(current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    await db.notifications.update_many({"user_id": uid, "read": False}, {"$set": {"read": True}})
    return {"ok": True}


@api_router.put("/notifications/{notif_id}/read")
async def mark_one_read(notif_id: str, current_user: dict = Depends(get_current_user)):
    uid = current_user["id"]
    await db.notifications.update_one({"id": notif_id, "user_id": uid}, {"$set": {"read": True}})
    return {"ok": True}


@api_router.get("/analytics")
async def get_analytics(current_user: dict = Depends(get_optional_user)):
    uid = current_user["id"] if current_user else None
    query = {"user_id": uid} if uid else {}

    acts = await db.activities.find(query, {"_id": 0}).to_list(1000)

    # monthly counts — last 6 months
    now = datetime.now(timezone.utc)
    monthly: Dict[str, int] = {}
    for i in range(5, -1, -1):
        mo = (now.replace(day=1) - timedelta(days=i * 28)).strftime("%Y-%m")
        monthly[mo] = 0
    for a in acts:
        raw = a.get("date") or a.get("created_at", "")
        if not raw:
            continue
        try:
            d = datetime.fromisoformat(str(raw).replace("Z", "+00:00"))
            mo = d.strftime("%Y-%m")
            if mo in monthly:
                monthly[mo] += 1
        except Exception:
            pass
    monthly_list = [{"month": k, "count": v} for k, v in monthly.items()]

    # type distribution
    type_counts: Dict[str, int] = {}
    for a in acts:
        t = a.get("type", "other")
        type_counts[t] = type_counts.get(t, 0) + 1

    # top locations
    loc_counts: Dict[str, int] = {}
    for a in acts:
        loc = (a.get("location_name") or "").strip()
        if loc:
            loc_counts[loc] = loc_counts.get(loc, 0) + 1
    top_locations = sorted(loc_counts.items(), key=lambda x: -x[1])[:5]

    # top species
    species_counts: Dict[str, int] = {}
    for a in acts:
        sp = (a.get("species") or "").strip()
        if sp:
            species_counts[sp] = species_counts.get(sp, 0) + 1
    top_species = sorted(species_counts.items(), key=lambda x: -x[1])[:5]

    # personal records (fishing)
    records = {"best_weight": None, "best_length": None, "best_species": None}
    fishing_acts = [a for a in acts if a.get("type") == "fishing"]
    for a in fishing_acts:
        w = a.get("weight")
        if w and (records["best_weight"] is None or w > records["best_weight"]):
            records["best_weight"] = w
            records["best_species"] = a.get("species") or "Balık"
        l = a.get("length")
        if l and (records["best_length"] is None or l > records["best_length"]):
            records["best_length"] = l

    post_count = await db.posts.count_documents({"user_id": uid}) if uid else 0

    return {
        "total_activities": len(acts),
        "total_posts": post_count,
        "monthly": monthly_list,
        "type_counts": type_counts,
        "top_locations": [{"name": n, "count": c} for n, c in top_locations],
        "top_species": [{"name": n, "count": c} for n, c in top_species],
        "records": records,
    }


@api_router.get("/")
async def root():
    return {"message": "DoğaAI Platform API v3", "models": {"chat": CHAT_MODEL, "vision": VISION_MODEL}}


# ── Bait Guide ─────────────────────────────────────────────────────────────────

BAIT_DATA = {
    "sazan": {
        "label": "Sazan (Carp)", "water": "fresh",
        "baits": [
            {"name": "Mısır", "icon": "🌽", "type": "Doğal", "seasons": ["ilkbahar","yaz","sonbahar"], "rating": 5, "tip": "En etkili sazan yemi. 2-3 tane iğneye takın."},
            {"name": "Ekmek Hamuru", "icon": "🍞", "type": "Doğal", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 4, "tip": "Sert yoğrulmuş hamur, daha uzun süre suda kalır."},
            {"name": "Solucan", "icon": "🪱", "type": "Doğal", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 4, "tip": "Tüm mevsimlerde işe yarar, özellikle çamurlu sularda."},
            {"name": "Boyle", "icon": "🟤", "type": "Yapay", "seasons": ["yaz","sonbahar"], "rating": 5, "tip": "Protein bazlı yem topu. Sazan için özel karışımlar kullanın."},
            {"name": "Haşlanmış Patates", "icon": "🥔", "type": "Doğal", "seasons": ["yaz","sonbahar"], "rating": 3, "tip": "Az pişmiş, sert olması tercih edilir."},
            {"name": "Pellet", "icon": "🟡", "type": "Hazır", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 4, "tip": "Sazan peletleri hızlı koku yayar."},
        ]
    },
    "levrek": {
        "label": "Levrek (Bass)", "water": "salt",
        "baits": [
            {"name": "Küçük Balık", "icon": "🐟", "type": "Doğal", "seasons": ["yaz","sonbahar"], "rating": 5, "tip": "Hamsi veya istavrit en iyi sonucu verir."},
            {"name": "Karides", "icon": "🦐", "type": "Doğal", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 4, "tip": "Taze veya donmuş karides her mevsim işe yarar."},
            {"name": "Soft Bait", "icon": "🎣", "type": "Yapay", "seasons": ["yaz","sonbahar"], "rating": 5, "tip": "Silikon balık taklitleri çok etkili, yavaş çekim kullanın."},
            {"name": "Popper", "icon": "💧", "type": "Yapay", "seasons": ["yaz"], "rating": 4, "tip": "Sabah erken ve gün batımında yüzeyde büyük patlama yapar."},
            {"name": "Jig", "icon": "⚡", "type": "Yapay", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 4, "tip": "Metal jig, derine çöküşlerde çok etkili."},
            {"name": "Ahtapot Parçası", "icon": "🐙", "type": "Doğal", "seasons": ["ilkbahar","sonbahar","kış"], "rating": 3, "tip": "Özellikle soğuk sezonda koku ile çeker."},
        ]
    },
    "alabalik": {
        "label": "Alabalık (Trout)", "water": "fresh",
        "baits": [
            {"name": "Solucan", "icon": "🪱", "type": "Doğal", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 5, "tip": "Küçük parçalara bölerek kullanın, doğal görünüm önemli."},
            {"name": "Spinner", "icon": "✨", "type": "Yapay", "seasons": ["ilkbahar","yaz","sonbahar"], "rating": 5, "tip": "Parlak metal spinnerlar akan sularda mükemmel çalışır."},
            {"name": "Küçük Minnow", "icon": "🐠", "type": "Yapay", "seasons": ["yaz","sonbahar"], "rating": 4, "tip": "Balık taklidi maşrapa tipi yemler büyük alabalık için ideal."},
            {"name": "Alabalık Pelet", "icon": "🔴", "type": "Hazır", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 4, "tip": "Kırmızı pellet rengi alabalık için çok çekici."},
            {"name": "Mısır Kurdu", "icon": "🐛", "type": "Doğal", "seasons": ["ilkbahar","yaz"], "rating": 4, "tip": "Küçük iğne ile hafifçe takın, doğal salınım sağlayın."},
            {"name": "Flies (Sinek)", "icon": "🪰", "type": "Yapay", "seasons": ["ilkbahar","yaz","sonbahar"], "rating": 5, "tip": "Sinek balıkçılığı (fly fishing) en etkili alabalık yöntemi."},
        ]
    },
    "turna": {
        "label": "Turna (Pike)", "water": "fresh",
        "baits": [
            {"name": "Büyük Spinner", "icon": "🌀", "type": "Yapay", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 5, "tip": "Büyük spinner + tüylü çekim. Turna yüzeyden saldırır."},
            {"name": "Wobbler", "icon": "🐟", "type": "Yapay", "seasons": ["ilkbahar","yaz","sonbahar"], "rating": 5, "tip": "Orta derinlikte yavaş manevralı wobbler çok etkili."},
            {"name": "Canlı Balık", "icon": "🐠", "type": "Doğal", "seasons": ["sonbahar","kış"], "rating": 5, "tip": "İstavrit veya küçük sazan canlı yem olarak kullanılır."},
            {"name": "Rubber Fish", "icon": "🦈", "type": "Yapay", "seasons": ["yaz","sonbahar"], "rating": 4, "tip": "Büyük silikon balık taklidi, derin ağır jig başlı."},
            {"name": "Frog Lure", "icon": "🐸", "type": "Yapay", "seasons": ["yaz"], "rating": 4, "tip": "Yüzey kurbağa taklidi, kamışlık ve su bitkilerinde harika."},
        ]
    },
    "sudak": {
        "label": "Sudak (Zander)", "water": "fresh",
        "baits": [
            {"name": "Twister Jig", "icon": "🌀", "type": "Yapay", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 5, "tip": "Twister kuyruklu silikon, dipte yavaş çekim mükemmel."},
            {"name": "Küçük Balık", "icon": "🐟", "type": "Doğal", "seasons": ["sonbahar","kış"], "rating": 4, "tip": "Küçük canlı balık özellikle soğuk mevsimde çok etkili."},
            {"name": "Shad Lure", "icon": "💨", "type": "Yapay", "seasons": ["yaz","sonbahar"], "rating": 4, "tip": "Shad tipi silikon balık gerçekçi titreşim yapar."},
            {"name": "Metal Jig", "icon": "⚡", "type": "Yapay", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 4, "tip": "Dip yapısının üzerinde dikey jig hareketi deneyin."},
        ]
    },
    "karagoz": {
        "label": "Karagöz (Bream)", "water": "salt",
        "baits": [
            {"name": "Karides", "icon": "🦐", "type": "Doğal", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 5, "tip": "Taze karides en etkili karagöz yemi."},
            {"name": "Midye", "icon": "🦪", "type": "Doğal", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 5, "tip": "Açılmış midye iğneye geçirin, çok güçlü koku yarar."},
            {"name": "Yengeç", "icon": "🦀", "type": "Doğal", "seasons": ["yaz","sonbahar"], "rating": 4, "tip": "Küçük yengeç veya yengeç eti parlak yem."},
            {"name": "Solucan", "icon": "🪱", "type": "Doğal", "seasons": ["ilkbahar","sonbahar"], "rating": 3, "tip": "Tuzlu su solucanı tercih edilir."},
        ]
    },
    "cipura": {
        "label": "Çipura (Sea Bream)", "water": "salt",
        "baits": [
            {"name": "Karides", "icon": "🦐", "type": "Doğal", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 5, "tip": "En çok tercih edilen çipura yemi."},
            {"name": "Sülük", "icon": "🪲", "type": "Doğal", "seasons": ["yaz","sonbahar"], "rating": 4, "tip": "Deniz sülüğü çipura için çok çekici."},
            {"name": "Jig Head Soft", "icon": "🎣", "type": "Yapay", "seasons": ["ilkbahar","yaz","sonbahar"], "rating": 4, "tip": "Küçük silikon yem, hafif jig başı ile dip avı."},
            {"name": "İstiridye Eti", "icon": "🦪", "type": "Doğal", "seasons": ["ilkbahar","yaz"], "rating": 4, "tip": "Küçük parçalar halinde, koku çok güçlü."},
        ]
    },
    "yayın": {
        "label": "Yayın Balığı (Catfish)", "water": "fresh",
        "baits": [
            {"name": "Solucan Demeti", "icon": "🪱", "type": "Doğal", "seasons": ["ilkbahar","yaz","sonbahar","kış"], "rating": 5, "tip": "5-6 solucan birden iğneye takın, büyük koku alanı oluşturur."},
            {"name": "Karaciğer", "icon": "🩸", "type": "Doğal", "seasons": ["yaz","sonbahar"], "rating": 5, "tip": "Tavuk veya sığır karaciğeri çok güçlü koku yayar."},
            {"name": "Büyük Canlı Balık", "icon": "🐟", "type": "Doğal", "seasons": ["yaz","sonbahar"], "rating": 5, "tip": "Küçük sazan veya levrek canlı yem olarak kullanılır."},
            {"name": "Peynir", "icon": "🧀", "type": "Doğal", "seasons": ["yaz"], "rating": 3, "tip": "Kuvvetli kokulu peynir, özellikle gece avında."},
            {"name": "Silikon Balık (Büyük)", "icon": "🦈", "type": "Yapay", "seasons": ["yaz","sonbahar"], "rating": 4, "tip": "25-30 cm büyük silikon, troling veya bottom jig."},
        ]
    },
}

@api_router.get("/moon")
async def get_moon_calendar(year: int = 0, month: int = 0):
    import math
    now = datetime.now(timezone.utc)
    y = year  or now.year
    m = month or now.month

    def moon_phase(date: datetime) -> float:
        """Return moon age in days (0=new, 7.4=first quarter, 14.8=full, 22.1=last quarter, 29.5=new)"""
        d = date
        c = 0.0
        e = d.day
        jd = 367*d.year - int(7*(d.year+int((d.month+9)/12))/4) + int(275*d.month/9) + e + 1721013.5
        jd += (d.hour + d.minute/60.0) / 24.0
        k = math.floor((d.year - 1900) * 12.3685)
        t = k / 1236.85
        t2 = t * t
        t3 = t2 * t
        j0 = 2415020.75933 + 29.53058868*k + 0.0001178*t2 - 0.000000155*t3
        j0 += 0.00033 * math.sin(math.radians(166.56 + 132.87*t - 0.009173*t2))
        m0 = 359.2242 + 29.10535608*k - 0.0000333*t2 - 0.00000347*t3
        m1 = 306.0253 + 385.81691806*k + 0.0107306*t2 + 0.00001236*t3
        a  = 21.2964 + 390.67050646*k - 0.0016528*t2 - 0.00000239*t3
        m0 = m0 % 360; m1 = m1 % 360; a = a % 360
        f  = (0.1734 - 0.000393*t)*math.sin(math.radians(m0)) + 0.0021*math.sin(math.radians(2*m0))
        f -= 0.4068*math.sin(math.radians(m1)) + 0.0161*math.sin(math.radians(2*m1)) - 0.0004*math.sin(math.radians(3*m1))
        f += 0.0104*math.sin(math.radians(2*a)) - 0.0051*math.sin(math.radians(m0+m1))
        f -= 0.0074*math.sin(math.radians(m0-m1)) + 0.0004*math.sin(math.radians(2*a+m0))
        f -= 0.0004*math.sin(math.radians(2*a-m0)) - 0.0006*math.sin(math.radians(2*a+m1))
        f += 0.0010*math.sin(math.radians(2*a-m1)) + 0.0005*math.sin(math.radians(m0+2*m1))
        phase_jd = j0 + f
        age = (jd - phase_jd) % 29.530588
        return round(age, 2)

    def phase_info(age: float):
        if age < 1.85:   return {"name": "Yeni Ay",       "icon": "🌑", "score": 3}
        if age < 7.38:   return {"name": "Hilal",         "icon": "🌒", "score": 5}
        if age < 9.22:   return {"name": "İlk Dördün",   "icon": "🌓", "score": 8}
        if age < 12.91:  return {"name": "Şişen Ay",     "icon": "🌔", "score": 9}
        if age < 16.61:  return {"name": "Dolunay",      "icon": "🌕", "score": 10}
        if age < 20.30:  return {"name": "Azalan Ay",    "icon": "🌖", "score": 8}
        if age < 23.22:  return {"name": "Son Dördün",   "icon": "🌗", "score": 7}
        if age < 27.68:  return {"name": "Yaşlı Hilal",  "icon": "🌘", "score": 4}
        return {"name": "Yeni Ay", "icon": "🌑", "score": 3}

    import calendar
    days_in_month = calendar.monthrange(y, m)[1]
    result = []
    for day in range(1, days_in_month + 1):
        d = datetime(y, m, day, 12, 0, tzinfo=timezone.utc)
        age = moon_phase(d)
        pi  = phase_info(age)
        result.append({"day": day, "weekday": d.strftime("%a"), "age": age, **pi})

    today_day = now.day if (now.year == y and now.month == m) else None
    return {"year": y, "month": m, "month_name": datetime(y,m,1).strftime("%B"), "days": result, "today": today_day}


@api_router.get("/daily-briefing")
async def get_daily_briefing(lat: float = 41.0, lng: float = 29.0, activity: str = "fishing"):
    import math, calendar

    now = datetime.now(timezone.utc)

    # Moon phase
    def moon_age(d):
        y, m, day = d.year, d.month, d.day
        jd = 367*y - int(7*(y+int((m+9)/12))/4) + int(275*m/9) + day + 1721013.5
        k = math.floor((y - 1900) * 12.3685)
        j0 = 2415020.75933 + 29.53058868*k
        return (jd - j0) % 29.530588

    age = moon_age(now)
    if age < 1.85:   moon_name, moon_icon, moon_score = "Yeni Ay", "🌑", 3
    elif age < 9.22: moon_name, moon_icon, moon_score = "İlk Dördün", "🌓", 7
    elif age < 16.61: moon_name, moon_icon, moon_score = "Dolunay", "🌕", 10
    elif age < 23.22: moon_name, moon_icon, moon_score = "Son Dördün", "🌗", 7
    else:             moon_name, moon_icon, moon_score = "Yeni Ay Öncesi", "🌘", 4

    # Season
    month = now.month
    seasons = {
        (12,1,2): ("Kış","❄️","fishing"),
        (3,4,5):  ("İlkbahar","🌸","all"),
        (6,7,8):  ("Yaz","☀️","fishing"),
        (9,10,11):("Sonbahar","🍂","all"),
    }
    season_name, season_icon = "İlkbahar", "🌸"
    for months, (sname, sicon, _) in seasons.items():
        if month in months:
            season_name, season_icon = sname, sicon

    w = await _fetch_open_meteo(lat, lng)
    temp = w["temp"]
    wind = w["wind"]
    conditions = w["condition"]
    # Derive weather score from actual conditions
    code = w.get("code", 0)
    if code == 0:   weather_score = 95
    elif code <= 2: weather_score = 85
    elif code == 3: weather_score = 70
    elif code < 50: weather_score = 60
    elif code < 70: weather_score = 45
    elif code < 80: weather_score = 35
    else:           weather_score = 30
    # Penalise high wind
    if wind > 30: weather_score = max(10, weather_score - 25)
    elif wind > 20: weather_score = max(15, weather_score - 10)

    # Best time window
    if moon_score >= 9:
        best_time = "Gece yarısı ve şafak — Dolunay aktif av zamanı"
    elif now.hour < 10:
        best_time = "Sabah erken saatler en verimli pencere"
    else:
        best_time = "Akşam saat 17-20 arası gün kapanışı"

    # AI briefing
    overall_score = round((moon_score * 0.3 + weather_score * 0.7), 0)
    score_label = "Mükemmel" if overall_score >= 85 else "İyi" if overall_score >= 65 else "Orta" if overall_score >= 45 else "Düşük"

    try:
        prompt = (
            f"Türkçe olarak kısa bir balıkçılık sabah brifingisi yaz (3-4 cümle). "
            f"Bugünün koşulları: {season_name}, {conditions}, {temp}°C, rüzgar {wind}km/h, "
            f"ay fazı: {moon_name}, genel skor: {int(overall_score)}/100. "
            f"Pratik tavsiye ver, emoji kullan, samimi ve motive edici ol."
        )
        resp = await nvidia.chat.completions.create(
            model=os.environ.get("FAST_MODEL", "meta/llama-3.1-8b-instruct"),
            messages=[{"role":"user","content":prompt}],
            max_tokens=200, temperature=0.7,
        )
        ai_text = resp.choices[0].message.content.strip()
    except Exception:
        ai_text = (
            f"Bugün {season_name} koşullarında {conditions} hava, {moon_name} ile "
            f"balıkçılık {score_label.lower()} görünüyor. "
            f"Sabah erken veya akşam saatlerinde rotanıza çıkmanızı öneririz. "
            f"Skor {int(overall_score)}/100 — iyi avlar! 🎣"
        )

    return {
        "date": now.strftime("%d %B %Y"),
        "overall_score": int(overall_score),
        "score_label": score_label,
        "moon": {"name": moon_name, "icon": moon_icon, "score": moon_score, "age": round(age, 1)},
        "weather": {"score": weather_score, "condition": conditions, "temp": temp, "wind": int(wind)},
        "season": {"name": season_name, "icon": season_icon},
        "best_time": best_time,
        "ai_briefing": ai_text,
    }


@api_router.get("/hava")
async def get_hava(lat: float = 41.01, lng: float = 28.95):
    """Current weather via Open-Meteo (Istanbul default)."""
    w = await _fetch_open_meteo(lat, lng)
    code = w.get("code", 0)
    if code == 0:   score = 95
    elif code <= 2: score = 85
    elif code == 3: score = 70
    elif code < 50: score = 60
    elif code < 70: score = 45
    elif code < 80: score = 35
    else:           score = 30
    wind = w["wind"]
    if wind > 30: score = max(10, score - 25)
    elif wind > 20: score = max(15, score - 10)
    return {
        "temp": w["temp"],
        "humidity": w["humidity"],
        "wind_speed": w["wind"],
        "pressure": w["pressure"],
        "condition": w["condition"],
        "code": w["code"],
        "activity_score": score,
    }


@api_router.get("/sunrise")
async def get_sunrise(lat: float = 41.01, lng: float = 28.95):
    """Sunrise / sunset times via Sunrise-Sunset API."""
    try:
        url = f"https://api.sunrise-sunset.org/json?lat={lat}&lng={lng}&formatted=0"
        async with httpx.AsyncClient(verify=_verify, timeout=8) as client:
            resp = await client.get(url)
            if resp.status_code == 200:
                data = resp.json().get("results", {})
                return {
                    "sunrise": data.get("sunrise"),
                    "sunset": data.get("sunset"),
                    "solar_noon": data.get("solar_noon"),
                    "day_length": data.get("day_length"),
                    "civil_twilight_begin": data.get("civil_twilight_begin"),
                    "civil_twilight_end": data.get("civil_twilight_end"),
                    "status": "ok",
                }
    except Exception:
        pass
    return {"sunrise": None, "sunset": None, "status": "unavailable"}


@api_router.get("/gear-selector")
async def get_gear_selector(species: str = "levrek", method: str = "spinning", location: str = "kıyı"):
    gear_db = {
        "levrek": {
            "spinning": {
                "rod":    {"model": "Spinning Kamışı 2.7-3.0m", "action": "Medium-Fast", "power": "ML-M", "tip": "7-25g atış için ideal"},
                "reel":   {"model": "Spinning Makara 2500-3000", "gear": "5.2:1", "drag": "8kg", "tip": "Hafif ama güçlü çekim"},
                "line":   {"main": "0.20mm Mono veya 0.8 PE Örgülü", "leader": "0.30mm Fluorocarbon 50-80cm", "tip": "Şeffaf lider gizliliği artırır"},
                "hook":   {"size": "#2 – #1/0", "type": "Treble veya Single", "tip": "Keskin uç çok önemli"},
                "lure":   ["Soft bait 7-12cm", "Minnow 8-12cm", "Popper 8-10cm"],
            },
            "bottom": {
                "rod":    {"model": "Bottom Kamışı 2.7-3.6m", "action": "Medium", "power": "M-MH", "tip": "Sert dip yapıları için"},
                "reel":   {"model": "Multiplier Makara 6000", "gear": "4.7:1", "drag": "12kg", "tip": "Uzun atış ve güçlü çekim"},
                "line":   {"main": "0.30mm Mono", "leader": "0.40mm Mono 60cm", "tip": "Dip sürtünmesi için kalın misina"},
                "hook":   {"size": "#1/0 – #3/0", "type": "Circle veya Octopus", "tip": "Circle hook daha az yutulur"},
                "lure":   ["Karides", "Küçük balık", "Sülük"],
            },
        },
        "sazan": {
            "bottom": {
                "rod":    {"model": "Karp Kamışı 3.6-3.9m", "action": "Through Action", "power": "3.5lb TC", "tip": "Uzun atış ve karp güçlüdür"},
                "reel":   {"model": "Baitrunner Makara 8000", "gear": "4.5:1", "drag": "12kg", "tip": "Free spool modu zorunlu"},
                "line":   {"main": "0.35-0.40mm Mono", "leader": "Tungsten coated 30cm", "tip": "Dip ağırlığı tungsten tercih"},
                "hook":   {"size": "#4 – #8", "type": "Karp iğnesi (Boilies)", "tip": "Ağırlıklı bait kullanımı"},
                "lure":   ["Boilies", "Corn", "Method feeder mixi"],
            },
        },
        "alabalik": {
            "spinning": {
                "rod":    {"model": "Trout Kamışı 2.1-2.4m", "action": "Fast", "power": "UL-L", "tip": "Hassas atış için hafif"},
                "reel":   {"model": "Spinning Makara 1000-2000", "gear": "6.0:1", "drag": "4kg", "tip": "Hızlı geri sarma şart"},
                "line":   {"main": "0.14-0.18mm Mono veya 0.6 PE", "leader": "0.18mm Fluorocarbon 40cm", "tip": "İnce misina = daha çok vuruş"},
                "hook":   {"size": "#8 – #14", "type": "Single Barbless", "tip": "Barbless hook ile serbest bırakma kolaylaşır"},
                "lure":   ["Spinner #0-1", "Minnow 4-6cm", "Spoon 3-7g"],
            },
            "fly": {
                "rod":    {"model": "Fly Rod 2.7-3.0m #4-6", "action": "Medium-Fast", "power": "#4-6 line", "tip": "Akışlı su için kısa kamış"},
                "reel":   {"model": "Fly Makara #4-6", "gear": "Manuel", "drag": "2kg", "tip": "Hafif ve dengeli"},
                "line":   {"main": "#5 WF Fly Line", "leader": "7.5ft 4X Tapered", "tip": "Flaoting line çoğu durumda yeterli"},
                "hook":   {"size": "#10 – #18", "type": "Dry/Wet/Nymph Fly", "tip": "Yerel böcek türlere uygun sinek seçin"},
                "lure":   ["Dry Fly", "Nymph", "Streamer"],
            },
        },
        "turna": {
            "spinning": {
                "rod":    {"model": "Pike Kamışı 2.4-2.7m", "action": "Fast", "power": "MH-H", "tip": "Büyük yemler için güçlü"},
                "reel":   {"model": "Spinning Makara 4000-5000", "gear": "5.5:1", "drag": "10kg", "tip": "Turna güçlü koşar"},
                "line":   {"main": "0.8-1.0 PE Örgülü", "leader": "30-40cm Wire/Çelik Lider", "tip": "Çelik lider zorunlu — turna keser"},
                "hook":   {"size": "#1/0 – #4/0", "type": "Treble Hook (wired)", "tip": "Büyük yemler için büyük iğne"},
                "lure":   ["Büyük wobbler 12-20cm", "Rubber fish 15-25cm", "Popper 12cm"],
            },
        },
        "sudak": {
            "spinning": {
                "rod":    {"model": "Jig Kamışı 2.4-2.7m", "action": "Fast-Extra Fast", "power": "ML-M", "tip": "Dip hissiyatı çok önemli"},
                "reel":   {"model": "Spinning Makara 2500-4000", "gear": "6.2:1", "drag": "8kg", "tip": "Hızlı çekim için yüksek dişli"},
                "line":   {"main": "0.6-0.8 PE Örgülü", "leader": "0.35mm Fluorocarbon 50-80cm", "tip": "Örgülü = dip hissi, fluoro = gizlilik"},
                "hook":   {"size": "#2 – #2/0", "type": "Jig Head 10-20g", "tip": "Ağır jig dipte tutar"},
                "lure":   ["Twister 7-12cm", "Shad 8-12cm", "Metal jig 15-30g"],
            },
        },
    }

    sp_data = gear_db.get(species, gear_db["levrek"])
    method_data = sp_data.get(method, list(sp_data.values())[0])

    general_tips = {
        "kıyı": "Kıyı balıkçılığında taşlık ve kayalık zemin iğne ve uçkucu kaybını artırır. Ekstra yem ve parça bulundurun.",
        "tekne": "Teknede derinlik ölçer kullanın. Dip yapısını bilmek yem seçimini belirler.",
        "göl": "Göl sularında gün doğumu ve batımı en aktif saatlerdir. Rüzgar yönüne dikkat edin.",
        "dere": "Derelerde yukarı akışa atış yapın, yemin doğal sürüklenmesine izin verin.",
    }

    return {
        "species": species,
        "method": method,
        "location": location,
        "gear": method_data,
        "tip": general_tips.get(location, general_tips["kıyı"]),
        "available_methods": list(sp_data.keys()),
    }


@api_router.get("/bait-guide")
async def get_bait_guide(species: str = "sazan", season: str = ""):
    data = BAIT_DATA.get(species)
    if not data:
        raise HTTPException(404, "Species not found")
    baits = data["baits"]
    if season:
        baits = [b for b in baits if not season or season in b["seasons"]]
    return {
        "species": species,
        "label": data["label"],
        "water": data["water"],
        "baits": baits,
        "all_species": [{"id": k, "label": v["label"], "water": v["water"]} for k, v in BAIT_DATA.items()],
    }


# ── App setup ──────────────────────────────────────────────────────────────────

app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await seed_initial_data()
    logger.info("DoğaAI API v3 started — NVIDIA NIM powered")


@app.on_event("shutdown")
async def shutdown():
    _mongo_client.close()
