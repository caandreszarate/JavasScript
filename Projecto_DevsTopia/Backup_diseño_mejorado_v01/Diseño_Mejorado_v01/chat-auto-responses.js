// Sistema de respuestas automáticas para DevsTopia Chat
// No requiere API externa - respuestas predefinidas

// Base de conocimiento para respuestas automáticas
const AUTO_RESPONSES = {
    // Saludos
    'hola': '¡Hola! 👋 Soy el asistente virtual de DevsTopia. ¿En qué puedo ayudarte hoy?',
    'buenos días': '¡Buenos días! ☀️ ¿Te gustaría conocer nuestros servicios de desarrollo de software?',
    'buenas tardes': '¡Buenas tardes! 🌅 ¿En qué puedo asistirte con respecto a nuestros servicios?',
    'buenas noches': '¡Buenas noches! 🌙 ¿Necesitas información sobre nuestros servicios?',
    
    // Servicios
    'servicios': 'Ofrecemos los siguientes servicios:\n\n' +
                '🖥️ Desarrollo de Software a Medida\n' +
                '🌐 Aplicaciones Web\n' +
                '📱 Apps Móviles\n' +
                '🤖 Automatización de Procesos\n' +
                '☁️ Servicios en la Nube\n' +
                '🔒 Ciberseguridad\n\n' +
                '¿Te interesa alguno en particular?',
    
    'desarrollo': 'Nuestro servicio de desarrollo incluye:\n\n' +
                 '• Aplicaciones web personalizadas\n' +
                 '• Sistemas empresariales\n' +
                 '• Integración con APIs\n' +
                 '• Mantenimiento y soporte\n\n' +
                 '¿Te gustaría una cotización?',
    
    'web': 'Nuestras aplicaciones web incluyen:\n\n' +
           '• Sitios corporativos\n' +
           '• E-commerce\n' +
           '• Sistemas de gestión\n' +
           '• Dashboards interactivos\n\n' +
           '¿Qué tipo de proyecto tienes en mente?',
    
    'móvil': 'Desarrollamos apps móviles para:\n\n' +
             '• iOS y Android\n' +
             '• Apps híbridas\n' +
             '• Apps nativas\n' +
             '• Publicación en tiendas\n\n' +
             '¿Tienes una idea específica?',
    
    // Precios
    'precio': 'Los precios varían según el proyecto. Te ofrecemos:\n\n' +
              '• Cotización gratuita\n' +
              '• Presupuestos personalizados\n' +
              '• Diferentes paquetes\n\n' +
              '¿Te gustaría que te contactemos para una evaluación?',
    
    'cotización': 'Para darte una cotización precisa necesitamos:\n\n' +
                  '• Descripción del proyecto\n' +
                  '• Funcionalidades requeridas\n' +
                  '• Plazo estimado\n\n' +
                  '¿Puedes contarme más sobre tu proyecto?',
    
    // Contacto
    'contacto': 'Puedes contactarnos por:\n\n' +
                '📧 Email: info@devstopia.com\n' +
                '📱 WhatsApp: +57 300 123 4567\n' +
                '🌐 Web: www.devstopia.com\n\n' +
                '¿Prefieres algún método en particular?',
    
    'email': 'Nuestro email es: info@devstopia.com\n\n' +
             'Te responderemos en menos de 24 horas.',
    
    'teléfono': 'Puedes llamarnos al: +57 300 123 4567\n\n' +
                'Horario: Lunes a Viernes 8:00 AM - 6:00 PM',
    
    // Ubicación
    'ubicación': 'Estamos ubicados en Bogotá, Colombia.\n\n' +
                 'También trabajamos con clientes de todo el mundo de forma remota.',
    
    'bogotá': 'Sí, estamos en Bogotá. ¿Te gustaría agendar una reunión presencial o virtual?',
    
    // Tecnologías
    'tecnologías': 'Trabajamos con las mejores tecnologías:\n\n' +
                   'Frontend: React, Vue, Angular\n' +
                   'Backend: Node.js, Python, Java\n' +
                   'Móvil: React Native, Flutter\n' +
                   'Base de datos: PostgreSQL, MongoDB\n' +
                   'Cloud: AWS, Google Cloud, Azure\n\n' +
                   '¿Hay alguna tecnología específica que te interese?',
    
    // Plazos
    'tiempo': 'Los plazos dependen del proyecto:\n\n' +
              '• Landing pages: 1-2 semanas\n' +
              '• Aplicaciones web: 1-3 meses\n' +
              '• Apps móviles: 2-4 meses\n' +
              '• Sistemas complejos: 3-6 meses\n\n' +
              '¿Cuál es tu timeline ideal?',
    
    // Por defecto
    'default': 'Gracias por tu mensaje. Soy el asistente virtual de DevsTopia y puedo ayudarte con información sobre nuestros servicios de desarrollo de software. ¿En qué puedo asistirte?'
};

// Función para procesar mensaje y encontrar respuesta automática
function processAutoResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Buscar palabras clave en el mensaje
    for (const [keyword, response] of Object.entries(AUTO_RESPONSES)) {
        if (message.includes(keyword)) {
            return response;
        }
    }
    
    // Si no encuentra coincidencias, usar respuesta por defecto
    return AUTO_RESPONSES.default;
}

// Función para enviar mensaje con respuestas automáticas
function sendMessageWithAutoResponse() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        // Mostrar mensaje del usuario
        const userMessageData = {
            id: Date.now() + Math.random(),
            user: 'Usuario',
            message: message,
            timestamp: new Date(),
            userId: 'user-' + Date.now(),
            type: 'user'
        };
        
        // Mostrar mensaje del usuario en el chat
        displayMessage(userMessageData);
        
        // Limpiar input
        chatInput.value = '';
        
        // Mostrar indicador de "escribiendo"
        showAutoResponseThinking();
        
        // Simular tiempo de procesamiento
        setTimeout(() => {
            // Ocultar indicador
            hideAutoResponseThinking();
            
            // Procesar respuesta automática
            const autoResponse = processAutoResponse(message);
            
            // Mostrar respuesta automática
            const autoResponseData = {
                id: Date.now() + Math.random() + 1,
                user: 'Asistente DevsTopia',
                message: autoResponse,
                timestamp: new Date(),
                userId: 'auto-assistant',
                type: 'auto'
            };
            
            // Mostrar respuesta automática en el chat
            displayMessage(autoResponseData);
            
        }, 1500); // Simular 1.5 segundos de "pensamiento"
        
    } else if (!message) {
        showNotification('Por favor escribe un mensaje', 'error');
    }
}

// Mostrar indicador de respuesta automática
function showAutoResponseThinking() {
    const chatMessages = document.getElementById('chat-messages');
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message bot';
    thinkingDiv.id = 'auto-thinking';
    thinkingDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">
                <div class="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    chatMessages.appendChild(thinkingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Ocultar indicador de respuesta automática
function hideAutoResponseThinking() {
    const thinkingDiv = document.getElementById('auto-thinking');
    if (thinkingDiv) {
        thinkingDiv.remove();
    }
}

// Exportar funciones
window.sendMessageWithAutoResponse = sendMessageWithAutoResponse;
window.processAutoResponse = processAutoResponse; 