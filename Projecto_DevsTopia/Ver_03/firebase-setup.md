# 🔥 Configuración del Chat con Firebase - DevsTopia

## 📋 Pasos para configurar Firebase

### 1. Crear Proyecto en Firebase Console

1. **Ir a Firebase Console**: https://console.firebase.google.com/
2. **Crear nuevo proyecto**:
   - Nombre: `devstopia-chat`
   - Habilitar Google Analytics (opcional)
   - Crear proyecto

### 2. Configurar Realtime Database

1. **En el panel de Firebase**:
   - Ir a "Realtime Database"
   - Crear base de datos
   - Elegir ubicación: `us-central1` (recomendado)
   - Iniciar en modo de prueba (para desarrollo)

2. **Configurar reglas de seguridad**:
```json
{
  "rules": {
    "chat": {
      ".read": true,
      ".write": true
    },
    "users": {
      "$uid": {
        ".read": true,
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

### 3. Obtener Configuración

1. **En Configuración del proyecto**:
   - Ir a "Configuración del proyecto"
   - Pestaña "General"
   - Bajar a "Tus apps"
   - Hacer clic en el ícono de web (</>)
   - Registrar app: `devstopia-chat-web`

2. **Copiar configuración**:
```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "devstopia-chat.firebaseapp.com",
  databaseURL: "https://devstopia-chat-default-rtdb.firebaseio.com",
  projectId: "devstopia-chat",
  storageBucket: "devstopia-chat.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

### 4. Instalar Firebase en el proyecto

```bash
cd Projecto_DevsTopia/Ver_03
npm install firebase
```

### 5. Configurar Firebase en el HTML

Agregar los SDKs de Firebase al HTML:

```html
<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
```

### 6. Crear archivo de configuración Firebase

Crear `firebase-config.js`:

```javascript
// Firebase configuration
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "devstopia-chat.firebaseapp.com",
  databaseURL: "https://devstopia-chat-default-rtdb.firebaseio.com",
  projectId: "devstopia-chat",
  storageBucket: "devstopia-chat.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = firebase.database();

// Export for use in other files
window.firebaseDB = database;
```

### 7. Actualizar el JavaScript del chat

Reemplazar Socket.io con Firebase en `script.js`:

```javascript
// Chat en vivo con Firebase
let chatConnected = false;
let messagesRef = null;
let typingRef = null;

// Inicializar conexión del chat con Firebase
function initializeChat() {
    try {
        // Verificar que Firebase esté disponible
        if (typeof firebase === 'undefined') {
            console.error('Firebase no está cargado');
            showNotification('Error: Firebase no disponible', 'error');
            return;
        }

        // Obtener referencia a la base de datos
        messagesRef = firebase.database().ref('chat/messages');
        typingRef = firebase.database().ref('chat/typing');
        
        // Configurar listeners
        setupFirebaseListeners();
        
        chatConnected = true;
        console.log('✅ Conectado a Firebase');
        showChatStatus('Conectado');
        showNotification('Chat conectado', 'success');
        
    } catch (error) {
        console.error('Error al conectar a Firebase:', error);
        showNotification('Error al conectar al chat', 'error');
    }
}

// Configurar listeners de Firebase
function setupFirebaseListeners() {
    // Escuchar nuevos mensajes
    messagesRef.limitToLast(50).on('child_added', (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    });
    
    // Escuchar cambios en el indicador de escritura
    typingRef.on('value', (snapshot) => {
        const typingUsers = snapshot.val();
        if (typingUsers) {
            const typingUserIds = Object.keys(typingUsers);
            if (typingUserIds.length > 0) {
                showTypingIndicator();
            } else {
                hideTypingIndicator();
            }
        } else {
            hideTypingIndicator();
        }
    });
}

// Función para enviar mensajes
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message && chatConnected) {
        // Crear mensaje
        const messageData = {
            id: Date.now() + Math.random(),
            user: 'Usuario',
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            userId: generateUserId()
        };
        
        // Enviar a Firebase
        messagesRef.push(messageData);
        
        // Limpiar input
        chatInput.value = '';
        
        // Guardar en historial local
        saveMessageToHistory(messageData);
        
    } else if (!chatConnected) {
        showNotification('Chat no disponible. Intenta más tarde.', 'error');
    } else if (!message) {
        showNotification('Por favor escribe un mensaje', 'error');
    }
}

// Generar ID único para el usuario
function generateUserId() {
    let userId = localStorage.getItem('chatUserId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('chatUserId', userId);
    }
    return userId;
}

// Manejar escritura en tiempo real
function handleTyping() {
    if (chatConnected) {
        const userId = generateUserId();
        
        // Indicar que el usuario está escribiendo
        typingRef.child(userId).set({
            user: 'Usuario',
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        
        // Limpiar timeout anterior
        if (window.typingTimeout) {
            clearTimeout(window.typingTimeout);
        }
        
        // Detener indicador después de 3 segundos
        window.typingTimeout = setTimeout(() => {
            typingRef.child(userId).remove();
        }, 3000);
    }
}

// Función para mostrar mensajes
function displayMessage(data) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${data.user === 'Usuario' ? 'user' : 'bot'}`;
    
    const time = new Date(data.timestamp).toLocaleTimeString();
    const isSystem = data.type === 'system';
    
    if (isSystem) {
        messageDiv.className = 'message system';
    }
    
    messageDiv.innerHTML = `
        <p>${data.message}</p>
        <small>${time}</small>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Guardar en historial local
    saveMessageToHistory(data);
}

// Indicador de escritura
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    let typingIndicator = document.querySelector('.typing-indicator');
    
    if (!typingIndicator) {
        typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot typing-indicator';
        typingIndicator.innerHTML = '<p>🔄 Alguien está escribiendo...</p>';
        chatMessages.appendChild(typingIndicator);
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Mostrar estado del chat
function showChatStatus(status) {
    const chatHeader = document.querySelector('.chat-header h3');
    if (chatHeader) {
        chatHeader.textContent = `Chat en Vivo - ${status}`;
    }
}

// Historial de chat
function saveMessageToHistory(message) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    chatHistory.push(message);
    
    // Mantener solo los últimos 50 mensajes
    if (chatHistory.length > 50) {
        chatHistory = chatHistory.slice(-50);
    }
    
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const chatMessages = document.getElementById('chat-messages');
    
    // Solo cargar si no hay mensajes de Firebase
    if (chatMessages.children.length <= 1) {
        chatHistory.forEach(message => {
            displayMessage(message);
        });
    }
}

// Solicitar atención del agente
function requestAgent(reason = 'Atención general') {
    if (chatConnected) {
        const agentRequestRef = firebase.database().ref('chat/agent-requests');
        agentRequestRef.push({
            reason: reason,
            userId: generateUserId(),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        
        showNotification('Solicitud enviada. Un agente te contactará pronto.', 'success');
    } else {
        showNotification('Chat no disponible', 'error');
    }
}
```

### 8. Actualizar el HTML

Agregar los SDKs de Firebase al HTML:

```html
<!-- En el head, después de los otros scripts -->
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
<script src="firebase-config.js"></script>
```

### 9. Estructura de la base de datos

La base de datos de Firebase tendrá esta estructura:

```json
{
  "chat": {
    "messages": {
      "message1": {
        "id": "1234567890",
        "user": "Usuario",
        "message": "Hola, necesito ayuda",
        "timestamp": 1640995200000,
        "userId": "user_1234567890_abc123"
      }
    },
    "typing": {
      "user_1234567890_abc123": {
        "user": "Usuario",
        "timestamp": 1640995200000
      }
    },
    "agent-requests": {
      "request1": {
        "reason": "Atención general",
        "userId": "user_1234567890_abc123",
        "timestamp": 1640995200000
      }
    }
  }
}
```

### 10. Configuración para producción

1. **Actualizar reglas de seguridad**:
```json
{
  "rules": {
    "chat": {
      "messages": {
        ".read": true,
        ".write": "auth != null || !data.exists()"
      },
      "typing": {
        ".read": true,
        ".write": true
      },
      "agent-requests": {
        ".read": "auth != null && auth.token.admin === true",
        ".write": true
      }
    }
  }
}
```

2. **Configurar autenticación** (opcional):
   - Habilitar autenticación por email/password
   - Configurar proveedores (Google, Facebook, etc.)

### 11. Ventajas de Firebase

✅ **Escalabilidad automática**
✅ **Tiempo real nativo**
✅ **Sincronización offline**
✅ **Autenticación integrada**
✅ **Hosting incluido**
✅ **Analytics integrado**
✅ **Gratis hasta 1GB/mes**

### 12. Despliegue

1. **Configurar hosting de Firebase**:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

2. **Configurar dominio personalizado**:
   - En Firebase Console > Hosting
   - Agregar dominio personalizado
   - Configurar DNS

### 13. Monitoreo

1. **Firebase Console**:
   - Realtime Database > Usage
   - Analytics > Events
   - Performance > Monitoring

2. **Alertas**:
   - Configurar alertas de uso
   - Monitorear errores
   - Seguimiento de usuarios

---

## 🎯 Próximos pasos

1. **Crear proyecto en Firebase Console**
2. **Configurar Realtime Database**
3. **Obtener configuración**
4. **Instalar dependencias**
5. **Actualizar código**
6. **Probar funcionalidad**
7. **Desplegar a producción**

¡Con Firebase tendrás un chat en vivo escalable y profesional! 🚀 