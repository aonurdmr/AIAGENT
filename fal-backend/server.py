import os
import base64
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic

app = FastAPI(title="Fal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
MODEL = "claude-opus-4-8"


class FortuneResponse(BaseModel):
    yorum: str
    mesaj: str
    semboller: Optional[list[str]] = None


class KahveRequest(BaseModel):
    image_base64: str
    soru: Optional[str] = None


class ElRequest(BaseModel):
    image_base64: str
    soru: Optional[str] = None


class TarotRequest(BaseModel):
    secilen_kartlar: list[str]
    soru: Optional[str] = None


class BurcRequest(BaseModel):
    dogum_tarihi: Optional[str] = None
    burc: str
    soru: Optional[str] = None


def call_claude_vision(system_prompt: str, user_prompt: str, image_base64: str) -> str:
    message = client.messages.create(
        model=MODEL,
        max_tokens=1500,
        thinking={"type": "adaptive"},
        system=system_prompt,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/jpeg",
                            "data": image_base64,
                        },
                    },
                    {"type": "text", "text": user_prompt},
                ],
            }
        ],
    )
    for block in message.content:
        if block.type == "text":
            return block.text
    return ""


def call_claude_text(system_prompt: str, user_prompt: str) -> str:
    message = client.messages.create(
        model=MODEL,
        max_tokens=1500,
        thinking={"type": "adaptive"},
        system=system_prompt,
        messages=[{"role": "user", "content": user_prompt}],
    )
    for block in message.content:
        if block.type == "text":
            return block.text
    return ""


@app.get("/")
def health():
    return {"status": "ok", "service": "Fal API"}


@app.post("/api/fal/kahve", response_model=FortuneResponse)
async def kahve_fali(req: KahveRequest):
    system = (
        "Sen deneyimli bir Türk kahve falı okuyucususun. "
        "Fincan fotoğrafındaki kahve telvesi şekillerini analiz ederek derin ve anlamlı yorumlar yaparsın. "
        "Türkçe konuş, sıcak ve gizemli bir dil kullan. "
        "Her yorumun 3-5 paragraf olsun. Geçmiş, şimdiki an ve geleceğe dair bilgiler ver."
    )
    soru_eki = f"\n\nKullanıcının sorusu: {req.soru}" if req.soru else ""
    user = f"Bu kahve fincanındaki şekilleri yorumla.{soru_eki}"

    try:
        yorum = call_claude_vision(system, user, req.image_base64)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return FortuneResponse(
        yorum=yorum,
        mesaj="Kahve falınız hazır!",
        semboller=["☕", "🔮", "✨"],
    )


@app.post("/api/fal/el", response_model=FortuneResponse)
async def el_fali(req: ElRequest):
    system = (
        "Sen deneyimli bir el falı (palmistry/kiromancy) ustasısın. "
        "El çizgilerini — yaşam çizgisi, kader çizgisi, kalp çizgisi, akıl çizgisi — analiz edersin. "
        "Türkçe konuş, mistik ve içten bir dil kullan. "
        "Her yorumun 3-5 paragraf olsun. Kişilik özellikleri, aşk hayatı, kariyer ve sağlık hakkında bilgi ver."
    )
    soru_eki = f"\n\nKullanıcının sorusu: {req.soru}" if req.soru else ""
    user = f"Bu el fotoğrafındaki çizgileri ve işaretleri yorumla.{soru_eki}"

    try:
        yorum = call_claude_vision(system, user, req.image_base64)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return FortuneResponse(
        yorum=yorum,
        mesaj="El falınız hazır!",
        semboller=["🤚", "🔮", "✨"],
    )


@app.post("/api/fal/tarot", response_model=FortuneResponse)
async def tarot_fali(req: TarotRequest):
    kartlar_str = ", ".join(req.secilen_kartlar)
    system = (
        "Sen deneyimli bir tarot okuyucususun. "
        "Seçilen tarot kartlarını ve aralarındaki ilişkileri derin bir şekilde yorumlarsın. "
        "Türkçe konuş, gizemli ve kadim bir dil kullan. "
        "Her yorumun 3-5 paragraf olsun. "
        "Kartların sembolizmini, sayısal değerlerini ve birbirleriyle ilişkisini açıkla."
    )
    soru_eki = f"\n\nKullanıcının sorusu: {req.soru}" if req.soru else ""
    user = f"Seçilen tarot kartları: {kartlar_str}\n\nBu kartları yorumla.{soru_eki}"

    try:
        yorum = call_claude_text(system, user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return FortuneResponse(
        yorum=yorum,
        mesaj="Tarot yorumunuz hazır!",
        semboller=["🃏", "🔮", "✨"],
    )


@app.post("/api/fal/burc", response_model=FortuneResponse)
async def burc_fali(req: BurcRequest):
    system = (
        "Sen deneyimli bir astrologsun. "
        "Burç yorumları yapıyor, yıldızların ve gezegenlerin etkisini açıklıyorsun. "
        "Türkçe konuş, bilge ve ilham verici bir dil kullan. "
        "Her yorumun 3-5 paragraf olsun. "
        "Aşk, kariyer, sağlık ve kişisel gelişim konularında detaylı bilgi ver."
    )
    tarih_eki = f"\nDoğum tarihi: {req.dogum_tarihi}" if req.dogum_tarihi else ""
    soru_eki = f"\nKullanıcının sorusu: {req.soru}" if req.soru else ""
    user = f"{req.burc} burcu yorumu yap.{tarih_eki}{soru_eki}"

    try:
        yorum = call_claude_text(system, user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return FortuneResponse(
        yorum=yorum,
        mesaj="Burç yorumunuz hazır!",
        semboller=["⭐", "🔮", "✨"],
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
