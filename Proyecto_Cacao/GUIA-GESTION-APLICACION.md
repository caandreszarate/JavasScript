# 🌱 CacaoControl - Guía de Gestión de la Aplicación

## 📋 Información General

- **Proyecto**: CacaoControl - Sistema de Gestión de Cultivo de Cacao
- **Ubicación**: Granada, Meta, Colombia
- **Directorio**: `/Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao`

---

## 🚀 Inicio Rápido

### Comando Único para Iniciar Todo
```bash
cd /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao
./start-app.sh
```

---

## 🔧 Gestión Manual de Servicios

### 1️⃣ MongoDB

#### Iniciar MongoDB
```bash
brew services start mongodb/brew/mongodb-community
```

#### Verificar Estado
```bash
brew services list | grep mongodb
```

#### Detener MongoDB
```bash
brew services stop mongodb/brew/mongodb-community
```

#### Reiniciar MongoDB
```bash
brew services restart mongodb/brew/mongodb-community
```

---

### 2️⃣ Backend (Puerto 8000)

#### Iniciar Backend
```bash
cd /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao
node server/index.js &
```

#### Verificar Backend
```bash
curl http://localhost:8000/api/health
```

#### Detener Backend
```bash
# Encontrar el PID del proceso
ps aux | grep "node server" | grep -v grep
# Detener usando el PID (reemplaza XXXX con el PID real)
kill XXXX
```

#### Logs del Backend
```bash
# Si quieres ver los logs en tiempo real
node server/index.js
```

---

### 3️⃣ Frontend (Puerto 3000)

#### Iniciar Frontend
```bash
cd /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao/client
npm start
```

#### Detener Frontend
```bash
# Detener proceso de React
pkill -f "craco.*start"
```

---

## 🔄 Procedimientos de Reinicio

### Reinicio Completo de la Aplicación

1. **Detener todos los servicios**
```bash
cd /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao

# Detener frontend
pkill -f "craco.*start" || true

# Detener backend
pkill -f "node.*server" || true

# Esperar un momento
sleep 3
```

2. **Verificar que MongoDB esté funcionando**
```bash
brew services start mongodb/brew/mongodb-community
```

3. **Iniciar backend**
```bash
node server/index.js &
sleep 3
```

4. **Verificar backend**
```bash
curl -s http://localhost:8000/api/health
```

5. **Iniciar frontend**
```bash
cd client && npm start &
```

6. **Abrir aplicación**
```bash
sleep 10
open http://localhost:3000
```

---

## 🔍 Diagnóstico y Solución de Problemas

### Verificar Qué Está Ejecutándose

#### Ver Todos los Procesos de Node
```bash
ps aux | grep -E "(node|npm)" | grep -v grep
```

#### Ver Qué Usa los Puertos
```bash
# Puerto 3000 (Frontend)
lsof -i :3000

# Puerto 8000 (Backend)
lsof -i :8000

# Puerto 27017 (MongoDB)
lsof -i :27017
```

### Problemas Comunes

#### 1. "Puerto ya en uso"
```bash
# Ver qué proceso usa el puerto (ejemplo puerto 8000)
lsof -i :8000

# Detener el proceso (reemplaza PID)
kill PID_DEL_PROCESO
```

#### 2. "No se puede conectar al backend"
```bash
# Verificar que el backend esté funcionando
curl http://localhost:8000/api/health

# Si no responde, reiniciar backend
pkill -f "node.*server"
node server/index.js &
```

#### 3. "MongoDB no conecta"
```bash
# Verificar MongoDB
brew services list | grep mongodb

# Reiniciar si es necesario
brew services restart mongodb/brew/mongodb-community
```

#### 4. Frontend no carga
```bash
# Limpiar caché de npm
cd client
npm start
```

---

## 🔑 Credenciales y Acceso

### Administrador Principal
- **Email**: `admin@cacaocontrol.com`
- **Contraseña**: `admin123`
- **Rol**: Administrador

### URLs de Acceso
- **Aplicación Web**: http://localhost:3000
- **API Backend**: http://localhost:8000
- **Health Check**: http://localhost:8000/api/health
- **Página de Prueba**: `file:///.../test-login.html`

---

## 📝 Comandos de Desarrollo

### Crear Nuevo Usuario Administrador
```bash
cd /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao
node create-admin.js
```

### Probar Login desde Terminal
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cacaocontrol.com",
    "password": "admin123"
  }'
```

### Registrar Nuevo Usuario desde Terminal
```bash
curl -X POST http://localhost:8000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nuevo",
    "apellido": "Usuario",
    "email": "nuevo@test.com",
    "password": "123456",
    "cedula": "87654321",
    "telefono": "3201234567",
    "finca": {
      "nombre": "Finca Nueva",
      "area_total": 3.5,
      "ubicacion": {
        "municipio": "Granada",
        "departamento": "Meta",
        "pais": "Colombia"
      }
    }
  }'
```

---

## 🛠️ Mantenimiento

### Actualizar Dependencias
```bash
# Backend
cd /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao
npm update

# Frontend
cd client
npm update
```

### Limpiar Caché
```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias del frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

### Backup de Base de Datos
```bash
# Crear backup de MongoDB
mongodump --db cacao_control --out ./backup/$(date +%Y%m%d_%H%M%S)
```

---

## 📊 Logs y Monitoreo

### Ver Logs en Tiempo Real

#### Backend con Logs Detallados
```bash
cd /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao
NODE_ENV=development node server/index.js
```

#### Ver Conexiones a MongoDB
```bash
mongosh
# Dentro de mongo shell:
use cacao_control
db.stats()
```

---

## 🚨 Solución de Emergencia

### Si Nada Funciona - Reset Completo

1. **Detener todo**
```bash
pkill -f "node\|npm" || true
brew services stop mongodb/brew/mongodb-community
```

2. **Limpiar procesos**
```bash
sleep 5
```

3. **Reiniciar MongoDB**
```bash
brew services start mongodb/brew/mongodb-community
```

4. **Ir al directorio correcto**
```bash
cd /Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao
```

5. **Usar el script de inicio**
```bash
./start-app.sh
```

---

## 📞 Información de Contacto y Soporte

### Estructura de Archivos Importantes
```
Proyecto_Cacao/
├── server/              # Backend (Node.js + Express)
├── client/              # Frontend (React)
├── .env                 # Variables de entorno del backend
├── client/.env          # Variables de entorno del frontend
├── start-app.sh         # Script de inicio automático
├── create-admin.js      # Script para crear administrador
├── test-login.html      # Página de prueba de conectividad
└── GUIA-GESTION-APLICACION.md  # Esta guía
```

### Variables de Entorno Importantes
- `PORT=8000` (Backend)
- `MONGODB_URI=mongodb://localhost:27017/cacao_control`
- `REACT_APP_API_BASE_URL=http://localhost:8000` (Frontend)

---

## ✅ Lista de Verificación Rápida

Antes de reportar problemas, verifica:

- [ ] MongoDB está ejecutándose: `brew services list | grep mongodb`
- [ ] Backend responde: `curl http://localhost:8000/api/health`
- [ ] Frontend carga: Abrir http://localhost:3000
- [ ] Estás en el directorio correcto: `/Users/carlosmartinez/Documents/JavasScript/Proyecto_Cacao`
- [ ] Los puertos están libres: `lsof -i :3000 && lsof -i :8000`

---

**🌱 ¡CacaoControl - Gestión Inteligente de Cultivo de Cacao en Granada, Meta! 🇨🇴**

*Última actualización: $(date)*
