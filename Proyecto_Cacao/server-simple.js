const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware básico
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cacao_control', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB - Base de datos CacaoControl');
})
.catch((error) => {
  console.error('❌ Error conectando a MongoDB:', error);
});

// Modelo de Usuario simplificado
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, default: 'usuario' },
  estado: { type: String, default: 'activo' },
  finca: {
    nombre: String,
    area_total: Number,
    ubicacion: {
      municipio: String,
      departamento: String
    }
  }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Modelo de Lote simplificado
const loteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del lote es requerido']
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  area: {
    type: Number,
    required: [true, 'El área del lote es requerida']
  },
  fecha_siembra: {
    type: Date,
    required: [true, 'La fecha de siembra es requerida']
  },
  variedad_cacao: {
    type: String,
    required: [true, 'La variedad de cacao es requerida']
  },
  numero_plantas: {
    type: Number,
    required: [true, 'El número de plantas es requerido']
  },
  ubicacion: {
    coordenadas: {
      latitud: Number,
      longitud: Number
    },
    municipio: String,
    departamento: String
  }
}, { timestamps: true });

const Lote = mongoose.model('Lote', loteSchema);

// Middleware de autenticación
const verificarToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso requerido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cacao_secret_key');
    const usuario = await Usuario.findById(decoded.id);
    
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

// Rutas de autenticación
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET || 'cacao_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: `¡Bienvenido de vuelta, ${usuario.nombre}!`,
      data: {
        usuario: {
          _id: usuario._id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          rol: usuario.rol,
          finca: usuario.finca
        },
        token
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Rutas de lotes
app.get('/api/lotes', verificarToken, async (req, res) => {
  try {
    const lotes = await Lote.find({ usuario: req.usuario._id })
      .populate('usuario', 'nombre apellido')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: lotes,
      pagination: {
        current: 1,
        pages: 1,
        total: lotes.length
      }
    });
  } catch (error) {
    console.error('Error al obtener lotes:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

app.post('/api/lotes', verificarToken, async (req, res) => {
  try {
    console.log('📥 Datos recibidos para crear lote:', req.body);
    console.log('👤 Usuario:', req.usuario.email);

    const nuevoLote = new Lote({
      ...req.body,
      usuario: req.usuario._id
    });

    console.log('💾 Guardando lote:', nuevoLote);

    await nuevoLote.save();
    await nuevoLote.populate('usuario', 'nombre apellido');

    console.log('✅ Lote guardado exitosamente');

    res.status(201).json({
      success: true,
      message: 'Lote creado exitosamente',
      data: nuevoLote
    });
  } catch (error) {
    console.error('❌ Error al crear lote:', error);
    
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errores
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Ruta de salud
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
    message: '🌱 Bienvenido a CacaoControl API (Versión Simple)',
    description: 'Sistema de Gestión de Cultivo de Cacao - Granada, Meta, Colombia',
    version: '1.0.0-simple',
    endpoints: {
      health: '/api/health',
      login: '/api/auth/login',
      lotes: '/api/lotes'
    }
  });
});

// Manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Error interno del servidor'
  });
});

// Rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor CacaoControl Simple ejecutándose en puerto ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📱 Aplicación: http://localhost:3000`);
});

module.exports = app;
