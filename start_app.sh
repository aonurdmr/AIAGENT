#!/bin/bash

# Renkli output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Terminal'i temizle
clear

echo "🤖 Meta AI Orchestrator Başlatılıyor..."
echo "============================================"

# Proje dizinine git
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# MongoDB'yi başlat
print_status "MongoDB başlatılıyor..."
brew services start mongodb/brew/mongodb-community &>/dev/null
sleep 3

# Backend'i başlat
print_status "Backend API başlatılıyor..."
cd backend
python3 server.py &
BACKEND_PID=$!
cd ..

# Biraz bekle
sleep 5

# Frontend'i başlat
print_status "Frontend başlatılıyor..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

print_success "✅ Meta AI Orchestrator başarıyla başlatıldı!"
print_status "🌐 Frontend: http://localhost:3000"
print_status "🔧 Backend API: http://localhost:8001"
print_status "📊 MongoDB: localhost:27017"

echo ""
echo "🎯 Kullanım:"
echo "   - Ana dashboard'da 11 farklı AI ajan arasında geçiş yapabilirsiniz"
echo "   - Her ajan ile sohbet edebilir, özel yeteneklerini kullanabilirsiniz"
echo "   - Hızlı görsel üretimi için dashboard'daki butonu kullanın"
echo ""
echo "❌ Kapatmak için bu terminali kapatın veya Ctrl+C basın"

# Cleanup fonksiyonu
cleanup() {
    print_status "Uygulama kapatılıyor..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    brew services stop mongodb/brew/mongodb-community &>/dev/null
    print_success "Meta AI Orchestrator kapatıldı!"
    exit 0
}

# Ctrl+C yakalandığında cleanup çalıştır
trap cleanup SIGINT

# Sürekli çalıştır
while true; do
    sleep 1
done