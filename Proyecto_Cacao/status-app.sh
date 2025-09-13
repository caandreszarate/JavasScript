#!/bin/bash

# Script para verificar estado de CacaoControl
echo "📊 Estado de CacaoControl - Sistema de Gestión de Cultivo de Cacao"
echo "📍 Granada, Meta, Colombia"
echo "📅 $(date)"
echo ""

# Función para mostrar estado con colores
show_status() {
    if [ $1 -eq 0 ]; then
        echo "✅ $2"
    else
        echo "❌ $3"
    fi
}

# Verificar directorio
echo "📁 Directorio de trabajo:"
echo "   $(pwd)"
if [ -f "package.json" ]; then
    echo "✅ En directorio correcto del proyecto"
else
    echo "❌ No estás en el directorio del proyecto"
    echo "💡 Ve a: /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao"
fi
echo ""

# Verificar MongoDB
echo "🗄️ MongoDB:"
if brew services list | grep -q "mongodb-community.*started"; then
    echo "✅ MongoDB ejecutándose"
    # Probar conexión
    if mongosh --eval "db.adminCommand('ismaster')" > /dev/null 2>&1; then
        echo "✅ MongoDB respondiendo"
    else
        echo "⚠️ MongoDB iniciado pero no responde"
    fi
else
    echo "❌ MongoDB no está ejecutándose"
    echo "💡 Ejecuta: brew services start mongodb/brew/mongodb-community"
fi
echo ""

# Verificar Backend
echo "⚙️ Backend (Puerto 8000):"
if lsof -i :8000 > /dev/null 2>&1; then
    echo "✅ Puerto 8000 ocupado"
    
    # Verificar si responde
    if curl -s http://localhost:8000/api/health > /dev/null; then
        echo "✅ Backend respondiendo"
        
        # Mostrar información del health check
        HEALTH_INFO=$(curl -s http://localhost:8000/api/health)
        echo "📋 Info: $(echo $HEALTH_INFO | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"
        echo "🔢 Versión: $(echo $HEALTH_INFO | grep -o '"version":"[^"]*"' | cut -d'"' -f4)"
    else
        echo "❌ Puerto ocupado pero backend no responde"
    fi
    
    # Mostrar PID del proceso
    BACKEND_PID=$(lsof -ti :8000)
    echo "📝 PID: $BACKEND_PID"
else
    echo "❌ Backend no está ejecutándose"
    echo "💡 Ejecuta: node server/index.js &"
fi
echo ""

# Verificar Frontend
echo "🎨 Frontend (Puerto 3000):"
if lsof -i :3000 > /dev/null 2>&1; then
    echo "✅ Puerto 3000 ocupado"
    
    # Verificar si responde
    if curl -s -I http://localhost:3000 | head -1 | grep -q "200"; then
        echo "✅ Frontend respondiendo"
    else
        echo "⚠️ Puerto ocupado pero frontend no responde completamente"
    fi
    
    # Mostrar PID del proceso
    FRONTEND_PID=$(lsof -ti :3000)
    echo "📝 PID: $FRONTEND_PID"
else
    echo "❌ Frontend no está ejecutándose"
    echo "💡 Ejecuta: cd client && npm start"
fi
echo ""

# Verificar procesos de Node.js relacionados
echo "🔍 Procesos de Node.js activos:"
NODE_PROCESSES=$(ps aux | grep -E "(node.*server|craco.*start)" | grep -v grep)
if [ -n "$NODE_PROCESSES" ]; then
    echo "$NODE_PROCESSES" | while read line; do
        echo "   📋 $line"
    done
else
    echo "   ℹ️ No hay procesos de Node.js relacionados ejecutándose"
fi
echo ""

# Resumen de URLs
echo "🌐 URLs de Acceso:"
echo "   📱 Aplicación Web: http://localhost:3000"
echo "   ⚙️ API Backend: http://localhost:8000"
echo "   🩺 Health Check: http://localhost:8000/api/health"
echo ""

# Estado general
echo "📊 Resumen General:"
MONGODB_OK=$(brew services list | grep -q "mongodb-community.*started" && echo 0 || echo 1)
BACKEND_OK=$(curl -s http://localhost:8000/api/health > /dev/null && echo 0 || echo 1)
FRONTEND_OK=$(curl -s -I http://localhost:3000 | head -1 | grep -q "200" && echo 0 || echo 1)

show_status $MONGODB_OK "MongoDB funcionando" "MongoDB no disponible"
show_status $BACKEND_OK "Backend funcionando" "Backend no disponible"
show_status $FRONTEND_OK "Frontend funcionando" "Frontend no disponible"

if [ $MONGODB_OK -eq 0 ] && [ $BACKEND_OK -eq 0 ] && [ $FRONTEND_OK -eq 0 ]; then
    echo ""
    echo "🎉 ¡Todos los servicios funcionando correctamente!"
    echo "🔑 Credenciales: admin@cacaocontrol.com / admin123"
else
    echo ""
    echo "⚠️ Algunos servicios necesitan atención"
    echo "💡 Ejecuta: ./start-app.sh para iniciar todos los servicios"
fi
echo ""
