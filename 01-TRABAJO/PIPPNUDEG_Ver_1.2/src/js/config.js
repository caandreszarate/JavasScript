/**
 * Configuración centralizada de la aplicación
 */

export const CONFIG = {
  // Configuración de carruseles
  carousel: {
    autoPlayDelay: 15000, // 15 segundos
    transitionDuration: 500,
    swipeThreshold: 50
  },

  // Configuración de notificaciones
  notifications: {
    duration: 5000,
    position: 'top-right',
    maxVisible: 3
  },

  // Configuración de tema
  theme: {
    defaultTheme: 'light',
    storageKey: 'impulso-pro-theme'
  },

  // Configuración de idioma
  language: {
    defaultLanguage: 'es',
    storageKey: 'impulso-pro-language',
    notificationStorageKey: 'impulso-pro-notification-type'
  },

  // Configuración de contacto
  contact: {
    whatsapp: '+635551212',
    email: 'info@impulsoprofesionalge.org',
    phone: '+635551212'
  },

  // Configuración de performance
  performance: {
    debounceDelay: 16,
    intersectionThreshold: 0.1,
    lazyLoadingMargin: '50px'
  },

  // Configuración de animaciones
  animations: {
    defaultDuration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    reducedMotion: false
  }
};

export const SELECTORS = {
  // Navegación
  header: '.header',
  navbar: '.navbar',
  navToggle: '#nav-toggle',
  navMenu: '#nav-menu',
  navLinks: '.nav-link',

  // Modales
  loginModal: '#login-modal',
  modalClose: '#modal-close',

  // Botones
  btnLogin: '#btn-login',
  btnLanguage: '#btn-language',
  btnTheme: '#btn-theme',

  // Carruseles
  carouselContainer: '.carousel-container',
  carouselSlides: '.carousel-slide',
  carouselPrev: '#carousel-prev',
  carouselNext: '#carousel-next',
  carouselIndicators: '.indicator',

  // Secciones
  heroSection: '.hero-section',
  contentSection: '.content-section',

  // WhatsApp
  whatsappFloat: '#whatsapp-float'
};

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  large: 1440
};

export const ARIA_LABELS = {
  es: {
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
    openLogin: 'Abrir modal de inicio de sesión',
    closeModal: 'Cerrar modal',
    changeTheme: 'Cambiar tema',
    changeLanguage: 'Cambiar idioma',
    scrollToTop: 'Volver arriba',
    previousSlide: 'Diapositiva anterior',
    nextSlide: 'Siguiente diapositiva',
    whatsappContact: 'Contactar por WhatsApp'
  },
  en: {
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    openLogin: 'Open login modal',
    closeModal: 'Close modal',
    changeTheme: 'Change theme',
    changeLanguage: 'Change language',
    scrollToTop: 'Back to top',
    previousSlide: 'Previous slide',
    nextSlide: 'Next slide',
    whatsappContact: 'Contact via WhatsApp'
  }
};