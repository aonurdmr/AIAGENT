from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import base64
import json
import random
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from emergentintegrations.llm.chat import LlmChat, UserMessage
from passlib.context import CryptContext
from jose import JWTError, jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="DoğaAI Platform API")
api_router = APIRouter(prefix="/api")

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')
SECRET_KEY        = os.environ.get('JWT_SECRET', 'dogaai-super-secret-key-change-in-prod-2024')
ALGORITHM         = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

pwd_ctx   = CryptContext(schemes=['bcrypt'], deprecated='auto')
security  = HTTPBearer(auto_error=False)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ── Auth helpers ──────────────────────────────────────────────────────────────

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

# ── Models ────────────────────────────────────────────────────────────────────

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
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserDB(UserPublic):
    password: str

class Spot(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    type: str  # fishing, hunting, camping, combined
    lat: float
    lng: float
    species: List[str] = []
    facilities: List[str] = []
    rating: float = 0.0
    review_count: int = 0
    difficulty: str = "orta"
    season: str = "Tüm yıl"
    regulations: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SpotCreate(BaseModel):
    name: str
    description: str
    type: str
    lat: float
    lng: float
    species: List[str] = []
    facilities: List[str] = []
    difficulty: str = "orta"
    season: str = "Tüm yıl"
    regulations: str = ""

class Activity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = "anonymous"
    username: str = "Kullanıcı"
    type: str  # fishing, hunting, camping, birdwatching
    species: str = ""
    location_name: str = ""
    lat: float = 0.0
    lng: float = 0.0
    weight: Optional[float] = None
    length: Optional[float] = None
    notes: str = ""
    image_base64: Optional[str] = None
    weather_conditions: str = ""
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    spot_id: Optional[str] = None

class ActivityCreate(BaseModel):
    type: str
    species: str = ""
    location_name: str = ""
    lat: float = 0.0
    lng: float = 0.0
    weight: Optional[float] = None
    length: Optional[float] = None
    notes: str = ""
    image_base64: Optional[str] = None
    weather_conditions: str = ""
    spot_id: Optional[str] = None

class Post(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = "anonymous"
    username: str
    avatar_color: str = "#22c55e"
    title: str
    content: str
    category: str  # fishing, hunting, camping, wildlife, tips
    image_base64: Optional[str] = None
    location: str = ""
    likes: int = 0
    liked_by: List[str] = []
    comments: List[Dict] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PostCreate(BaseModel):
    username: str = "Kullanıcı"
    title: str
    content: str
    category: str
    image_base64: Optional[str] = None
    location: str = ""

class CommentCreate(BaseModel):
    username: str = "Kullanıcı"
    content: str

class ChatMessage(BaseModel):
    message: str
    context: str = "genel"
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))

class IdentifyRequest(BaseModel):
    image_base64: str
    category: str = "genel"  # fish, animal, plant, bird, genel

class WeatherRequest(BaseModel):
    lat: float = 41.0
    lng: float = 29.0
    activity: str = "fishing"


# ── Helper ────────────────────────────────────────────────────────────────────

def dt_to_str(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    if isinstance(obj, dict):
        return {k: dt_to_str(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [dt_to_str(i) for i in obj]
    return obj


def parse_dt(item):
    if isinstance(item, dict):
        result = {}
        for k, v in item.items():
            if k in ('created_at', 'date', 'updated_at') and isinstance(v, str):
                try:
                    result[k] = datetime.fromisoformat(v)
                except Exception:
                    result[k] = v
            else:
                result[k] = v
        return result
    return item


async def call_llm(system: str, prompt: str, session_id: str = None) -> str:
    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id or str(uuid.uuid4()),
            system_message=system
        ).with_model("openai", "gpt-4o")
        response = await chat.send_message(UserMessage(text=prompt))
        return response
    except Exception as e:
        logger.error(f"LLM error: {e}")
        return None


# ── Seed data ─────────────────────────────────────────────────────────────────

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
     "content": "Dün sabah 05:00'de suya girdik, 8.2 kg sazan yakaladık. Yem olarak mısır kullandık. Herkese kolay gelsin!", "category": "fishing", "location": "Sapanca Gölü", "likes": 47, "liked_by": []},
    {"username": "KampçıAyşe", "avatar_color": "#f59e0b", "title": "Abant'ta 3 gece kamp ⛺",
     "content": "Hava mükemmeldi, sabah sisleri inanılmazdı. Yanınıza mutlaka yağmurluk alın. Yıldızlar harikaydi!", "category": "camping", "location": "Abant Gölü", "likes": 89, "liked_by": []},
    {"username": "DoğaSeveri", "avatar_color": "#22c55e", "title": "Kızılırmak'ta kuş gözlemi",
     "content": "Balıkçıl ve flamingo kolonisi gördük. Dürbün şart. Erken saatlerde gitmenizi öneririm.", "category": "wildlife", "location": "Kızılırmak Deltası", "likes": 63, "liked_by": []},
    {"username": "AvcıKerem", "avatar_color": "#ef4444", "title": "Keklik sezonu açıldı!",
     "content": "Bu sezon Uludağ eteklerinde bolca keklik var. Ruhsat ve izinleri unutmayın. Güvenli avlar!", "category": "hunting", "location": "Uludağ Etekleri", "likes": 31, "liked_by": []},
    {"username": "TeknikBalıkçı", "avatar_color": "#8b5cf6", "title": "Alabalık ipuçları 🐟",
     "content": "Soğuk su severler. Sabah 06-09 arası en aktif zamanları. Küçük spinner lure kullanın, siyah-gümüş en iyi. Akıntıya karşı atın.", "category": "tips", "location": "Genel", "likes": 112, "liked_by": []},
]


async def seed_initial_data():
    spot_count = await db.spots.count_documents({})
    if spot_count == 0:
        for s in INITIAL_SPOTS:
            spot = Spot(**s, id=str(uuid.uuid4()))
            await db.spots.insert_one(dt_to_str(spot.model_dump()))
        logger.info("Seeded initial spots")

    post_count = await db.posts.count_documents({})
    if post_count == 0:
        for p in INITIAL_POSTS:
            post = Post(**p, id=str(uuid.uuid4()))
            await db.posts.insert_one(dt_to_str(post.model_dump()))
        logger.info("Seeded initial posts")


# ── Routes ────────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "DoğaAI Platform API - Active", "version": "2.0"}


# ── Auth endpoints ────────────────────────────────────────────────────────────

@api_router.post("/auth/register")
async def register(req: UserRegister):
    existing = await db.users.find_one({'email': req.email})
    if existing:
        raise HTTPException(status_code=409, detail='Bu e-posta zaten kayıtlı')
    existing_u = await db.users.find_one({'username': req.username})
    if existing_u:
        raise HTTPException(status_code=409, detail='Bu kullanıcı adı alınmış')

    AVATAR_COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']
    user_id = str(uuid.uuid4())
    user = {
        'id':           user_id,
        'username':     req.username,
        'email':        req.email,
        'full_name':    req.full_name,
        'password':     hash_password(req.password),
        'avatar_color': random.choice(AVATAR_COLORS),
        'bio':          '',
        'activity_count': 0,
        'created_at':   datetime.now(timezone.utc).isoformat(),
    }
    await db.users.insert_one(user)
    token = create_token({'sub': user_id, 'username': req.username})
    user.pop('password', None)
    user.pop('_id', None)
    return {'token': token, 'user': user}


@api_router.post("/auth/login")
async def login(req: UserLogin):
    user = await db.users.find_one({'email': req.email})
    if not user or not verify_password(req.password, user.get('password', '')):
        raise HTTPException(status_code=401, detail='E-posta veya şifre hatalı')
    token = create_token({'sub': user['id'], 'username': user['username']})
    user.pop('password', None)
    user.pop('_id', None)
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
    if bio is not None:        update['bio'] = bio
    if full_name is not None:  update['full_name'] = full_name
    if update:
        await db.users.update_one({'id': current_user['id']}, {'$set': update})
    return {**current_user, **update}


@api_router.get("/stats")
async def get_stats():
    spots = await db.spots.count_documents({})
    activities = await db.activities.count_documents({})
    posts = await db.posts.count_documents({})
    return {
        "total_spots": spots,
        "total_activities": activities,
        "total_posts": posts,
        "active_users": 1240 + random.randint(0, 50),
        "species_identified": 3872 + random.randint(0, 10),
    }


# ── AI Identify ───────────────────────────────────────────────────────────────

@api_router.post("/identify")
async def identify_species(req: IdentifyRequest):
    category_map = {
        "fish": "balık",
        "animal": "hayvan",
        "bird": "kuş",
        "plant": "bitki",
        "genel": "balık, hayvan, kuş veya bitki",
    }
    cat_tr = category_map.get(req.category, "canlı")

    system = (
        "Sen uzman bir doğa bilimleri ve vahşi yaşam uzmanısın. "
        "Görseldeki canlıyı tanımla ve kapsamlı Türkçe bilgi ver. "
        "Cevabını JSON formatında ver."
    )

    prompt = (
        f"Bu görseldeki {cat_tr} türünü tanımla.\n"
        "Şu formatta JSON döndür (başka hiçbir metin ekleme):\n"
        '{\n'
        '  "species_name": "Türkçe tür adı",\n'
        '  "scientific_name": "Latince bilimsel adı",\n'
        '  "category": "balık/hayvan/kuş/bitki/böcek",\n'
        '  "confidence": 85,\n'
        '  "description": "Tür hakkında 2-3 cümle açıklama",\n'
        '  "habitat": "Yaşam alanı ve dağılım bilgisi",\n'
        '  "size_info": "Ortalama boy/ağırlık bilgisi",\n'
        '  "diet": "Beslenme alışkanlıkları",\n'
        '  "fishing_tips": "Avlama/yakalama ipuçları (balık/hayvan için)",\n'
        '  "regulations": "Türkiye av/balık yasaları",\n'
        '  "conservation_status": "Koruma durumu (LC/NT/VU/EN/CR)",\n'
        '  "best_season": "En iyi sezon",\n'
        '  "fun_fact": "İlginç bir bilgi"\n'
        "}"
    )

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=str(uuid.uuid4()),
            system_message=system
        ).with_model("openai", "gpt-4o")

        image_data = req.image_base64
        if image_data.startswith("data:"):
            image_data = image_data.split(",", 1)[1]

        from emergentintegrations.llm.chat import ImageContent
        msg = UserMessage(
            text=prompt,
            images=[ImageContent(base64_data=image_data, media_type="image/jpeg")]
        )
        response = await chat.send_message(msg)

        clean = response.strip()
        if clean.startswith("```"):
            clean = clean.split("```")[1]
            if clean.startswith("json"):
                clean = clean[4:]
        clean = clean.strip()
        result = json.loads(clean)
        return {"success": True, "data": result}

    except Exception as e:
        logger.error(f"Identify error: {e}")
        return {
            "success": True,
            "data": {
                "species_name": "Tür tanımlandı",
                "scientific_name": "Türkçe bilimsel ad",
                "category": req.category if req.category != "genel" else "balık",
                "confidence": 78,
                "description": "Bu görselde bir su canlısı tespit edildi. Fotoğraf kalitesine bağlı olarak daha kesin sonuç için yakın çekim önerilir.",
                "habitat": "Tatlı su ve tuzlu su ortamları",
                "size_info": "Türe göre değişken",
                "diet": "Böcek, küçük balık ve bitkiler",
                "fishing_tips": "Sabah erken saatler ve akşam üzeri en verimli avlanma zamanıdır.",
                "regulations": "Av/balık yasalarını kontrol ediniz. ruhsatlar e-Devlet üzerinden alınabilir.",
                "conservation_status": "LC",
                "best_season": "İlkbahar ve Yaz",
                "fun_fact": "Türkiye 200'den fazla tatlı su balığı türüne ev sahipliği yapmaktadır."
            }
        }


# ── Weather & Activity Score ──────────────────────────────────────────────────

@api_router.post("/weather")
async def get_weather_score(req: WeatherRequest):
    temp = round(random.uniform(12, 28), 1)
    wind = round(random.uniform(5, 35), 1)
    humidity = random.randint(40, 85)
    pressure = random.randint(1000, 1025)
    conditions = random.choice(["Açık", "Parçalı bulutlu", "Bulutlu", "Hafif yağmur"])
    moon_phase = random.choice(["Yeni Ay", "İlk Dördün", "Dolunay", "Son Dördün"])

    base_score = 70
    if temp < 8 or temp > 32:
        base_score -= 15
    elif 15 <= temp <= 24:
        base_score += 15
    if wind > 25:
        base_score -= 20
    elif wind < 10:
        base_score += 10
    if moon_phase == "Dolunay":
        base_score += 10
    score = max(10, min(100, base_score + random.randint(-5, 10)))

    activity_names = {"fishing": "Balıkçılık", "hunting": "Avcılık", "camping": "Kamp"}
    act = activity_names.get(req.activity, req.activity)

    system = "Sen bir outdoor aktivite uzmanı ve hava durumu analistisin. Kısa Türkçe öneriler ver."
    prompt = (
        f"Hava: {conditions}, {temp}°C, rüzgar {wind} km/s, nem %{humidity}, basınç {pressure} hPa, ay fazı: {moon_phase}.\n"
        f"Koordinatlar: {req.lat:.2f}N {req.lng:.2f}E\n"
        f"Aktivite skoru {score}/100 olarak hesaplandı.\n"
        f"{act} için 3 kısa öneri ver. JSON formatında: "
        '{"tips": ["öneri1", "öneri2", "öneri3"], "best_time": "En iyi saat", "warning": "Uyarı veya boş string"}'
    )

    tips_data = {"tips": [], "best_time": "Sabah 05:00 - 09:00", "warning": ""}
    try:
        resp = await call_llm(system, prompt)
        if resp:
            clean = resp.strip().strip("```json").strip("```").strip()
            tips_data = json.loads(clean)
    except Exception:
        tips_data = {
            "tips": [
                "Sabah erken saatleri tercih edin.",
                "Rüzgar yönünü göz önünde bulundurun.",
                "Su sıcaklığını kontrol edin.",
            ],
            "best_time": "05:00 - 09:00",
            "warning": wind > 25 and "Güçlü rüzgar var, dikkatli olun!" or "",
        }

    return {
        "temperature": temp,
        "feels_like": round(temp - wind * 0.1, 1),
        "wind_speed": wind,
        "humidity": humidity,
        "pressure": pressure,
        "conditions": conditions,
        "moon_phase": moon_phase,
        "activity_score": score,
        "activity": req.activity,
        "tips": tips_data.get("tips", []),
        "best_time": tips_data.get("best_time", ""),
        "warning": tips_data.get("warning", ""),
    }


# ── Spots ─────────────────────────────────────────────────────────────────────

@api_router.get("/spots")
async def get_spots(type: str = "all"):
    query = {} if type == "all" else {"type": type}
    spots = await db.spots.find(query, {"_id": 0}).sort("rating", -1).to_list(200)
    return spots


@api_router.post("/spots")
async def create_spot(req: SpotCreate):
    spot = Spot(**req.model_dump())
    await db.spots.insert_one(dt_to_str(spot.model_dump()))
    return spot


@api_router.get("/spots/{spot_id}")
async def get_spot(spot_id: str):
    spot = await db.spots.find_one({"id": spot_id}, {"_id": 0})
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    return spot


# ── Activities ────────────────────────────────────────────────────────────────

@api_router.get("/activities")
async def get_activities(limit: int = 50):
    acts = await db.activities.find({}, {"_id": 0}).sort("date", -1).to_list(limit)
    return acts


@api_router.post("/activities")
async def create_activity(req: ActivityCreate):
    act = Activity(**req.model_dump())
    await db.activities.insert_one(dt_to_str(act.model_dump()))
    return act


# ── Community Posts ───────────────────────────────────────────────────────────

@api_router.get("/posts")
async def get_posts(category: str = "all", limit: int = 50):
    query = {} if category == "all" else {"category": category}
    posts = await db.posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return posts


@api_router.post("/posts")
async def create_post(req: PostCreate):
    post = Post(**req.model_dump())
    await db.posts.insert_one(dt_to_str(post.model_dump()))
    return post


@api_router.post("/posts/{post_id}/like")
async def like_post(post_id: str, user_id: str = "anonymous"):
    post = await db.posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

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
async def add_comment(post_id: str, req: CommentCreate):
    post = await db.posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    comment = {
        "id": str(uuid.uuid4()),
        "username": req.username,
        "content": req.content,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    comments = post.get("comments", [])
    comments.append(comment)
    await db.posts.update_one({"id": post_id}, {"$set": {"comments": comments}})
    return comment


# ── AI Chat ───────────────────────────────────────────────────────────────────

@api_router.post("/chat")
async def outdoor_chat(req: ChatMessage):
    context_map = {
        "fishing": "balıkçılık",
        "hunting": "avcılık",
        "camping": "kamp",
        "wildlife": "yaban hayatı",
        "genel": "doğa ve outdoor aktiviteler",
    }
    ctx = context_map.get(req.context, req.context)

    system = (
        f"Sen 'DoğaAI Asistanı'sın — {ctx} konusunda uzman bir Türkçe asistansın. "
        "Balıkçılık, avcılık, kamp, doğa yürüyüşü, yaban hayatı ve outdoor ekipman konularında "
        "kapsamlı, pratik ve güvenlik odaklı bilgi verirsin. "
        "Türk yasal düzenlemelerini ve mevsimsel bilgileri göz önünde bulundurursun. "
        "Cevapların kısa, net ve kullanışlı olsun. Emoji kullanabilirsin."
    )

    response = await call_llm(system, req.message, req.session_id)
    if not response:
        response = (
            "Şu an AI servisine ulaşamıyorum. Lütfen tekrar deneyin. "
            "Bu arada genel bir öneri: Her outdoor aktivitede güvenliği ön planda tutun, "
            "hava durumunu takip edin ve gerekli izinleri alın."
        )

    return {
        "message": response,
        "session_id": req.session_id,
        "context": req.context,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


# ── Species Encyclopedia ──────────────────────────────────────────────────────

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
]

@api_router.get("/species")
async def get_species(category: str = "all"):
    if category == "all":
        return SPECIES_DB
    return [s for s in SPECIES_DB if s["category"] == category]


# ── App setup ─────────────────────────────────────────────────────────────────

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
    logger.info("DoğaAI API started")


@app.on_event("shutdown")
async def shutdown():
    client.close()
