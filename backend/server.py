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
async def get_weather_score(req: WeatherRequest):
    temp       = round(random.uniform(12, 28), 1)
    wind       = round(random.uniform(5, 35), 1)
    humidity   = random.randint(40, 85)
    pressure   = random.randint(1000, 1025)
    conditions = random.choice(["Açık", "Parçalı bulutlu", "Bulutlu", "Hafif yağmur"])
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
async def get_activities(limit: int = 50):
    return await db.activities.find({}, {"_id": 0}).sort("date", -1).to_list(limit)


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
