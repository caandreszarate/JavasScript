/**
 * Archivo principal de la aplicación - Impulso Pro v1.2
 * Punto de entrada y coordinador de todos los módulos
 */

import { CONFIG } from './config.js';
import { Utils } from './utils.js';
import { Navigation } from './navigation.js';
import { CarouselManager } from './carousel.js';
import { NotificationSystem } from './notifications.js';
import { LazyLoading, initLazyLoadingStyles } from './lazy-loading.js';
import { AccessibilityManager } from './accessibility.js';
import { SecurityManager } from './security.js';

class ImpulsoPro {
  constructor() {
    this.modules = {};
    this.isInitialized = false;
    this.performance = {
      startTime: performance.now(),
      loadEvents: []
    };

    this.init();
  }

  async init() {
    try {
      this.logPerformance('app_init_start');

      // Initialize core modules first
      await this.initCoreModules();

      // Initialize UI modules
      await this.initUIModules();

      // Initialize security
      await this.initSecurity();

      // Initialize performance monitoring
      this.initPerformanceMonitoring();

      // Mark as initialized
      this.isInitialized = true;
      this.logPerformance('app_init_complete');

      // Announce completion
      this.announceAppReady();

      console.log('🚀 Impulso Pro initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Impulso Pro:', error);
      this.handleInitializationError(error);
    }
  }

  async initCoreModules() {
    // Initialize lazy loading first (affects images)
    initLazyLoadingStyles();
    this.modules.lazyLoading = new LazyLoading();

    // Initialize accessibility manager
    this.modules.accessibility = new AccessibilityManager();

    // Initialize notifications
    this.modules.notifications = new NotificationSystem();

    this.logPerformance('core_modules_ready');
  }

  async initUIModules() {
    // Initialize navigation
    this.modules.navigation = new Navigation();

    // Initialize carousels
    this.modules.carouselManager = new CarouselManager();
    this.modules.carouselManager.init();

    // Initialize theme system
    this.initThemeSystem();

    // Initialize modal system
    this.initModalSystem();

    // Initialize interactive elements
    this.initInteractiveElements();

    // Initialize counters
    this.initCounters();

    // Initialize scroll effects
    this.initScrollEffects();

    this.logPerformance('ui_modules_ready');
  }

  async initSecurity() {
    this.modules.security = new SecurityManager();
    this.modules.security.initializeSecurity();

    this.logPerformance('security_ready');
  }

  initThemeSystem() {
    const themeManager = {
      currentTheme: Utils.getStoredValue(CONFIG.theme.storageKey, CONFIG.theme.defaultTheme),

      init() {
        this.loadSavedTheme();
        this.bindEvents();
        this.watchSystemTheme();
      },

      loadSavedTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
      },

      toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
        this.saveTheme();
        this.announceThemeChange();
      },

      updateThemeIcon() {
        const themeIcon = Utils.getElement('#theme-icon');
        if (themeIcon) {
          themeIcon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
      },

      saveTheme() {
        Utils.setStoredValue(CONFIG.theme.storageKey, this.currentTheme);
      },

      announceThemeChange() {
        const message = this.currentTheme === 'dark'
          ? 'Tema oscuro activado'
          : 'Tema claro activado';

        if (window.announceToScreenReader) {
          window.announceToScreenReader(message);
        }
      },

      bindEvents() {
        const themeBtn = Utils.getElement('#btn-theme');
        Utils.addEventListenerSafe(themeBtn, 'click', () => this.toggleTheme());
      },

      watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        Utils.addEventListenerSafe(mediaQuery, 'change', (e) => {
          if (!Utils.getStoredValue(CONFIG.theme.storageKey)) {
            this.currentTheme = e.matches ? 'dark' : 'light';
            this.loadSavedTheme();
          }
        });
      }
    };

    themeManager.init();
    this.modules.themeManager = themeManager;
  }

  initModalSystem() {
    const modalManager = {
      openModals: new Set(),

      init() {
        this.bindEvents();
        this.setupGlobalListeners();
      },

      bindEvents() {
        // Login modal
        const btnLogin = Utils.getElement('#btn-login');
        const loginModal = Utils.getElement('#login-modal');
        const modalClose = Utils.getElement('#modal-close');

        Utils.addEventListenerSafe(btnLogin, 'click', () => {
          this.openModal(loginModal);
        });

        Utils.addEventListenerSafe(modalClose, 'click', () => {
          this.closeModal(loginModal);
        });

        Utils.addEventListenerSafe(loginModal, 'click', (e) => {
          if (e.target === loginModal) {
            this.closeModal(loginModal);
          }
        });
      },

      setupGlobalListeners() {
        Utils.addEventListenerSafe(document, 'keydown', (e) => {
          if (e.key === 'Escape' && this.openModals.size > 0) {
            const lastModal = Array.from(this.openModals).pop();
            this.closeModal(lastModal);
          }
        });
      },

      openModal(modal) {
        if (!modal) return;

        modal.classList.add('modal--show');
        document.body.style.overflow = 'hidden';
        this.openModals.add(modal);

        // Focus management
        const firstFocusable = modal.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
          setTimeout(() => firstFocusable.focus(), 100);
        }

        // Dispatch event
        const event = new CustomEvent('modal:open', { detail: { modal } });
        document.dispatchEvent(event);
      },

      closeModal(modal) {
        if (!modal) return;

        modal.classList.remove('modal--show');
        document.body.style.overflow = '';
        this.openModals.delete(modal);

        // Dispatch event
        const event = new CustomEvent('modal:close', { detail: { modal } });
        document.dispatchEvent(event);
      }
    };

    modalManager.init();
    this.modules.modalManager = modalManager;
  }

  initInteractiveElements() {
    // WhatsApp float
    this.initWhatsAppFloat();

    // Ripple effects
    this.initRippleEffects();

    // Hover effects
    this.initHoverEffects();

    // CTA buttons
    this.initCTAButtons();
  }

  initWhatsAppFloat() {
    const whatsappFloat = Utils.getElement('#whatsapp-float');

    if (whatsappFloat) {
      // Add entrance animation
      setTimeout(() => {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.transform = 'scale(1)';
      }, 2000);

      // Enhanced accessibility
      const whatsappLink = whatsappFloat.querySelector('.whatsapp-link');
      if (whatsappLink) {
        Utils.addEventListenerSafe(whatsappLink, 'click', () => {
          if (window.announceToScreenReader) {
            window.announceToScreenReader('Abriendo WhatsApp para contacto');
          }
        });
      }
    }
  }

  initRippleEffects() {
    const buttons = Utils.getElements('.btn, .btn-primary, .btn-cta, .btn-login');

    buttons.forEach(button => {
      Utils.addEventListenerSafe(button, 'click', function(e) {
        const ripple = Utils.createElement('span', { className: 'ripple' });
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        Object.assign(ripple.style, {
          width: size + 'px',
          height: size + 'px',
          left: x + 'px',
          top: y + 'px'
        });

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  initHoverEffects() {
    const cards = Utils.getElements('.card, .service-card, .offer-card');

    cards.forEach(card => {
      if (!Utils.isTouchDevice()) {
        Utils.addEventListenerSafe(card, 'mouseenter', () => {
          card.style.transform = 'translateY(-4px)';
        });

        Utils.addEventListenerSafe(card, 'mouseleave', () => {
          card.style.transform = 'translateY(0)';
        });
      }
    });
  }

  initCTAButtons() {
    const ctaButtons = Utils.getElements('.btn-cta');

    ctaButtons.forEach(button => {
      Utils.addEventListenerSafe(button, 'click', (e) => {
        e.preventDefault();

        const message = this.modules.navigation?.currentLanguage === 'es'
          ? '¡Gracias por tu interés! Te contactaremos pronto.'
          : 'Thank you for your interest! We will contact you soon.';

        this.modules.notifications.showSuccess(message, 5000);

        // Analytics (if implemented)
        this.trackEvent('cta_click', {
          button: button.textContent.trim(),
          location: this.getButtonLocation(button)
        });
      });
    });
  }

  getButtonLocation(button) {
    const section = button.closest('section');
    return section?.id || section?.className || 'unknown';
  }

  initCounters() {
    const counters = Utils.getElements('.counter-number');

    if (counters.length === 0) return;

    const animateCounter = (element, target, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current);
      }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  initScrollEffects() {
    // Scroll to top button
    this.initScrollToTop();

    // Scroll animations
    this.initScrollAnimations();

    // Header scroll effects (handled by navigation module)
  }

  initScrollToTop() {
    const scrollButton = Utils.createElement('button', {
      className: 'scroll-to-top',
      'aria-label': 'Volver arriba',
      innerHTML: '<i class="fas fa-arrow-up"></i>'
    });

    document.body.appendChild(scrollButton);

    const handleScroll = Utils.throttle(() => {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add('scroll-to-top--show');
      } else {
        scrollButton.classList.remove('scroll-to-top--show');
      }
    }, 100);

    Utils.addEventListenerSafe(window, 'scroll', handleScroll);

    Utils.addEventListenerSafe(scrollButton, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  initScrollAnimations() {
    const animatedElements = Utils.getElements('.fade-in, .slide-up');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });

    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  }

  initPerformanceMonitoring() {
    // Monitor page load performance
    Utils.addEventListenerSafe(window, 'load', () => {
      setTimeout(() => {
        this.reportPerformanceMetrics();
      }, 1000);
    });

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        this.checkMemoryUsage();
      }, 30000);
    }
  }

  logPerformance(event) {
    const timestamp = performance.now();
    this.performance.loadEvents.push({
      event,
      timestamp,
      duration: timestamp - this.performance.startTime
    });
  }

  reportPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];

    const metrics = {
      loadTime: navigation.loadEventEnd - navigation.fetchStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      firstPaint: this.getFirstPaint(),
      appInitTime: this.performance.loadEvents.find(e => e.event === 'app_init_complete')?.duration
    };

    console.log('📊 Performance Metrics:', metrics);

    // Send to analytics if implemented
    this.trackEvent('performance_metrics', metrics);
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  checkMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory;
      const memoryUsage = {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      };

      // Warn if memory usage is high
      if (memoryUsage.used > memoryUsage.limit * 0.8) {
        console.warn('⚠️ High memory usage detected:', memoryUsage);
        this.trackEvent('high_memory_usage', memoryUsage);
      }
    }
  }

  trackEvent(eventName, data = {}) {
    // Basic analytics tracking
    console.log(`📈 Event: ${eventName}`, data);

    // In production, integrate with Google Analytics or other service
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        custom_parameter: JSON.stringify(data)
      });
    }
  }

  announceAppReady() {
    // Show welcome notification
    setTimeout(() => {
      this.modules.notifications.showSuccess(
        '¡Bienvenido a Impulso Pro! 🚀',
        3000
      );
    }, 1000);

    // Dispatch ready event
    const event = new CustomEvent('impulso:ready', {
      detail: {
        version: '1.2',
        modules: Object.keys(this.modules),
        performance: this.performance
      }
    });

    document.dispatchEvent(event);
  }

  handleInitializationError(error) {
    console.error('🚨 Initialization Error:', error);

    // Show error notification
    if (this.modules.notifications) {
      this.modules.notifications.showError(
        'Error al cargar la aplicación. Recargue la página.',
        10000
      );
    }

    // Track error
    this.trackEvent('initialization_error', {
      message: error.message,
      stack: error.stack
    });
  }

  // Public API methods
  getModule(name) {
    return this.modules[name];
  }

  isReady() {
    return this.isInitialized;
  }

  restart() {
    // Clean up existing modules
    Object.values(this.modules).forEach(module => {
      if (module.destroy && typeof module.destroy === 'function') {
        module.destroy();
      }
    });

    // Clear modules
    this.modules = {};
    this.isInitialized = false;

    // Reinitialize
    this.init();
  }

  // Utility method for external scripts
  static getInstance() {
    return window.impulsoPro;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  Utils.addEventListenerSafe(document, 'DOMContentLoaded', () => {
    window.impulsoPro = new ImpulsoPro();
  });
} else {
  window.impulsoPro = new ImpulsoPro();
}

// Global error handler
Utils.addEventListenerSafe(window, 'error', (e) => {
  console.error('🚨 Global Error:', e.error);

  if (window.impulsoPro?.modules.notifications) {
    window.impulsoPro.modules.notifications.showError(
      'Ha ocurrido un error inesperado.',
      5000
    );
  }
});

// Unhandled promise rejection handler
Utils.addEventListenerSafe(window, 'unhandledrejection', (e) => {
  console.error('🚨 Unhandled Promise Rejection:', e.reason);

  if (window.impulsoPro?.modules.notifications) {
    window.impulsoPro.modules.notifications.showError(
      'Error de conexión o procesamiento.',
      5000
    );
  }
});

export default ImpulsoPro;