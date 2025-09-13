#!/bin/bash

# Script para iniciar CacaoControl completo
echo "🌱 Iniciando CacaoControl - Sistema de Gestión de Cultivo de Cacao"
echo "📍 Granada, Meta, Colombia"
echo "📅 $(date)"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encuentra package.json. Ejecuta este script desde el directorio del proyecto."
    echo "💡 Directorio correcto: /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao"
    exit 1
fi

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🧹 Deteniendo servicios..."
    pkill -f "node.*server/index.js" 2>/dev/null || true
    pkill -f "craco.*start" 2>/dev/null || true
    echo "✅ Servicios detenidos"
    exit 0
}

# Configurar trap para limpieza
trap cleanup SIGINT SIGTERM

# Verificar MongoDB
echo "🔍 Verificando MongoDB..."
if ! brew services list | grep -q "mongodb-community.*started"; then
    echo "🚀 Iniciando MongoDB..."
    brew services start mongodb/brew/mongodb-community
    sleep 5
    
    # Verificar que MongoDB esté funcionando
    if ! brew services list | grep -q "mongodb-community.*started"; then
        echo "❌ Error: No se pudo iniciar MongoDB"
        echo "💡 Ejecuta manualmente: brew services start mongodb/brew/mongodb-community"
        exit 1
    fi
else
    echo "✅ MongoDB ya está ejecutándose"
fi

# Detener procesos existentes
echo "🧹 Limpiando procesos anteriores..."
pkill -f "node.*server/index.js" 2>/dev/null || true
pkill -f "craco.*start" 2>/dev/null || true
sleep 3

# Verificar que los puertos estén libres
if lsof -i :8000 > /dev/null 2>&1; then
    echo "⚠️ Puerto 8000 ocupado, liberando..."
    lsof -ti:8000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

if lsof -i :3000 > /dev/null 2>&1; then
    echo "⚠️ Puerto 3000 ocupado, liberando..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Iniciar backend
echo "⚙️ Iniciando backend en puerto 8000..."
node server/index.js &
BACKEND_PID=$!
echo "📝 Backend PID: $BACKEND_PID"
sleep 5

# Verificar que el backend esté funcionando
echo "🔍 Verificando conectividad del backend..."
for i in {1..5}; do
    if curl -s http://localhost:8000/api/health > /dev/null; then
        echo "✅ Backend funcionando correctamente"
        break
    else
        if [ $i -eq 5 ]; then
            echo "❌ Error: Backend no está respondiendo después de 5 intentos"
            echo "💡 Verifica los logs del backend"
            kill $BACKEND_PID 2>/dev/null || true
            exit 1
        fi
        echo "⏳ Intentando conectar al backend... ($i/5)"
        sleep 2
    fi
done

# Iniciar frontend
echo "🎨 Iniciando frontend en puerto 3000..."
cd client
npm start &
FRONTEND_PID=$!
echo "📝 Frontend PID: $FRONTEND_PID"
cd ..

echo ""
echo "🎉 ¡CacaoControl iniciado exitosamente!"
echo ""
echo "📱 Aplicación Web: http://localhost:3000"
echo "⚙️ API Backend: http://localhost:8000"
echo "🩺 Health Check: http://localhost:8000/api/health"
echo ""
echo "🔑 Credenciales de Administrador:"
echo "   📧 Email: admin@cacaocontrol.com"
echo "   🔐 Contraseña: admin123"
echo ""
echo "📋 PIDs de los procesos:"
echo "   Backend: $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""
echo "⚠️ Para detener la aplicación, presiona Ctrl+C"
echo "📖 Para más información, lee: GUIA-GESTION-APLICACION.md"
echo ""

# Abrir navegador después de que el frontend compile
echo "⏳ Esperando a que el frontend compile..."
sleep 15
echo "🌐 Abriendo navegador..."
open http://localhost:3000

# Mostrar estado cada 30 segundos
while true; do
    sleep 30
    echo "📊 Estado: $(date) - Backend: $(curl -s http://localhost:8000/api/health | grep -o '"status":"[^"]*"' | cut -d'"' -f4 || echo 'ERROR') - Frontend: $(curl -s -I http://localhost:3000 | head -1 | grep -o '200' || echo 'ERROR')"
done
