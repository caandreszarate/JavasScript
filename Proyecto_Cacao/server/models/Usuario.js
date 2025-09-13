const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true,
    maxlength: [50, 'El apellido no puede exceder 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un email válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false // No incluir password en consultas por defecto
  },
  telefono: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Por favor ingrese un número de teléfono válido']
  },
  cedula: {
    type: String,
    required: [true, 'La cédula es requerida'],
    unique: true,
    trim: true
  },
  rol: {
    type: String,
    enum: ['admin', 'productor', 'tecnico', 'supervisor'],
    default: 'productor'
  },
  finca: {
    nombre: {
      type: String,
      required: [true, 'El nombre de la finca es requerido'],
      trim: true
    },
    ubicacion: {
      municipio: {
        type: String,
        default: 'Granada'
      },
      departamento: {
        type: String,
        default: 'Meta'
      },
      vereda: String,
      coordenadas: {
        latitud: Number,
        longitud: Number
      }
    },
    area_total: {
      type: Number,
      required: [true, 'El área total de la finca es requerida'],
      min: [0.1, 'El área debe ser mayor a 0.1 hectáreas']
    }
  },
  configuracion: {
    idioma: {
      type: String,
      enum: ['es', 'en'],
      default: 'es'
    },
    zona_horaria: {
      type: String,
      default: 'America/Bogota'
    },
    notificaciones: {
      email: {
        type: Boolean,
        default: true
      },
      aplicaciones: {
        type: Boolean,
        default: true
      },
      clima: {
        type: Boolean,
        default: true
      },
      gastos: {
        type: Boolean,
        default: false
      }
    }
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  },
  ultimo_acceso: {
    type: Date,
    default: Date.now
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para nombre completo
usuarioSchema.virtual('nombre_completo').get(function() {
  return `${this.nombre} ${this.apellido}`;
});

// Middleware para encriptar password antes de guardar
usuarioSchema.pre('save', async function(next) {
  // Solo encriptar si el password fue modificado
  if (!this.isModified('password')) return next();
  
  // Encriptar password con costo de 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar passwords
usuarioSchema.methods.compararPassword = async function(passwordIngresado) {
  return await bcrypt.compare(passwordIngresado, this.password);
};

// Método para actualizar último acceso
usuarioSchema.methods.actualizarUltimoAcceso = function() {
  this.ultimo_acceso = new Date();
  return this.save({ validateBeforeSave: false });
};

// Índices para optimizar consultas
usuarioSchema.index({ email: 1 });
usuarioSchema.index({ cedula: 1 });
usuarioSchema.index({ rol: 1 });
usuarioSchema.index({ estado: 1 });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
