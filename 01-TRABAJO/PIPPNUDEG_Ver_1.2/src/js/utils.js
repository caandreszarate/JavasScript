/**
 * Utilidades y funciones helper
 */

import { CONFIG } from './config.js';

export class Utils {
  /**
   * Debounce function to limit function calls
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function to limit function calls
   */
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Check if element is in viewport
   */
  static isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  }

  /**
   * Get element by selector with error handling
   */
  static getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`Element not found: ${selector}`);
    }
    return element;
  }

  /**
   * Get elements by selector with error handling
   */
  static getElements(selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      console.warn(`No elements found: ${selector}`);
    }
    return elements;
  }

  /**
   * Safe event listener addition
   */
  static addEventListenerSafe(element, event, handler, options = {}) {
    if (element && typeof handler === 'function') {
      element.addEventListener(event, handler, options);
      return true;
    }
    console.warn('Invalid element or handler for event listener');
    return false;
  }

  /**
   * Create element with attributes and content
   */
  static createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      element.innerHTML = content;
    }

    return element;
  }

  /**
   * Smooth scroll to element
   */
  static smoothScrollTo(element, offset = 0) {
    if (!element) return;

    const elementPosition = element.offsetTop - offset;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Get stored value from localStorage with fallback
   */
  static getStoredValue(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.warn(`Error reading from localStorage: ${key}`, error);
      return fallback;
    }
  }

  /**
   * Store value in localStorage with error handling
   */
  static setStoredValue(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage: ${key}`, error);
      return false;
    }
  }

  /**
   * Check if user prefers reduced motion
   */
  static prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Check if device supports touch
   */
  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  /**
   * Get current breakpoint
   */
  static getCurrentBreakpoint() {
    const width = window.innerWidth;
    const { mobile, tablet, desktop } = CONFIG.breakpoints;

    if (width < mobile) return 'mobile';
    if (width < tablet) return 'tablet';
    if (width < desktop) return 'desktop';
    return 'large';
  }

  /**
   * Format number with prefix
   */
  static formatNumber(number, prefix = '') {
    return prefix + number.toLocaleString();
  }

  /**
   * Generate unique ID
   */
  static generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Remove all children from element
   */
  static clearElement(element) {
    if (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  }

  /**
   * Check if element has class
   */
  static hasClass(element, className) {
    return element && element.classList.contains(className);
  }

  /**
   * Toggle class on element
   */
  static toggleClass(element, className, force) {
    if (element) {
      element.classList.toggle(className, force);
    }
  }

  /**
   * Wait for animation to complete
   */
  static waitForAnimation(element, animationName) {
    return new Promise((resolve) => {
      const handleAnimationEnd = (event) => {
        if (event.animationName === animationName) {
          element.removeEventListener('animationend', handleAnimationEnd);
          resolve();
        }
      };
      element.addEventListener('animationend', handleAnimationEnd);
    });
  }

  /**
   * Copy text to clipboard
   */
  static async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Failed to copy to clipboard', error);
      return false;
    }
  }
}