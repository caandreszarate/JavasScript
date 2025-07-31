// Datos de la empresa DevsTopia
const devsTopiaData = {
    servicios: [
        {
            nombre: "Desarrollo de Software a Medida",
            descripcion: "Soluciones personalizadas según las necesidades del cliente.",
            icono: "fas fa-code"
        },
        {
            nombre: "Diseño y Desarrollo Web",
            descripcion: "Para empresas que necesitan presencia digital profesional.",
            icono: "fas fa-globe"
        },
        {
            nombre: "Aplicaciones Móviles",
            descripcion: "Desarrollo de apps eficientes, modernas y con enfoque en experiencia de usuario.",
            icono: "fas fa-mobile-alt"
        },
        {
            nombre: "Automatización y Procesos Inteligentes",
            descripcion: "Aumentar eficiencia y reducir tareas manuales.",
            icono: "fas fa-robot"
        },
        {
            nombre: "Servicios en la Nube & DevOps",
            descripcion: "Escalabilidad, seguridad y rendimiento garantizado.",
            icono: "fas fa-cloud"
        },
        {
            nombre: "Ciberseguridad y Protección de Datos",
            descripcion: "Asegura el software y los datos del cliente.",
            icono: "fas fa-shield-alt"
        },
        {
            nombre: "Análisis de Datos e Inteligencia Artificial",
            descripcion: "Toma de decisiones con base en datos.",
            icono: "fas fa-chart-line"
        },
        {
            nombre: "QA y Testing",
            descripcion: "Asegura la calidad de cada entrega.",
            icono: "fas fa-bug"
        },
        {
            nombre: "Soporte Técnico y Mantenimiento",
            descripcion: "Para que el cliente esté tranquilo después de la entrega.",
            icono: "fas fa-tools"
        },
        {
            nombre: "Consultoría y Transformación Digital",
            descripcion: "Para empresas que no saben por dónde empezar.",
            icono: "fas fa-lightbulb"
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

// Cargar servicios
function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = devsTopiaData.servicios.map(servicio => `
        <div class="service-card" onclick="showServiceDetails('${servicio.nombre}')">
            <div class="service-icon">
                <i class="${servicio.icono}"></i>
            </div>
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
        </div>
    `).join('');
}

// Cargar portafolio
function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = devsTopiaData.portafolio.map(proyecto => `
        <div class="portfolio-item" data-category="${proyecto.categoria}">
            <div class="portfolio-image">
                <i class="${proyecto.icono}"></i>
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
        <div class="blog-card">
            <div class="blog-image">
                <i class="${articulo.icono}"></i>
            </div>
            <div class="blog-content">
                <div class="blog-date">${articulo.fecha} • ${articulo.categoria}</div>
                <h3>${articulo.titulo}</h3>
                <p>${articulo.descripcion}</p>
            </div>
        </div>
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
                <i class="fas fa-chevron-down faq-toggle"></i>
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
        // Aquí podrías abrir un modal con más detalles
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
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
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

// Formulario de contacto
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        asunto: formData.get('asunto'),
        mensaje: formData.get('mensaje')
    };
    
    // Validación básica
    if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    
    // Simular envío
    showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
    event.target.reset();
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
    
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
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
        }
    });
    
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