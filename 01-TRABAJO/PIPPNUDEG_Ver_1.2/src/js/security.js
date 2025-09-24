/**
 * Sistema de seguridad y mejores prácticas
 */

import { Utils } from './utils.js';

export class SecurityManager {
  constructor() {
    this.allowedDomains = [
      'impulsoprofesionalge.org',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'cdnjs.cloudflare.com'
    ];

    this.init();
  }

  init() {
    this.setupCSPHeaders();
    this.sanitizeUserInputs();
    this.validateExternalLinks();
    this.setupXSSProtection();
    this.preventClickjacking();
    this.secureLocalStorage();
    this.setupFormValidation();
    this.monitorConsoleAccess();
  }

  setupCSPHeaders() {
    // Note: CSP headers should ideally be set server-side
    // This is a client-side implementation for static sites
    const cspMeta = Utils.createElement('meta', {
      'http-equiv': 'Content-Security-Policy',
      content: this.generateCSPPolicy()
    });

    document.head.appendChild(cspMeta);
  }

  generateCSPPolicy() {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src 'self' fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
  }

  sanitizeUserInputs() {
    // Monitor all form inputs for potential XSS
    const forms = Utils.getElements('form');

    forms.forEach(form => {
      Utils.addEventListenerSafe(form, 'submit', (e) => {
        this.validateFormData(e);
      });

      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        Utils.addEventListenerSafe(input, 'input', (e) => {
          this.sanitizeInput(e.target);
        });
      });
    });
  }

  sanitizeInput(input) {
    const value = input.value;
    const sanitized = this.sanitizeHTML(value);

    if (value !== sanitized) {
      console.warn('Potentially malicious input detected and sanitized');
      input.value = sanitized;

      // Show warning to user
      this.showSecurityWarning('Se han detectado caracteres no permitidos en el formulario');
    }
  }

  sanitizeHTML(input) {
    // Create a temporary div to parse HTML
    const temp = document.createElement('div');
    temp.textContent = input;

    // Remove any remaining scripts or dangerous content
    return temp.innerHTML
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  }

  validateFormData(event) {
    const form = event.target;
    const formData = new FormData(form);
    let hasSecurityIssues = false;

    for (let [key, value] of formData.entries()) {
      // Check for SQL injection patterns
      if (this.detectSQLInjection(value)) {
        hasSecurityIssues = true;
        console.warn(`Potential SQL injection detected in field: ${key}`);
      }

      // Check for XSS patterns
      if (this.detectXSS(value)) {
        hasSecurityIssues = true;
        console.warn(`Potential XSS detected in field: ${key}`);
      }

      // Check for suspicious patterns
      if (this.detectSuspiciousPatterns(value)) {
        hasSecurityIssues = true;
        console.warn(`Suspicious pattern detected in field: ${key}`);
      }
    }

    if (hasSecurityIssues) {
      event.preventDefault();
      this.showSecurityWarning('Se han detectado datos sospechosos. Por favor, revise su entrada.');
      return false;
    }

    return true;
  }

  detectSQLInjection(input) {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
      /('|(\\')|(--|#|\/\*|\*\/))/i,
      /(\b(OR|AND)\b.*[=<>])/i,
      /(INFORMATION_SCHEMA|sysobjects|syscolumns)/i
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  }

  detectXSS(input) {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
      /vbscript:/gi,
      /data:text\/html/gi
    ];

    return xssPatterns.some(pattern => pattern.test(input));
  }

  detectSuspiciousPatterns(input) {
    const suspiciousPatterns = [
      /\.\.\//g, // Directory traversal
      /\/etc\/passwd/i,
      /\/proc\/self\/environ/i,
      /<\?php/i,
      /<%/i,
      /\${/i, // Template injection
      /\[\[/i, // Template injection
      /eval\s*\(/i,
      /setTimeout\s*\(/i,
      /setInterval\s*\(/i
    ];

    return suspiciousPatterns.some(pattern => pattern.test(input));
  }

  validateExternalLinks() {
    const externalLinks = Utils.getElements('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

    externalLinks.forEach(link => {
      // Add security attributes
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');

      // Validate against allowed domains
      Utils.addEventListenerSafe(link, 'click', (e) => {
        if (!this.isAllowedDomain(link.href)) {
          e.preventDefault();
          this.showExternalLinkWarning(link.href);
        }
      });
    });
  }

  isAllowedDomain(url) {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;

      // Allow same origin
      if (domain === window.location.hostname) {
        return true;
      }

      // Check against whitelist
      return this.allowedDomains.some(allowed => {
        return domain === allowed || domain.endsWith('.' + allowed);
      });
    } catch (error) {
      console.warn('Invalid URL:', url);
      return false;
    }
  }

  setupXSSProtection() {
    // Monitor dynamic content injection
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.scanForMaliciousContent(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['onclick', 'onload', 'onerror', 'src', 'href']
    });

    // Override dangerous functions
    this.overrideDangerousFunctions();
  }

  scanForMaliciousContent(element) {
    // Check for inline event handlers
    const inlineHandlers = element.querySelectorAll('[onclick], [onload], [onerror], [onmouseover]');
    if (inlineHandlers.length > 0) {
      console.warn('Inline event handlers detected - potential XSS');
      inlineHandlers.forEach(el => {
        // Remove inline handlers
        Array.from(el.attributes).forEach(attr => {
          if (attr.name.startsWith('on')) {
            el.removeAttribute(attr.name);
          }
        });
      });
    }

    // Check for suspicious scripts
    const scripts = element.querySelectorAll('script');
    scripts.forEach(script => {
      if (!this.isScriptAllowed(script)) {
        console.warn('Unauthorized script detected and removed');
        script.remove();
      }
    });
  }

  isScriptAllowed(script) {
    const src = script.src;

    // Allow inline scripts that we control
    if (!src) {
      const content = script.textContent || script.innerHTML;
      return this.isScriptContentSafe(content);
    }

    // Check against allowed domains
    return this.isAllowedDomain(src);
  }

  isScriptContentSafe(content) {
    // Check for potentially dangerous patterns
    const dangerousPatterns = [
      /eval\s*\(/i,
      /Function\s*\(/i,
      /setTimeout\s*\(\s*["'].*["']/i,
      /setInterval\s*\(\s*["'].*["']/i,
      /document\.write/i,
      /innerHTML\s*=\s*["'].*<script/i
    ];

    return !dangerousPatterns.some(pattern => pattern.test(content));
  }

  overrideDangerousFunctions() {
    // Override eval
    const originalEval = window.eval;
    window.eval = function(code) {
      console.warn('eval() usage detected - this may be a security risk');
      // In production, you might want to block this entirely
      return originalEval.call(this, code);
    };

    // Override Function constructor
    const OriginalFunction = window.Function;
    window.Function = function(...args) {
      console.warn('Function constructor usage detected - this may be a security risk');
      return OriginalFunction.apply(this, args);
    };
  }

  preventClickjacking() {
    // Add frame-busting code
    if (window.top !== window.self) {
      console.warn('Page loaded in frame - potential clickjacking attempt');

      // Break out of frame
      window.top.location = window.self.location;
    }

    // Add X-Frame-Options equivalent
    const frameOptionsMeta = Utils.createElement('meta', {
      'http-equiv': 'X-Frame-Options',
      content: 'DENY'
    });
    document.head.appendChild(frameOptionsMeta);
  }

  secureLocalStorage() {
    // Encrypt sensitive data in localStorage
    const originalSetItem = localStorage.setItem;
    const originalGetItem = localStorage.getItem;

    localStorage.setItem = function(key, value) {
      if (this.isSensitiveKey(key)) {
        value = this.encrypt(value);
      }
      return originalSetItem.call(localStorage, key, value);
    }.bind(this);

    localStorage.getItem = function(key) {
      let value = originalGetItem.call(localStorage, key);
      if (value && this.isSensitiveKey(key)) {
        value = this.decrypt(value);
      }
      return value;
    }.bind(this);

    // Clean up old/expired data
    this.cleanupLocalStorage();
  }

  isSensitiveKey(key) {
    const sensitiveKeys = ['user-token', 'auth-data', 'session-id'];
    return sensitiveKeys.some(sensitive => key.includes(sensitive));
  }

  encrypt(data) {
    // Simple base64 encoding (in production, use proper encryption)
    try {
      return btoa(encodeURIComponent(data));
    } catch (error) {
      console.warn('Encryption failed:', error);
      return data;
    }
  }

  decrypt(data) {
    // Simple base64 decoding
    try {
      return decodeURIComponent(atob(data));
    } catch (error) {
      console.warn('Decryption failed:', error);
      return data;
    }
  }

  cleanupLocalStorage() {
    const now = Date.now();
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

    Object.keys(localStorage).forEach(key => {
      const item = localStorage.getItem(key);

      try {
        const parsed = JSON.parse(item);
        if (parsed.timestamp && (now - parsed.timestamp) > maxAge) {
          localStorage.removeItem(key);
          console.log(`Cleaned up expired localStorage item: ${key}`);
        }
      } catch (error) {
        // Not a timestamped item, skip
      }
    });
  }

  setupFormValidation() {
    // Rate limiting for form submissions
    this.submissionCounts = new Map();

    const forms = Utils.getElements('form');
    forms.forEach(form => {
      Utils.addEventListenerSafe(form, 'submit', (e) => {
        if (!this.checkSubmissionRate(form)) {
          e.preventDefault();
          this.showSecurityWarning('Demasiados intentos de envío. Por favor, espere antes de intentar de nuevo.');
        }
      });
    });
  }

  checkSubmissionRate(form) {
    const formId = form.id || form.action || 'default';
    const now = Date.now();
    const submissions = this.submissionCounts.get(formId) || [];

    // Remove submissions older than 1 minute
    const recentSubmissions = submissions.filter(time => now - time < 60000);

    // Allow max 5 submissions per minute
    if (recentSubmissions.length >= 5) {
      return false;
    }

    // Record this submission
    recentSubmissions.push(now);
    this.submissionCounts.set(formId, recentSubmissions);

    return true;
  }

  monitorConsoleAccess() {
    // Detect when console is opened (potential developer tools usage)
    let devtools = { open: false };

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200 ||
          window.outerWidth - window.innerWidth > 200) {
        if (!devtools.open) {
          devtools.open = true;
          console.warn('Developer tools detected - please close them for security');
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Override console methods to detect misuse
    const originalLog = console.log;
    console.log = function(...args) {
      // Check for suspicious logging attempts
      const message = args.join(' ');
      if (this.containsSuspiciousContent(message)) {
        console.warn('Suspicious console activity detected');
      }
      return originalLog.apply(console, args);
    }.bind(this);
  }

  containsSuspiciousContent(message) {
    const suspiciousPatterns = [
      /password/i,
      /token/i,
      /api[_-]?key/i,
      /secret/i,
      /credit[_-]?card/i,
      /ssn|social[_-]?security/i
    ];

    return suspiciousPatterns.some(pattern => pattern.test(message));
  }

  showSecurityWarning(message) {
    // Import notification system and show warning
    import('./notifications.js').then(({ NotificationSystem }) => {
      const notifications = new NotificationSystem();
      notifications.showWarning(message, 8000);
    });

    // Log security event
    this.logSecurityEvent('security_warning', { message });
  }

  showExternalLinkWarning(url) {
    const domain = new URL(url).hostname;
    const message = `¿Está seguro de que desea visitar ${domain}? Este enlace lo llevará fuera de nuestro sitio.`;

    if (confirm(message)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  logSecurityEvent(type, details) {
    const event = {
      type,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      details
    };

    // In production, send to security monitoring service
    console.warn('Security Event:', event);

    // Store locally for analysis
    const logs = JSON.parse(localStorage.getItem('security-logs') || '[]');
    logs.push(event);

    // Keep only last 100 events
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }

    localStorage.setItem('security-logs', JSON.stringify(logs));
  }

  // Content Security Policy violation handler
  setupCSPViolationReporting() {
    Utils.addEventListenerSafe(document, 'securitypolicyviolation', (e) => {
      this.logSecurityEvent('csp_violation', {
        violatedDirective: e.violatedDirective,
        blockedURI: e.blockedURI,
        sourceFile: e.sourceFile,
        lineNumber: e.lineNumber
      });
    });
  }

  // Initialize additional security headers
  setupSecurityHeaders() {
    const headers = [
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-XSS-Protection', content: '1; mode=block' },
      { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
      { name: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=()' }
    ];

    headers.forEach(({ name, content }) => {
      const meta = Utils.createElement('meta', {
        'http-equiv': name,
        content
      });
      document.head.appendChild(meta);
    });
  }

  // Validate and sanitize URLs
  sanitizeURL(url) {
    try {
      const urlObj = new URL(url);

      // Block dangerous protocols
      const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
      if (!allowedProtocols.includes(urlObj.protocol)) {
        throw new Error('Protocol not allowed');
      }

      // Remove potential XSS in fragments
      urlObj.hash = '';

      return urlObj.toString();
    } catch (error) {
      console.warn('Invalid or dangerous URL detected:', url);
      return '#';
    }
  }

  // Check for suspicious browser extensions
  detectSuspiciousExtensions() {
    // Check for common XSS extension patterns
    const suspiciousElements = document.querySelectorAll('[data-extension], [data-adblock], [data-userscript]');

    if (suspiciousElements.length > 0) {
      this.logSecurityEvent('suspicious_extension', {
        count: suspiciousElements.length
      });
    }
  }

  // Initialize all security measures
  initializeSecurity() {
    this.setupCSPViolationReporting();
    this.setupSecurityHeaders();
    this.detectSuspiciousExtensions();

    // Run security checks periodically
    setInterval(() => {
      this.detectSuspiciousExtensions();
      this.cleanupLocalStorage();
    }, 300000); // Every 5 minutes
  }
}