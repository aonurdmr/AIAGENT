from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import base64
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage
from openai import AsyncOpenAI

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize LLM integrations
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
NVIDIA_API_KEY = os.environ.get('NVIDIA_API_KEY')
GROQ_API_KEY = os.environ.get('GROQ_API_KEY')

nvidia_client = AsyncOpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=NVIDIA_API_KEY,
) if NVIDIA_API_KEY else None

groq_client = AsyncOpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=GROQ_API_KEY,
) if GROQ_API_KEY else None

# Groq model per agent — reasoning agents get DeepSeek R1, rest get Llama 3.3 70B
GROQ_AGENT_MODELS = {
    "research": "deepseek-r1-distill-llama-70b",
    "report":   "deepseek-r1-distill-llama-70b",
    "memory":   "deepseek-r1-distill-llama-70b",
    "code":     "llama-3.3-70b-versatile",
    "cost":     "llama-3.3-70b-versatile",
    "design":   "llama-3.3-70b-versatile",
    "content":  "llama-3.3-70b-versatile",
    "planner":  "llama-3.3-70b-versatile",
    "publisher":"llama-3.3-70b-versatile",
    "growth":   "llama-3.3-70b-versatile",
    "safety":   "llama-3.3-70b-versatile",
}

NVIDIA_IMAGE_MODEL = "stability/stable-diffusion-xl"

# Agent Configuration
AGENTS_CONFIG = {
    "research": {
        "name": "Research Agent",
        "role": "Araştırmacı",
        "system_message": "Sen bir araştırmacı ajansın. Web araştırması, trend analizi, rakip incelemesi ve veri toplama konularında uzmanısın.",
        "capabilities": ["Web araştırma", "Trend/SEO analizi", "Rakip inceleme", "Veri toplama"]
    },
    "design": {
        "name": "Design Agent", 
        "role": "Tasarımcı",
        "system_message": "Sen bir tasarımcı ajansın. Görsel üretim, tasarım önerileri ve yaratıcı içerik oluşturma konularında uzmanısın.",
        "capabilities": ["DALL-E/Midjourney görsel üretim", "Post & Story şablonları", "Canva entegrasyonu"]
    },
    "content": {
        "name": "Content Agent",
        "role": "İçerik Üretici", 
        "system_message": "Sen bir içerik üretim uzmanısın. Metin yazma, başlık oluşturma ve çok dilli içerik üretimi konularında uzmanısın.",
        "capabilities": ["Metin yazma", "Başlık & hashtag setleri", "Çok dilli içerik üretimi"]
    },
    "code": {
        "name": "Code Agent",
        "role": "Yazılımcı",
        "system_message": "Sen bir yazılım geliştirici ajansın. Kod üretimi, API entegrasyonu ve otomasyon kurma konularında uzmanısın.",
        "capabilities": ["Kod üretimi", "API entegrasyonu", "Bot geliştirme", "Otomasyon kurma"]
    },
    "planner": {
        "name": "Planner Agent",
        "role": "Planlayıcı", 
        "system_message": "Sen bir planlama uzmanısın. Görev dağılımı, zaman yönetimi ve strateji geliştirme konularında uzmanısın.",
        "capabilities": ["Paylaşım takvimi", "Saat optimizasyonu", "Görev dağılımı"]
    },
    "publisher": {
        "name": "Publisher Agent",
        "role": "Yayıncı",
        "system_message": "Sen bir yayın uzmanısın. Sosyal medya yönetimi ve otomatik paylaşım konularında uzmanısın.",
        "capabilities": ["Instagram/YouTube/TikTok entegrasyonu", "Otomatik paylaşım", "Fallback & hata yönetimi"]
    },
    "report": {
        "name": "Report Agent", 
        "role": "Raporlayıcı",
        "system_message": "Sen bir analiz ve raporlama uzmanısın. Performans analizi ve KPI raporları oluşturma konularında uzmanısın.",
        "capabilities": ["Performans analizi", "KPI raporları", "Öneri geliştirme"]
    },
    "memory": {
        "name": "Memory Agent",
        "role": "Öğrenme & Hafıza",
        "system_message": "Sen öğrenme ve hafıza uzmanısın. Geçmiş görevleri kaydetme ve sistem optimizasyonu konularında uzmanısın.",
        "capabilities": ["Geçmiş görevleri kaydetme", "Kendi kendini geliştirme", "Hafıza optimizasyonu"]
    },
    "cost": {
        "name": "Cost Agent",
        "role": "Maliyet Kontrol",
        "system_message": "Sen maliyet optimizasyon uzmanısın. Bütçe yönetimi ve kaynak optimizasyonu konularında uzmanısın.",
        "capabilities": ["Ücretsiz kotaları zorlama", "Ücretli modelleri optimize etme", "Bütçe takibi"]
    },
    "growth": {
        "name": "Growth Agent",
        "role": "Büyüme & Pazarlama",
        "system_message": "Sen büyüme ve pazarlama uzmanısın. Trend yakalama ve viral içerik geliştirme konularında uzmanısın.",
        "capabilities": ["Trend yakalama", "Viral içerik önerileri", "Funnel geliştirme"]
    },
    "safety": {
        "name": "Safety Agent",
        "role": "Güvenlik & Uyum",
        "system_message": "Sen güvenlik ve uyum uzmanısın. Platform kuralları ve veri güvenliği konularında uzmanısın.",
        "capabilities": ["Platform kural kontrolü", "Telif hakkı taraması", "Gizlilik & veri güvenliği"]
    }
}

# Models
class Message(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    agent_type: str
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MessageCreate(BaseModel):
    session_id: str
    agent_type: str
    content: str

class ChatSession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    agent_type: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatSessionCreate(BaseModel):
    name: str
    agent_type: str

class ImageGenerationRequest(BaseModel):
    prompt: str
    agent_session_id: Optional[str] = None

class ImageGenerationResponse(BaseModel):
    image_base64: str
    prompt: str
    timestamp: datetime

# Helper functions
def prepare_for_mongo(data):
    """Prepare data for MongoDB storage by converting datetime objects to ISO strings"""
    if isinstance(data, dict):
        result = {}
        for key, value in data.items():
            if isinstance(value, datetime):
                result[key] = value.isoformat()
            elif isinstance(value, dict):
                result[key] = prepare_for_mongo(value)
            else:
                result[key] = value
        return result
    return data

def parse_from_mongo(item):
    """Parse data from MongoDB by converting ISO strings back to datetime objects"""
    if isinstance(item, dict):
        result = {}
        for key, value in item.items():
            if key in ['timestamp', 'created_at', 'updated_at'] and isinstance(value, str):
                try:
                    result[key] = datetime.fromisoformat(value)
                except:
                    result[key] = value
            else:
                result[key] = value
        return result
    return item

# Routes
@api_router.get("/")
async def root():
    return {"message": "Meta AI Orchestrator API - Active"}

@api_router.get("/agents")
async def get_agents():
    """Get all available agent configurations"""
    return AGENTS_CONFIG

@api_router.post("/sessions", response_model=ChatSession)
async def create_chat_session(input: ChatSessionCreate):
    """Create a new chat session for an agent"""
    if input.agent_type not in AGENTS_CONFIG:
        raise HTTPException(status_code=400, detail="Invalid agent type")
    
    session = ChatSession(**input.model_dump())
    
    # Store in MongoDB
    session_dict = prepare_for_mongo(session.model_dump())
    await db.chat_sessions.insert_one(session_dict)
    
    return session

@api_router.get("/sessions", response_model=List[ChatSession])
async def get_chat_sessions():
    """Get all chat sessions"""
    sessions = await db.chat_sessions.find({}, {"_id": 0}).to_list(1000)
    
    # Parse datetime fields
    for session in sessions:
        session = parse_from_mongo(session)
    
    return sessions

@api_router.delete("/sessions/{session_id}")
async def delete_chat_session(session_id: str):
    """Delete a chat session and its messages"""
    # Delete session
    session_result = await db.chat_sessions.delete_one({"id": session_id})
    if session_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Delete associated messages
    await db.messages.delete_many({"session_id": session_id})
    
    return {"message": "Session deleted successfully"}

async def _llm_response(agent_type: str, session_id: str, system_message: str, content: str) -> str:
    """Try providers in order: Groq → NVIDIA → EmergentIntegrations."""
    # 1. Groq (fast, free tier)
    if groq_client:
        try:
            model = GROQ_AGENT_MODELS.get(agent_type, "llama-3.3-70b-versatile")
            resp = await groq_client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": content},
                ],
                temperature=0.7,
                max_tokens=2048,
            )
            return resp.choices[0].message.content
        except Exception as e:
            logger.warning(f"Groq failed ({e}), trying NVIDIA...")

    # 2. NVIDIA (powerful, OpenAI-compatible)
    if nvidia_client:
        try:
            resp = await nvidia_client.chat.completions.create(
                model="meta/llama-3.1-70b-instruct",
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": content},
                ],
                temperature=0.7,
                max_tokens=2048,
            )
            return resp.choices[0].message.content
        except Exception as e:
            logger.warning(f"NVIDIA failed ({e}), trying EmergentIntegrations...")

    # 3. EmergentIntegrations fallback
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=system_message,
    ).with_model("openai", "gpt-4o")
    return await chat.send_message(UserMessage(text=content))


@api_router.post("/chat", response_model=Message)
async def send_message(input: MessageCreate):
    """Send a message to an agent and get response"""
    if input.agent_type not in AGENTS_CONFIG:
        raise HTTPException(status_code=400, detail="Invalid agent type")

    user_message = Message(
        session_id=input.session_id,
        agent_type=input.agent_type,
        role="user",
        content=input.content,
    )
    await db.messages.insert_one(prepare_for_mongo(user_message.model_dump()))

    agent_config = AGENTS_CONFIG[input.agent_type]

    try:
        response_text = await _llm_response(
            agent_type=input.agent_type,
            session_id=input.session_id,
            system_message=agent_config["system_message"],
            content=input.content,
        )

        assistant_message = Message(
            session_id=input.session_id,
            agent_type=input.agent_type,
            role="assistant",
            content=response_text,
        )
        await db.messages.insert_one(prepare_for_mongo(assistant_message.model_dump()))
        return assistant_message

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@api_router.get("/chat/{session_id}/messages", response_model=List[Message])
async def get_messages(session_id: str):
    """Get all messages for a session"""
    messages = await db.messages.find(
        {"session_id": session_id}, 
        {"_id": 0}
    ).sort("timestamp", 1).to_list(1000)
    
    # Parse datetime fields
    for message in messages:
        message = parse_from_mongo(message)
    
    return messages

@api_router.post("/generate-image", response_model=ImageGenerationResponse)
async def generate_image(input: ImageGenerationRequest):
    """Generate image using NVIDIA NIM (SDXL). Falls back to PIL placeholder if unavailable."""
    image_base64: str | None = None

    # 1. Try NVIDIA image generation
    if nvidia_client and NVIDIA_API_KEY:
        try:
            logger.info(f"Generating image via NVIDIA NIM: {input.prompt[:60]}")
            img_resp = await nvidia_client.images.generate(
                model=NVIDIA_IMAGE_MODEL,
                prompt=input.prompt,
                n=1,
                size="1024x1024",
                response_format="b64_json",
            )
            image_base64 = img_resp.data[0].b64_json
            logger.info("NVIDIA image generation successful")
        except Exception as e:
            logger.warning(f"NVIDIA image generation failed ({e}), falling back to placeholder")

    # 2. PIL placeholder fallback
    if not image_base64:
        try:
            from PIL import Image, ImageDraw
            import io
            img = Image.new('RGB', (512, 512), color=(30, 30, 50))
            draw = ImageDraw.Draw(img)
            prompt_short = input.prompt[:60] + "…" if len(input.prompt) > 60 else input.prompt
            draw.text((20, 230), prompt_short, fill=(150, 150, 180))
            draw.text((20, 260), "[NVIDIA API unavailable — placeholder]", fill=(80, 80, 100))
            buf = io.BytesIO()
            img.save(buf, format='PNG')
            image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image generation failed: {e}")

    response_obj = ImageGenerationResponse(
        image_base64=image_base64,
        prompt=input.prompt,
        timestamp=datetime.now(timezone.utc),
    )

    if input.agent_session_id:
        await db.generated_images.insert_one(prepare_for_mongo(response_obj.model_dump()))

    return response_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()