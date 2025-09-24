/**
 * Gestión de navegación y menú
 */

import { Utils } from './utils.js';
import { CONFIG, SELECTORS, ARIA_LABELS } from './config.js';

export class Navigation {
  constructor() {
    this.isMenuOpen = false;
    this.currentActiveLink = null;
    this.currentLanguage = Utils.getStoredValue(CONFIG.language.storageKey, CONFIG.language.defaultLanguage);

    this.init();
  }

  init() {
    this.bindElements();
    this.bindEvents();
    this.loadSavedLanguage();
    this.updateNavStyles();
    this.handleInitialNavigation();
  }

  bindElements() {
    this.navToggle = Utils.getElement(SELECTORS.navToggle);
    this.navMenu = Utils.getElement(SELECTORS.navMenu);
    this.navLinks = Utils.getElements(SELECTORS.navLinks);
    this.btnLanguage = Utils.getElement(SELECTORS.btnLanguage);
    this.header = Utils.getElement(SELECTORS.header);
    this.languageMenu = Utils.getElement('#language-menu');
  }

  bindEvents() {
    // Mobile menu toggle
    Utils.addEventListenerSafe(this.navToggle, 'click', () => this.toggleMobileMenu());

    // Navigation links
    this.navLinks.forEach(link => {
      Utils.addEventListenerSafe(link, 'click', (e) => this.handleNavLinkClick(e));
    });

    // Language toggle
    Utils.addEventListenerSafe(this.btnLanguage, 'click', () => this.toggleLanguage());
    Utils.addEventListenerSafe(this.btnLanguage, 'dblclick', (e) => this.showLanguageMenu(e));

    // Language menu items
    const menuItems = Utils.getElements('.menu-item');
    menuItems.forEach(item => {
      Utils.addEventListenerSafe(item, 'click', () => this.setNotificationType(item));
    });

    // Close language menu on outside click
    Utils.addEventListenerSafe(document, 'click', (e) => this.handleOutsideClick(e));

    // Window events
    Utils.addEventListenerSafe(window, 'scroll', Utils.throttle(() => {
      this.handleScrollNavigation();
      this.handleHeaderScroll();
    }, CONFIG.performance.debounceDelay));

    Utils.addEventListenerSafe(window, 'resize', Utils.debounce(() => {
      this.handleResize();
    }, 250));

    // Keyboard navigation
    Utils.addEventListenerSafe(document, 'keydown', (e) => this.handleKeyNavigation(e));
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    Utils.toggleClass(this.navMenu, 'active', this.isMenuOpen);
    Utils.toggleClass(this.navToggle, 'active', this.isMenuOpen);

    // Update ARIA attributes
    if (this.navToggle) {
      this.navToggle.setAttribute('aria-expanded', this.isMenuOpen);
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';

    // Update accessibility label
    this.updateAccessibilityLabels();
  }

  closeMobileMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      Utils.toggleClass(this.navMenu, 'active', false);
      Utils.toggleClass(this.navToggle, 'active', false);
      document.body.style.overflow = '';

      if (this.navToggle) {
        this.navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  }

  handleNavLinkClick(event) {
    const targetId = event.currentTarget.getAttribute('href');

    // Close mobile menu
    this.closeMobileMenu();

    // Handle active navigation
    this.setActiveNavigation(targetId);

    // Smooth scroll
    this.smoothScrollToSection(targetId);
  }

  setActiveNavigation(targetId) {
    // Remove active class from all links
    this.navLinks.forEach(link => link.classList.remove('active'));

    // Add active class to target link
    const targetLink = Utils.getElement(`[href="${targetId}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
      this.currentActiveLink = targetLink;
    }
  }

  smoothScrollToSection(targetId) {
    const targetSection = Utils.getElement(targetId);
    if (targetSection && this.header) {
      const headerHeight = this.header.offsetHeight;
      Utils.smoothScrollTo(targetSection, headerHeight);
    }
  }

  handleScrollNavigation() {
    const sections = Utils.getElements(SELECTORS.contentSection);
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.setActiveNavigation(`#${sectionId}`);
      }
    });
  }

  handleHeaderScroll() {
    if (!this.header) return;

    const scrollPosition = window.scrollY;
    const headerStyle = this.header.style;

    if (scrollPosition > 50) {
      headerStyle.background = 'rgba(37, 98, 148, 0.95)';
      headerStyle.backdropFilter = 'blur(20px)';
      headerStyle.boxShadow = '0 2px 20px rgba(100, 197, 230, 0.1)';
    } else {
      headerStyle.background = '#256294';
      headerStyle.backdropFilter = 'blur(10px)';
      headerStyle.boxShadow = 'none';
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.updateLanguageDisplay();
    this.translateContent();
    this.saveLanguagePreference();
    this.showLanguageChangeNotification();
  }

  updateLanguageDisplay() {
    if (this.btnLanguage) {
      const languageSpan = this.btnLanguage.querySelector('span');
      if (languageSpan) {
        languageSpan.textContent = this.currentLanguage.toUpperCase();
      }
    }
  }

  translateContent() {
    const translatableElements = Utils.getElements('[data-es][data-en]');

    translatableElements.forEach(element => {
      const spanishText = element.getAttribute('data-es');
      const englishText = element.getAttribute('data-en');

      if (this.currentLanguage === 'es') {
        element.textContent = spanishText;
      } else {
        element.textContent = englishText;
      }
    });

    this.updateAccessibilityLabels();
  }

  saveLanguagePreference() {
    Utils.setStoredValue(CONFIG.language.storageKey, this.currentLanguage);
  }

  loadSavedLanguage() {
    this.translateContent();
    this.updateLanguageDisplay();
  }

  showLanguageChangeNotification() {
    const notificationType = Utils.getStoredValue(CONFIG.language.notificationStorageKey, 'indicator');
    const message = this.currentLanguage === 'es'
      ? 'Idioma cambiado a Español'
      : 'Language changed to English';

    // Import and use notification system (will be implemented)
    import('./notifications.js').then(({ NotificationSystem }) => {
      const notificationSystem = new NotificationSystem();
      switch (notificationType) {
        case 'elegant':
          notificationSystem.showElegant(message);
          break;
        case 'indicator':
          this.showLanguageIndicator();
          break;
        case 'none':
        default:
          break;
      }
    });
  }

  showLanguageIndicator() {
    if (!this.btnLanguage) return;

    const indicator = Utils.createElement('div', {
      className: 'language-indicator',
      innerHTML: '<div class="indicator-dot"></div>'
    });

    // Styles
    Object.assign(indicator.style, {
      position: 'absolute',
      top: '-2px',
      right: '-2px',
      width: '12px',
      height: '12px',
      background: '#64c5e6',
      borderRadius: '50%',
      border: '2px solid #256294',
      animation: 'pulse 2s ease-in-out',
      zIndex: '10'
    });

    this.btnLanguage.style.position = 'relative';
    this.btnLanguage.appendChild(indicator);

    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.remove();
      }
    }, 2000);
  }

  showLanguageMenu(event) {
    event.preventDefault();
    if (this.languageMenu) {
      Utils.toggleClass(this.languageMenu, 'show');
    }
  }

  setNotificationType(item) {
    const type = item.getAttribute('data-type');
    Utils.setStoredValue(CONFIG.language.notificationStorageKey, type);

    // Update active state
    const menuItems = Utils.getElements('.menu-item');
    menuItems.forEach(mi => mi.classList.remove('active'));
    item.classList.add('active');

    // Close menu
    if (this.languageMenu) {
      Utils.toggleClass(this.languageMenu, 'show', false);
    }
  }

  handleOutsideClick(event) {
    if (this.languageMenu &&
        !this.btnLanguage?.contains(event.target) &&
        !this.languageMenu.contains(event.target)) {
      Utils.toggleClass(this.languageMenu, 'show', false);
    }
  }

  handleResize() {
    if (window.innerWidth > CONFIG.breakpoints.tablet) {
      this.closeMobileMenu();
    }
    this.updateNavStyles();
  }

  handleKeyNavigation(event) {
    switch (event.key) {
      case 'Escape':
        this.closeMobileMenu();
        break;
      case 'Tab':
        document.body.classList.add('keyboard-navigation');
        break;
    }

    // Shortcuts
    if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
      event.preventDefault();
      this.toggleLanguage();
    }
  }

  updateNavStyles() {
    if (!this.header) return;

    // Force navigation styles
    Object.assign(this.header.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      background: '#256294',
      zIndex: '1000',
      width: '100%',
      height: '70px'
    });

    this.navLinks.forEach(link => {
      link.style.color = '#ffffff';
      link.style.textDecoration = 'none';
    });
  }

  updateAccessibilityLabels() {
    const labels = ARIA_LABELS[this.currentLanguage];

    if (this.navToggle) {
      this.navToggle.setAttribute('aria-label',
        this.isMenuOpen ? labels.closeMenu : labels.openMenu);
    }
  }

  handleInitialNavigation() {
    const hash = window.location.hash;
    if (hash) {
      this.setActiveNavigation(hash);
      setTimeout(() => {
        this.smoothScrollToSection(hash);
      }, 100);
    }
  }
}