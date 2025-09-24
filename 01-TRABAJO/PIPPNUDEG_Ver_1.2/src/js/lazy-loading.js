/**
 * Sistema de lazy loading optimizado para imágenes
 */

import { Utils } from './utils.js';
import { CONFIG } from './config.js';

export class LazyLoading {
  constructor(options = {}) {
    this.options = {
      rootMargin: CONFIG.performance.lazyLoadingMargin,
      threshold: 0.1,
      loadingClass: 'lazy-loading',
      loadedClass: 'lazy-loaded',
      errorClass: 'lazy-error',
      ...options
    };

    this.imageObserver = null;
    this.images = new Set();

    this.init();
  }

  init() {
    if (!this.isIntersectionObserverSupported()) {
      this.loadAllImages();
      return;
    }

    this.createObserver();
    this.observeImages();
  }

  isIntersectionObserverSupported() {
    return 'IntersectionObserver' in window;
  }

  createObserver() {
    this.imageObserver = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold
      }
    );
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.imageObserver.unobserve(entry.target);
        this.images.delete(entry.target);
      }
    });
  }

  observeImages() {
    const lazyImages = Utils.getElements('img[data-src], img[data-srcset]');

    lazyImages.forEach(img => {
      this.images.add(img);
      this.imageObserver.observe(img);

      // Add loading class
      img.classList.add(this.options.loadingClass);
    });
  }

  loadImage(img) {
    // Add loading state
    img.classList.add(this.options.loadingClass);

    // Create new image to preload
    const imageLoader = new Image();

    // Handle successful load
    imageLoader.onload = () => {
      this.onImageLoad(img, imageLoader);
    };

    // Handle error
    imageLoader.onerror = () => {
      this.onImageError(img);
    };

    // Start loading
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    if (srcset) {
      imageLoader.srcset = srcset;
    }

    if (src) {
      imageLoader.src = src;
    }
  }

  onImageLoad(img, imageLoader) {
    // Update the actual image
    if (imageLoader.srcset) {
      img.srcset = imageLoader.srcset;
    }

    if (imageLoader.src) {
      img.src = imageLoader.src;
    }

    // Remove data attributes
    img.removeAttribute('data-src');
    img.removeAttribute('data-srcset');

    // Update classes
    img.classList.remove(this.options.loadingClass);
    img.classList.add(this.options.loadedClass);

    // Fade in effect
    this.addFadeInEffect(img);

    // Announce to screen reader
    if (window.announceToScreenReader) {
      const alt = img.getAttribute('alt');
      if (alt) {
        window.announceToScreenReader(`Imagen cargada: ${alt}`);
      }
    }
  }

  onImageError(img) {
    img.classList.remove(this.options.loadingClass);
    img.classList.add(this.options.errorClass);

    // Set fallback image if available
    const fallback = img.dataset.fallback;
    if (fallback) {
      img.src = fallback;
    } else {
      // Hide broken image
      img.style.display = 'none';
    }

    console.warn('Failed to load image:', img.dataset.src || img.dataset.srcset);
  }

  addFadeInEffect(img) {
    if (Utils.prefersReducedMotion()) {
      return;
    }

    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';

    // Force reflow
    img.offsetHeight;

    img.style.opacity = '1';
  }

  loadAllImages() {
    // Fallback for browsers without IntersectionObserver
    const lazyImages = Utils.getElements('img[data-src], img[data-srcset]');

    lazyImages.forEach(img => {
      this.loadImage(img);
    });
  }

  addImage(img) {
    if (this.imageObserver && img.dataset.src || img.dataset.srcset) {
      this.images.add(img);
      this.imageObserver.observe(img);
      img.classList.add(this.options.loadingClass);
    }
  }

  removeImage(img) {
    if (this.imageObserver) {
      this.imageObserver.unobserve(img);
    }
    this.images.delete(img);
  }

  destroy() {
    if (this.imageObserver) {
      this.imageObserver.disconnect();
    }

    this.images.clear();
  }
}

// Image optimization utilities
export class ImageOptimizer {
  static generateSrcSet(baseSrc, sizes = [400, 800, 1200, 1600]) {
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');

    return sizes
      .map(size => `${baseName}-${size}w.webp ${size}w`)
      .join(', ');
  }

  static generateSizes(breakpoints = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw'
  }) {
    const queries = [];

    if (breakpoints.desktop) {
      queries.push(`(min-width: 1024px) ${breakpoints.desktop}`);
    }

    if (breakpoints.tablet) {
      queries.push(`(min-width: 768px) ${breakpoints.tablet}`);
    }

    if (breakpoints.mobile) {
      queries.push(breakpoints.mobile);
    }

    return queries.join(', ');
  }

  static createResponsiveImage(src, alt, options = {}) {
    const {
      sizes = [400, 800, 1200],
      breakpoints = { mobile: '100vw', tablet: '50vw', desktop: '33vw' },
      className = '',
      loading = 'lazy',
      fallback = null
    } = options;

    const img = Utils.createElement('img', {
      alt,
      className: `responsive-image ${className}`.trim(),
      loading
    });

    // Use data attributes for lazy loading
    if (loading === 'lazy') {
      img.setAttribute('data-src', src);
      img.setAttribute('data-srcset', this.generateSrcSet(src, sizes));
      img.setAttribute('sizes', this.generateSizes(breakpoints));

      if (fallback) {
        img.setAttribute('data-fallback', fallback);
      }

      // Add placeholder
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
    } else {
      img.src = src;
      img.srcset = this.generateSrcSet(src, sizes);
      img.sizes = this.generateSizes(breakpoints);
    }

    return img;
  }

  static preloadCriticalImages(images) {
    images.forEach(src => {
      const link = Utils.createElement('link', {
        rel: 'preload',
        as: 'image',
        href: src,
        type: 'image/webp'
      });

      document.head.appendChild(link);
    });
  }

  static convertToWebP(canvas, quality = 0.8) {
    return new Promise((resolve) => {
      if (canvas.toBlob) {
        canvas.toBlob(resolve, 'image/webp', quality);
      } else {
        // Fallback for older browsers
        const dataURL = canvas.toDataURL('image/webp', quality);
        const blob = this.dataURLToBlob(dataURL);
        resolve(blob);
      }
    });
  }

  static dataURLToBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

  static isWebPSupported() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  static async optimizeImageUpload(file, maxWidth = 1920, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = async () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;

        // Set canvas size
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw and compress
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert to WebP if supported
        const isWebPSupported = await this.isWebPSupported();

        if (isWebPSupported) {
          const webpBlob = await this.convertToWebP(canvas, quality);
          resolve(webpBlob);
        } else {
          canvas.toBlob(resolve, 'image/jpeg', quality);
        }
      };

      img.src = URL.createObjectURL(file);
    });
  }
}

// CSS for lazy loading effects
export const lazyLoadingStyles = `
  .lazy-loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: lazy-loading-shimmer 1.5s infinite;
  }

  .lazy-loaded {
    animation: lazy-fade-in 0.3s ease-in-out;
  }

  .lazy-error {
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 14px;
  }

  .lazy-error::before {
    content: "📷";
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .responsive-image {
    max-width: 100%;
    height: auto;
    display: block;
  }

  @keyframes lazy-loading-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes lazy-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .lazy-loading {
      animation: none;
      background: #f0f0f0;
    }

    .lazy-loaded {
      animation: none;
    }
  }

  /* Dark theme support */
  [data-theme="dark"] .lazy-loading {
    background: linear-gradient(90deg, #2a2a2a 25%, #1a1a1a 50%, #2a2a2a 75%);
  }

  [data-theme="dark"] .lazy-error {
    background: #2a2a2a;
    color: #666;
  }
`;

// Initialize lazy loading styles
export function initLazyLoadingStyles() {
  const styleSheet = Utils.createElement('style', {
    textContent: lazyLoadingStyles
  });
  document.head.appendChild(styleSheet);
}