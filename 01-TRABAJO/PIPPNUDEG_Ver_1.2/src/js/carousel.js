/**
 * Sistema de carrusel optimizado y simplificado
 */

import { Utils } from './utils.js';
import { CONFIG, SELECTORS } from './config.js';

export class Carousel {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      autoPlay: true,
      autoPlayDelay: CONFIG.carousel.autoPlayDelay,
      pauseOnHover: true,
      pauseOnInteraction: true,
      swipeEnabled: true,
      keyboardEnabled: true,
      indicators: true,
      ...options
    };

    this.currentSlide = 0;
    this.slides = [];
    this.indicators = [];
    this.isAutoPlaying = false;
    this.autoPlayInterval = null;
    this.isUserInteracting = false;
    this.isTransitioning = false; // Prevent rapid clicks

    this.init();
  }

  init() {
    if (!this.container) return;

    this.bindElements();
    this.bindEvents();
    this.setupAccessibility();

    if (this.slides.length > 0) {
      this.showSlide(0);
      this.startAutoPlay();
    }
  }

  bindElements() {
    this.slides = Array.from(this.container.querySelectorAll('.carousel-slide'));
    this.indicators = Array.from(this.container.querySelectorAll('.indicator'));
    this.prevButton = this.container.querySelector('#carousel-prev, .carousel-prev');
    this.nextButton = this.container.querySelector('#carousel-next, .carousel-next');
    this.pauseIndicator = this.container.querySelector('#pause-indicator');
  }

  bindEvents() {
    // Navigation buttons
    Utils.addEventListenerSafe(this.prevButton, 'click', (e) => {
      e.preventDefault();
      this.pauseAutoPlay(); // Pause immediately
      this.previousSlide();
      this.handleUserInteraction();
    });

    Utils.addEventListenerSafe(this.nextButton, 'click', (e) => {
      e.preventDefault();
      this.pauseAutoPlay(); // Pause immediately
      this.nextSlide();
      this.handleUserInteraction();
    });

    // Indicators
    this.indicators.forEach((indicator, index) => {
      Utils.addEventListenerSafe(indicator, 'click', () => {
        this.goToSlide(index);
        this.handleUserInteraction();
      });
    });

    // Hover events
    if (this.options.pauseOnHover) {
      Utils.addEventListenerSafe(this.container, 'mouseenter', () => this.pauseAutoPlay());
      Utils.addEventListenerSafe(this.container, 'mouseleave', () => this.resumeAutoPlay());
    }

    // Touch events
    if (this.options.swipeEnabled && Utils.isTouchDevice()) {
      this.setupTouchEvents();
    }

    // Keyboard events
    if (this.options.keyboardEnabled) {
      this.setupKeyboardEvents();
    }

    // User interaction detection
    if (this.options.pauseOnInteraction) {
      this.setupInteractionDetection();
    }

    // Visibility change
    Utils.addEventListenerSafe(document, 'visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoPlay();
      } else {
        this.resumeAutoPlay();
      }
    });
  }

  setupTouchEvents() {
    let startX = 0;
    let endX = 0;

    Utils.addEventListenerSafe(this.container, 'touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    Utils.addEventListenerSafe(this.container, 'touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
  }

  setupKeyboardEvents() {
    Utils.addEventListenerSafe(document, 'keydown', (e) => {
      if (!this.isCarouselFocused()) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.previousSlide();
          this.handleUserInteraction();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextSlide();
          this.handleUserInteraction();
          break;
        case ' ':
          e.preventDefault();
          this.toggleAutoPlay();
          break;
      }
    });
  }

  setupInteractionDetection() {
    const interactionEvents = ['click', 'scroll', 'touchstart', 'mousemove'];
    const carouselContent = this.container.querySelector('.carousel-content');

    if (carouselContent) {
      interactionEvents.forEach(event => {
        Utils.addEventListenerSafe(carouselContent, event,
          Utils.debounce(() => this.handleUserInteraction(), 100)
        );
      });
    }
  }

  setupAccessibility() {
    // Add ARIA attributes
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', 'Carrusel de contenido');

    this.slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'diapositiva');
      slide.setAttribute('aria-label', `${index + 1} de ${this.slides.length}`);
    });

    if (this.prevButton) {
      this.prevButton.setAttribute('aria-label', 'Diapositiva anterior');
    }

    if (this.nextButton) {
      this.nextButton.setAttribute('aria-label', 'Siguiente diapositiva');
    }
  }

  showSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= this.slides.length || this.isTransitioning) return;

    this.isTransitioning = true;

    // Hide all slides
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.indicators.forEach(indicator => indicator.classList.remove('active'));

    // Show target slide
    this.slides[slideIndex]?.classList.add('active');
    this.indicators[slideIndex]?.classList.add('active');

    this.currentSlide = slideIndex;

    // Update accessibility
    this.updateAccessibility();

    // Announce to screen readers
    this.announceSlideChange();

    // Reset transition flag after animation
    setTimeout(() => {
      this.isTransitioning = false;
    }, 800); // Match CSS transition duration (0.8s)
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  goToSlide(slideIndex) {
    this.showSlide(slideIndex);
  }

  startAutoPlay() {
    if (!this.options.autoPlay || this.isAutoPlaying) return;

    this.isAutoPlaying = true;
    this.autoPlayInterval = setInterval(() => {
      if (!this.isUserInteracting) {
        this.nextSlide();
      }
    }, this.options.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (!this.isAutoPlaying) return;

    this.isAutoPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }

    this.showPauseIndicator();
  }

  resumeAutoPlay() {
    if (this.isAutoPlaying || !this.options.autoPlay) return;

    setTimeout(() => {
      if (!this.isUserInteracting) {
        this.startAutoPlay();
      }
    }, 1000);
  }

  toggleAutoPlay() {
    if (this.isAutoPlaying) {
      this.pauseAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  handleSwipe(startX, endX) {
    const diff = startX - endX;
    const threshold = CONFIG.carousel.swipeThreshold;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }
  }

  handleUserInteraction() {
    this.isUserInteracting = true;
    this.pauseAutoPlay();

    // Clear existing timeout
    if (this.interactionTimeout) {
      clearTimeout(this.interactionTimeout);
    }

    // Resume after inactivity (increased time)
    this.interactionTimeout = setTimeout(() => {
      this.isUserInteracting = false;
      this.resumeAutoPlay();
    }, 5000); // 5 seconds of inactivity before resuming
  }

  showPauseIndicator() {
    if (this.pauseIndicator) {
      this.pauseIndicator.classList.add('show');
      setTimeout(() => {
        this.pauseIndicator.classList.remove('show');
      }, 2000);
    }
  }

  isCarouselFocused() {
    return this.container.contains(document.activeElement);
  }

  updateAccessibility() {
    const currentSlide = this.slides[this.currentSlide];
    if (currentSlide) {
      // Update live region
      const liveRegion = document.querySelector('[aria-live]');
      if (liveRegion) {
        liveRegion.textContent = `Diapositiva ${this.currentSlide + 1} de ${this.slides.length}`;
      }
    }
  }

  announceSlideChange() {
    if (window.announceToScreenReader) {
      const slideNumber = this.currentSlide + 1;
      const totalSlides = this.slides.length;
      window.announceToScreenReader(`Diapositiva ${slideNumber} de ${totalSlides}`);
    }
  }

  destroy() {
    // Clean up timers
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }

    if (this.interactionTimeout) {
      clearTimeout(this.interactionTimeout);
    }

    // Remove event listeners (modern browsers handle this automatically when elements are removed)
    this.container = null;
    this.slides = [];
    this.indicators = [];
  }
}

// Carousel Manager for multiple carousels
export class CarouselManager {
  constructor() {
    this.carousels = new Map();
  }

  init() {
    this.initMainCarousel();
    this.initEntidadesCarousel();
  }

  initMainCarousel() {
    const mainCarousel = Utils.getElement('.carousel-container');
    if (mainCarousel) {
      const carousel = new Carousel(mainCarousel, {
        autoPlayDelay: 20000, // Even slower for better reading
        pauseOnInteraction: true
      });
      this.carousels.set('main', carousel);
    }
  }

  initEntidadesCarousel() {
    const entidadesCarousel = Utils.getElement('.entidades-carousel');
    if (entidadesCarousel) {
      const carousel = new Carousel(entidadesCarousel, {
        autoPlayDelay: 6000,
        pauseOnHover: true
      });
      this.carousels.set('entidades', carousel);
    }
  }

  getCarousel(name) {
    return this.carousels.get(name);
  }

  destroyAll() {
    this.carousels.forEach(carousel => carousel.destroy());
    this.carousels.clear();
  }
}