# Configuración del Chat en Vivo - DevsTopia

## Opciones de Backend Recomendadas

### 1. **Socket.io (Recomendado)**
```bash
# Instalar dependencias
npm init -y
npm install express socket.io cors
```

**Archivo: server.js**
```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.static('public'));

// Manejo de conexiones del chat
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);
    
    // Unir al usuario a una sala de chat
    socket.join('chat-room');
    
    // Manejar mensajes del chat
    socket.on('chat-message', (data) => {
        // Guardar mensaje en base de datos (opcional)
        console.log('Mensaje recibido:', data);
        
        // Enviar mensaje a todos en la sala
        io.to('chat-room').emit('chat-message', {
            user: data.user,
            message: data.message,
            timestamp: new Date()
        });
    });
    
    // Manejar desconexión
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

### 2. **Firebase Realtime Database**
```javascript
// En tu HTML, agregar Firebase SDK
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"></script>

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
```

### 3. **Pusher (Solución SaaS)**
```javascript
// En tu HTML
<script src="https://js.pusher.com/7.0/pusher.min.js"></script>

// Configuración
const pusher = new Pusher('tu-app-key', {
    cluster: 'tu-cluster'
});

const channel = pusher.subscribe('chat-channel');
channel.bind('message', function(data) {
    // Manejar mensaje recibido
    displayMessage(data);
});
```

## Configuración del Frontend

### Actualizar el JavaScript del chat:

```javascript
// Configuración del chat en vivo
let socket = null;
let chatConnected = false;

// Inicializar conexión del chat
function initializeChat() {
    // Para Socket.io
    socket = io('http://localhost:3001');
    
    socket.on('connect', () => {
        chatConnected = true;
        console.log('Conectado al chat');
        showChatStatus('Conectado');
    });
    
    socket.on('disconnect', () => {
        chatConnected = false;
        console.log('Desconectado del chat');
        showChatStatus('Desconectado');
    });
    
    socket.on('chat-message', (data) => {
        displayMessage(data);
    });
}

// Función mejorada para enviar mensajes
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message && chatConnected) {
        // Enviar mensaje al servidor
        socket.emit('chat-message', {
            user: 'Usuario',
            message: message,
            timestamp: new Date()
        });
        
        // Limpiar input
        chatInput.value = '';
    } else if (!chatConnected) {
        showNotification('Chat no disponible. Intenta más tarde.', 'error');
    }
}

// Mostrar estado del chat
function showChatStatus(status) {
    const chatHeader = document.querySelector('.chat-header h3');
    if (chatHeader) {
        chatHeader.textContent = `Chat en Vivo - ${status}`;
    }
}

// Función para mostrar mensajes
function displayMessage(data) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${data.user === 'Usuario' ? 'user' : 'bot'}`;
    
    const time = new Date(data.timestamp).toLocaleTimeString();
    messageDiv.innerHTML = `
        <p>${data.message}</p>
        <small>${time}</small>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
```

## Características Adicionales Recomendadas

### 1. **Indicador de Escritura**
```javascript
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.innerHTML = '<p>Agente está escribiendo...</p>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}
```

### 2. **Notificaciones Push**
```javascript
// Solicitar permisos de notificación
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Permisos de notificación concedidos');
            }
        });
    }
}

// Enviar notificación
function sendNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    }
}
```

### 3. **Historial de Chat**
```javascript
// Guardar mensajes en localStorage
function saveMessageToHistory(message) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    chatHistory.push(message);
    
    // Mantener solo los últimos 50 mensajes
    if (chatHistory.length > 50) {
        chatHistory = chatHistory.slice(-50);
    }
    
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Cargar historial al abrir el chat
function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const chatMessages = document.getElementById('chat-messages');
    
    chatHistory.forEach(message => {
        displayMessage(message);
    });
}
```

## Pasos para Implementar

1. **Elegir backend**: Socket.io para desarrollo, Firebase/Pusher para producción
2. **Configurar servidor**: Implementar el backend elegido
3. **Actualizar frontend**: Modificar el JavaScript del chat
4. **Probar conexión**: Verificar que los mensajes se envíen y reciban
5. **Agregar características**: Indicadores de escritura, notificaciones, etc.

## Variables de Entorno

Crear archivo `.env`:
```
CHAT_SERVER_URL=http://localhost:3001
PUSHER_APP_KEY=tu-app-key
PUSHER_CLUSTER=tu-cluster
FIREBASE_API_KEY=tu-api-key
``` 