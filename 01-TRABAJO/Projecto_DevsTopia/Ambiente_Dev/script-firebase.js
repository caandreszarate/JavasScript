// Datos de la empresa DevsTopia (basado en XML mejorado)
const devsTopiaData = {
    servicios: [
        {
            nombre: "Desarrollo de Software a Medida",
            descripcion: "Soluciones personalizadas según las necesidades del cliente.",
            icono: "fas fa-code",
            detalles: [
                "Aplicaciones web",
                "Aplicaciones móviles", 
                "Sistemas empresariales",
                "Integración con APIs"
            ]
        },
        {
            nombre: "Diseño y Desarrollo Web",
            descripcion: "Para empresas que necesitan presencia digital profesional.",
            icono: "fas fa-globe",
            detalles: [
                "Sitios corporativos",
                "Landing pages",
                "Blogs",
                "Optimización SEO/UX"
            ]
        },
        {
            nombre: "Aplicaciones Móviles",
            descripcion: "Desarrollo de apps eficientes, modernas y con enfoque en experiencia de usuario.",
            icono: "fas fa-mobile-alt",
            detalles: [
                "Apps híbridas y nativas",
                "Publicación en tiendas",
                "Notificaciones push"
            ]
        },
        {
            nombre: "Automatización y Procesos Inteligentes",
            descripcion: "Aumentar eficiencia y reducir tareas manuales.",
            icono: "fas fa-robot",
            detalles: [
                "Automatización con n8n",
                "Bots de atención",
                "Workflows integrados"
            ]
        },
        {
            nombre: "Servicios en la Nube & DevOps",
            descripcion: "Escalabilidad, seguridad y rendimiento garantizado.",
            icono: "fas fa-cloud",
            detalles: [
                "Migración a la nube",
                "CI/CD",
                "Docker y Kubernetes"
            ]
        },
        {
            nombre: "Ciberseguridad y Protección de Datos",
            descripcion: "Asegura el software y los datos del cliente.",
            icono: "fas fa-shield-alt",
            detalles: [
                "Auditorías de seguridad",
                "Cifrado de datos",
                "Cumplimiento normativo"
            ]
        },
        {
            nombre: "Análisis de Datos e Inteligencia Artificial",
            descripcion: "Toma de decisiones con base en datos.",
            icono: "fas fa-chart-line",
            detalles: [
                "Dashboards",
                "Modelos predictivos",
                "Análisis de comportamiento"
            ]
        },
        {
            nombre: "QA y Testing",
            descripcion: "Asegura la calidad de cada entrega.",
            icono: "fas fa-bug",
            detalles: [
                "Pruebas funcionales",
                "Automatizadas",
                "Multiplataforma"
            ]
        },
        {
            nombre: "Soporte Técnico y Mantenimiento",
            descripcion: "Para que el cliente esté tranquilo después de la entrega.",
            icono: "fas fa-tools",
            detalles: [
                "Monitoreo",
                "Actualizaciones",
                "Corrección de bugs"
            ]
        },
        {
            nombre: "Consultoría y Transformación Digital",
            descripcion: "Para empresas que no saben por dónde empezar.",
            icono: "fas fa-lightbulb",
            detalles: [
                "Roadmap digital",
                "Capacitación",
                "Selección tecnológica"
            ]
        }
    ],
    portafolio: [
        {
            titulo: "E-commerce Platform",
            descripcion: "Plataforma de comercio electrónico completa con gestión de inventario y pagos.",
            categoria: "web",
            tecnologias: ["React", "Node.js", "MongoDB"],
            icono: "fas fa-shopping-cart"
        },
        {
            titulo: "App de Delivery",
            descripcion: "Aplicación móvil para entrega de alimentos con geolocalización.",
            categoria: "movil",
            tecnologias: ["React Native", "Firebase", "Google Maps"],
            icono: "fas fa-motorcycle"
        },
        {
            titulo: "Sistema de Gestión ERP",
            descripcion: "Software empresarial para gestión integral de recursos.",
            categoria: "software",
            tecnologias: ["Java", "Spring", "PostgreSQL"],
            icono: "fas fa-building"
        },
        {
            titulo: "Dashboard Analytics",
            descripcion: "Panel de control con análisis de datos en tiempo real.",
            categoria: "web",
            tecnologias: ["Vue.js", "D3.js", "Python"],
            icono: "fas fa-chart-bar"
        },
        {
            titulo: "App de Fitness",
            descripcion: "Aplicación para seguimiento de rutinas y nutrición.",
            categoria: "movil",
            tecnologias: ["Flutter", "SQLite", "HealthKit"],
            icono: "fas fa-dumbbell"
        },
        {
            titulo: "Sistema de Facturación",
            descripcion: "Software para gestión de facturas y contabilidad.",
            categoria: "software",
            tecnologias: ["C#", ".NET", "SQL Server"],
            icono: "fas fa-file-invoice"
        }
    ],
    blog: [
        {
            titulo: "Tendencias en Desarrollo Web 2024",
            descripcion: "Descubre las tecnologías que están marcando el futuro del desarrollo web.",
            fecha: "15 Enero 2024",
            categoria: "Tecnología",
            icono: "fas fa-laptop-code"
        },
        {
            titulo: "Cómo Implementar IA en tu Negocio",
            descripcion: "Guía práctica para integrar inteligencia artificial en procesos empresariales.",
            fecha: "10 Enero 2024",
            categoria: "Innovación",
            icono: "fas fa-brain"
        },
        {
            titulo: "Seguridad en Aplicaciones Móviles",
            descripcion: "Mejores prácticas para proteger datos en apps móviles.",
            fecha: "5 Enero 2024",
            categoria: "Seguridad",
            icono: "fas fa-mobile-alt"
        }
    ],
    faqs: [
        {
            pregunta: "¿Cuánto tiempo toma desarrollar una aplicación?",
            respuesta: "El tiempo de desarrollo varía según la complejidad del proyecto. Una aplicación web básica puede tomar 4-8 semanas, mientras que aplicaciones más complejas pueden requerir 3-6 meses o más."
        },
        {
            pregunta: "¿Ofrecen mantenimiento después del lanzamiento?",
            respuesta: "Sí, ofrecemos servicios de mantenimiento continuo, actualizaciones de seguridad, mejoras de rendimiento y soporte técnico para asegurar que tu aplicación funcione perfectamente."
        },
        {
            pregunta: "¿Trabajan con startups y pequeñas empresas?",
            respuesta: "Absolutamente. Trabajamos con empresas de todos los tamaños, desde startups hasta grandes corporaciones. Adaptamos nuestras soluciones a tu presupuesto y necesidades."
        },
        {
            pregunta: "¿Qué tecnologías utilizan?",
            respuesta: "Utilizamos las tecnologías más modernas y confiables: React, Vue.js, Node.js, Python, Java, Flutter, React Native, y más. Elegimos la mejor tecnología para cada proyecto."
        },
        {
            pregunta: "¿Proporcionan hosting y dominio?",
            respuesta: "Sí, ofrecemos servicios completos que incluyen hosting, configuración de dominio, SSL, y mantenimiento del servidor para que no tengas que preocuparte por la infraestructura."
        }
    ]
};

// Variables globales
let currentTheme = localStorage.getItem('theme') || 'light';
let chatOpen = false;

// Chat en vivo con Firebase
let chatConnected = false;
let messagesRef = null;
let typingRef = null;

// Funciones de utilidad
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #2EE6A6;' : 'background: #ff4757;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Gestión del tema
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Inicializar conexión del chat con Firebase
function initializeChat() {
    try {
        // Verificar que Firebase esté disponible
        if (typeof firebase === 'undefined' || !firebase.database) {
            console.error('Firebase no está cargado');
            showNotification('Error: Firebase no disponible', 'error');
            return;
        }

        // Obtener referencia a la base de datos usando la nueva API
        messagesRef = firebase.ref(firebase.database, 'chat/messages');
        typingRef = firebase.ref(firebase.database, 'chat/typing');
        
        // Configurar listeners
        setupFirebaseListeners();
        
        chatConnected = true;
        // Conectado a Firebase
        showChatStatus('Conectado');
        showNotification('Chat conectado', 'success');
        
    } catch (error) {
        console.error('Error al conectar a Firebase:', error);
        showNotification('Error al conectar al chat', 'error');
    }
}

// Configurar listeners de Firebase
function setupFirebaseListeners() {
    // Escuchar nuevos mensajes usando la nueva API
    const messagesQuery = firebase.ref(firebase.database, 'chat/messages');
    firebase.onValue(messagesQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Obtener los últimos 50 mensajes
            const messages = Object.values(data).slice(-50);
            messages.forEach(message => {
                displayMessage(message);
            });
        }
    });
    
    // Escuchar cambios en el indicador de escritura
    const typingQuery = firebase.ref(firebase.database, 'chat/typing');
    firebase.onValue(typingQuery, (snapshot) => {
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

// Función para enviar mensajes con IA avanzada
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message && chatConnected) {
        const userId = generateUserId();
        
        // Crear mensaje del usuario
        const userMessageData = {
            id: Date.now() + Math.random(),
            user: 'Usuario',
            message: message,
            timestamp: firebase.serverTimestamp(),
            userId: userId,
            type: 'user'
        };
        
        // Enviar mensaje del usuario a Firebase
        const messagesRef = firebase.ref(firebase.database, 'chat/messages');
        firebase.push(messagesRef, userMessageData);
        
        // Limpiar input
        chatInput.value = '';
        
        // Guardar mensaje del usuario en historial local
        saveMessageToHistory(userMessageData);
        
        // Mostrar indicador de "escribiendo" del asistente
        showAutoResponseThinking();
        
        // Procesar con IA avanzada
        setTimeout(() => {
            // Ocultar indicador de "escribiendo"
            hideAutoResponseThinking();
            
            // Procesar respuesta con IA avanzada
            const enhancedResponse = processEnhancedResponse(message, userId);
            
            // Crear respuesta del asistente
            const assistantMessageData = {
                id: Date.now() + Math.random() + 1,
                user: 'Asistente IA DevsTopia',
                message: enhancedResponse.response,
                timestamp: firebase.serverTimestamp(),
                userId: 'ai-assistant',
                type: 'assistant',
                sentiment: enhancedResponse.sentiment,
                shouldEscalate: enhancedResponse.shouldEscalate,
                recommendations: enhancedResponse.recommendations
            };
            
            // Enviar respuesta del asistente a Firebase
            firebase.push(messagesRef, assistantMessageData);
            
            // Guardar respuesta del asistente en historial local
            saveMessageToHistory(assistantMessageData);
            
            // Integrar analytics
            integrateAnalytics(userMessageData);
            integrateAnalytics(assistantMessageData);
            
            // Si debe escalar, mostrar notificación especial
            if (enhancedResponse.shouldEscalate) {
                showNotification('🚨 Conectando con especialista...', 'warning');
            }
            
        }, 2000); // Simular 2 segundos de "pensamiento" para IA
        
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
        
        // Indicar que el usuario está escribiendo usando la nueva API
        const typingRef = firebase.ref(firebase.database, `chat/typing/${userId}`);
        const typingData = {
            user: 'Usuario',
            timestamp: firebase.serverTimestamp()
        };
        
        // Usar set para escribir datos
        import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js').then(({ set }) => {
            set(typingRef, typingData);
        });
        
        // Limpiar timeout anterior
        if (window.typingTimeout) {
            clearTimeout(window.typingTimeout);
        }
        
        // Detener indicador después de 3 segundos
        window.typingTimeout = setTimeout(() => {
            import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js').then(({ remove }) => {
                remove(typingRef);
            });
        }, 3000);
    }
}

// Función para mostrar mensajes con diferentes estilos
function displayMessage(data) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    
    const time = new Date(data.timestamp).toLocaleTimeString();
    const isSystem = data.type === 'system';
    
    if (isSystem) {
        messageDiv.className = 'message system';
        messageDiv.innerHTML = `
            <p>${data.message}</p>
            <small>${time}</small>
        `;
    } else if (data.type === 'assistant') {
        messageDiv.className = 'message assistant-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="assistant-avatar">🤖</div>
                <div class="message-text">
                    <strong>${data.user}:</strong> ${data.message}
                    <small>${time}</small>
                </div>
            </div>
        `;
    } else {
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">
                    <strong>${data.user}:</strong> ${data.message}
                    <small>${time}</small>
                </div>
                <div class="user-avatar">👤</div>
            </div>
        `;
    }
    
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
        const agentRequestRef = firebase.ref(firebase.database, 'chat/agent-requests');
        const requestData = {
            reason: reason,
            userId: generateUserId(),
            timestamp: firebase.serverTimestamp()
        };
        
        firebase.push(agentRequestRef, requestData);
        
        showNotification('Solicitud enviada. Un agente te contactará pronto.', 'success');
    } else {
        showNotification('Chat no disponible', 'error');
    }
}

function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    chatOpen = !chatOpen;
    
    if (chatOpen) {
        chatContainer.classList.add('show');
        
        // Inicializar chat si no está conectado
        if (!chatConnected) {
            initializeChat();
        }
        
        // Cargar historial local
        loadChatHistory();
    } else {
        chatContainer.classList.remove('show');
    }
}

// Cargar servicios
function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = devsTopiaData.servicios.map(servicio => `
        <div class="service-card" onclick="showServiceDetails('${servicio.nombre}')" role="gridcell">
            <div class="service-icon">
                <i class="${servicio.icono}" aria-hidden="true"></i>
            </div>
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <div class="service-details" style="display: none;">
                <ul>
                    ${servicio.detalles.map(detalle => `<li>${detalle}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Cargar portafolio
function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = devsTopiaData.portafolio.map(proyecto => `
        <div class="portfolio-item" data-category="${proyecto.categoria}" role="gridcell">
            <div class="portfolio-image">
                <i class="${proyecto.icono}" aria-hidden="true"></i>
            </div>
            <div class="portfolio-content">
                <h3>${proyecto.titulo}</h3>
                <p>${proyecto.descripcion}</p>
                <div class="portfolio-tags">
                    ${proyecto.tecnologias.map(tech => `<span class="portfolio-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Cargar blog
function loadBlog() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = devsTopiaData.blog.map(articulo => `
        <article class="blog-card">
            <div class="blog-image">
                <i class="${articulo.icono}" aria-hidden="true"></i>
            </div>
            <div class="blog-content">
                <div class="blog-date">${articulo.fecha} • ${articulo.categoria}</div>
                <h3>${articulo.titulo}</h3>
                <p>${articulo.descripcion}</p>
            </div>
        </article>
    `).join('');
}

// Cargar FAQs
function loadFAQs() {
    const faqContainer = document.getElementById('faq-container');
    if (!faqContainer) return;
    
    faqContainer.innerHTML = devsTopiaData.faqs.map((faq, index) => `
        <div class="faq-item" onclick="toggleFAQ(${index})">
            <div class="faq-question">
                <span>${faq.pregunta}</span>
                <i class="fas fa-chevron-down faq-toggle" aria-hidden="true"></i>
            </div>
            <div class="faq-answer">
                ${faq.respuesta}
            </div>
        </div>
    `).join('');
}

// Funciones interactivas
function showServiceDetails(serviceName) {
    const service = devsTopiaData.servicios.find(s => s.nombre === serviceName);
    if (service) {
        showNotification(`Servicio: ${service.nombre}`, 'success');
    }
}

function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const currentItem = faqItems[index];
    
    // Cerrar todos los demás
    faqItems.forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
        }
    });
    
    // Toggle del item actual
    currentItem.classList.toggle('active');
}

function filterPortfolio(category) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Actualizar botones activos
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    event.target.classList.add('active');
    event.target.setAttribute('aria-selected', 'true');
    
    // Filtrar items
    portfolioItems.forEach(item => {
        if (category === 'todos' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// Navegación móvil
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    const isExpanded = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
}

// Scroll to top
function handleScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Modal de cotización
function openQuoteModal() {
    const modal = document.getElementById('quote-modal');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    const modal = document.getElementById('quote-modal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// Formularios
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = submitBtn.querySelector('span');
    
    // Guardar texto original
    const originalText = submitText.textContent;
    
    // Mostrar estado de carga
    submitText.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        asunto: formData.get('asunto'),
        mensaje: formData.get('mensaje')
    };
    
    // Validación básica
    if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
        showNotification('Por favor completa todos los campos', 'error');
        resetFormState(originalText);
        return;
    }
    
    // Configuración de EmailJS
    const templateParams = {
        name: data.nombre,
        email: data.email,
        subject: data.asunto,
        message: data.mensaje
    };
    
    // Enviar email usando EmailJS
    emailjs.send('service_kgnumgb', 'template_ojoaqyd', templateParams)
        .then(function(response) {
            // Email enviado exitosamente
            showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
            form.reset();
        }, function(error) {
            // Error al enviar email
            showNotification('Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
        })
        .finally(function() {
            resetFormState(originalText);
        });
}

function resetFormState(originalText = 'Enviar Mensaje') {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const submitText = submitBtn.querySelector('span');
    
    // Restaurar texto original
    submitText.textContent = originalText;
    submitBtn.disabled = false;
}

function handleQuoteForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        servicio: formData.get('servicio'),
        descripcion: formData.get('descripcion'),
        presupuesto: formData.get('presupuesto')
    };
    
    // Validación básica
    if (!data.nombre || !data.email || !data.servicio || !data.descripcion) {
        showNotification('Por favor completa todos los campos obligatorios', 'error');
        return;
    }
    
    // Simular envío
    showNotification('¡Solicitud enviada! Te contactaremos con una cotización.', 'success');
    event.target.reset();
    closeQuoteModal();
}

// Smooth scrolling para enlaces de navegación
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Cerrar menú móvil si está abierto
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Animaciones al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .blog-card, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar tema inicial
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Cargar contenido dinámico
    loadServices();
    loadPortfolio();
    loadBlog();
    loadFAQs();
    
    // Configurar eventos
    setupSmoothScrolling();
    setupScrollAnimations();
    
    // Event listeners
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteForm);
    }
    
    // Filtros del portafolio
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterPortfolio(e.target.dataset.filter);
        });
    });
    
    // Scroll event
    window.addEventListener('scroll', handleScrollToTop);
    
    // Cerrar menú móvil al hacer click fuera
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Cerrar modal al hacer click fuera
    const modal = document.getElementById('quote-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeQuoteModal();
            }
        });
    }
    
    // Chat input enter key
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Inicializar chat al cargar la página
    setTimeout(() => {
        initializeChat();
    }, 2000); // Esperar 2 segundos para que la página cargue completamente
    
    // Animación de carga inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Hacer funciones disponibles globalmente
window.scrollToSection = scrollToSection;
window.showServiceDetails = showServiceDetails;
window.toggleFAQ = toggleFAQ;
window.filterPortfolio = filterPortfolio;
window.toggleMobileMenu = toggleMobileMenu;
window.scrollToTop = scrollToTop;
window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.handleTyping = handleTyping; 