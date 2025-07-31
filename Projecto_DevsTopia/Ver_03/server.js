const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:5500", "https://devstopia.com"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Almacenamiento temporal de mensajes (en producción usar base de datos)
let chatMessages = [];
let connectedUsers = new Set();

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/chat/messages', (req, res) => {
    res.json(chatMessages.slice(-50)); // Últimos 50 mensajes
});

app.get('/api/chat/status', (req, res) => {
    res.json({
        connectedUsers: connectedUsers.size,
        totalMessages: chatMessages.length,
        serverTime: new Date().toISOString()
    });
});

// Manejo de conexiones Socket.io
io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
    connectedUsers.add(socket.id);
    
    // Emitir estadísticas actualizadas
    io.emit('chat-stats', {
        connectedUsers: connectedUsers.size,
        totalMessages: chatMessages.length
    });
    
    // Enviar mensajes recientes al nuevo usuario
    socket.emit('chat-history', chatMessages.slice(-20));
    
    // Unir al usuario a la sala principal
    socket.join('main-chat');
    
    // Manejar mensajes del chat
    socket.on('chat-message', (data) => {
        const messageData = {
            id: Date.now() + Math.random(),
            user: data.user || 'Usuario',
            message: data.message,
            timestamp: new Date().toISOString(),
            socketId: socket.id
        };
        
        // Guardar mensaje
        chatMessages.push(messageData);
        
        // Mantener solo los últimos 100 mensajes
        if (chatMessages.length > 100) {
            chatMessages = chatMessages.slice(-100);
        }
        
        // Emitir mensaje a todos los usuarios
        io.to('main-chat').emit('chat-message', messageData);
        
        // Emitir estadísticas actualizadas
        io.emit('chat-stats', {
            connectedUsers: connectedUsers.size,
            totalMessages: chatMessages.length
        });
        
        console.log(`Mensaje de ${socket.id}: ${data.message}`);
    });
    
    // Manejar indicador de escritura
    socket.on('typing-start', () => {
        socket.to('main-chat').emit('user-typing', {
            userId: socket.id,
            user: 'Usuario'
        });
    });
    
    socket.on('typing-stop', () => {
        socket.to('main-chat').emit('user-stop-typing', {
            userId: socket.id
        });
    });
    
    // Manejar solicitud de atención del agente
    socket.on('request-agent', (data) => {
        console.log(`Solicitud de agente de ${socket.id}: ${data.reason}`);
        
        // Notificar a todos los agentes (en producción)
        io.to('agents-room').emit('agent-request', {
            userId: socket.id,
            reason: data.reason,
            timestamp: new Date().toISOString()
        });
        
        // Confirmar al usuario
        socket.emit('agent-request-confirmed', {
            message: 'Tu solicitud ha sido enviada. Un agente te contactará pronto.'
        });
    });
    
    // Manejar desconexión
    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
        connectedUsers.delete(socket.id);
        
        // Emitir estadísticas actualizadas
        io.emit('chat-stats', {
            connectedUsers: connectedUsers.size,
            totalMessages: chatMessages.length
        });
    });
});

// Función para enviar mensaje del sistema
function sendSystemMessage(message) {
    const systemMessage = {
        id: Date.now() + Math.random(),
        user: 'Sistema',
        message: message,
        timestamp: new Date().toISOString(),
        type: 'system'
    };
    
    chatMessages.push(systemMessage);
    io.to('main-chat').emit('chat-message', systemMessage);
}

// Enviar mensaje de bienvenida cada 5 minutos
setInterval(() => {
    if (connectedUsers.size > 0) {
        sendSystemMessage('¡Bienvenidos al chat de DevsTopia! ¿En qué podemos ayudarte?');
    }
}, 300000); // 5 minutos

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 Servidor de chat corriendo en puerto ${PORT}`);
    console.log(`📱 Conecta tu frontend a: http://localhost:${PORT}`);
    console.log(`📊 Estadísticas disponibles en: http://localhost:${PORT}/api/chat/status`);
});

// Manejo de errores
process.on('uncaughtException', (err) => {
    console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', reason);
}); 