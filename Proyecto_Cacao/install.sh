#!/bin/bash

# Script de instalación para CacaoControl
# Sistema de Gestión de Cultivo de Cacao - Granada, Meta, Colombia

echo "🌱 Bienvenido a CacaoControl - Sistema de Gestión de Cultivo de Cacao"
echo "📍 Específicamente diseñado para Granada, Meta, Colombia"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js v16 o superior."
    echo "   Puedes descargarlo desde: https://nodejs.org/"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Se requiere Node.js v16 o superior. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Verificar si MongoDB está instalado
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB no detectado. Asegúrate de tener MongoDB instalado y ejecutándose."
    echo "   Puedes usar MongoDB Atlas (cloud) o instalar localmente desde: https://www.mongodb.com/"
fi

echo ""
echo "🔧 Instalando dependencias del servidor..."

# Instalar dependencias del servidor
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias del servidor"
    exit 1
fi

echo "✅ Dependencias del servidor instaladas"

echo ""
echo "🔧 Instalando dependencias del cliente..."

# Instalar dependencias del cliente
cd client
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias del cliente"
    exit 1
fi

cd ..

echo "✅ Dependencias del cliente instaladas"

echo ""
echo "📝 Configurando variables de entorno..."

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Archivo .env creado desde env.example"
    echo "⚠️  IMPORTANTE: Edita el archivo .env con tus configuraciones específicas"
else
    echo "✅ Archivo .env ya existe"
fi

echo ""
echo "🎉 ¡Instalación completada exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Edita el archivo .env con tus configuraciones:"
echo "   - Configura MONGODB_URI con tu base de datos"
echo "   - Agrega tu JWT_SECRET"
echo "   - Configura las APIs externas (OpenWeatherMap, Google Maps, etc.)"
echo ""
echo "2. Asegúrate de que MongoDB esté ejecutándose"
echo ""
echo "3. Inicia la aplicación:"
echo "   npm run dev    # Para desarrollo"
echo "   npm start      # Para producción"
echo ""
echo "4. Abre tu navegador en http://localhost:3000"
echo ""
echo "📚 Documentación adicional:"
echo "   - README.md: Información completa del proyecto"
echo "   - env.example: Ejemplo de configuración de variables"
echo ""
echo "🆘 Soporte:"
echo "   - Email: soporte@cacaocontrol-granada.com"
echo "   - Documentación: docs.cacaocontrol-granada.com"
echo ""
echo "🌱 ¡Que tengas éxito con tu cultivo de cacao en Granada, Meta! 🇨🇴"
