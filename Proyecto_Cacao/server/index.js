const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Importar rutas
const authRoutes = require('./routes/auth');
const lotesRoutes = require('./routes/lotes');
const lotesSimpleRoutes = require('./routes/lotesSimple');
const aplicacionesRoutes = require('./routes/aplicaciones');
const gastosRoutes = require('./routes/gastos');
const reportesRoutes = require('./routes/reportes');
const climaRoutes = require('./routes/clima');
const dashboardRoutes = require('./routes/dashboard');

// Middlewares de seguridad
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana de tiempo por IP
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo en 15 minutos.'
});
app.use('/api/', limiter);

// Middlewares básicos
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://cacaocontrol-granada.com' 
    : true, // Permitir todos los orígenes en desarrollo
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cacao_control', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB - Base de datos CacaoControl');
})
.catch((error) => {
  console.error('❌ Error conectando a MongoDB:', error);
  process.exit(1);
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/lotes', lotesRoutes);
app.use('/api/lotes-simple', lotesSimpleRoutes);
app.use('/api/aplicaciones', aplicacionesRoutes);
app.use('/api/gastos', gastosRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/clima', climaRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Ruta de salud del servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CacaoControl API funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Ruta por defecto
app.get('/', (req, res) => {
  res.json({
    message: '🌱 Bienvenido a CacaoControl API',
    description: 'Sistema de Gestión de Cultivo de Cacao - Granada, Meta, Colombia',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      lotes: '/api/lotes',
      aplicaciones: '/api/aplicaciones',
      gastos: '/api/gastos',
      reportes: '/api/reportes',
      clima: '/api/clima',
      dashboard: '/api/dashboard'
    }
  });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors
    });
  }
  
  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID inválido'
    });
  }
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor CacaoControl ejecutándose en puerto ${PORT}`);
  console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 Ubicación: Granada, Meta, Colombia`);
  console.log(`🌱 Sistema listo para gestión de cultivos de cacao`);
});

module.exports = app;
