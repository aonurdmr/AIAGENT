#!/bin/bash

echo "🍎 MacOS App Bundle oluşturuluyor..."

# App bundle dizin yapısını oluştur
APP_NAME="Başlat - Meta AI"
APP_DIR="${APP_NAME}.app"
CONTENTS_DIR="${APP_DIR}/Contents"
MACOS_DIR="${CONTENTS_DIR}/MacOS"
RESOURCES_DIR="${CONTENTS_DIR}/Resources"

# Önceki app'i sil
rm -rf "${APP_DIR}"

# Dizinleri oluştur
mkdir -p "${MACOS_DIR}"
mkdir -p "${RESOURCES_DIR}"

# Ana executable script'i kopyala
cp start_app.sh "${MACOS_DIR}/${APP_NAME}"
chmod +x "${MACOS_DIR}/${APP_NAME}"

# Info.plist oluştur
cat > "${CONTENTS_DIR}/Info.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDisplayName</key>
    <string>Meta AI Orchestrator</string>
    <key>CFBundleExecutable</key>
    <string>${APP_NAME}</string>
    <key>CFBundleIdentifier</key>
    <string>com.emergent.meta-ai-orchestrator</string>
    <key>CFBundleName</key>
    <string>Meta AI Orchestrator</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.14</string>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>LSUIElement</key>
    <false/>
</dict>
</plist>
EOF

# İkon oluştur (basit terminal ikonu)
cat > "${RESOURCES_DIR}/app_icon.txt" << EOF
🤖 Meta AI
EOF

echo "✅ '${APP_NAME}.app' oluşturuldu!"
echo "📁 Artık '${APP_NAME}.app' dosyasını çift tıklayarak uygulamayı başlatabilirsiniz!"
echo ""
echo "📋 Kurulum adımları:"
echo "1. Önce 'setup_mac.sh' dosyasını çalıştırın (sadece bir kez)"
echo "2. Sonra '${APP_NAME}.app' dosyasını çift tıklayın"