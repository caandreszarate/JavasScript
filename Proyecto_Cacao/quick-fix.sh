#!/bin/bash

echo "🔧 Solución rápida para errores de CSS en CacaoControl..."

cd client

echo "🧹 Limpiando archivos de compilación..."
rm -rf build
rm -rf node_modules/.cache

echo "🎨 Reinstalando Tailwind CSS..."
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0

echo "🔄 Reiniciando servidor de desarrollo..."
npm start
