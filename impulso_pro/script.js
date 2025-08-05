// Elementos del DOM
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const btnLogin = document.getElementById('btn-login');
const btnLanguage = document.getElementById('btn-language');
const loginModal = document.getElementById('login-modal');
const modalClose = document.getElementById('modal-close');

// Variables de estado
let isMenuOpen = false;
let currentActiveLink = document.querySelector('.nav-link.active');
let currentLanguage = 'es'; // 'es' para español, 'en' para inglés

// Función para alternar el menú móvil
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Función para manejar la navegación activa
function handleActiveNavigation(targetId) {
    // Remover clase active de todos los enlaces
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Agregar clase active al enlace correspondiente
    const targetLink = document.querySelector(`[href="${targetId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
        currentActiveLink = targetLink;
    }
}

// Función para manejar el scroll y actualizar navegación activa
function handleScrollNavigation() {
    const sections = document.querySelectorAll('.content-section');
    const scrollPosition = window.scrollY + 100; // Offset para el header fijo
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            handleActiveNavigation(`#${sectionId}`);
        }
    });
}

// Función para abrir el modal de login
function openLoginModal() {
    loginModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus en el primer input del modal
    const firstInput = loginModal.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 300);
    }
}

// Función para cerrar el modal de login
function closeLoginModal() {
    loginModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Función para manejar clicks en enlaces de navegación
function handleNavLinkClick(e) {
    const targetId = e.currentTarget.getAttribute('href');
    
    // Cerrar menú móvil si está abierto
    closeMobileMenu();
    
    // Manejar navegación activa
    handleActiveNavigation(targetId);
    
    // Scroll suave a la sección
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Función para manejar clicks fuera del modal
function handleModalOutsideClick(e) {
    if (e.target === loginModal) {
        closeLoginModal();
    }
}

// Función para manejar teclas en el modal
function handleModalKeydown(e) {
    if (e.key === 'Escape' && loginModal.classList.contains('show')) {
        closeLoginModal();
    }
}

// Función para cambiar idioma
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    
    // Actualizar botón de idioma
    const languageSpan = btnLanguage.querySelector('span');
    languageSpan.textContent = currentLanguage.toUpperCase();
    
    // Traducir todos los elementos con atributos data-es y data-en
    const translatableElements = document.querySelectorAll('[data-es][data-en]');
    translatableElements.forEach(element => {
        const spanishText = element.getAttribute('data-es');
        const englishText = element.getAttribute('data-en');
        
        if (currentLanguage === 'es') {
            element.textContent = spanishText;
        } else {
            element.textContent = englishText;
        }
    });
    
    // Guardar preferencia en localStorage
    localStorage.setItem('impulso-pro-language', currentLanguage);
    
    // Mostrar indicador según preferencia del usuario
    const notificationType = localStorage.getItem('impulso-pro-notification-type') || 'indicator';
    
    switch (notificationType) {
        case 'elegant':
            showElegantNotification(currentLanguage === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English');
            break;
        case 'indicator':
        default:
            showLanguageIndicator();
            break;
        case 'none':
            // No mostrar nada
            break;
    }
}

// Función para cargar idioma guardado
function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('impulso-pro-language');
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
        
        // Aplicar idioma guardado
        const translatableElements = document.querySelectorAll('[data-es][data-en]');
        translatableElements.forEach(element => {
            const spanishText = element.getAttribute('data-es');
            const englishText = element.getAttribute('data-en');
            
            if (currentLanguage === 'es') {
                element.textContent = spanishText;
            } else {
                element.textContent = englishText;
            }
        });
        
        // Actualizar botón de idioma
        const languageSpan = btnLanguage.querySelector('span');
        languageSpan.textContent = currentLanguage.toUpperCase();
    }
}

// Función para forzar la aplicación de estilos del menú
function forceNavStyles() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoLink = document.querySelector('.logo-link');
    const logoIcon = document.querySelector('.logo-link i');
    
    if (header) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.background = '#256294';
        header.style.zIndex = '1000';
        header.style.width = '100%';
        header.style.height = '70px';
    }
    
    navLinks.forEach(link => {
        link.style.color = '#ffffff';
        link.style.textDecoration = 'none';
    });
    
    if (logoLink) {
        logoLink.style.color = '#ffffff';
        logoLink.style.textDecoration = 'none';
    }
    
    if (logoIcon) {
        logoIcon.style.color = '#ffffff';
    }
}

// Función para agregar efectos de hover y focus
function addHoverEffects() {
    // Efecto de ripple para botones
    const buttons = document.querySelectorAll('.btn-login, .btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Función para agregar animaciones de entrada
function addEntranceAnimations() {
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
    
    // Observar secciones de contenido
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Función para manejar el scroll del header
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 2px 20px rgba(100, 197, 230, 0.1)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = 'none';
    }
}

// Función para agregar efectos de carga
function addLoadingEffects() {
    // Simular carga de contenido
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Función para manejar la accesibilidad
function setupAccessibility() {
    // Agregar atributos ARIA
    navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    navToggle.setAttribute('aria-expanded', 'false');
    
    btnLogin.setAttribute('aria-label', 'Abrir modal de inicio de sesión');
    
    // Manejar cambios en el estado del menú
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Asegurar que el focus sea visible
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Función para agregar efectos de partículas (opcional)
function addParticleEffects() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Crear partículas flotantes
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        heroSection.appendChild(particle);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para navegación móvil
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Event listeners para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Event listeners para el modal de login
    btnLogin.addEventListener('click', openLoginModal);
    modalClose.addEventListener('click', closeLoginModal);
    loginModal.addEventListener('click', handleModalOutsideClick);
    
    // Event listener para cambio de idioma
    btnLanguage.addEventListener('click', toggleLanguage);
    
    // Event listener para menú de configuración de idioma
    const languageMenu = document.getElementById('language-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Mostrar/ocultar menú con doble clic
    btnLanguage.addEventListener('dblclick', (e) => {
        e.preventDefault();
        languageMenu.classList.toggle('show');
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!btnLanguage.contains(e.target) && !languageMenu.contains(e.target)) {
            languageMenu.classList.remove('show');
        }
    });
    
    // Manejar selección de tipo de notificación
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            setNotificationType(type);
            
            // Actualizar indicador activo
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            // Cerrar menú
            languageMenu.classList.remove('show');
        });
    });
    
    // Marcar opción activa al cargar
    const currentType = localStorage.getItem('impulso-pro-notification-type') || 'indicator';
    const activeItem = document.querySelector(`[data-type="${currentType}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
    
    // Event listeners para teclado
    document.addEventListener('keydown', handleModalKeydown);
    
    // Event listeners para scroll
    window.addEventListener('scroll', () => {
        handleScrollNavigation();
        handleHeaderScroll();
    });
    
    // Event listeners para resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
        // Forzar estilos después del resize
        forceNavStyles();
    });
    
    // Event listener para asegurar estilos después de la carga completa
    window.addEventListener('load', () => {
        forceNavStyles();
    });
    
    // Event listener para asegurar estilos después de cambios en el DOM
    const observer = new MutationObserver(() => {
        forceNavStyles();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Inicializar efectos
    addHoverEffects();
    addEntranceAnimations();
    addLoadingEffects();
    setupAccessibility();
    addParticleEffects();
    
    // Cargar idioma guardado
    loadSavedLanguage();
    
    // Forzar aplicación de estilos del menú
    forceNavStyles();
    
    // Asegurar que los estilos se mantengan después de la carga
    setTimeout(forceNavStyles, 100);
    setTimeout(forceNavStyles, 500);
    
    // Manejar navegación inicial
    const hash = window.location.hash;
    if (hash) {
        handleActiveNavigation(hash);
        setTimeout(() => {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// CSS adicional para efectos
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.7;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
    
    .particle {
        pointer-events: none;
    }
    
    /* Estilos forzados para el menú de navegación */
    .header {
        background: #256294 !important;
        color: #ffffff !important;
    }
    
    .nav-link {
        color: #ffffff !important;
    }
    
    .nav-link:hover {
        color: #8dd4f0 !important;
    }
    
    .nav-link.active {
        color: #8dd4f0 !important;
    }
    
    .logo-link {
        color: #ffffff !important;
    }
    
    .logo-link i {
        color: #ffffff !important;
    }
    
    .btn-language {
        color: #ffffff !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
    }
    
    .btn-login {
        background: linear-gradient(135deg, #64c5e6, #4ba8c9) !important;
        color: #ffffff !important;
        border-radius: 20px !important;
        font-size: 0.85rem !important;
        padding: 0.6rem 1.2rem !important;
    }
    
    .btn-language {
        border-radius: 16px !important;
        font-size: 0.8rem !important;
        padding: 0.5rem 0.8rem !important;
    }
`;

// Agregar estilos adicionales al head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Función para mostrar notificaciones elegantes
function showElegantNotification(message) {
    // Crear el contenedor principal
    const notification = document.createElement('div');
    notification.className = 'elegant-notification';
    
    // Crear el contenido con animación de entrada
    notification.innerHTML = `
        <div class="notification-inner">
            <div class="notification-icon">
                <i class="fas fa-globe"></i>
            </div>
            <div class="notification-content">
                <span class="notification-text">${message}</span>
            </div>
            <div class="notification-progress"></div>
        </div>
    `;
    
    // Aplicar estilos modernos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #256294, #1a4a7a);
        color: white;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(37, 98, 148, 0.3);
        padding: 0;
        z-index: 3000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 320px;
        min-width: 280px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        overflow: hidden;
    `;
    
    // Aplicar estilos al contenido interno
    const inner = notification.querySelector('.notification-inner');
    inner.style.cssText = `
        display: flex;
        align-items: center;
        padding: 16px 20px;
        position: relative;
    `;
    
    // Estilos para el icono
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        flex-shrink: 0;
    `;
    
    const iconElement = icon.querySelector('i');
    iconElement.style.cssText = `
        color: white;
        font-size: 18px;
    `;
    
    // Estilos para el contenido
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        flex: 1;
        min-width: 0;
    `;
    
    const text = content.querySelector('.notification-text');
    text.style.cssText = `
        color: white;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        margin: 0;
    `;
    
    // Barra de progreso
    const progress = notification.querySelector('.notification-progress');
    progress.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #64c5e6, #8dd4f0);
        width: 100%;
        transform: scaleX(1);
        transform-origin: left;
        transition: transform 3s linear;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Animar barra de progreso
    setTimeout(() => {
        progress.style.transform = 'scaleX(0)';
    }, 100);
    
    // Auto cerrar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
    
    // Cerrar al hacer clic
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 400);
    });
    
    // Efecto hover
    notification.addEventListener('mouseenter', () => {
        notification.style.transform = 'translateX(0) scale(1.02)';
        notification.style.boxShadow = '0 12px 40px rgba(37, 98, 148, 0.4)';
    });
    
    notification.addEventListener('mouseleave', () => {
        notification.style.transform = 'translateX(0) scale(1)';
        notification.style.boxShadow = '0 8px 32px rgba(37, 98, 148, 0.3)';
    });
}

// Función para mostrar indicador visual sutil de cambio de idioma
function showLanguageIndicator() {
    const languageBtn = document.getElementById('btn-language');
    if (!languageBtn) return;
    
    // Crear indicador visual
    const indicator = document.createElement('div');
    indicator.className = 'language-indicator';
    indicator.innerHTML = `
        <div class="indicator-dot"></div>
    `;
    
    // Estilos del indicador
    indicator.style.cssText = `
        position: absolute;
        top: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        background: #64c5e6;
        border-radius: 50%;
        border: 2px solid #256294;
        animation: pulse 2s ease-in-out;
        z-index: 10;
    `;
    
    // Agregar estilos de animación
    const pulseAnimation = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    
    // Agregar animación si no existe
    if (!document.querySelector('#pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = pulseAnimation;
        document.head.appendChild(style);
    }
    
    // Posicionar el botón de idioma relativamente
    languageBtn.style.position = 'relative';
    
    // Agregar indicador
    languageBtn.appendChild(indicator);
    
    // Remover indicador después de 2 segundos
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.remove();
        }
    }, 2000);
}

// Función para mostrar notificaciones (para futuras funcionalidades)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        border-left: 4px solid var(--primary-color);
        border-radius: var(--border-radius-sm);
        box-shadow: var(--shadow-medium);
        padding: 1rem 1.5rem;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto cerrar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Cerrar manualmente
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Función para cambiar tipo de notificación
function setNotificationType(type) {
    localStorage.setItem('impulso-pro-notification-type', type);
    
    // Mostrar confirmación
    const messages = {
        'elegant': 'Notificaciones elegantes activadas',
        'indicator': 'Indicadores sutiles activados',
        'none': 'Notificaciones desactivadas'
    };
    
    if (type !== 'none') {
        showElegantNotification(messages[type]);
    }
}

// Exportar funciones para uso global (opcional)
window.ImpulsoPro = {
    showNotification,
    showElegantNotification,
    showLanguageIndicator,
    setNotificationType,
    openLoginModal,
    closeLoginModal
};

// ===== CARRUSEL FUNCTIONALITY =====

// Elementos del carrusel
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const carouselIndicators = document.querySelectorAll('.indicator');

// Variables del carrusel
let currentSlide = 0;
let isAutoPlaying = true;
let autoPlayInterval;
let pauseIndicator;

// Función para mostrar una slide específica
function showSlide(slideIndex) {
    // Ocultar todas las slides
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Mostrar la slide actual
    if (carouselSlides[slideIndex]) {
        carouselSlides[slideIndex].classList.add('active');
        carouselIndicators[slideIndex].classList.add('active');
        currentSlide = slideIndex;
    }
}

// Función para ir a la siguiente slide
function nextSlide() {
    const nextIndex = (currentSlide + 1) % carouselSlides.length;
    showSlide(nextIndex);
}

// Función para ir a la slide anterior
function prevSlide() {
    const prevIndex = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(prevIndex);
}

// Función para ir a una slide específica
function goToSlide(slideIndex) {
    showSlide(slideIndex);
    resetAutoPlay();
}

// Función para iniciar el autoplay
function startAutoPlay() {
    if (isAutoPlaying) {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 15000); // Cambiar cada 15 segundos - tiempo muy lento para leer cómodamente
    }
}

// Función para detener el autoplay
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
    showPauseIndicator();
}

// Función para mostrar el indicador de pausa
function showPauseIndicator() {
    if (pauseIndicator) {
        pauseIndicator.classList.add('show');
        setTimeout(() => {
            pauseIndicator.classList.remove('show');
        }, 2000);
    }
}

// Función para resetear el autoplay
function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Función para manejar clicks en los controles
function handleCarouselControls() {
    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }
    
    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }
}

// Función para manejar clicks en los indicadores
function handleCarouselIndicators() {
    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}

// Función para manejar eventos de teclado
function handleCarouselKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });
}

// Función para manejar eventos de touch (swipe)
function handleCarouselTouch() {
    let startX = 0;
    let endX = 0;
    
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe izquierda - siguiente slide
                nextSlide();
            } else {
                // Swipe derecha - slide anterior
                prevSlide();
            }
            resetAutoPlay();
        }
    }
}

// Función para manejar hover en el carrusel
function handleCarouselHover() {
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            stopAutoPlay();
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            // Esperar un poco antes de reanudar para dar tiempo al usuario
            setTimeout(() => {
                startAutoPlay();
            }, 1000);
        });
    }
}

// Función para detectar interacción del usuario con el contenido
function handleUserInteraction() {
    const carouselContent = document.querySelector('.carousel-content');
    
    if (carouselContent) {
        // Detectar cuando el usuario hace scroll o interactúa con el contenido
        let userActivityTimeout;
        
        const resetUserActivity = () => {
            clearTimeout(userActivityTimeout);
            stopAutoPlay();
            
            // Reanudar después de 3 segundos de inactividad
            userActivityTimeout = setTimeout(() => {
                startAutoPlay();
            }, 3000);
        };
        
        // Eventos que indican que el usuario está leyendo/interactuando
        carouselContent.addEventListener('click', resetUserActivity);
        carouselContent.addEventListener('scroll', resetUserActivity);
        carouselContent.addEventListener('touchstart', resetUserActivity);
        
        // También detectar cuando el usuario está leyendo (movimiento del mouse)
        let mouseActivityTimeout;
        carouselContent.addEventListener('mousemove', () => {
            clearTimeout(mouseActivityTimeout);
            stopAutoPlay();
            
            mouseActivityTimeout = setTimeout(() => {
                startAutoPlay();
            }, 2000);
        });
    }
}

// Función para inicializar el carrusel
function initCarousel() {
    if (carouselSlides.length > 0) {
        // Obtener el indicador de pausa
        pauseIndicator = document.getElementById('pause-indicator');
        
        // Mostrar la primera slide
        showSlide(0);
        
        // Configurar controles
        handleCarouselControls();
        handleCarouselIndicators();
        handleCarouselKeyboard();
        handleCarouselTouch();
        handleCarouselHover();
        handleUserInteraction();
        
        // Iniciar autoplay con un pequeño delay para que el usuario vea la primera slide
        setTimeout(() => {
            startAutoPlay();
        }, 2000);
        
        // Pausar autoplay cuando la página no está visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                setTimeout(() => {
                    startAutoPlay();
                }, 1000);
            }
        });
    }
}

// Función para manejar clicks en los botones CTA
function handleCTAClicks() {
    const ctaButtons = document.querySelectorAll('.btn-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para el registro
            const currentLanguage = document.documentElement.lang || 'es';
            const message = currentLanguage === 'es' 
                ? '¡Gracias por tu interés! Te contactaremos pronto.' 
                : 'Thank you for your interest! We will contact you soon.';
            
            // Mostrar notificación
            if (window.ImpulsoPro && window.ImpulsoPro.showNotification) {
                window.ImpulsoPro.showNotification(message, 'success');
            } else {
                alert(message);
            }
        });
    });
}

// ===== CONTADORES ANIMADOS CONTINUOS =====

// Función para animar contadores de forma continua
function animateCounterContinuous(element, target, prefix = '', duration = 25000) {
    let current = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = 0; // Reiniciar desde 0
        }
        element.textContent = prefix + Math.floor(current);
    }, 16);
    
    // Guardar el timer para poder detenerlo si es necesario
    element.dataset.timer = timer;
}

// Función para animar contadores con efecto de rebote
function animateCounterBounce(element, target, prefix = '', duration = 6000) {
    let current = 0;
    let direction = 1; // 1 para subir, -1 para bajar
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment * direction;
        
        if (current >= target) {
            direction = -1; // Cambiar dirección hacia abajo
        } else if (current <= 0) {
            direction = 1; // Cambiar dirección hacia arriba
        }
        
        element.textContent = prefix + Math.floor(current);
    }, 16);
    
    element.dataset.timer = timer;
}

// Función para verificar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para inicializar contadores continuos
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const activeCounters = new Set();
    
    function startCounters() {
        counters.forEach((counter, index) => {
            if (isInViewport(counter) && !activeCounters.has(counter)) {
                const target = parseInt(counter.getAttribute('data-target'));
                const prefix = counter.getAttribute('data-prefix') || '';
                
                // Usar animación continua para el primer contador y rebote para el segundo
                if (index === 0) {
                    animateCounterContinuous(counter, target, prefix);
                } else {
                    animateCounterBounce(counter, target, prefix);
                }
                
                activeCounters.add(counter);
            }
        });
    }
    
    function stopCounters() {
        counters.forEach(counter => {
            if (activeCounters.has(counter) && !isInViewport(counter)) {
                const timer = counter.dataset.timer;
                if (timer) {
                    clearInterval(parseInt(timer));
                    delete counter.dataset.timer;
                }
                activeCounters.delete(counter);
            }
        });
    }
    
    // Iniciar contadores cuando estén en viewport
    startCounters();
    
    // Manejar scroll y resize
    window.addEventListener('scroll', () => {
        startCounters();
        stopCounters();
    });
    
    window.addEventListener('resize', () => {
        startCounters();
        stopCounters();
    });
    
    // Pausar contadores cuando la página no está visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            counters.forEach(counter => {
                const timer = counter.dataset.timer;
                if (timer) {
                    clearInterval(parseInt(timer));
                    delete counter.dataset.timer;
                }
            });
        } else {
            startCounters();
        }
    });
}

// ===== CARRUSEL DE ENTIDADES =====

// Elementos del carrusel de entidades
const entidadesSlides = document.querySelectorAll('.entidades-slide');
const entidadesPrev = document.getElementById('entidades-prev');
const entidadesNext = document.getElementById('entidades-next');
const entidadesIndicators = document.querySelectorAll('.entidades-indicator');

// Variables del carrusel de entidades
let currentEntidadSlide = 0;
let entidadesAutoPlayInterval;

// Función para mostrar una slide específica de entidades
function showEntidadSlide(slideIndex) {
    // Ocultar todas las slides
    entidadesSlides.forEach(slide => slide.classList.remove('active'));
    entidadesIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Mostrar la slide actual
    if (entidadesSlides[slideIndex]) {
        entidadesSlides[slideIndex].classList.add('active');
        entidadesIndicators[slideIndex].classList.add('active');
        currentEntidadSlide = slideIndex;
    }
}

// Función para ir a la siguiente slide de entidades
function nextEntidadSlide() {
    const nextIndex = (currentEntidadSlide + 1) % entidadesSlides.length;
    showEntidadSlide(nextIndex);
}

// Función para ir a la slide anterior de entidades
function prevEntidadSlide() {
    const prevIndex = (currentEntidadSlide - 1 + entidadesSlides.length) % entidadesSlides.length;
    showEntidadSlide(prevIndex);
}

// Función para ir a una slide específica de entidades
function goToEntidadSlide(slideIndex) {
    showEntidadSlide(slideIndex);
    resetEntidadesAutoPlay();
}

// Función para iniciar el autoplay de entidades
function startEntidadesAutoPlay() {
    entidadesAutoPlayInterval = setInterval(() => {
        nextEntidadSlide();
    }, 6000); // Cambiar cada 6 segundos
}

// Función para detener el autoplay de entidades
function stopEntidadesAutoPlay() {
    if (entidadesAutoPlayInterval) {
        clearInterval(entidadesAutoPlayInterval);
    }
}

// Función para resetear el autoplay de entidades
function resetEntidadesAutoPlay() {
    stopEntidadesAutoPlay();
    startEntidadesAutoPlay();
}

// Función para manejar controles del carrusel de entidades
function handleEntidadesControls() {
    if (entidadesPrev) {
        entidadesPrev.addEventListener('click', () => {
            prevEntidadSlide();
            resetEntidadesAutoPlay();
        });
    }
    
    if (entidadesNext) {
        entidadesNext.addEventListener('click', () => {
            nextEntidadSlide();
            resetEntidadesAutoPlay();
        });
    }
}

// Función para manejar indicadores del carrusel de entidades
function handleEntidadesIndicators() {
    entidadesIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToEntidadSlide(index);
        });
    });
}

// Función para manejar hover en el carrusel de entidades
function handleEntidadesHover() {
    const entidadesCarousel = document.querySelector('.entidades-carousel');
    
    if (entidadesCarousel) {
        entidadesCarousel.addEventListener('mouseenter', () => {
            stopEntidadesAutoPlay();
        });
        
        entidadesCarousel.addEventListener('mouseleave', () => {
            setTimeout(() => {
                startEntidadesAutoPlay();
            }, 1000);
        });
    }
}

// Función para inicializar el carrusel de entidades
function initEntidadesCarousel() {
    if (entidadesSlides.length > 0) {
        // Mostrar la primera slide
        showEntidadSlide(0);
        
        // Configurar controles
        handleEntidadesControls();
        handleEntidadesIndicators();
        handleEntidadesHover();
        
        // Iniciar autoplay con delay
        setTimeout(() => {
            startEntidadesAutoPlay();
        }, 2000);
        
        // Pausar autoplay cuando la página no está visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopEntidadesAutoPlay();
            } else {
                setTimeout(() => {
                    startEntidadesAutoPlay();
                }, 1000);
            }
        });
    }
}

// ===== CARRUSEL HORIZONTAL DE LOGOS =====

// Función para inicializar el carrusel horizontal de logos
function initLogosCarousel() {
    // El carrusel horizontal es completamente automático con CSS
    // No necesita JavaScript adicional
    console.log('Carrusel horizontal de logos inicializado');
}

// ===== FUNCIONALIDAD DE CAMBIO DE TEMA =====

// Elementos del DOM para el tema
const btnTheme = document.getElementById('btn-theme');
const themeIcon = document.getElementById('theme-icon');

// Función para cambiar el tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Cambiar el tema
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Actualizar el icono
    updateThemeIcon(newTheme);
    
    // Guardar en localStorage
    localStorage.setItem('theme', newTheme);
}

// Función para actualizar el icono del tema
function updateThemeIcon(theme) {
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}



// Función para cargar el tema guardado
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Usar tema guardado o preferencia del sistema
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

// Función para inicializar el tema
function initTheme() {
    // Cargar tema guardado
    loadSavedTheme();
    
    // Agregar event listener al botón
    if (btnTheme) {
        btnTheme.addEventListener('click', toggleTheme);
    }
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    handleCTAClicks();
    initCounters();
    initEntidadesCarousel();
    initLogosCarousel();
    initTheme();
}); 

// ===== MEJORAS UI/UX - FUNCIONALIDADES AVANZADAS =====

// Función para mostrar indicador de carga
function showLoading(message = 'Cargando...') {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem;">${message}</p>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Mostrar con animación
    setTimeout(() => overlay.classList.add('show'), 10);
    
    return overlay;
}

// Función para ocultar indicador de carga
function hideLoading(overlay) {
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

// Función para crear notificaciones mejoradas
function createNotification(message, type = 'info', duration = 5000) {
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: #666; cursor: pointer; margin-left: 1rem;">
                ×
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto-remover después del tiempo especificado
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
    
    return notification;
}

// Función para crear contenedor de notificaciones
function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

// Función para scroll to top
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollButton);
    
    // Mostrar/ocultar basado en scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });
    
    // Scroll suave al hacer clic
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Función para agregar tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        element.classList.add('tooltip');
        
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip-text';
        tooltip.textContent = tooltipText;
        element.appendChild(tooltip);
    });
}

// Función para agregar efectos de ripple a botones
function initRippleEffects() {
    const buttons = document.querySelectorAll('.btn-cta, .btn-login, .btn-entidades');
    
    buttons.forEach(button => {
        button.classList.add('btn-ripple');
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Función para mejorar accesibilidad
function enhanceAccessibility() {
    // Agregar skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Saltar al contenido principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Mejorar navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Cerrar modales y menús
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => closeLoginModal());
            
            const openMenus = document.querySelectorAll('.nav-menu.active');
            openMenus.forEach(menu => closeMobileMenu());
        }
    });
    
    // Agregar roles ARIA
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.setAttribute('role', 'main');
        mainContent.id = 'main-content';
    }
    
    // Mejorar anuncios de cambios dinámicos
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        setTimeout(() => liveRegion.textContent = '', 1000);
    };
}

// Función para optimizar performance
function optimizePerformance() {
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce para eventos de scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Optimizar operaciones costosas durante scroll
        }, 16);
    });
}

// Función para agregar microinteracciones
function addMicrointeractions() {
    // Efecto de hover en cards
    const cards = document.querySelectorAll('.beneficios-card, .capacitacion-card, .counter-item');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Efecto de pulse en CTA
    const ctaButtons = document.querySelectorAll('.btn-cta');
    ctaButtons.forEach(button => {
        button.classList.add('pulse-animation');
    });
    
    // Efecto de bounce en iconos importantes
    const importantIcons = document.querySelectorAll('.counter-icon i, .whatsapp-link i');
    importantIcons.forEach(icon => {
        icon.classList.add('bounce-animation');
    });
    
    // Mejorar interactividad del botón de WhatsApp
    const whatsappLink = document.querySelector('.whatsapp-link');
    if (whatsappLink) {
        // Efectos deshabilitados para evitar burbujas
        // Solo mantener funcionalidad básica de enlace
    }
}

// Función para agregar skeleton loading
function showSkeletonLoading(container) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton';
    skeleton.innerHTML = `
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text" style="width: 70%;"></div>
    `;
    
    container.appendChild(skeleton);
    return skeleton;
}

// Función para remover skeleton loading
function removeSkeletonLoading(skeleton) {
    if (skeleton && skeleton.parentNode) {
        skeleton.parentNode.removeChild(skeleton);
    }
}

// Función para agregar progress indicators
function createProgressBar(container, progress = 0) {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    container.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.progress-fill');
    progressFill.style.width = progress + '%';
    
    return {
        element: progressBar,
        update: (newProgress) => {
            progressFill.style.width = newProgress + '%';
        }
    };
}

// Función para mejorar la experiencia de carga
function enhanceLoadingExperience() {
    // Mostrar skeleton loading mientras se cargan las imágenes
    const imageContainers = document.querySelectorAll('.card-image, .quienes-somos-image');
    
    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        if (img && !img.complete) {
            const skeleton = showSkeletonLoading(container);
            
            img.addEventListener('load', () => {
                removeSkeletonLoading(skeleton);
            });
            
            img.addEventListener('error', () => {
                removeSkeletonLoading(skeleton);
                img.style.display = 'none';
                container.innerHTML = '<div style="background: #f0f0f0; height: 200px; display: flex; align-items: center; justify-content: center; color: #666;">Imagen no disponible</div>';
            });
        }
    });
}

// Función para agregar feedback táctil
function addTouchFeedback() {
    const touchElements = document.querySelectorAll('.nav-link, .btn-cta, .btn-login, .btn-entidades');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Función para mejorar la navegación
function enhanceNavigation() {
    // Solo agregar breadcrumbs si no estamos en la página de inicio
    if (!window.location.pathname.includes('inicio.html') && !window.location.pathname.endsWith('/')) {
        const breadcrumb = document.createElement('nav');
        breadcrumb.setAttribute('aria-label', 'Breadcrumb');
        breadcrumb.className = 'breadcrumb';
        breadcrumb.style.cssText = 'padding: 1rem; background: rgba(255,255,255,0.1); margin: 1rem 0; border-radius: 8px;';
        
        const currentPage = document.title.split(' - ')[0];
        breadcrumb.innerHTML = `
            <a href="inicio.html" style="color: #fff; text-decoration: none;">Inicio</a>
            <span style="color: #fff; margin: 0 0.5rem;">/</span>
            <span style="color: #fff;">${currentPage}</span>
        `;
        
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.insertBefore(breadcrumb, mainContent.firstChild);
        }
    }
}

// Función para agregar shortcuts de teclado
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K para abrir búsqueda (futuro)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Implementar búsqueda
        }
        
        // Ctrl/Cmd + T para cambiar tema
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
        
        // Ctrl/Cmd + L para cambiar idioma
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            toggleLanguage();
        }
    });
}

// Función para agregar analytics básicos
function addBasicAnalytics() {
    // Track eventos importantes
    const trackEvent = (eventName, data = {}) => {
        console.log('Analytics Event:', eventName, data);
        // Aquí se integraría con Google Analytics u otro servicio
    };
    
    // Track clicks en CTA
    document.querySelectorAll('.btn-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('cta_click', {
                location: 'hero_carousel',
                button_text: btn.textContent.trim()
            });
        });
    });
    
    // Track cambios de tema
    const originalToggleTheme = window.toggleTheme;
    window.toggleTheme = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        trackEvent('theme_change', { from: currentTheme, to: newTheme });
        originalToggleTheme();
    };
}

// Inicializar todas las mejoras UI/UX
function initUXImprovements() {
    initScrollToTop();
    initTooltips();
    initRippleEffects();
    enhanceAccessibility();
    optimizePerformance();
    addMicrointeractions();
    enhanceLoadingExperience();
    addTouchFeedback();
    enhanceNavigation();
    addKeyboardShortcuts();
    addBasicAnalytics();
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        createNotification('¡Bienvenido a Impulso Pro! 🚀', 'success', 3000);
    }, 1000);
}

// Llamar a las mejoras cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    handleCTAClicks();
    initCounters();
    initEntidadesCarousel();
    initLogosCarousel();
    initTheme();
    initUXImprovements(); // Nueva función agregada
}); 