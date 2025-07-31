# DevsTopia - Página Web Corporativa

## 📋 Descripción

Esta es una página web funcional y moderna para DevsTopia, una empresa de desarrollo de software. La página incluye todas las secciones necesarias para una empresa de tecnología con diseño minimalista y funcionalidades interactivas.

## 🚀 Características

### ✅ Funcionalidades Implementadas

- **Diseño Responsivo**: Se adapta perfectamente a dispositivos móviles, tablets y desktop
- **Navegación Suave**: Scroll suave entre secciones
- **Menú Móvil**: Navegación hamburguesa para dispositivos móviles
- **Contenido Dinámico**: Servicios, portafolio, blog y FAQs cargados con JavaScript
- **Filtros Interactivos**: Filtrado de proyectos por categoría
- **Formulario de Contacto**: Con validación y notificaciones
- **Animaciones**: Efectos de scroll y hover
- **Scroll to Top**: Botón para volver al inicio
- **Notificaciones**: Sistema de alertas para feedback del usuario

### 🎨 Diseño

- **Paleta de Colores**: 
  - Blanco (#FFFFFF) - Fondos
  - Negro (#000000) - Texto principal
  - Gris Claro (#E0E0E0) - Bordes y textos secundarios
  - Azul Eléctrico (#3B71FF) - Botones y enlaces
  - Verde Menta (#2EE6A6) - Acentos
  - Púrpura Suave (#A78BFA) - Elementos elegantes

- **Tipografía**: Inter (Google Fonts)
- **Iconos**: Font Awesome 6.0
- **Estilo**: Minimalista y moderno

## 📁 Estructura de Archivos

```
Ver_03/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## 🛠️ Cómo Usar

### 1. Abrir la Página Web
```bash
# Navegar al directorio
cd /Users/carlosmartinez/Documents/JavasScript/Projecto_DevsTopia/Ver_03

# Abrir en el navegador
open index.html
```

### 2. Funcionalidades Disponibles

#### Navegación
- **Menú Principal**: Navegación entre secciones
- **Menú Móvil**: Hamburger menu para dispositivos móviles
- **Scroll Suave**: Transiciones suaves entre secciones

#### Secciones Interactivas
- **Servicios**: Click en cualquier servicio para ver detalles
- **Portafolio**: Filtros por categoría (Todos, Web, Móvil, Software)
- **Blog**: Artículos con información relevante
- **FAQs**: Preguntas frecuentes expandibles
- **Contacto**: Formulario funcional con validación

#### Elementos de UX
- **Notificaciones**: Feedback visual para acciones del usuario
- **Animaciones**: Efectos de entrada y hover
- **Scroll to Top**: Botón para volver al inicio
- **Responsive**: Adaptación automática a diferentes pantallas

## 📱 Secciones de la Página

### 1. **Header/Navegación**
- Logo de DevsTopia
- Menú de navegación
- Menú hamburguesa para móviles

### 2. **Hero Section**
- Título principal y descripción
- Botones de llamada a la acción
- Gráfico decorativo

### 3. **Sobre Nosotros**
- Descripción de la empresa
- Estadísticas (proyectos, clientes, experiencia)
- Gráfico visual

### 4. **Servicios**
- 10 servicios principales
- Iconos descriptivos
- Hover effects

### 5. **Portafolio**
- 6 proyectos de ejemplo
- Filtros por categoría
- Tecnologías utilizadas

### 6. **Blog**
- 3 artículos de ejemplo
- Fechas y categorías
- Diseño de tarjetas

### 7. **FAQs**
- 5 preguntas frecuentes
- Expansión/contracción interactiva
- Animaciones suaves

### 8. **Contacto**
- Información de contacto
- Formulario funcional
- Validación de campos

### 9. **Footer**
- Información de la empresa
- Enlaces de navegación
- Redes sociales

## 🔧 Personalización

### Modificar Contenido
El contenido se puede editar fácilmente en el archivo `script.js`:

```javascript
// Modificar servicios
const devsTopiaData = {
    servicios: [
        {
            nombre: "Tu Servicio",
            descripcion: "Descripción del servicio",
            icono: "fas fa-icon-name"
        }
    ]
    // ... más datos
};
```

### Cambiar Colores
Los colores se definen en `styles.css`:

```css
:root {
    --blue-electric: #3B71FF;  /* Color principal */
    --green-mint: #2EE6A6;     /* Color secundario */
    /* ... más colores */
}
```

### Agregar Nuevas Secciones
1. Agregar HTML en `index.html`
2. Agregar estilos en `styles.css`
3. Agregar funcionalidad en `script.js`

## 📊 Datos Incluidos

### Servicios (10)
- Desarrollo de Software a Medida
- Diseño y Desarrollo Web
- Aplicaciones Móviles
- Automatización y Procesos Inteligentes
- Servicios en la Nube & DevOps
- Ciberseguridad y Protección de Datos
- Análisis de Datos e IA
- QA y Testing
- Soporte Técnico y Mantenimiento
- Consultoría y Transformación Digital

### Portafolio (6 proyectos)
- E-commerce Platform
- App de Delivery
- Sistema de Gestión ERP
- Dashboard Analytics
- App de Fitness
- Sistema de Facturación

### Blog (3 artículos)
- Tendencias en Desarrollo Web 2024
- Cómo Implementar IA en tu Negocio
- Seguridad en Aplicaciones Móviles

### FAQs (5 preguntas)
- Tiempo de desarrollo
- Mantenimiento post-lanzamiento
- Trabajo con startups
- Tecnologías utilizadas
- Hosting y dominio

## 🚀 Próximas Mejoras

- [ ] Modal para detalles de servicios
- [ ] Galería de imágenes para portafolio
- [ ] Sistema de blog completo
- [ ] Chat en vivo
- [ ] Integración con redes sociales
- [ ] Analytics y tracking
- [ ] Optimización SEO
- [ ] PWA (Progressive Web App)

## 📞 Información de Contacto

- **Email**: contacto@devstopia.com
- **Teléfono**: +57 123 456 7890
- **Ubicación**: Bogotá - Colombia

---

**Desarrollado con ❤️ para DevsTopia** 