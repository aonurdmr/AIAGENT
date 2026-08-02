# 🌿 DoğaAI — Master Geliştirme Rehberi

> **Bu dosya projenin tamamını açıklar. Geliştirmeye devam etmek için tek referans kaynağınız.**

---

## 📁 Projeyi Masaüstüne Al

```bash
# Terminal aç, Desktop'a git
cd ~/Desktop

# Repoyu klonla
git clone https://github.com/aonurdmr/AIAGENT DoğaAI
cd DoğaAI

# Geliştirme branch'ine geç
git checkout claude/boyle-bir-uygulama-h4n7ly
```

---

## 🗂️ Klasör Yapısı

```
DoğaAI/
├── backend/
│   ├── server.py          ← FastAPI ana sunucu (tüm API endpointleri)
│   ├── .env               ← API anahtarları (aşağıda detay var)
│   └── requirements.txt   ← Python bağımlılıkları
│
├── frontend/
│   ├── src/
│   │   ├── App.js         ← 546 route tanımı burada
│   │   ├── components/    ← 551 adet React component
│   │   │   ├── Home.js    ← Ana menü (tüm kategoriler)
│   │   │   ├── Navbar.js  ← Alt navigasyon
│   │   │   └── *.js       ← Her sayfa bir dosya
│   │   ├── context/       ← React context (auth vb.)
│   │   └── hooks/         ← Custom hooks
│   └── package.json
│
├── android/               ← Android wrapper (React Native / WebView)
├── tests/                 ← Test dosyaları
└── DOGAAI_MASTER_README.md ← Bu dosya
```

---

## 🔑 API Anahtarları ve Konfigürasyon

### `backend/.env` dosyasının tam içeriği:

```env
# MongoDB bağlantısı
MONGO_URL=mongodb://localhost:27017
DB_NAME=dogaai

# JWT Token güvenlik anahtarı
JWT_SECRET=dogaai-super-secret-key-DEGISTIRIN

# NVIDIA NIM API (AI chat özelliği için)
NVIDIA_API_KEY=nvapi-BURAYA_KENDI_KEYINIZI_YAZIN
```

> ⚠️ **NVIDIA API Key:** Gerçek keyiniz `backend/.env` dosyasında kayıtlıdır (gitignore'da, güvende).
> API: https://integrate.api.nvidia.com/v1
> Model: `meta/llama-3.1-70b-instruct`
> Yeni key almak için: https://build.nvidia.com/

---

## ⚙️ Kurulum ve Çalıştırma

### Ön Koşullar

| Araç | Minimum Versiyon |
|------|-----------------|
| Node.js | 18+ |
| Python | 3.10+ |
| MongoDB | 6+ |
| Yarn | 1.22+ |

---

### 1. MongoDB Kur ve Başlat

```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Linux
sudo apt install mongodb
sudo systemctl start mongodb

# Windows — mongodb.com'dan installer indir
```

---

### 2. Backend Başlat

```bash
cd DoğaAI/backend

# Python sanal ortam oluştur
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Bağımlılıkları yükle
pip install -r requirements.txt

# .env dosyasını oluştur (yukarıdaki içeriği yapıştır)
nano .env

# Sunucuyu başlat
uvicorn server:app --reload --port 8001
```

Backend çalışınca: http://localhost:8001/docs ← Swagger API dökümantasyonu

---

### 3. Frontend Başlat

```bash
cd DoğaAI/frontend

# Bağımlılıkları yükle
yarn install

# Geliştirme modunda başlat
yarn start
```

Uygulama açılır: http://localhost:3000

---

### 4. Tek Komutla Başlat (Varsa)

```bash
cd DoğaAI
./start_app.sh
```

---

## 📊 Proje Durumu (Ağustos 2026)

| Metrik | Değer |
|--------|-------|
| Toplam sayfa/route | **546** |
| React component dosyası | **551** |
| GitHub commit sayısı | **191** |
| Backend endpoint | **~20** |
| Branch | `claude/boyle-bir-uygulama-h4n7ly` |

---

## 🏗️ Teknoloji Yığını

### Frontend
- **React 18** + React Router v6
- **Tailwind CSS** + Radix UI bileşenleri
- **Mobil-first** tasarım (max-width: 480px)
- Dark tema — her component kendi renk paleti

### Backend
- **FastAPI** (Python) — async, yüksek performans
- **MongoDB** + Motor (async driver)
- **JWT** Authentication (7 gün token süresi)
- **NVIDIA NIM** — AI sohbet motoru (OpenAI-compatible API)
- **bcrypt** şifre hashleme

### AI Entegrasyonu
- NVIDIA NIM API → `meta/llama-3.1-70b-instruct` modeli
- Doğa rehberi, av/balık sorularını yanıtlıyor
- Türkçe dil desteği

---

## 📱 Tamamlanan Sayfalar (546 Route)

### Ana Sayfalar
```
/               ← Home (ana menü)
/tani           ← Tür tanımlama (AI fotoğraf analizi)
/harita         ← Harita görünümü
/topluluk       ← Topluluk
/ai-asistan     ← AI sohbet
/profil         ← Profil
/giris          ← Giriş/kayıt
/arama          ← Arama
/hava           ← Hava durumu
```

### Balıkçılık Kategorisi (~80 sayfa)
```
/balik-av       /olta-rehber    /kanca-rehber   /yem
/ay-takvim      /dugum          /tekne-baligi   /gece-baligi
/sazan-baligi   /alabalik       /levrek-rehber  /hamsi
/somon-baligi   /kalamar        /balik-agirlik  /balik-boy
/balik-mevsim   /balik-yemek    /olta-knot      /olta-fizik
/olta-yasal     /turna-baligi   /yilan-baligi   /yayın-baligi
/magara-baligi  /ton-baligi     /istavrit       ve 50+ daha...
```

### Avcılık Kategorisi (~60 sayfa)
```
/av-ekipman     /av-etik        /av-takvim      /av-kanun
/av-bolge       /yabani-domuz   /keklik-avi     /bildircin-avi
/ahu-geyigi     /kartal-baykus  /tilki-takip    /kurt-takip
/keklik         /bıldırcın      /tuzak          /av-itlari
/yay-avi        /gece-avi       /termal-avi     ve 40+ daha...
```

### Kampçılık Kategorisi (~70 sayfa)
```
/kamp           /kamp-yemek     /kamp-ekipman   /kamp-ates
/kamp-hijyen    /kamp-sicim     /kamp-tarp      /kamp-fener
/kamp-doga      /yaz-kamp       /kis-kamp       /gece-kamp
/plaj-kamp      /daglik-kamp    /doğa-banyosu   ve 55+ daha...
```

### Kuş Gözlemi Kategorisi (~50 sayfa)
```
/kuslar         /goc-kuslari    /gece-kuslari   /flamingo-gozu
/pelikan-gozu   /dolfin-gozu    /karabatak      /saz-delicesi
/arikusu        /kasikci-kusu   /batagan-gozu   /tavus-kusu
/karatavuk      /saz-bulbulu    /yirtici-gocu   ve 35+ daha...
```

### Yabani Bitki & Meyve (~80 sayfa)
```
/yabani-sarmısak /yabani-nane   /yabani-kekik   /yabani-adacayi
/yabani-biberiye /yabani-zurfa  /yabani-hardal  /yabani-anason
/yabani-maydanoz /yabani-kisnis /yabani-fistik  /yabani-badem
/yabani-ceviz    /yabani-dut    /yabani-kayisi  /yabani-armut
/yabani-erik     /yabani-incir  /yabani-nar     /yabani-ayva
/yabani-visne    /yabani-zeytin /murver         /kestane-rehber
ve 55+ daha...
```

### Doğa Rehberi & Güvenlik (~80 sayfa)
```
/hayvan-takip   /iz-rehber      /hayvan-sesler  /bitis-rehber
/yilan-rehber   /akrep-rehber   /ormanda-yasam  /su-aritma
/ilk-yardim     /deprem-takip   /hava-okuma     /bulut-okuma
/ruzgar-okuma   /ay-takvim      /gunes-takip    /yildiz-harita
ve 65+ daha...
```

### Tüm Route Listesi
Tüm 546 route için App.js dosyasına bakın:
```bash
grep "path=" frontend/src/App.js | sed 's/.*path="\([^"]*\)".*/\1/'
```

---

## 🔌 Backend API Endpointleri

```
POST   /api/auth/register    ← Kullanıcı kaydı
POST   /api/auth/login       ← Giriş (JWT token alır)
GET    /api/auth/me          ← Mevcut kullanıcı bilgisi

POST   /api/ai/chat          ← NVIDIA NIM AI sohbet
POST   /api/ai/identify      ← Fotoğraftan tür tanımlama

GET    /api/species          ← Tür veritabanı
GET    /api/spots            ← Balık/av noktaları
POST   /api/logs             ← Aktivite kaydet
GET    /api/logs             ← Aktivite geçmişi

GET    /api/weather/{lat}/{lon} ← Hava durumu
GET    /api/regulations      ← Av/balık yasaları
```

Swagger UI: http://localhost:8001/docs

---

## ❌ Henüz Tamamlanmayanlar / Eksikler

| Özellik | Durum | Not |
|---------|-------|-----|
| **Frontend ↔ Backend bağlantısı** | ❌ Eksik | Sayfalar mock data kullanıyor |
| **AI Fotoğraf tanıma** | ⚠️ Kısmi | Backend var, frontend bağlı değil |
| **Gerçek hava durumu API** | ❌ Eksik | OpenWeatherMap key gerekiyor |
| **Harita entegrasyonu** | ❌ Eksik | Google Maps / Mapbox key gerekiyor |
| **Push bildirimleri** | ❌ Eksik | Firebase FCM gerekiyor |
| **Sosyal özellikler** | ❌ Eksik | Topluluk sayfası boş |
| **Android build** | ⚠️ Kısmi | android/ klasörü var |
| **Search çalışıyor mu?** | ⚠️ Test edilmedi | |
| **Mobile responsive test** | ❌ Test edilmedi | |
| **WildStrawberry entegrasyonu** | ❌ Eksik | Dosya var, App.js'e eklenmedi |

---

## 🚀 Geliştirmeye Devam Etme

### Yeni Component Ekleme Adımları

1. **Component dosyası oluştur:**
```bash
# frontend/src/components/YeniSayfa.js
```

2. **App.js'e route ekle:**
```js
import YeniSayfa from './components/YeniSayfa';
// Routes içine:
<Route path="/yeni-sayfa" element={<YeniSayfa />} />
```

3. **Home.js'e menü girişi ekle:**
```js
{ icon: '🌿', title: 'Yeni Sayfa', description: 'Açıklama', path: '/yeni-sayfa', color: '#059669' }
```

4. **Build ve test:**
```bash
cd frontend && yarn build
yarn start
```

### Component Şablonu

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  tab1: {
    title: 'Sekme 1',
    items: [
      { icon: '🌿', t: 'Başlık', d: 'Açıklama metni buraya gelir.' },
    ],
  },
  tab2: {
    title: 'Sekme 2',
    items: [
      { icon: '📍', t: 'Başlık 2', d: 'Açıklama 2.' },
    ],
  },
};

export default function YeniSayfa() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tab1');
  const data = TABS[tab];
  const accent = '#059669';  // Ana renk
  const bg = '#000c06';      // Arka plan

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#d1fae5', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Sayfa Başlığı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001810', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#34d399',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001c0e', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#6ee7b7', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### ⚠️ Türkçe Apostrof Hatası

JavaScript string içinde Türkçe iyelik eki kullananken DİKKAT:

```js
// ❌ HATALI — string erken kapanır
d: 'Tuz Gölü'nde binlerce flamingo'

// ✅ DOĞRU — apostrof escape edilmeli
d: 'Tuz Golu\'nde binlerce flamingo'

// ✅ veya Latin harfle yaz
d: 'Tuz Golunde binlerce flamingo'
```

---

## 🎨 Renk Paleti (Component Renk Sistemi)

| Kategori | Accent | Background | Text |
|----------|--------|------------|------|
| Balıkçılık | `#0284c7` | `#00060c` | `#e0f2fe` |
| Avcılık | `#b45309` | `#0c0600` | `#fef3c7` |
| Kampçılık | `#16a34a` | `#00080a` | `#dcfce7` |
| Kuş gözlemi | `#7c3aed` | `#05000c` | `#ede9fe` |
| Yabani bitki | `#059669` | `#000c06` | `#d1fae5` |
| Flamingo/Çiçek | `#db2777` | `#0a0008` | `#fce7f3` |
| Mantar | `#92400e` | `#080400` | `#fef3c7` |

---

## 📋 Git Workflow

```bash
# Güncel kodu al
git pull origin claude/boyle-bir-uygulama-h4n7ly

# Değişiklik yap, sonra commit
git add frontend/src/components/YeniSayfa.js
git add frontend/src/App.js
git add frontend/src/components/Home.js
git commit -m "Add YeniSayfa component"
git push -u origin claude/boyle-bir-uygulama-h4n7ly
```

---

## 🐛 Yaygın Sorunlar

### "yarn build" başarısız
```bash
# Apostrop hatası: Türkçe iyelik eki string'i kesiyor
# Error: Unexpected token (xx:xx)
# Çözüm: sorunlu satırı bul, apostrofu escape et veya kaldır
```

### MongoDB bağlanamıyor
```bash
# macOS
brew services start mongodb-community
# Linux
sudo systemctl start mongod
```

### Port meşgul
```bash
# Backend 8001 portunu başka uygulama kullanıyorsa
kill $(lsof -ti:8001)
uvicorn server:app --reload --port 8002
# frontend'de: REACT_APP_API_URL=http://localhost:8002 yarn start
```

---

## 📞 Kaynaklar

| Kaynak | Link |
|--------|------|
| GitHub Repo | https://github.com/aonurdmr/AIAGENT |
| Branch | `claude/boyle-bir-uygulama-h4n7ly` |
| NVIDIA NIM | https://build.nvidia.com/ |
| FastAPI Docs | http://localhost:8001/docs |
| React Router | https://reactrouter.com/en/main |

---

*Son güncelleme: Ağustos 2026 — 546 route, 551 component*
