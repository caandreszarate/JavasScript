# 🚀 Configuración del Chat en Vivo - DevsTopia

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Un editor de código (VS Code recomendado)

## 🛠️ Instalación y Configuración

### 1. Instalar Dependencias

```bash
# Navegar al directorio del proyecto
cd Projecto_DevsTopia/Ver_03

# Instalar dependencias
npm install
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Configuración del Chat en Vivo - DevsTopia
PORT=3001
NODE_ENV=development

# Configuración de Socket.io
SOCKET_CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:5500,https://devstopia.com

# Configuración de EmailJS (ya configurado)
EMAILJS_PUBLIC_KEY=InSUx70NIu3r1_L5V
EMAILJS_SERVICE_ID=service_kgnumgb
EMAILJS_TEMPLATE_ID=template_ojoaqyd
```

### 3. Iniciar el Servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

### 4. Verificar la Conexión

El servidor estará disponible en:
- **Frontend**: http://localhost:3001
- **API de chat**: http://localhost:3001/api/chat/status
- **Mensajes**: http://localhost:3001/api/chat/messages

## 🎯 Características del Chat

### ✅ Funcionalidades Implementadas

1. **Conexión en Tiempo Real**
   - Socket.io para comunicación bidireccional
   - Reconexión automática
   - Indicadores de estado de conexión

2. **Mensajería**
   - Envío y recepción de mensajes en tiempo real
   - Historial de mensajes (últimos 50)
   - Timestamps en cada mensaje
   - Mensajes del sistema

3. **Indicadores de Escritura**
   - "Alguien está escribiendo..." en tiempo real
   - Detección automática de escritura
   - Timeout de 2 segundos

4. **Interfaz de Usuario**
   - Diseño responsive
   - Animaciones suaves
   - Notificaciones de estado
   - Scroll automático a nuevos mensajes

5. **Persistencia Local**
   - Historial guardado en localStorage
   - Carga automática al abrir el chat
   - Límite de 50 mensajes en historial

### 🔧 Configuración Avanzada

#### Para Producción

1. **Cambiar URL del servidor** en `script.js`:
```javascript
socket = io('https://tu-dominio.com:3001');
```

2. **Configurar CORS** en `server.js`:
```javascript
cors: {
    origin: ["https://devstopia.com", "https://www.devstopia.com"],
    methods: ["GET", "POST"],
    credentials: true
}
```

3. **Usar base de datos** en lugar de almacenamiento en memoria:
```javascript
// Ejemplo con MongoDB
const mongoose = require('mongoose');
const Message = require('./models/Message');

// Guardar mensaje
const newMessage = new Message({
    user: data.user,
    message: data.message,
    timestamp: new Date()
});
await newMessage.save();
```

#### Integración con Firebase

Si prefieres usar Firebase en lugar de Socket.io:

1. **Instalar Firebase**:
```bash
npm install firebase
```

2. **Configurar Firebase** en el HTML:
```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"></script>
```

3. **Reemplazar Socket.io** con Firebase Realtime Database

## 🧪 Pruebas

### Probar el Chat

1. **Abrir múltiples pestañas** del navegador
2. **Enviar mensajes** desde diferentes pestañas
3. **Verificar** que los mensajes aparezcan en todas las pestañas
4. **Probar** el indicador de escritura
5. **Verificar** la persistencia del historial

### Comandos de Prueba

```bash
# Verificar que el servidor está corriendo
curl http://localhost:3001/api/chat/status

# Ver mensajes recientes
curl http://localhost:3001/api/chat/messages
```

## 🔍 Solución de Problemas

### Error de Conexión

1. **Verificar que el servidor esté corriendo**:
```bash
npm run dev
```

2. **Verificar el puerto** en la consola del navegador
3. **Revisar CORS** si hay errores de conexión

### Chat No Se Conecta

1. **Verificar la URL** en `script.js`
2. **Revisar la consola** del navegador para errores
3. **Verificar** que Socket.io se cargue correctamente

### Mensajes No Aparecen

1. **Verificar** que el chat esté conectado
2. **Revisar** la consola del servidor
3. **Verificar** que los eventos se emitan correctamente

## 📱 Características Adicionales

### Notificaciones Push

Para implementar notificaciones push:

```javascript
// Solicitar permisos
if ('Notification' in window) {
    Notification.requestPermission();
}

// Enviar notificación
function sendNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    }
}
```

### Integración con Agentes

Para conectar con agentes reales:

1. **Crear sala de agentes** en el servidor
2. **Implementar sistema de cola** de mensajes
3. **Agregar autenticación** para agentes
4. **Implementar transferencia** de conversaciones

## 🚀 Despliegue

### Heroku

```bash
# Crear app en Heroku
heroku create devstopia-chat

# Configurar variables de entorno
heroku config:set NODE_ENV=production

# Desplegar
git push heroku main
```

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### DigitalOcean

```bash
# Configurar droplet
# Instalar Node.js
# Configurar PM2
pm2 start server.js --name "devstopia-chat"
```

## 📞 Soporte

Para problemas o preguntas:
- **Email**: info@devstopia.com
- **Documentación**: Revisar este archivo
- **Issues**: Crear issue en el repositorio

---

¡El chat en vivo está listo para usar! 🎉 