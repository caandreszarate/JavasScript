# DevsTopia - Diseño Minimalista

## Descripción

DevsTopia es una empresa de desarrollo de software que transforma ideas en soluciones digitales innovadoras, funcionales y escalables. Este sitio web presenta un diseño completamente rediseñado con un enfoque minimalista y elegante.

## Características del Nuevo Diseño

### 🎨 Diseño Minimalista
- **Paleta monocromática**: Utiliza una paleta de grises y blanco/negro para un aspecto limpio y profesional
- **Tipografía Inter**: Fuente moderna y legible para una mejor experiencia de lectura
- **Espaciado generoso**: Uso abundante de espacio en blanco para crear jerarquía visual
- **Bordes mínimos**: Bordes redondeados sutiles para un aspecto moderno

### 🌐 Funcionalidades Mantenidas
- **Chat en vivo**: Sistema de chat con respuestas automáticas
- **Multiidioma**: Soporte completo para español e inglés
- **Modo oscuro**: Toggle entre tema claro y oscuro
- **Formularios de contacto**: Sistema de contacto y cotización
- **Responsive**: Diseño completamente adaptable a todos los dispositivos

### 🚀 Mejoras Implementadas

#### Navegación Simplificada
- Menú de navegación más limpio con menos elementos
- Botón de cambio de idioma integrado
- Navegación móvil mejorada

#### Hero Section Rediseñado
- Título más directo y conciso
- Código visual minimalista en lugar de iconos
- Botones con diseño más limpio

#### Secciones Optimizadas
- **Servicios**: Cards con diseño minimalista
- **Portafolio**: Grid limpio sin filtros complejos
- **Contacto**: Formulario simplificado

#### Chat Mejorado
- Interfaz más limpia y moderna
- Respuestas automáticas optimizadas
- Diseño consistente con el resto del sitio

## Estructura de Archivos

```
Diseño_Mejorado_v01/
├── index.html              # HTML principal con estructura minimalista
├── styles.css              # CSS completamente rediseñado
├── script-firebase.js      # JavaScript principal
├── chat-auto-responses.js  # Sistema de respuestas automáticas
├── translations.js         # Sistema de traducciones
├── assets/                 # Recursos estáticos
└── README.md              # Este archivo
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño minimalista con variables CSS
- **JavaScript**: Funcionalidades interactivas
- **Firebase**: Sistema de chat en tiempo real
- **Font Awesome**: Iconografía
- **Inter Font**: Tipografía principal

## Paleta de Colores

### Modo Claro
- **Blanco**: `#ffffff`
- **Negro**: `#000000`
- **Grises**: Escala de `#fafafa` a `#171717`

### Modo Oscuro
- **Negro**: `#000000`
- **Blanco**: `#ffffff`
- **Grises**: Escala invertida

## Características de Accesibilidad

- **Navegación por teclado**: Soporte completo
- **Screen readers**: Estructura semántica
- **Contraste**: Cumple estándares WCAG
- **Skip links**: Para navegación rápida

## Funcionalidades del Chat

### Respuestas Automáticas
El sistema de chat incluye respuestas automáticas para:
- Saludos y presentaciones
- Información sobre servicios
- Precios y cotizaciones
- Información de contacto
- Tecnologías utilizadas
- Plazos de entrega

### Multiidioma
- Soporte completo para español e inglés
- Cambio de idioma en tiempo real
- Persistencia de preferencia del usuario

## Instalación y Uso

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd Projecto_DevsTopia/Diseño_Mejorado_v01
   ```

2. **Configurar Firebase** (opcional para chat)
   - Crear proyecto en Firebase Console
   - Configurar Realtime Database
   - Actualizar configuración en `script-firebase.js`

3. **Servir archivos**
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

4. **Acceder al sitio**
   - Abrir `http://localhost:8000` en el navegador

## Personalización

### Cambiar Colores
Editar variables CSS en `styles.css`:
```css
:root {
    --white: #ffffff;
    --black: #000000;
    /* ... más variables */
}
```

### Agregar Idiomas
1. Agregar traducciones en `translations.js`
2. Incluir elementos con `data-translate` en HTML
3. Llamar `changeLanguage('nuevo-idioma')`

### Modificar Servicios
Editar array `devsTopiaData.servicios` en `script-firebase.js`

## Rendimiento

- **Carga rápida**: CSS y JS optimizados
- **Imágenes**: Optimizadas y comprimidas
- **Fuentes**: Precargadas para mejor rendimiento
- **Animaciones**: Suaves y no intrusivas

## Compatibilidad

- **Navegadores modernos**: Chrome, Firefox, Safari, Edge
- **Dispositivos móviles**: iOS y Android
- **Tablets**: iPad y Android tablets
- **Escritorio**: Windows, macOS, Linux

## Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

## Contacto

- **Email**: info@devstopia.com
- **Teléfono**: +240 222 311 498 / +57 315 057 0742
- **Ubicación**: Bogotá - Colombia

---

© 2024 DevsTopia. Todos los derechos reservados. 