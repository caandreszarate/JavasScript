#!/bin/bash

echo "🔧 Solucionando errores de CacaoControl..."

# Navegar al directorio del cliente
cd client

echo "📦 Limpiando node_modules y package-lock.json..."
rm -rf node_modules package-lock.json

echo "📦 Reinstalando dependencias..."
npm install

echo "🎨 Configurando Tailwind CSS correctamente..."
# Reinstalar Tailwind CSS con la versión correcta
npm uninstall tailwindcss @tailwindcss/forms
npm install -D tailwindcss@^3.4.0 @tailwindcss/forms

echo "✅ Errores solucionados. Intentando iniciar la aplicación..."
echo "🌐 La aplicación debería abrirse en http://localhost:3000"

npm start
