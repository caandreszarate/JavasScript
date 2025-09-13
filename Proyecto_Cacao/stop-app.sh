#!/bin/bash

# Script para detener CacaoControl completo
echo "🛑 Deteniendo CacaoControl - Sistema de Gestión de Cultivo de Cacao"
echo "📍 Granada, Meta, Colombia"
echo "📅 $(date)"
echo ""

# Detener frontend
echo "🎨 Deteniendo frontend..."
pkill -f "craco.*start" 2>/dev/null && echo "✅ Frontend detenido" || echo "ℹ️ Frontend no estaba ejecutándose"

# Detener backend
echo "⚙️ Deteniendo backend..."
pkill -f "node.*server/index.js" 2>/dev/null && echo "✅ Backend detenido" || echo "ℹ️ Backend no estaba ejecutándose"

# Detener cualquier proceso de Node.js relacionado
echo "🧹 Limpiando procesos de Node.js..."
pkill -f "node.*Proyecto_Cacao" 2>/dev/null || true

# Liberar puertos si están ocupados
echo "🔓 Liberando puertos..."
if lsof -i :3000 > /dev/null 2>&1; then
    echo "🔓 Liberando puerto 3000..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
fi

if lsof -i :8000 > /dev/null 2>&1; then
    echo "🔓 Liberando puerto 8000..."
    lsof -ti:8000 | xargs kill -9 2>/dev/null || true
fi

# Verificar que los procesos se hayan detenido
sleep 2

echo ""
echo "🔍 Verificando estado final..."

# Verificar puertos
if lsof -i :3000 > /dev/null 2>&1; then
    echo "⚠️ Puerto 3000 aún ocupado"
else
    echo "✅ Puerto 3000 libre"
fi

if lsof -i :8000 > /dev/null 2>&1; then
    echo "⚠️ Puerto 8000 aún ocupado"
else
    echo "✅ Puerto 8000 libre"
fi

# MongoDB se mantiene ejecutándose por defecto
echo ""
echo "ℹ️ MongoDB se mantiene ejecutándose"
echo "   Para detener MongoDB: brew services stop mongodb/brew/mongodb-community"

echo ""
echo "✅ ¡CacaoControl detenido exitosamente!"
echo ""
