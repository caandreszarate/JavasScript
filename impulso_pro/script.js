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