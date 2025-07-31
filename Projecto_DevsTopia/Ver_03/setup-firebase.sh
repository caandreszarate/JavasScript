#!/bin/bash

# Script de instalación del Chat con Firebase - DevsTopia
echo "🔥 Configurando Chat con Firebase para DevsTopia..."

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

# Instalar Firebase CLI
echo "📦 Instalando Firebase CLI..."
npm install -g firebase-tools

if [ $? -eq 0 ]; then
    echo "✅ Firebase CLI instalado correctamente"
else
    echo "❌ Error al instalar Firebase CLI"
    exit 1
fi

# Verificar que los archivos necesarios existen
echo "🔍 Verificando archivos..."
FILES=("firebase-config.js" "script-firebase.js" "index.html" "styles.css")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file encontrado"
    else
        echo "❌ $file no encontrado"
        exit 1
    fi
done

# Crear archivo de configuración de Firebase si no existe
if [ ! -f "firebase.json" ]; then
    echo "📝 Creando firebase.json..."
    cat > firebase.json << EOF
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "setup-*.sh",
      "*.md",
      "package.json",
      "package-lock.json"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "database": {
    "rules": "database.rules.json"
  }
}
EOF
    echo "✅ firebase.json creado"
else
    echo "ℹ️  firebase.json ya existe"
fi

# Crear reglas de base de datos si no existe
if [ ! -f "database.rules.json" ]; then
    echo "📝 Creando reglas de base de datos..."
    cat > database.rules.json << EOF
{
  "rules": {
    "chat": {
      "messages": {
        ".read": true,
        ".write": true
      },
      "typing": {
        ".read": true,
        ".write": true
      },
      "agent-requests": {
        ".read": "auth != null && auth.token.admin === true",
        ".write": true
      }
    },
    "users": {
      "\$uid": {
        ".read": true,
        ".write": "\$uid === auth.uid"
      }
    }
  }
}
EOF
    echo "✅ database.rules.json creado"
else
    echo "ℹ️  database.rules.json ya existe"
fi

# Crear .firebaserc si no existe
if [ ! -f ".firebaserc" ]; then
    echo "📝 Creando .firebaserc..."
    cat > .firebaserc << EOF
{
  "projects": {
    "default": "devstopia-chat"
  }
}
EOF
    echo "✅ .firebaserc creado"
else
    echo "ℹ️  .firebaserc ya existe"
fi

echo ""
echo "🎉 ¡Configuración de Firebase completada!"
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "1. 🔥 Crear proyecto en Firebase Console:"
echo "   https://console.firebase.google.com/"
echo "   - Nombre: devstopia-chat"
echo "   - Habilitar Realtime Database"
echo ""
echo "2. 🔑 Obtener configuración:"
echo "   - Ir a Configuración del proyecto"
echo "   - Registrar app web"
echo "   - Copiar configuración"
echo ""
echo "3. ⚙️  Actualizar firebase-config.js:"
echo "   - Reemplazar 'tu-api-key-aqui' con tu API key real"
echo "   - Reemplazar 'tu-app-id-aqui' con tu App ID real"
echo ""
echo "4. 🚀 Desplegar:"
echo "   firebase login"
echo "   firebase init hosting"
echo "   firebase deploy"
echo ""
echo "5. 🌐 El chat estará disponible en:"
echo "   https://devstopia-chat.web.app"
echo ""
echo "📖 Para más información, consulta firebase-setup.md"
echo "" 