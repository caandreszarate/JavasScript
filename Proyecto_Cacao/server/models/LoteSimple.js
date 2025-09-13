const mongoose = require('mongoose');

const loteSimpleSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del lote es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El usuario propietario es requerido']
  },
  area: {
    type: Number,
    required: [true, 'El área del lote es requerida'],
    min: [0.01, 'El área debe ser mayor a 0.01 hectáreas']
  },
  fecha_siembra: {
    type: Date,
    required: [true, 'La fecha de siembra es requerida']
  },
  variedad_cacao: {
    type: String,
    required: [true, 'La variedad de cacao es requerida'],
    enum: [
      'Trinitario',
      'Forastero',
      'Criollo',
      'CCN-51',
      'TSH-565',
      'ICS-1',
      'ICS-6',
      'TCS-01',
      'TCS-13',
      'Otra'
    ]
  },
  numero_plantas: {
    type: Number,
    required: [true, 'El número de plantas es requerido'],
    min: [1, 'Debe haber al menos 1 planta']
  },
  densidad_siembra: {
    type: Number
  },
  ubicacion: {
    coordenadas: {
      latitud: {
        type: Number,
        required: [true, 'La latitud es requerida']
      },
      longitud: {
        type: Number,
        required: [true, 'La longitud es requerida']
      }
    },
    municipio: {
      type: String,
      default: 'Granada'
    },
    departamento: {
      type: String,
      default: 'Meta'
    }
  },
  creado_por: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware para calcular densidad
loteSimpleSchema.pre('save', function(next) {
  if (this.numero_plantas && this.area) {
    this.densidad_siembra = this.numero_plantas / this.area;
  }
  next();
});

module.exports = mongoose.model('LoteSimple', loteSimpleSchema);
