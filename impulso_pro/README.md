# Impulso Pro - Menú de Navegación Moderno

Un menú de navegación moderno y responsive desarrollado con las últimas normas de UI/UX, utilizando HTML, CSS y JavaScript.

## 🚀 Características

### Diseño Moderno
- **Diseño limpio y minimalista** con el color base #64c5e6
- **Tipografía moderna** usando Inter font
- **Efectos visuales suaves** y animaciones fluidas
- **Responsive design** para todos los dispositivos

### Funcionalidades
- **Navegación fija** en la parte superior
- **Menú hamburguesa** para dispositivos móviles
- **Scroll suave** entre secciones
- **Navegación activa** que se actualiza automáticamente
- **Sistema de traducción** Español/Inglés
- **Modal de inicio de sesión** (no funcional por el momento)
- **Efectos de hover** y transiciones suaves

### Elementos de Navegación
- 🏠 **Inicio** - Página principal
- 🏷️ **Ofertas** - Ofertas y promociones
- 🤝 **Entidades Aliadas** - Colaboradores y aliados
- 📋 **Requisitos** - Información de requisitos
- 🎓 **Formación** - Programas de formación
- 🌐 **Idioma** - Cambio entre Español/Inglés
- 👤 **Iniciar Sesión** - Botón de acceso (modal)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con CSS Grid y Flexbox
- **JavaScript ES6+** - Funcionalidad interactiva
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografía Inter

## 📱 Responsive Design

El menú se adapta perfectamente a diferentes tamaños de pantalla:

- **Desktop** (> 768px): Menú horizontal completo
- **Tablet** (768px - 480px): Menú hamburguesa optimizado
- **Mobile** (< 480px): Diseño compacto para móviles

## 🎨 Características de UI/UX

### Principios Aplicados
- **Consistencia visual** en colores y espaciado
- **Jerarquía clara** de información
- **Feedback visual** en interacciones
- **Accesibilidad** con navegación por teclado
- **Performance** optimizada

### Efectos Visuales
- **Backdrop blur** en el header
- **Animaciones de entrada** para secciones
- **Efectos de ripple** en botones
- **Transiciones suaves** en hover
- **Partículas flotantes** en la sección hero

## 🚀 Instalación y Uso

1. **Clona o descarga** los archivos del proyecto
2. **Abre** `index.html` en tu navegador
3. **Navega** por las diferentes secciones
4. **Prueba** la funcionalidad responsive

## 📁 Estructura de Archivos

```
impulso_pro/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS modernos
├── script.js           # Funcionalidad JavaScript
└── README.md          # Documentación
```

## 🎯 Funcionalidades JavaScript

### Navegación
- **Scroll suave** entre secciones
- **Navegación activa** automática
- **Menú móvil** con animaciones
- **Cierre automático** del menú en desktop

### Modal de Login
- **Apertura/cierre** con animaciones
- **Cierre con Escape** o click fuera
- **Focus management** para accesibilidad
- **Prevención de scroll** cuando está abierto

### Sistema de Traducción
- **Cambio dinámico** entre Español e Inglés
- **Persistencia** de preferencia en localStorage
- **Traducción completa** de navegación y contenido
- **Notificaciones** de cambio de idioma

### Efectos Interactivos
- **Animaciones de entrada** con Intersection Observer
- **Efectos de hover** con transiciones
- **Partículas flotantes** en el hero
- **Efectos de ripple** en botones

## 🎨 Paleta de Colores

```css
--primary-color: #64c5e6      /* Color principal */
--primary-dark: #4ba8c9       /* Variante oscura */
--primary-light: #8dd4f0      /* Variante clara */
--nav-bg-color: #256294       /* Color de fondo del menú */
--nav-text-color: #ffffff      /* Color de texto del menú */
--secondary-color: #2c3e50    /* Color secundario */
--text-primary: #2c3e50       /* Texto principal */
--text-secondary: #7f8c8d     /* Texto secundario */
```

## 📱 Breakpoints Responsive

```css
/* Desktop */
@media (min-width: 769px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Mobile */
@media (max-width: 480px) { ... }
```

## ♿ Accesibilidad

- **Navegación por teclado** completa
- **Atributos ARIA** para screen readers
- **Focus visible** para navegación por teclado
- **Contraste adecuado** en colores
- **Reduced motion** support

## 🔧 Personalización

### Cambiar Colores
Modifica las variables CSS en `:root`:

```css
:root {
    --primary-color: #tu-color;
    --primary-dark: #tu-color-oscuro;
    /* ... */
}
```

### Agregar Nuevas Secciones
1. Añade el enlace en el menú HTML
2. Crea la sección correspondiente
3. El JavaScript detectará automáticamente la nueva sección

### Modificar Animaciones
Ajusta las transiciones en CSS:

```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## 🚀 Próximas Mejoras

- [ ] **Funcionalidad real** del modal de login
- [ ] **Sistema de notificaciones** avanzado
- [ ] **Tema oscuro** opcional
- [ ] **Animaciones más complejas**
- [ ] **Integración con backend**

## 📄 Licencia

Este proyecto está disponible para uso personal y comercial.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, asegúrate de seguir las mejores prácticas de UI/UX.

---

**Desarrollado con ❤️ usando las últimas tecnologías web** 