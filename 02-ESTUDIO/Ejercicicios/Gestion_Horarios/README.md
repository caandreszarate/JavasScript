# Sistema de Gestión de Turnos - Aeropuerto Malabo

Una aplicación web completa para la programación y gestión de turnos de ingenieros de soporte técnico en el aeropuerto de Malabo.

## 🚀 Características Principales

### ✅ Funcionalidades Implementadas

- **CRUD Completo**: Crear, leer, actualizar y eliminar ingenieros y turnos
- **Gestión de Áreas**: Soporte para áreas A1, A2, A3
- **Lógica Especial RAM**: Validación automática para vuelos Royal Air Maroc (el ingeniero debe descansar el día anterior)
- **Reporte Imprimible**: Generación de reportes profesionales para compartir
- **Multiidioma**: Soporte completo para Español e Inglés
- **Diseño Responsivo**: Interfaz moderna que funciona en dispositivos móviles y desktop
- **Persistencia de Datos**: Los datos se guardan automáticamente en el navegador

### 🚀 Funcionalidades Avanzadas

- **Calendario Interactivo con Drag & Drop**: Arrastra ingenieros directamente al calendario para asignaciones rápidas
- **Turnos Configurables**: Horarios personalizables (8:00-15:00 y 15:00-23:30 por defecto)
- **Validaciones Automáticas**: Sistema inteligente de detección de conflictos en tiempo real
- **Plantillas de Turnos**: Guarda y reutiliza patrones de asignación semanales
- **Auto-Asignación Inteligente**: Algoritmo que distribuye turnos automáticamente considerando carga de trabajo
- **Vista Calendario Visual**: Interfaz de calendario mensual con slots de turnos interactivos
- **Asignación Rápida**: Modal de asignación instantánea mediante drag & drop

### 🎯 Reglas de Negocio

1. **Áreas de Trabajo**: A1, A2, A3
2. **Turnos Disponibles**:
   - Mañana (06:00)
   - Tarde (14:00)
   - Noche (22:00)
3. **Vuelos RAM**: Para vuelos Royal Air Maroc, el sistema valida automáticamente que el ingeniero no tenga turnos el día anterior
4. **Validación de Conflictos**: No se permiten turnos duplicados para el mismo ingeniero en la misma fecha y hora

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y diseño responsivo
- **JavaScript ES6+**: Funcionalidad completa con clases y módulos
- **LocalStorage**: Persistencia de datos en el navegador
- **Font Awesome**: Iconografía profesional

## 📁 Estructura del Proyecto

```text
Gestion_Horarios/
├── index.html              # Estructura principal de la aplicación
├── styles.css              # Estilos CSS modernos y responsivos
├── script.js               # Lógica principal de la aplicación
├── advanced-features.js    # Funcionalidades avanzadas (drag & drop, plantillas, etc.)
├── translations.js         # Sistema de traducciones ES/EN
└── README.md              # Documentación del proyecto
```

## 🚀 Instalación y Uso

1. **Clonar o descargar** los archivos del proyecto
2. **Abrir** `index.html` en un navegador web moderno
3. **Comenzar a usar** la aplicación inmediatamente

No se requiere instalación de dependencias ni servidor web.

## 📋 Guía de Uso

### Gestión de Ingenieros

1. **Agregar Ingeniero**:
   - Completar el formulario con nombre, email y teléfono
   - Hacer clic en "Agregar Ingeniero"

2. **Editar Ingeniero**:
   - Hacer clic en el botón "Editar" en la tabla de ingenieros
   - Modificar los datos y hacer clic en "Actualizar Ingeniero"

3. **Eliminar Ingeniero**:
   - Hacer clic en el botón "Eliminar"
   - Confirmar la acción (solo se permite si no tiene turnos asignados)

### Gestión de Turnos

1. **Programar Turno**:
   - Seleccionar ingeniero, área, fecha y hora
   - Elegir tipo de vuelo (Regular o RAM)
   - Agregar número de vuelo y notas (opcional)
   - Hacer clic en "Agregar Turno"

2. **Validación Automática**:
   - El sistema valida conflictos de horario
   - Para vuelos RAM, verifica que el ingeniero no tenga turnos el día anterior

3. **Navegación por Meses**:
   - Usar los botones de navegación para ver turnos de diferentes meses

### Calendario Interactivo

1. **Drag & Drop**:
   - Arrastra ingenieros desde el panel lateral al calendario
   - Suelta sobre el día y turno deseado
   - Completa la información en el modal de asignación rápida

2. **Configuración de Turnos**:
   - Personaliza horarios de turnos mañana y tarde
   - Los cambios se reflejan inmediatamente en el calendario

3. **Plantillas**:
   - Guarda patrones de turnos semanales
   - Aplica plantillas a semanas futuras
   - Gestiona múltiples plantillas

4. **Auto-Asignación**:
   - Distribución automática inteligente de turnos
   - Considera carga de trabajo y disponibilidad
   - Respeta reglas de negocio (RAM, conflictos)

### Reportes

1. **Generar Reporte**:
   - Hacer clic en "Imprimir Reporte"
   - El sistema genera un reporte completo con:
     - Resumen estadístico
     - Lista de ingenieros
     - Turnos del mes actual

2. **Imprimir**:
   - El reporte se optimiza automáticamente para impresión
   - Compatible con impresoras y exportación a PDF

## 🌐 Soporte Multiidioma

La aplicación incluye soporte completo para:
- **Español** (por defecto)
- **English**

El cambio de idioma es instantáneo y se guarda la preferencia del usuario.

## 💾 Persistencia de Datos

Los datos se almacenan automáticamente en el navegador usando LocalStorage:
- Los ingenieros y turnos persisten entre sesiones
- No se requiere base de datos externa
- Los datos son específicos por navegador/dispositivo

## 🎨 Características de Diseño

- **Interfaz Moderna**: Diseño limpio y profesional
- **Responsivo**: Funciona perfectamente en móviles, tablets y desktop
- **Accesible**: Cumple con estándares de accesibilidad web
- **Intuitivo**: Navegación clara y formularios fáciles de usar

## 🔧 Personalización

### Modificar Áreas de Trabajo

Editar en `index.html` las opciones del select `shiftArea`:

```html
<option value="A1">A1</option>
<option value="A2">A2</option>
<option value="A3">A3</option>
```

### Agregar Nuevos Turnos

Modificar en `index.html` las opciones del select `shiftTime`:

```html
<option value="06:00">06:00 - Turno Mañana</option>
<option value="14:00">14:00 - Turno Tarde</option>
<option value="22:00">22:00 - Turno Noche</option>
```

### Personalizar Colores

Modificar las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}
```

## 🐛 Solución de Problemas

### Los datos no se guardan

- Verificar que el navegador tenga habilitado LocalStorage
- Comprobar que no esté en modo incógnito/privado

### La aplicación no se ve correctamente

- Usar un navegador moderno (Chrome, Firefox, Safari, Edge)
- Verificar que JavaScript esté habilitado

### Problemas de impresión

- Usar la función de impresión del navegador (Ctrl+P)
- Para mejores resultados, seleccionar "Más configuraciones" y ajustar márgenes

## 📞 Soporte

Para reportar problemas o sugerir mejoras, contactar al desarrollador del sistema.

## 📄 Licencia

Este proyecto fue desarrollado específicamente para el Aeropuerto de Malabo y está destinado para uso interno.

---

## 💝 Créditos

**Desarrollado con ❤️ para el Aeropuerto de Malabo**
