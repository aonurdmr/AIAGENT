# 🤖 Meta AI Orchestrator - MacOS Kurulum Rehberi

Bu rehber, Meta AI Orchestrator'ı MacBook'unuzda çift tıklama ile çalışacak şekilde kurmak için hazırlanmıştır.

## 🚀 Hızlı Başlangıç (3 Adım)

### 1️⃣ İlk Kurulum (Sadece Bir Kez)
```bash
# Terminal açın ve proje klasörüne gidin
cd /path/to/AIAGENT

# Kurulum script'ini çalıştırın
chmod +x setup_mac.sh
./setup_mac.sh
```

### 2️⃣ MacOS App Oluştur
```bash
# App bundle oluşturun
chmod +x create_mac_app.sh
./create_mac_app.sh
```

### 3️⃣ Çalıştır! 🎉
- `Başlat - Meta AI.app` dosyasını çift tıklayın
- Tarayıcınızda otomatik olarak http://localhost:3000 açılacak
- Meta AI Orchestrator kullanıma hazır!

## 🔑 Dahil Edilen API Keys

✅ **Emergent LLM Key**: GPT-5 sohbet için
✅ **OpenAI API Key**: Görsel üretimi için  
✅ **Google Gemini Key**: Gelişmiş AI özellikleri için

## 🎯 Özellikler

- **11 Uzman AI Ajan**: Research, Design, Content, Code, Planner, Publisher, Report, Memory, Cost, Growth, Safety
- **Gerçek Zamanlı Sohbet**: Her ajan ile özel konuşmalar
- **Görsel Üretimi**: AI tabanlı görsel oluşturma
- **Session Yönetimi**: Sohbet geçmişi kaydetme/yükleme
- **Modern UI**: Glassmorphism efektler, responsive tasarım

## 🛠️ Sistem Gereksinimleri

- **macOS**: 10.14 veya üzeri
- **RAM**: En az 4GB (8GB önerilen)
- **Depolama**: 2GB boş alan
- **İnternet**: API çağrıları için gerekli

## 🔧 Manuel Başlatma (Opsiyonel)

Eğer .app dosyası çalışmazsa:

```bash
# Backend başlat
cd backend
python3 server.py

# Yeni terminal penceresi açın ve frontend başlatın
cd frontend
npm start
```

## 🆘 Sorun Giderme

### MongoDB Çalışmıyor
```bash
brew services restart mongodb/brew/mongodb-community
```

### Port Çakışması
```bash
# 3000 ve 8001 portlarını kontrol edin
lsof -i :3000
lsof -i :8001
```

### Paket Kurulum Hatası
```bash
# Homebrew'u güncelle
brew update
brew upgrade

# Node modüllerini temizle
cd frontend
rm -rf node_modules
npm install
```

## 📱 Kullanım İpuçları

- **Ajan Seçimi**: Dashboard'da ajan kartlarına tıklayın
- **Hızlı Görsel**: "Hızlı Görsel Üret" butonunu kullanın
- **Sohbet Geçmişi**: Her session otomatik kaydedilir
- **Çoklu Ajan**: Aynı anda birden fazla ajan ile konuşabilirsiniz

## 🎉 Başarılı Kurulum Göstergeleri

✅ Terminal'de "Meta AI Orchestrator başarıyla başlatıldı!" mesajı
✅ Tarayıcı http://localhost:3000 adresini açar
✅ Dashboard'da 11 ajan kartı görünür
✅ Ajan seçimi ve sohbet çalışır

---

**Destek**: Herhangi bir sorun yaşarsanız kurulum loglarını kontrol edin ve gerekirse API key'lerinizi doğrulayın.