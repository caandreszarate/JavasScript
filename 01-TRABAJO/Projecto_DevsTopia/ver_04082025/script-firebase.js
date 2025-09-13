// Datos de la empresa DevsTopia - Versión Tabnine
const devsTopiaData = {
    servicios: [
        {
            id: "codeReview",
            nombre: "Agente de Revisión de Código",
            descripcion: "Revisa código en pull requests y en el IDE, proporciona correcciones basadas en los estándares únicos de tu empresa.",
            icono: "fas fa-search-plus",
            categoria: "ai-agent",
            detalles: [
                "Revisión automática de PRs",
                "Cumplimiento de estándares",
                "Sugerencias de mejora",
                "Integración con IDEs"
            ]
        },
        {
            id: "jiraAgent",
            nombre: "Agentes de Implementación y Validación Jira",
            descripcion: "Genera código de forma autónoma a partir de requisitos capturados en issues de Jira y valida que el código cumpla con ellos.",
            icono: "fas fa-tasks",
            categoria: "ai-agent",
            detalles: [
                "Generación automática desde Jira",
                "Validación de requisitos",
                "Trazabilidad completa",
                "Sincronización bidireccional"
            ]
        },
        {
            id: "codeExplain",
            nombre: "Agente de Explicación y Onboarding",
            descripcion: "Incorporación rápida a proyectos desconocidos con explicaciones en lenguaje natural del proyecto, comportamientos, dependencias y más.",
            icono: "fas fa-lightbulb",
            categoria: "ai-agent",
            detalles: [
                "Explicación de arquitectura",
                "Documentación automática",
                "Onboarding acelerado",
                "Mapeo de dependencias"
            ]
        },
        {
            id: "testingAgent",
            nombre: "Agente de Testing",
            descripcion: "Genera planes de prueba integrales con casos de prueba detallados para funciones y métodos, basándose en otras pruebas de tu base de código.",
            icono: "fas fa-vial",
            categoria: "ai-agent",
            detalles: [
                "Generación de casos de prueba",
                "Cobertura automática",
                "Pruebas unitarias e integración",
                "Análisis de calidad"
            ]
        },
        {
            id: "codeFixAgent",
            nombre: "Agente de Corrección de Código",
            descripcion: "Selecciona código con error y genera correcciones de forma autónoma con sugerencias entregadas en una vista de diferencias.",
            icono: "fas fa-wrench",
            categoria: "ai-agent",
            detalles: [
                "Detección automática de bugs",
                "Correcciones sugeridas",
                "Vista de diferencias",
                "Análisis de impacto"
            ]
        },
        {
            id: "documentationAgent",
            nombre: "Agente de Documentación",
            descripcion: "Crea documentación para cualquier código seleccionado, incluyendo documentación formal de clases y funciones para guías API, comentarios y documentación inline.",
            icono: "fas fa-file-alt",
            categoria: "ai-agent",
            detalles: [
                "Documentación automática",
                "Guías API",
                "Comentarios inline",
                "Documentación técnica"
            ]
        },
        {
            id: "cloudDevops",
            nombre: "Servicios en la Nube & DevOps",
            descripcion: "Escalabilidad, seguridad y rendimiento garantizado.",
            icono: "fas fa-cloud",
            categoria: "infrastructure",
            detalles: [
                "Migración a la nube",
                "CI/CD pipelines",
                "Docker & Kubernetes",
                "Monitoreo y alertas"
            ]
        },
        {
            id: "ciberseguridad",
            nombre: "Ciberseguridad y Protección de Datos",
            descripcion: "Asegura el software y los datos del cliente.",
            icono: "fas fa-shield-alt",
            categoria: "security",
            detalles: [
                "Auditorías de seguridad",
                "Cifrado de datos",
                "Cumplimiento normativo",
                "Análisis de vulnerabilidades"
            ]
        },
        {
            id: "analisisDatos",
            nombre: "Análisis de Datos e Inteligencia Artificial",
            descripcion: "Toma de decisiones con base en datos.",
            icono: "fas fa-chart-line",
            categoria: "ai-ml",
            detalles: [
                "Dashboards interactivos",
                "Modelos predictivos",
                "Análisis de comportamiento",
                "Machine Learning"
            ]
        },
        {
            id: "consultoria",
            nombre: "Consultoría y Transformación Digital",
            descripcion: "Para empresas que no saben por dónde empezar.",
            icono: "fas fa-compass",
            categoria: "consulting",
            detalles: [
                "Roadmap digital",
                "Capacitación técnica",
                "Selección tecnológica",
                "Estrategia de implementación"
            ]
        }
    ],
    
    portafolio: [
        {
            id: "ecommerce",
            titulo: "Plataforma E-commerce",
            descripcion: "Plataforma de comercio electrónico completa con gestión de inventario y pagos.",
            categoria: "web",
            tecnologias: ["React", "Node.js", "MongoDB", "Stripe"],
            icono: "fas fa-shopping-cart",
            imagen: "ecommerce-platform",
            destacado: true
        },
        {
            id: "delivery",
            titulo: "App de Delivery",
            descripcion: "Aplicación móvil para entrega de alimentos con geolocalización.",
            categoria: "movil",
            tecnologias: ["React Native", "Firebase", "Google Maps", "Socket.io"],
            icono: "fas fa-motorcycle",
            imagen: "delivery-app",
            destacado: true
        },
        {
            id: "erp",
            titulo: "Sistema de Gestión ERP",
            descripcion: "Software empresarial para gestión integral de recursos.",
            categoria: "software",
            tecnologias: ["Java", "Spring Boot", "PostgreSQL", "Angular"],
            icono: "fas fa-building",
            imagen: "erp-system",
            destacado: false
        },
        {
            id: "dashboard",
            titulo: "Dashboard Analytics",
            descripcion: "Panel de control con análisis de datos en tiempo real.",
            categoria: "web",
            tecnologias: ["Vue.js", "D3.js", "Python", "Redis"],
            icono: "fas fa-chart-bar",
            imagen: "analytics-dashboard",
            destacado: true
        },
        {
            id: "fitness",
            titulo: "App de Fitness",
            descripcion: "Aplicación para seguimiento de rutinas y nutrición.",
            categoria: "movil",
            tecnologias: ["Flutter", "SQLite", "HealthKit", "Firebase"],
            icono: "fas fa-dumbbell",
            imagen: "fitness-app",
            destacado: false
        },
        {
            id: "facturacion",
            titulo: "Sistema de Facturación",
            descripcion: "Software para gestión de facturas y contabilidad.",
            categoria: "software",
            tecnologias: ["C#", ".NET Core", "SQL Server", "Blazor"],
            icono: "fas fa-file-invoice",
            imagen: "billing-system",
            destacado: false
        }
    ],
    
    testimonios: [
        {
            id: 1,
            contenido: "Si no fuera por esta herramienta, mi código no estaría donde está ahora, y sería 500% más lento. Excelente extensión.",
            autor: "Jeviaun",
            cargo: "Desarrollador Senior",
            empresa: "TechCorp",
            rating: 5,
            avatar: "J"
        },
        {
            id: 2,
            contenido: "Es verdaderamente increíble. Estaba reescribiendo mi sistema de configuración y tan pronto como lo activé se sintió como si estuviera leyendo mi mente.",
            autor: "Luna L.",
            cargo: "Full Stack Developer",
            empresa: "InnovateLab",
            rating: 5,
            avatar: "L"
        },
        {
            id: 3,
            contenido: "Excelente extensión y mejor que Copilot, en mi opinión humilde.",
            autor: "Haim B.",
            cargo: "Software Architect",
            empresa: "DevSolutions",
            rating: 5,
            avatar: "H"
        },
        {
            id: 4,
            contenido: "DevsTopia proporciona una funcionalidad impresionante de completado de código y ayuda a impulsar tu productividad de desarrollo. Funciona perfectamente con la mayoría de IDEs modernos populares.",
            autor: "Wisang Eom",
            cargo: "Managing Director",
            empresa: "LG Electronics",
            rating: 5,
            avatar: "W"
        },
        {
            id: 5,
            contenido: "El mejor asistente de IA que he usado jamás.",
            autor: "Shu",
            cargo: "Lead Developer",
            empresa: "CloudTech",
            rating: 5,
            avatar: "S"
        },
        {
            id: 6,
            contenido: "DevsTopia es el mejor asistente de codificación IA disponible actualmente. Estoy en la versión pro y se ha convertido en una herramienta indispensable. Soy fácilmente 50% más rápido codificando y documentando mi código.",
            autor: "Michael Boeni",
            cargo: "Senior Software Engineer",
            empresa: "DataFlow",
            rating: 5,
            avatar: "M"
        },
        {
            id: 7,
            contenido: "Tengo que decir, hay veces cuando usando DevsTopia donde las completaciones y predicciones son francamente misteriosas.",
            autor: "Alex K.",
            cargo: "Frontend Developer",
            empresa: "WebFlow",
            rating: 5,
            avatar: "A"
        },
        {
            id: 8,
            contenido: "DevsTopia nos ha ayudado a asegurar consistencia de código a través de nuestra organización, resultando en revisiones de código más rápidas y eficientes. Igual de importante, a nuestros desarrolladores les encanta trabajar con él.",
            autor: "Amit Tal",
            cargo: "VP Engineering",
            empresa: "ReasonLabs",
            rating: 5,
            avatar: "A"
        }
    ]
};

// Variables globales
let currentLanguage = 'es';
let chatIsOpen = false;
let typingTimeout;
let isUserTyping = false;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando DevsTopia App - Versión Tabnine');
    
    // Inicializar idioma
    if (typeof initializeLanguage === 'function') {
        initializeLanguage();
    }
    
    // Cargar contenido
    loadServices();
    loadPortfolio();
    loadTestimonials();
    
    // Configurar eventos
    setupEventListeners();
    setupScrollEffects();
    setupThemeToggle();
    setupProgressBars();
    
    // Inicializar elementos interactivos
    initializeDemoTabs();
    
    console.log('✅ DevsTopia App inicializada correctamente');
});

// Configurar event listeners
function setupEventListeners() {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Botón scroll to top
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Formulario de cotización
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteForm);
    }
    
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Configurar efectos de scroll
function setupScrollEffects() {
    const header = document.querySelector('.header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 100;
        
        // Header effect
        if (header) {
            header.classList.toggle('scrolled', scrolled);
        }
        
        // Scroll to top button
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.toggle('visible', scrolled);
        }
    });
    
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .feature-visual, .privacy-visual').forEach(el => {
        observer.observe(el);
    });
}

// Configurar toggle de tema
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('devstopia-theme') || 'light';
    
    // Aplicar tema guardado
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('devstopia-theme', newTheme);
            
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
}

// Configurar barras de progreso
function setupProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                progressObserver.unobserve(progressBar);
            }
        });
    });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Inicializar tabs de demo
function initializeDemoTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const codeBlocks = {
        plan: `class DevsTopia {
  constructor() {
    this.planning = true;
    this.requirements = 'analyzed';
  }
  
  async analyzePlan(project) {
    return await this.optimizeArchitecture(project);
  }
}`,
        create: `// DevsTopia AI Assistant
function generateCode(requirements) {
  const solution = ai.understand(requirements);
  return solution.implement({
    quality: 'enterprise',
    scalability: 'unlimited'
  });
}`,
        test: `describe('DevsTopia Code Quality', () => {
  it('should generate perfect code', async () => {
    const result = await devstopia.generate(specs);
    expect(result.quality).toBe('exceptional');
    expect(result.bugs).toBe(0);
  });
});`,
        review: `// AI Code Review Results
✅ Code quality: Excellent
✅ Security: No vulnerabilities  
✅ Performance: Optimized
✅ Best practices: Applied
📊 Maintainability: 95/100`,
        deploy: `// DevsTopia Deployment
const deployment = {
  status: 'success',
  performance: '99.9% uptime',
  security: 'enterprise-grade',
  scalability: 'auto-scaling'
};`
    };
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Update code block
            const tab = button.getAttribute('data-tab');
            const codeBlock = document.querySelector('.code-block');
            if (codeBlock && codeBlocks[tab]) {
                codeBlock.innerHTML = codeBlocks[tab].split('\n').map(line => 
                    `<span class="code-line">${line}</span>`
                ).join('');
            }
        });
    });
}

// Cargar servicios dinámicamente
function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    const currentLang = getCurrentLanguage();
    const langData = translations[currentLang];
    
    console.log('Cargando servicios en idioma:', currentLang);
    
    servicesGrid.innerHTML = '';
    
    devsTopiaData.servicios.forEach(servicio => {
        const servicioData = langData.servicios[servicio.id] || servicio;
        
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-header">
                <div class="service-icon">
                    <i class="${servicio.icono}"></i>
                </div>
                <h3 class="service-title">${servicioData.nombre}</h3>
            </div>
            <p class="service-description">${servicioData.descripcion}</p>
            <ul class="service-features">
                ${(servicioData.detalles || servicio.detalles).map(detalle => 
                    `<li><i class="fas fa-check"></i>${detalle}</li>`
                ).join('')}
            </ul>
            <a href="#contacto" class="service-cta">
                ${currentLang === 'es' ? 'Aprender Más' : 'Learn More'}
                <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        servicesGrid.appendChild(card);
    });
    
    console.log('✅ Servicios cargados correctamente');
}

// Cargar portfolio dinámicamente
function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;
    
    const currentLang = getCurrentLanguage();
    const langData = translations[currentLang];
    
    console.log('Cargando portfolio en idioma:', currentLang);
    
    portfolioGrid.innerHTML = '';
    
    // Mostrar solo proyectos destacados en la página principal
    const proyectosDestacados = devsTopiaData.portafolio.filter(proyecto => proyecto.destacado);
    
    proyectosDestacados.forEach(proyecto => {
        const proyectoData = langData.portafolio[proyecto.id] || proyecto;
        
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.innerHTML = `
            <div class="portfolio-image">
                <i class="${proyecto.icono}"></i>
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${proyectoData.titulo}</h3>
                <p class="portfolio-description">${proyectoData.descripcion}</p>
                <div class="portfolio-tech">
                    ${proyecto.tecnologias.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                <a href="#contacto" class="portfolio-cta">
                    ${currentLang === 'es' ? 'Ver Detalles' : 'View Details'}
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        portfolioGrid.appendChild(card);
    });
    
    console.log('✅ Portfolio cargado correctamente');
}

// Cargar testimonios dinámicamente
function loadTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;
    
    console.log('Cargando testimonios...');
    
    testimonialsGrid.innerHTML = '';
    
    // Mostrar una selección de testimonios
    const testimoniosSeleccionados = devsTopiaData.testimonios.slice(0, 6);
    
    testimoniosSeleccionados.forEach(testimonio => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="rating">
                ${Array(testimonio.rating).fill().map(() => '<i class="fas fa-star"></i>').join('')}
            </div>
            <div class="testimonial-content">
                "${testimonio.contenido}"
            </div>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonio.avatar}</div>
                <div class="author-info">
                    <h4>${testimonio.autor}</h4>
                    <p>${testimonio.cargo} - ${testimonio.empresa}</p>
                </div>
            </div>
        `;
        
        testimonialsGrid.appendChild(card);
    });
    
    console.log('✅ Testimonios cargados correctamente');
}

// Manejar formulario de contacto
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        asunto: formData.get('asunto') || 'Consulta desde web',
        mensaje: formData.get('mensaje')
    };
    
    // Validar datos
    if (!data.nombre || !data.email || !data.mensaje) {
        showNotification('Por favor, completa todos los campos obligatorios.', 'error');
        return;
    }
    
    // Mostrar loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Enviar con EmailJS
    emailjs.send('service_xyz123', 'template_abc456', {
        from_name: data.nombre,
        from_email: data.email,
        subject: data.asunto,
        message: data.mensaje,
        to_name: 'DevsTopia Team'
    })
    .then(function(response) {
        console.log('Email enviado exitosamente:', response);
        showNotification(getCurrentLanguage() === 'es' ? 
            '¡Mensaje enviado con éxito! Te contactaremos pronto.' : 
            'Message sent successfully! We will contact you soon.', 'success');
        e.target.reset();
    })
    .catch(function(error) {
        console.error('Error al enviar email:', error);
        showNotification(getCurrentLanguage() === 'es' ? 
            'Error al enviar el mensaje. Inténtalo de nuevo.' : 
            'Error sending message. Please try again.', 'error');
    })
    .finally(function() {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
    
    // Guardar en Firebase para backup
    if (window.firebase && window.firebase.database) {
        const contactsRef = window.firebase.ref(window.firebase.database, 'contacts');
        window.firebase.push(contactsRef, {
            ...data,
            timestamp: window.firebase.serverTimestamp(),
            source: 'contact-form'
        });
    }
}

// Manejar formulario de cotización
function handleQuoteForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        empresa: formData.get('empresa'),
        servicio: formData.get('servicio'),
        descripcion: formData.get('descripcion')
    };
    
    // Validar datos
    if (!data.nombre || !data.email || !data.empresa || !data.servicio || !data.descripcion) {
        showNotification(getCurrentLanguage() === 'es' ? 
            'Por favor, completa todos los campos.' : 
            'Please fill in all fields.', 'error');
        return;
    }
    
    // Mostrar loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + 
        (getCurrentLanguage() === 'es' ? 'Programando...' : 'Scheduling...');
    submitBtn.disabled = true;
    
    // Enviar con EmailJS
    emailjs.send('service_xyz123', 'template_quote456', {
        from_name: data.nombre,
        from_email: data.email,
        company: data.empresa,
        service: data.servicio,
        description: data.descripcion,
        to_name: 'DevsTopia Sales Team'
    })
    .then(function(response) {
        console.log('Quote request enviado exitosamente:', response);
        showNotification(getCurrentLanguage() === 'es' ? 
            '¡Demo programada! Te contactaremos para confirmar la fecha.' : 
            'Demo scheduled! We will contact you to confirm the date.', 'success');
        e.target.reset();
        closeQuoteModal();
    })
    .catch(function(error) {
        console.error('Error al enviar quote request:', error);
        showNotification(getCurrentLanguage() === 'es' ? 
            'Error al programar demo. Inténtalo de nuevo.' : 
            'Error scheduling demo. Please try again.', 'error');
    })
    .finally(function() {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
    
    // Guardar en Firebase
    if (window.firebase && window.firebase.database) {
        const quotesRef = window.firebase.ref(window.firebase.database, 'quotes');
        window.firebase.push(quotesRef, {
            ...data,
            timestamp: window.firebase.serverTimestamp(),
            status: 'pending',
            source: 'demo-request'
        });
    }
}

// Funciones del modal
function openQuoteModal() {
    const modal = document.getElementById('quote-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeQuoteModal() {
    const modal = document.getElementById('quote-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Funciones del chat
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const chatToggle = document.querySelector('.chat-toggle');
    
    if (chatContainer && chatToggle) {
        chatIsOpen = !chatIsOpen;
        chatContainer.classList.toggle('active', chatIsOpen);
        
        if (chatIsOpen) {
            document.getElementById('chat-input')?.focus();
        }
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Agregar mensaje del usuario
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Guardar en Firebase
    if (window.firebase && window.firebase.database) {
        const messagesRef = window.firebase.ref(window.firebase.database, 'chat_messages');
        window.firebase.push(messagesRef, {
            message: message,
            type: 'user',
            timestamp: window.firebase.serverTimestamp(),
            session: getSessionId()
        });
    }
    
    // Simular respuesta del bot después de un delay
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
        
        // Guardar respuesta del bot en Firebase
        if (window.firebase && window.firebase.database) {
            const messagesRef = window.firebase.ref(window.firebase.database, 'chat_messages');
            window.firebase.push(messagesRef, {
                message: response,
                type: 'bot',
                timestamp: window.firebase.serverTimestamp(),
                session: getSessionId()
            });
        }
    }, 1000 + Math.random() * 2000);
}

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
    content.innerHTML = `<p>${message}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const currentLang = getCurrentLanguage();
    const responses = {
        es: {
            greeting: ["¡Hola! ¿En qué puedo ayudarte?", "¡Bienvenido a DevsTopia! ¿Cómo puedo asistirte?"],
            services: ["Ofrecemos desarrollo de software, aplicaciones web y móviles, consultoría digital y más. ¿Te interesa algún servicio en particular?"],
            pricing: ["Nuestros precios varían según el proyecto. ¿Te gustaría programar una consulta gratuita para discutir tu proyecto?"],
            contact: ["Puedes contactarnos al +240 222 311 498 o +57 315 057 0742, o envíanos un email a info@devstopia.com"],
            default: ["Gracias por tu mensaje. Un miembro de nuestro equipo te contactará pronto.", "Interesante pregunta. ¿Te gustaría agendar una llamada para discutir esto en detalle?"]
        },
        en: {
            greeting: ["Hello! How can I help you?", "Welcome to DevsTopia! How can I assist you?"],
            services: ["We offer software development, web and mobile applications, digital consulting and more. Are you interested in any particular service?"],
            pricing: ["Our prices vary depending on the project. Would you like to schedule a free consultation to discuss your project?"],
            contact: ["You can contact us at +240 222 311 498 or +57 315 057 0742, or send us an email at info@devstopia.com"],
            default: ["Thank you for your message. A team member will contact you soon.", "Interesting question. Would you like to schedule a call to discuss this in detail?"]
        }
    };
    
    const langResponses = responses[currentLang] || responses.es;
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return langResponses.greeting[Math.floor(Math.random() * langResponses.greeting.length)];
    } else if (lowerMessage.includes('servicio') || lowerMessage.includes('service')) {
        return langResponses.services[0];
    } else if (lowerMessage.includes('precio') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return langResponses.pricing[0];
    } else if (lowerMessage.includes('contacto') || lowerMessage.includes('contact')) {
        return langResponses.contact[0];
    } else {
        return langResponses.default[Math.floor(Math.random() * langResponses.default.length)];
    }
}

function handleTyping() {
    isUserTyping = true;
    clearTimeout(typingTimeout);
    
    typingTimeout = setTimeout(() => {
        isUserTyping = false;
    }, 1000);
}

function getSessionId() {
    let sessionId = localStorage.getItem('devstopia-session');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('devstopia-session', sessionId);
    }
    return sessionId;
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 10001;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                min-width: 300px;
                border-left: 4px solid #007bff;
            }
            .notification-success { border-left-color: #28a745; }
            .notification-error { border-left-color: #dc3545; }
            .notification-info { border-left-color: #17a2b8; }
            .notification.show { transform: translateX(0); }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 8px;
                flex: 1;
            }
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                color: #666;
                padding: 4px;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Función para scroll suave a sección
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Event listener para Enter en chat
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'chat-input') {
        sendMessage();
    }
});

// Event listener para cerrar modal con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQuoteModal();
    }
});

// Event listener para cerrar modal clickeando fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('quote-modal');
    if (e.target === modal) {
        closeQuoteModal();
    }
});

// Exportar funciones globales
window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.handleTyping = handleTyping;
window.scrollToSection = scrollToSection;
window.loadServices = loadServices;
window.loadPortfolio = loadPortfolio;
window.loadTestimonials = loadTestimonials;

console.log('🚀 Script DevsTopia v3.0 (Tabnine) cargado exitosamente');