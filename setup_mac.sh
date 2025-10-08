#!/bin/bash

echo "🚀 Meta AI Orchestrator MacOS Setup Başlatılıyor..."

# Renkli output fonksiyonları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Homebrew kontrolü ve kurulumu
check_homebrew() {
    if ! command -v brew &> /dev/null; then
        print_status "Homebrew kuruluyor..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        print_success "Homebrew kuruldu!"
    else
        print_success "Homebrew zaten kurulu!"
    fi
}

# Node.js kontrolü ve kurulumu
check_nodejs() {
    if ! command -v node &> /dev/null; then
        print_status "Node.js kuruluyor..."
        brew install node
        print_success "Node.js kuruldu!"
    else
        print_success "Node.js zaten kurulu! Versiyon: $(node --version)"
    fi
}

# Python kontrolü
check_python() {
    if ! command -v python3 &> /dev/null; then
        print_status "Python3 kuruluyor..."
        brew install python
        print_success "Python3 kuruldu!"
    else
        print_success "Python3 zaten kurulu! Versiyon: $(python3 --version)"
    fi
}

# MongoDB kontrolü ve kurulumu
check_mongodb() {
    if ! command -v mongod &> /dev/null; then
        print_status "MongoDB kuruluyor..."
        brew tap mongodb/brew
        brew install mongodb-community
        print_success "MongoDB kuruldu!"
    else
        print_success "MongoDB zaten kurulu!"
    fi
}

# Pip paketlerini kurma
install_python_deps() {
    print_status "Python bağımlılıkları kuruluyor..."
    cd backend
    pip3 install -r requirements.txt
    cd ..
    print_success "Python bağımlılıkları kuruldu!"
}

# Node modüllerini kurma  
install_node_deps() {
    print_status "Node.js bağımlılıkları kuruluyor..."
    cd frontend
    npm install
    cd ..
    print_success "Node.js bağımlılıkları kuruldu!"
}

# Ana kurulum süreci
main() {
    print_status "Meta AI Orchestrator kurulumu başlatılıyor..."
    
    check_homebrew
    check_nodejs
    check_python
    check_mongodb
    install_python_deps
    install_node_deps
    
    print_success "🎉 Kurulum tamamlandı!"
    print_status "Artık 'Başlat - Meta AI.app' dosyasını çift tıklayarak uygulamayı çalıştırabilirsiniz!"
}

main