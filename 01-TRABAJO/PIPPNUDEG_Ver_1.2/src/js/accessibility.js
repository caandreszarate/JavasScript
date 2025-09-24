/**
 * Sistema de accesibilidad mejorado
 */

import { Utils } from './utils.js';
import { CONFIG, ARIA_LABELS } from './config.js';

export class AccessibilityManager {
  constructor() {
    this.currentLanguage = 'es';
    this.liveRegion = null;
    this.skipLinks = [];
    this.focusableElements = [];

    this.init();
  }

  init() {
    this.createSkipLinks();
    this.createLiveRegion();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupARIALabels();
    this.setupReducedMotion();
    this.enhanceFormAccessibility();
    this.setupLandmarks();
  }

  createSkipLinks() {
    const skipLinks = [
      { href: '#main-content', text: 'Saltar al contenido principal' },
      { href: '#nav-menu', text: 'Saltar a la navegación' },
      { href: '#footer', text: 'Saltar al pie de página' }
    ];

    const skipContainer = Utils.createElement('div', {
      className: 'skip-links',
      'aria-label': 'Enlaces de navegación rápida'
    });

    skipLinks.forEach(({ href, text }) => {
      const link = Utils.createElement('a', {
        href,
        className: 'skip-link',
        textContent: text
      });

      Utils.addEventListenerSafe(link, 'click', (e) => {
        e.preventDefault();
        this.focusElement(href);
      });

      skipContainer.appendChild(link);
      this.skipLinks.push(link);
    });

    document.body.insertBefore(skipContainer, document.body.firstChild);
  }

  createLiveRegion() {
    this.liveRegion = Utils.createElement('div', {
      'aria-live': 'polite',
      'aria-atomic': 'true',
      className: 'sr-only live-region',
      id: 'live-region'
    });

    document.body.appendChild(this.liveRegion);

    // Global function for announcing to screen readers
    window.announceToScreenReader = (message, priority = 'polite') => {
      this.announce(message, priority);
    };
  }

  announce(message, priority = 'polite') {
    if (!this.liveRegion || !message) return;

    // Clear previous message
    this.liveRegion.textContent = '';

    // Set priority
    this.liveRegion.setAttribute('aria-live', priority);

    // Announce new message
    setTimeout(() => {
      this.liveRegion.textContent = message;
    }, 100);

    // Clear message after delay
    setTimeout(() => {
      this.liveRegion.textContent = '';
    }, 3000);
  }

  setupKeyboardNavigation() {
    // Global keyboard event handler
    Utils.addEventListenerSafe(document, 'keydown', (e) => {
      this.handleGlobalKeydown(e);
    });

    // Focus indicators
    Utils.addEventListenerSafe(document, 'keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    Utils.addEventListenerSafe(document, 'mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Escape key handler
    Utils.addEventListenerSafe(document, 'keydown', (e) => {
      if (e.key === 'Escape') {
        this.handleEscape();
      }
    });
  }

  handleGlobalKeydown(event) {
    const { key, ctrlKey, metaKey, altKey } = event;

    // Skip link navigation (Alt + S)
    if (altKey && key.toLowerCase() === 's') {
      event.preventDefault();
      this.focusFirstSkipLink();
      return;
    }

    // Quick navigation shortcuts
    if (altKey) {
      switch (key.toLowerCase()) {
        case 'h':
          event.preventDefault();
          this.focusElement('header');
          break;
        case 'm':
          event.preventDefault();
          this.focusElement('#main-content');
          break;
        case 'f':
          event.preventDefault();
          this.focusElement('footer');
          break;
        case 'n':
          event.preventDefault();
          this.focusElement('#nav-menu');
          break;
      }
    }
  }

  handleEscape() {
    // Close any open modals
    const openModals = Utils.getElements('.modal--show, .modal.show');
    openModals.forEach(modal => {
      const closeEvent = new CustomEvent('modal:close');
      modal.dispatchEvent(closeEvent);
    });

    // Close any open menus
    const openMenus = Utils.getElements('.navbar__menu--active, .nav-menu.active');
    openMenus.forEach(menu => {
      const closeEvent = new CustomEvent('menu:close');
      menu.dispatchEvent(closeEvent);
    });

    // Close dropdowns
    const openDropdowns = Utils.getElements('.dropdown--open, .language-menu--show');
    openDropdowns.forEach(dropdown => {
      dropdown.classList.remove('dropdown--open', 'language-menu--show');
    });
  }

  setupFocusManagement() {
    // Focus trap for modals
    this.setupModalFocusTrap();

    // Focus restoration
    this.setupFocusRestoration();

    // Focus visible elements
    this.updateFocusableElements();
  }

  setupModalFocusTrap() {
    Utils.addEventListenerSafe(document, 'keydown', (e) => {
      if (e.key === 'Tab') {
        const activeModal = Utils.getElement('.modal--show, .modal.show');
        if (activeModal) {
          this.trapFocus(e, activeModal);
        }
      }
    });
  }

  trapFocus(event, container) {
    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  getFocusableElements(container) {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([type="hidden"]):not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(selector))
      .filter(element => this.isVisible(element));
  }

  isVisible(element) {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' &&
           style.visibility !== 'hidden' &&
           style.opacity !== '0' &&
           element.offsetWidth > 0 &&
           element.offsetHeight > 0;
  }

  setupFocusRestoration() {
    let lastFocusedElement = null;

    // Store last focused element before modal opens
    Utils.addEventListenerSafe(document, 'modal:open', () => {
      lastFocusedElement = document.activeElement;
    });

    // Restore focus when modal closes
    Utils.addEventListenerSafe(document, 'modal:close', () => {
      if (lastFocusedElement && this.isVisible(lastFocusedElement)) {
        setTimeout(() => {
          lastFocusedElement.focus();
        }, 100);
      }
    });
  }

  setupARIALabels() {
    // Update ARIA labels based on current language
    this.updateLanguageSpecificLabels();

    // Set up navigation ARIA attributes
    this.setupNavigationARIA();

    // Set up form ARIA attributes
    this.setupFormARIA();

    // Set up interactive elements ARIA
    this.setupInteractiveARIA();
  }

  updateLanguageSpecificLabels() {
    const labels = ARIA_LABELS[this.currentLanguage] || ARIA_LABELS.es;

    // Update navigation labels
    const navToggle = Utils.getElement('#nav-toggle, .navbar__toggle');
    if (navToggle) {
      navToggle.setAttribute('aria-label', labels.openMenu);
    }

    const loginBtn = Utils.getElement('#btn-login, .btn-login');
    if (loginBtn) {
      loginBtn.setAttribute('aria-label', labels.openLogin);
    }

    const themeBtn = Utils.getElement('#btn-theme, .btn-theme');
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', labels.changeTheme);
    }

    const languageBtn = Utils.getElement('#btn-language, .btn-language');
    if (languageBtn) {
      languageBtn.setAttribute('aria-label', labels.changeLanguage);
    }

    // Update carousel labels
    const prevButtons = Utils.getElements('.carousel-prev, #carousel-prev');
    prevButtons.forEach(btn => {
      btn.setAttribute('aria-label', labels.previousSlide);
    });

    const nextButtons = Utils.getElements('.carousel-next, #carousel-next');
    nextButtons.forEach(btn => {
      btn.setAttribute('aria-label', labels.nextSlide);
    });

    // Update WhatsApp link
    const whatsappLink = Utils.getElement('.whatsapp-link');
    if (whatsappLink) {
      whatsappLink.setAttribute('aria-label', labels.whatsappContact);
    }
  }

  setupNavigationARIA() {
    // Main navigation
    const mainNav = Utils.getElement('nav, .navbar');
    if (mainNav) {
      mainNav.setAttribute('role', 'navigation');
      mainNav.setAttribute('aria-label', 'Navegación principal');
    }

    // Menu items
    const navLinks = Utils.getElements('.nav-link, .navbar__link');
    navLinks.forEach(link => {
      link.setAttribute('role', 'menuitem');
    });

    // Breadcrumbs
    const breadcrumb = Utils.getElement('.breadcrumb');
    if (breadcrumb) {
      breadcrumb.setAttribute('aria-label', 'Breadcrumb');
    }
  }

  setupFormARIA() {
    // Form validation
    const forms = Utils.getElements('form');
    forms.forEach(form => {
      this.enhanceFormValidation(form);
    });

    // Required fields
    const requiredFields = Utils.getElements('input[required], textarea[required], select[required]');
    requiredFields.forEach(field => {
      field.setAttribute('aria-required', 'true');
    });

    // Error messages
    const errorMessages = Utils.getElements('.form-error, .error-message');
    errorMessages.forEach((error, index) => {
      const errorId = `error-${index}`;
      error.id = errorId;
      error.setAttribute('role', 'alert');
      error.setAttribute('aria-live', 'assertive');

      // Associate with input
      const input = error.previousElementSibling;
      if (input && input.tagName === 'INPUT') {
        input.setAttribute('aria-describedby', errorId);
      }
    });
  }

  enhanceFormValidation(form) {
    Utils.addEventListenerSafe(form, 'submit', (e) => {
      const invalidFields = form.querySelectorAll(':invalid');
      if (invalidFields.length > 0) {
        e.preventDefault();
        this.focusFirstInvalidField(invalidFields);
        this.announceFormErrors(invalidFields);
      }
    });
  }

  focusFirstInvalidField(invalidFields) {
    const firstInvalid = invalidFields[0];
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  announceFormErrors(invalidFields) {
    const errorCount = invalidFields.length;
    const message = `Formulario contiene ${errorCount} error${errorCount > 1 ? 'es' : ''}. Por favor revise los campos marcados.`;
    this.announce(message, 'assertive');
  }

  setupInteractiveARIA() {
    // Buttons that control other elements
    const toggleButtons = Utils.getElements('[data-toggle], [aria-expanded]');
    toggleButtons.forEach(button => {
      Utils.addEventListenerSafe(button, 'click', () => {
        this.updateToggleARIA(button);
      });
    });

    // Carousel indicators
    const carouselIndicators = Utils.getElements('.carousel-indicator, .indicator');
    carouselIndicators.forEach((indicator, index) => {
      indicator.setAttribute('role', 'button');
      indicator.setAttribute('aria-label', `Ir a diapositiva ${index + 1}`);
    });

    // Progress indicators
    const progressBars = Utils.getElements('.progress, .progress-bar');
    progressBars.forEach(progress => {
      progress.setAttribute('role', 'progressbar');
      progress.setAttribute('aria-valuemin', '0');
      progress.setAttribute('aria-valuemax', '100');
    });
  }

  updateToggleARIA(button) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);

    // Update controlled element
    const controlsId = button.getAttribute('aria-controls');
    if (controlsId) {
      const controlledElement = Utils.getElement(`#${controlsId}`);
      if (controlledElement) {
        controlledElement.setAttribute('aria-hidden', isExpanded);
      }
    }
  }

  setupReducedMotion() {
    const prefersReducedMotion = Utils.prefersReducedMotion();
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
    }

    // Listen for changes in motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    Utils.addEventListenerSafe(mediaQuery, 'change', (e) => {
      if (e.matches) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    });
  }

  enhanceFormAccessibility() {
    // Add fieldsets and legends for grouped inputs
    const formGroups = Utils.getElements('.form-group');
    formGroups.forEach(group => {
      const inputs = group.querySelectorAll('input[type="radio"], input[type="checkbox"]');
      if (inputs.length > 1) {
        this.wrapWithFieldset(group, inputs);
      }
    });

    // Enhance input descriptions
    const inputs = Utils.getElements('input, textarea, select');
    inputs.forEach(input => {
      this.enhanceInputAccessibility(input);
    });
  }

  wrapWithFieldset(group, inputs) {
    const firstInput = inputs[0];
    const label = group.querySelector('label');

    if (label && firstInput) {
      const fieldset = Utils.createElement('fieldset');
      const legend = Utils.createElement('legend', {
        textContent: label.textContent
      });

      fieldset.appendChild(legend);

      // Move inputs to fieldset
      inputs.forEach(input => {
        fieldset.appendChild(input.parentNode);
      });

      group.appendChild(fieldset);
      label.remove();
    }
  }

  enhanceInputAccessibility(input) {
    // Add input format hints
    const type = input.type;
    let hint = '';

    switch (type) {
      case 'email':
        hint = 'Formato: usuario@dominio.com';
        break;
      case 'tel':
        hint = 'Formato: +34 123 456 789';
        break;
      case 'url':
        hint = 'Formato: https://ejemplo.com';
        break;
      case 'password':
        hint = 'Mínimo 8 caracteres';
        break;
    }

    if (hint) {
      const hintId = `hint-${Utils.generateId()}`;
      const hintElement = Utils.createElement('div', {
        id: hintId,
        className: 'input-hint sr-only',
        textContent: hint
      });

      input.parentNode.appendChild(hintElement);

      const describedBy = input.getAttribute('aria-describedby');
      input.setAttribute('aria-describedby',
        describedBy ? `${describedBy} ${hintId}` : hintId
      );
    }
  }

  setupLandmarks() {
    // Main content
    let main = Utils.getElement('main');
    if (!main) {
      main = Utils.getElement('.main-content, .main');
    }
    if (main) {
      main.setAttribute('role', 'main');
      main.id = 'main-content';
    }

    // Header
    const header = Utils.getElement('header, .header');
    if (header) {
      header.setAttribute('role', 'banner');
    }

    // Footer
    const footer = Utils.getElement('footer, .footer');
    if (footer) {
      footer.setAttribute('role', 'contentinfo');
      footer.id = 'footer';
    }

    // Sections
    const sections = Utils.getElements('section');
    sections.forEach(section => {
      if (!section.getAttribute('role')) {
        section.setAttribute('role', 'region');
      }

      // Add aria-label if section has a heading
      const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading && !section.getAttribute('aria-label')) {
        section.setAttribute('aria-label', heading.textContent);
      }
    });
  }

  focusElement(selector) {
    const element = Utils.getElement(selector);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  focusFirstSkipLink() {
    if (this.skipLinks.length > 0) {
      this.skipLinks[0].focus();
    }
  }

  updateFocusableElements() {
    this.focusableElements = this.getFocusableElements(document.body);
  }

  setLanguage(language) {
    this.currentLanguage = language;
    this.updateLanguageSpecificLabels();

    // Update skip links text
    this.updateSkipLinksLanguage();
  }

  updateSkipLinksLanguage() {
    const texts = {
      es: ['Saltar al contenido principal', 'Saltar a la navegación', 'Saltar al pie de página'],
      en: ['Skip to main content', 'Skip to navigation', 'Skip to footer']
    };

    const currentTexts = texts[this.currentLanguage] || texts.es;

    this.skipLinks.forEach((link, index) => {
      if (currentTexts[index]) {
        link.textContent = currentTexts[index];
      }
    });
  }

  // Accessibility audit helpers
  runAccessibilityAudit() {
    const issues = [];

    // Check for missing alt attributes
    const images = Utils.getElements('img:not([alt])');
    if (images.length > 0) {
      issues.push(`${images.length} imágenes sin atributo alt`);
    }

    // Check for missing form labels
    const unlabeledInputs = Utils.getElements('input:not([aria-label]):not([aria-labelledby])');
    const unlabeledInputsWithoutAssociatedLabel = Array.from(unlabeledInputs).filter(input => {
      const id = input.id;
      return !id || !Utils.getElement(`label[for="${id}"]`);
    });

    if (unlabeledInputsWithoutAssociatedLabel.length > 0) {
      issues.push(`${unlabeledInputsWithoutAssociatedLabel.length} campos de formulario sin etiqueta`);
    }

    // Check color contrast (basic check)
    const lowContrastElements = this.checkColorContrast();
    if (lowContrastElements.length > 0) {
      issues.push(`${lowContrastElements.length} elementos con posible bajo contraste`);
    }

    // Check for heading structure
    const headingIssues = this.checkHeadingStructure();
    if (headingIssues.length > 0) {
      issues.push(...headingIssues);
    }

    return issues;
  }

  checkColorContrast() {
    // This is a simplified check - in production, use a proper contrast checking library
    const elements = Utils.getElements('*');
    const lowContrastElements = [];

    elements.forEach(element => {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = style.backgroundColor;

      // Basic check for very light text on light background
      if (this.isLightColor(color) && this.isLightColor(backgroundColor)) {
        lowContrastElements.push(element);
      }
    });

    return lowContrastElements;
  }

  isLightColor(color) {
    // Very basic lightness check
    const rgb = color.match(/\d+/g);
    if (!rgb) return false;

    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    return brightness > 128;
  }

  checkHeadingStructure() {
    const headings = Utils.getElements('h1, h2, h3, h4, h5, h6');
    const issues = [];
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));

      if (index === 0 && level !== 1) {
        issues.push('El primer encabezado debería ser H1');
      }

      if (level > previousLevel + 1) {
        issues.push(`Salto de nivel en encabezado: de H${previousLevel} a H${level}`);
      }

      previousLevel = level;
    });

    return issues;
  }
}