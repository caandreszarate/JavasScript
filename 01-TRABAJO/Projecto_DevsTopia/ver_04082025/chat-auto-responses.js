// Sistema de respuestas automáticas para DevsTopia Chat - Versión Tabnine
// No requiere API externa - respuestas predefinidas

// Base de conocimiento para respuestas automáticas
const AUTO_RESPONSES = {
    es: {
        // Saludos
        'hola': '¡Hola! 👋 Soy el asistente de IA de DevsTopia. ¿En qué puedo ayudarte hoy?',
        'buenos días': '¡Buenos días! ☀️ ¿Te gustaría conocer cómo nuestros agentes de IA pueden acelerar tu desarrollo?',
        'buenas tardes': '¡Buenas tardes! 🌅 ¿En qué puedo asistirte con nuestros servicios de desarrollo inteligente?',
        'buenas noches': '¡Buenas noches! 🌙 ¿Necesitas información sobre nuestros agentes de IA para desarrollo?',
        
        // Servicios principales (inspirados en Tabnine)
        'servicios': 'Nuestros agentes de IA para desarrollo incluyen:\n\n' +
                    '🔍 Agente de Revisión de Código\n' +
                    '📋 Agente de Jira (Implementación y Validación)\n' +
                    '🧠 Agente de Explicación y Onboarding\n' +
                    '🧪 Agente de Testing\n' +
                    '🔧 Agente de Corrección de Código\n' +
                    '📚 Agente de Documentación\n\n' +
                    '¿Te interesa algún agente en particular?',
        
        'agentes': 'Nuestros agentes de IA están diseñados para:\n\n' +
                   '• Acelerar tu proceso de desarrollo\n' +
                   '• Mantener la calidad del código\n' +
                   '• Reducir bugs y errores\n' +
                   '• Generar documentación automática\n\n' +
                   '¿Qué desafío de desarrollo te gustaría resolver?',
        
        'code review': 'El Agente de Revisión de Código:\n\n' +
                       '• Revisa automáticamente tus PRs\n' +
                       '• Aplica los estándares de tu empresa\n' +
                       '• Sugiere mejoras de código\n' +
                       '• Se integra con tu IDE favorito\n\n' +
                       '¿Te gustaría ver una demo?',
        
        'testing': 'El Agente de Testing genera:\n\n' +
                   '• Casos de prueba automáticos\n' +
                   '• Cobertura completa de código\n' +
                   '• Pruebas unitarias e integración\n' +
                   '• Análisis de calidad continuo\n\n' +
                   '¿Necesitas mejorar tu cobertura de testing?',
        
        'documentación': 'El Agente de Documentación crea:\n\n' +
                         '• Documentación técnica automática\n' +
                         '• Guías de API\n' +
                         '• Comentarios inline inteligentes\n' +
                         '• Documentación de arquitectura\n\n' +
                         '¿Tu equipo necesita mejor documentación?',
        
        // Precios y demo
        'precio': 'Ofrecemos diferentes planes:\n\n' +
                  '• Demo gratuita personalizada\n' +
                  '• Planes escalables por equipo\n' +
                  '• Implementación empresarial\n' +
                  '• Soporte técnico dedicado\n\n' +
                  '¿Te gustaría programar una demo en vivo?',
        
        'demo': 'Perfecto! Nuestra demo en vivo incluye:\n\n' +
                '• Revisión de tu código actual\n' +
                '• Demostración personalizada\n' +
                '• Análisis de ROI para tu equipo\n' +
                '• Plan de implementación\n\n' +
                '¿Prefieres una reunión presencial o virtual?',
        
        // Contacto
        'contacto': 'Puedes contactarnos:\n\n' +
                    '📧 info@devstopia.com\n' +
                    '📱 +240 222 311 498\n' +
                    '📱 +57 315 057 0742\n' +
                    '🌍 Bogotá, Colombia\n\n' +
                    '¿Prefieres que te contactemos nosotros?',
        
        // Tecnologías
        'tecnologías': 'Nuestros agentes funcionan con:\n\n' +
                       '• VS Code, IntelliJ, Eclipse\n' +
                       '• JavaScript, Python, Java, C#\n' +
                       '• Git, GitHub, GitLab, Bitbucket\n' +
                       '• Jira, Azure DevOps, Slack\n\n' +
                       '¿Usas alguna de estas herramientas?',
        
        // Seguridad y privacidad
        'privacidad': 'Tu código está 100% seguro:\n\n' +
                      '• Cero retención de datos\n' +
                      '• Deployment privado disponible\n' +
                      '• Cumplimiento enterprise\n' +
                      '• Cifrado end-to-end\n\n' +
                      'La privacidad es nuestra prioridad #1.',
        
        'seguridad': 'Garantizamos máxima seguridad:\n\n' +
                     '• Tu código nunca se almacena\n' +
                     '• Modelos entrenados solo con código permisivo\n' +
                     '• Auditorías de seguridad regulares\n' +
                     '• Certificaciones enterprise\n\n' +
                     '¿Tienes requisitos específicos de compliance?',
        
        // Por defecto
        'default': 'Gracias por tu mensaje. Soy el asistente de IA de DevsTopia. Puedo ayudarte con información sobre nuestros agentes de IA para desarrollo de software. ¿En qué puedo asistirte? 🤖✨'
    },
    
    en: {
        // Greetings
        'hello': 'Hello! 👋 I\'m the DevsTopia AI assistant. How can I help you today?',
        'good morning': 'Good morning! ☀️ Would you like to know how our AI agents can accelerate your development?',
        'good afternoon': 'Good afternoon! 🌅 How can I assist you with our intelligent development services?',
        'good evening': 'Good evening! 🌙 Do you need information about our AI agents for development?',
        
        // Main services (Tabnine inspired)
        'services': 'Our AI development agents include:\n\n' +
                   '🔍 Code Review Agent\n' +
                   '📋 Jira Agent (Implementation & Validation)\n' +
                   '🧠 Code Explanation & Onboarding Agent\n' +
                   '🧪 Testing Agent\n' +
                   '🔧 Code Fix Agent\n' +
                   '📚 Documentation Agent\n\n' +
                   'Are you interested in any particular agent?',
        
        'agents': 'Our AI agents are designed to:\n\n' +
                 '• Accelerate your development process\n' +
                 '• Maintain code quality\n' +
                 '• Reduce bugs and errors\n' +
                 '• Generate automatic documentation\n\n' +
                 'What development challenge would you like to solve?',
        
        'code review': 'The Code Review Agent:\n\n' +
                      '• Automatically reviews your PRs\n' +
                      '• Applies your company standards\n' +
                      '• Suggests code improvements\n' +
                      '• Integrates with your favorite IDE\n\n' +
                      'Would you like to see a demo?',
        
        'testing': 'The Testing Agent generates:\n\n' +
                  '• Automatic test cases\n' +
                  '• Complete code coverage\n' +
                  '• Unit and integration tests\n' +
                  '• Continuous quality analysis\n\n' +
                  'Do you need to improve your testing coverage?',
        
        'documentation': 'The Documentation Agent creates:\n\n' +
                        '• Automatic technical documentation\n' +
                        '• API guides\n' +
                        '• Smart inline comments\n' +
                        '• Architecture documentation\n\n' +
                        'Does your team need better documentation?',
        
        // Pricing and demo
        'price': 'We offer different plans:\n\n' +
                '• Free personalized demo\n' +
                '• Scalable team plans\n' +
                '• Enterprise implementation\n' +
                '• Dedicated technical support\n\n' +
                'Would you like to schedule a live demo?',
        
        'demo': 'Perfect! Our live demo includes:\n\n' +
               '• Review of your current code\n' +
               '• Personalized demonstration\n' +
               '• ROI analysis for your team\n' +
               '• Implementation plan\n\n' +
               'Do you prefer an in-person or virtual meeting?',
        
        // Contact
        'contact': 'You can contact us:\n\n' +
                  '📧 info@devstopia.com\n' +
                  '📱 +240 222 311 498\n' +
                  '📱 +57 315 057 0742\n' +
                  '🌍 Bogotá, Colombia\n\n' +
                  'Would you prefer us to contact you?',
        
        // Technologies
        'technologies': 'Our agents work with:\n\n' +
                       '• VS Code, IntelliJ, Eclipse\n' +
                       '• JavaScript, Python, Java, C#\n' +
                       '• Git, GitHub, GitLab, Bitbucket\n' +
                       '• Jira, Azure DevOps, Slack\n\n' +
                       'Do you use any of these tools?',
        
        // Security and privacy
        'privacy': 'Your code is 100% secure:\n\n' +
                  '• Zero data retention\n' +
                  '• Private deployment available\n' +
                  '• Enterprise compliance\n' +
                  '• End-to-end encryption\n\n' +
                  'Privacy is our #1 priority.',
        
        'security': 'We guarantee maximum security:\n\n' +
                   '• Your code is never stored\n' +
                   '• Models trained only on permissive code\n' +
                   '• Regular security audits\n' +
                   '• Enterprise certifications\n\n' +
                   'Do you have specific compliance requirements?',
        
        // Default
        'default': 'Thank you for your message. I\'m the DevsTopia AI assistant. I can help you with information about our AI agents for software development. How can I assist you? 🤖✨'
    }
};

// Función para procesar mensaje y encontrar respuesta automática
function processAutoResponse(userMessage) {
    const currentLang = getCurrentLanguage() || 'es';
    const responses = AUTO_RESPONSES[currentLang] || AUTO_RESPONSES.es;
    const message = userMessage.toLowerCase().trim();
    
    // Buscar palabras clave en el mensaje
    for (const [keyword, response] of Object.entries(responses)) {
        if (message.includes(keyword)) {
            return response;
        }
    }
    
    // Si no encuentra coincidencias, usar respuesta por defecto
    return responses.default;
}

// Función para enviar mensaje con respuestas automáticas
function sendMessageWithAutoResponse() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        // Agregar mensaje del usuario
        addChatMessage(message, 'user');
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
            addChatMessage(autoResponse, 'bot');
            
            // Guardar en Firebase si está disponible
            if (window.firebase && window.firebase.database) {
                const messagesRef = window.firebase.ref(window.firebase.database, 'chat_messages');
                window.firebase.push(messagesRef, {
                    userMessage: message,
                    botResponse: autoResponse,
                    timestamp: window.firebase.serverTimestamp(),
                    session: getSessionId(),
                    type: 'auto-response'
                });
            }
            
        }, 1000 + Math.random() * 1500); // Tiempo variable de respuesta
        
    } else {
        showNotification(getCurrentLanguage() === 'es' ? 
            'Por favor escribe un mensaje' : 
            'Please write a message', 'error');
    }
}

// Mostrar indicador de respuesta automática
function showAutoResponseThinking() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message bot';
    thinkingDiv.id = 'auto-thinking';
    thinkingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    // Agregar estilos para los puntos de "pensando"
    if (!document.querySelector('#thinking-styles')) {
        const styles = document.createElement('style');
        styles.id = 'thinking-styles';
        styles.textContent = `
            .thinking-dots {
                display: flex;
                gap: 4px;
                padding: 8px 0;
            }
            .thinking-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: var(--primary-blue);
                animation: bounce 1.4s ease-in-out infinite both;
            }
            .thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
            .thinking-dots span:nth-child(2) { animation-delay: -0.16s; }
            .thinking-dots span:nth-child(3) { animation-delay: 0s; }
            @keyframes bounce {
                0%, 80%, 100% {
                    transform: scale(0);
                } 40% {
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
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

// Función auxiliar para agregar mensaje al chat (reutiliza la función principal)
function addChatMessage(message, type) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Convertir saltos de línea a HTML
    const formattedMessage = message.replace(/\n/g, '<br>');
    content.innerHTML = `<p>${formattedMessage}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función auxiliar para obtener sesión
function getSessionId() {
    let sessionId = localStorage.getItem('devstopia-session');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('devstopia-session', sessionId);
    }
    return sessionId;
}

// Función auxiliar para obtener idioma actual
function getCurrentLanguage() {
    return localStorage.getItem('devstopia-language') || 'es';
}

// Función auxiliar para mostrar notificaciones
function showNotification(message, type = 'info') {
    console.log(`Notification: ${message} (${type})`);
    // Esta función se implementa en el script principal
}

// Exportar funciones
window.sendMessageWithAutoResponse = sendMessageWithAutoResponse;
window.processAutoResponse = processAutoResponse;
window.addChatMessage = addChatMessage;

console.log('🤖 Sistema de respuestas automáticas DevsTopia v3.0 (Tabnine) cargado');