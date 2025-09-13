# CacaoControl - Sistema de Gestión de Cultivo de Cacao

Sistema integral para el control y seguimiento de cultivos de cacao en Granada, Meta, Colombia.

## 🌱 Descripción

CacaoControl es una aplicación web diseñada específicamente para productores de cacao en la región de Granada, Meta, considerando las condiciones climáticas tropicales húmedas y las características específicas del cultivo en esta zona.

### Características del Clima de Granada, Meta
- **Altitud**: 400-600 msnm
- **Precipitación anual**: 2500-3500 mm
- **Temperatura promedio**: 24-28°C
- **Clima**: Tropical húmedo

## 📋 Funcionalidades Principales

### 🌿 Módulo de Gestión del Cultivo
- **Registro de Lotes**: Control detallado de cada lote con información de área, variedad, GPS, etc.
- **Seguimiento Fenológico**: Monitoreo de etapas desde brotación hasta cosecha
- **Control de Plagas y Enfermedades**: Específico para plagas comunes de la región

### 🧪 Módulo de Aplicaciones Químicas
- **Calendario Automatizado**: Programación cada 20 días (8 aplicaciones por ciclo de 161 días)
- **Control de Productos**: Fertilizantes foliares, fungicidas, insecticidas y bioestimulantes
- **Alertas Inteligentes**: Notificaciones considerando condiciones climáticas

### 💰 Módulo de Control de Gastos
- **Categorización Detallada**: Insumos químicos, mano de obra, equipos, servicios e infraestructura
- **Reportes Financieros**: Análisis mensual, por lote y anual
- **Indicadores de Rentabilidad**: Costo por hectárea y eficiencia presupuestal

## 🚀 Tecnologías Utilizadas

### Frontend
- **React.js** con hooks y context
- **Tailwind CSS** para estilos responsivos
- **Chart.js** para gráficos y reportes
- **Leaflet** para mapas y geolocalización
- **FullCalendar** para programación de actividades

### Backend
- **Node.js** con Express
- **MongoDB** con Mongoose
- **JWT** para autenticación
- **Cloudinary** para almacenamiento de imágenes

### Integraciones
- **OpenWeatherMap API** - Pronóstico del clima
- **Google Maps API** - Geolocalización y medición de áreas
- **SIPSA-DANE** - Precios de mercado del cacao

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/cacao-control.git
   cd cacao-control
   ```

2. **Instalar dependencias**
   ```bash
   npm run install-deps
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Iniciar la aplicación en modo desarrollo**
   ```bash
   npm run dev
   ```

## 🌐 Estructura del Proyecto

```
cacao-control/
├── client/                 # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   ├── context/       # Context API para estado global
│   │   ├── services/      # Servicios API
│   │   ├── utils/         # Utilidades
│   │   └── assets/        # Recursos estáticos
├── server/                # Backend Node.js
│   ├── controllers/       # Controladores
│   ├── models/           # Modelos de datos
│   ├── routes/           # Rutas de API
│   ├── middleware/       # Middlewares
│   ├── services/         # Servicios externos
│   └── utils/            # Utilidades del servidor
└── docs/                 # Documentación
```

## 🎯 Uso del Sistema

### Dashboard Principal
El dashboard muestra widgets con información clave:
- Resumen de lotes activos
- Próximas aplicaciones químicas
- Alertas de plagas y enfermedades
- Gastos del mes actual
- Clima actual de Granada, Meta
- Calendario de actividades

### Gestión de Lotes
Registra y gestiona tus lotes con información detallada:
- Ubicación GPS
- Área en hectáreas
- Variedad de cacao
- Edad de la plantación
- Tipo de suelo y drenaje

### Control de Aplicaciones
Sistema automatizado para:
- Programar aplicaciones cada 20 días
- Seleccionar productos según la etapa del cultivo
- Registrar condiciones climáticas
- Generar reportes de aplicación

### Seguimiento Financiero
Control completo de costos:
- Registro detallado de gastos por categoría
- Análisis de rentabilidad por lote
- Reportes mensuales y anuales
- Proyecciones financieras

## 📊 Reportes y Analytics

- **Reportes de Producción**: Seguimiento fenológico y productividad
- **Análisis Financiero**: Costos, rentabilidad e indicadores clave
- **Reportes de Aplicaciones**: Historial completo de tratamientos
- **Alertas de Clima**: Integración con pronósticos meteorológicos

## 🔐 Seguridad

- Encriptación AES-256 para datos sensibles
- Autenticación JWT con roles y permisos
- Respaldos automáticos diarios
- Logs de auditoría de actividades

## 🌍 Soporte Multi-idioma

El sistema soporta español e inglés para adaptarse a diferentes usuarios.

## 📱 Responsive Design

Optimizado para:
- Computadores de escritorio
- Tablets
- Smartphones (mobile-first)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Para soporte técnico y capacitación:
- Email: soporte@cacaocontrol-granada.com
- Teléfono: +57 (8) 123-4567
- Documentación: [docs.cacaocontrol-granada.com](https://docs.cacaocontrol-granada.com)

## 🙏 Agradecimientos

- Productores de cacao de Granada, Meta
- FEDECACAO - Federación Nacional de Cacaoteros
- DANE - Departamento Administrativo Nacional de Estadística
- Ministerio de Agricultura y Desarrollo Rural de Colombia

---

**Desarrollado con ❤️ para los cacaoteros de Granada, Meta, Colombia** 🇨🇴
