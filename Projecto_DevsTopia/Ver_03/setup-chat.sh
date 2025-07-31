#!/bin/bash

# Script de instalación del Chat en Vivo - DevsTopia
echo "🚀 Configurando Chat en Vivo para DevsTopia..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    echo "📥 Descarga desde: https://nodejs.org/"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js versión 14 o superior es requerida."
    echo "📥 Actualiza Node.js desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Verificar si npm está disponible
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado."
    exit 1
fi

echo "✅ npm $(npm -v) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env..."
    cat > .env << EOF
# Configuración del Chat en Vivo - DevsTopia
PORT=3001
NODE_ENV=development

# Configuración de Socket.io
SOCKET_CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:5500,https://devstopia.com

# Configuración de EmailJS (ya configurado)
EMAILJS_PUBLIC_KEY=InSUx70NIu3r1_L5V
EMAILJS_SERVICE_ID=service_kgnumgb
EMAILJS_TEMPLATE_ID=template_ojoaqyd
EOF
    echo "✅ Archivo .env creado"
else
    echo "ℹ️  Archivo .env ya existe"
fi

# Verificar que los archivos necesarios existen
echo "🔍 Verificando archivos..."
FILES=("server.js" "package.json" "script.js" "index.html" "styles.css")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file encontrado"
    else
        echo "❌ $file no encontrado"
        exit 1
    fi
done

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Para iniciar el servidor:"
echo "   npm run dev"
echo ""
echo "🌐 El chat estará disponible en:"
echo "   http://localhost:3001"
echo ""
echo "📊 API de estado:"
echo "   http://localhost:3001/api/chat/status"
echo ""
echo "📖 Para más información, consulta CHAT_SETUP.md"
echo "" 