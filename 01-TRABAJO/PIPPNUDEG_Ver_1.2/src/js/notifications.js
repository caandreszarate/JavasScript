/**
 * Sistema de notificaciones mejorado
 */

import { Utils } from './utils.js';
import { CONFIG } from './config.js';

export class NotificationSystem {
  constructor() {
    this.container = null;
    this.notifications = new Map();
    this.maxVisible = CONFIG.notifications.maxVisible;

    this.init();
  }

  init() {
    this.createContainer();
    this.injectStyles();
  }

  createContainer() {
    this.container = Utils.createElement('div', {
      className: 'notification-container',
      'aria-live': 'polite',
      'aria-atomic': 'false'
    });

    Object.assign(this.container.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '9999',
      pointerEvents: 'none'
    });

    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = CONFIG.notifications.duration) {
    const id = Utils.generateId('notification');
    const notification = this.createNotification(id, message, type, duration);

    this.addToContainer(notification);
    this.manageVisibility();

    return id;
  }

  showSuccess(message, duration) {
    return this.show(message, 'success', duration);
  }

  showError(message, duration) {
    return this.show(message, 'error', duration);
  }

  showWarning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  showInfo(message, duration) {
    return this.show(message, 'info', duration);
  }

  showElegant(message, duration = 3000) {
    const id = Utils.generateId('elegant-notification');
    const notification = this.createElegantNotification(id, message, duration);

    this.addToContainer(notification);
    this.manageVisibility();

    return id;
  }

  createNotification(id, message, type, duration) {
    const notification = Utils.createElement('div', {
      className: `notification notification--${type}`,
      'data-id': id,
      role: 'alert',
      'aria-live': 'assertive'
    });

    const iconMap = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };

    notification.innerHTML = `
      <div class="notification__content">
        <div class="notification__icon">
          <i class="${iconMap[type]}"></i>
        </div>
        <div class="notification__message">${message}</div>
        <button class="notification__close" aria-label="Cerrar notificación">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="notification__progress"></div>
    `;

    // Bind close event
    const closeBtn = notification.querySelector('.notification__close');
    Utils.addEventListenerSafe(closeBtn, 'click', () => this.remove(id));

    // Auto-remove
    if (duration > 0) {
      const progressBar = notification.querySelector('.notification__progress');
      if (progressBar) {
        progressBar.style.animationDuration = `${duration}ms`;
      }

      setTimeout(() => this.remove(id), duration);
    }

    // Click to dismiss
    Utils.addEventListenerSafe(notification, 'click', () => this.remove(id));

    this.notifications.set(id, {
      element: notification,
      type,
      timestamp: Date.now()
    });

    return notification;
  }

  createElegantNotification(id, message, duration) {
    const notification = Utils.createElement('div', {
      className: 'elegant-notification',
      'data-id': id,
      role: 'alert'
    });

    notification.innerHTML = `
      <div class="elegant-notification__inner">
        <div class="elegant-notification__icon">
          <i class="fas fa-globe"></i>
        </div>
        <div class="elegant-notification__content">
          <span class="elegant-notification__text">${message}</span>
        </div>
        <div class="elegant-notification__progress"></div>
      </div>
    `;

    // Auto-remove
    if (duration > 0) {
      const progressBar = notification.querySelector('.elegant-notification__progress');
      if (progressBar) {
        setTimeout(() => {
          progressBar.style.transform = 'scaleX(0)';
        }, 100);
      }

      setTimeout(() => this.remove(id), duration);
    }

    // Click to dismiss
    Utils.addEventListenerSafe(notification, 'click', () => this.remove(id));

    // Hover effects
    Utils.addEventListenerSafe(notification, 'mouseenter', () => {
      notification.style.transform = 'translateX(0) scale(1.02)';
    });

    Utils.addEventListenerSafe(notification, 'mouseleave', () => {
      notification.style.transform = 'translateX(0) scale(1)';
    });

    this.notifications.set(id, {
      element: notification,
      type: 'elegant',
      timestamp: Date.now()
    });

    return notification;
  }

  addToContainer(notification) {
    if (!this.container) return;

    notification.style.pointerEvents = 'auto';
    this.container.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0) scale(1)';
      notification.style.opacity = '1';
    });
  }

  remove(id) {
    const notificationData = this.notifications.get(id);
    if (!notificationData) return;

    const { element } = notificationData;

    // Animate out
    element.style.transform = 'translateX(100%) scale(0.8)';
    element.style.opacity = '0';

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.notifications.delete(id);
    }, 300);
  }

  manageVisibility() {
    const notificationArray = Array.from(this.notifications.values())
      .sort((a, b) => b.timestamp - a.timestamp);

    if (notificationArray.length > this.maxVisible) {
      const toRemove = notificationArray.slice(this.maxVisible);
      toRemove.forEach(notification => {
        const id = notification.element.getAttribute('data-id');
        this.remove(id);
      });
    }
  }

  clear() {
    this.notifications.forEach((notification, id) => {
      this.remove(id);
    });
  }

  injectStyles() {
    const styles = `
      .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        pointer-events: none;
      }

      .notification {
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        margin-bottom: 16px;
        overflow: hidden;
        transform: translateX(100%) scale(0.8);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-left: 4px solid var(--primary-color);
        position: relative;
        cursor: pointer;
        pointer-events: auto;
      }

      .notification--success {
        border-left-color: #10b981;
      }

      .notification--error {
        border-left-color: #ef4444;
      }

      .notification--warning {
        border-left-color: #f59e0b;
      }

      .notification--info {
        border-left-color: #3b82f6;
      }

      .notification__content {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        gap: 12px;
      }

      .notification__icon {
        font-size: 20px;
        color: var(--primary-color);
      }

      .notification--success .notification__icon {
        color: #10b981;
      }

      .notification--error .notification__icon {
        color: #ef4444;
      }

      .notification--warning .notification__icon {
        color: #f59e0b;
      }

      .notification--info .notification__icon {
        color: #3b82f6;
      }

      .notification__message {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        color: #374151;
      }

      .notification__close {
        background: none;
        border: none;
        font-size: 16px;
        color: #9ca3af;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: color 0.2s ease;
      }

      .notification__close:hover {
        color: #374151;
      }

      .notification__progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
        transform-origin: left;
        animation: progress-countdown linear;
      }

      @keyframes progress-countdown {
        from { transform: scaleX(1); }
        to { transform: scaleX(0); }
      }

      /* Elegant notification styles */
      .elegant-notification {
        background: linear-gradient(135deg, #256294, #1a4a7a);
        color: white;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(37, 98, 148, 0.3);
        margin-bottom: 16px;
        overflow: hidden;
        transform: translateX(100%) scale(0.8);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 320px;
        min-width: 280px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        pointer-events: auto;
      }

      .elegant-notification__inner {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        position: relative;
      }

      .elegant-notification__icon {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        flex-shrink: 0;
      }

      .elegant-notification__icon i {
        color: white;
        font-size: 18px;
      }

      .elegant-notification__content {
        flex: 1;
        min-width: 0;
      }

      .elegant-notification__text {
        color: white;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        margin: 0;
      }

      .elegant-notification__progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #64c5e6, #8dd4f0);
        width: 100%;
        transform: scaleX(1);
        transform-origin: left;
        transition: transform 3s linear;
      }

      /* Dark theme support */
      [data-theme="dark"] .notification {
        background: var(--dark-card-bg);
        border: 1px solid var(--dark-border);
      }

      [data-theme="dark"] .notification__message {
        color: var(--dark-text-primary);
      }

      [data-theme="dark"] .notification__close {
        color: var(--dark-text-secondary);
      }

      [data-theme="dark"] .notification__close:hover {
        color: var(--dark-text-primary);
      }
    `;

    const styleSheet = Utils.createElement('style', {
      textContent: styles
    });

    document.head.appendChild(styleSheet);
  }
}