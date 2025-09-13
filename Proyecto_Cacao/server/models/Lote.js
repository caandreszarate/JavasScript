const mongoose = require('mongoose');

const loteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del lote es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  codigo: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    uppercase: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El usuario propietario es requerido']
  },
  ubicacion: {
    coordenadas: {
      latitud: {
        type: Number,
        required: [true, 'La latitud es requerida'],
        min: [-90, 'La latitud debe estar entre -90 y 90'],
        max: [90, 'La latitud debe estar entre -90 y 90']
      },
      longitud: {
        type: Number,
        required: [true, 'La longitud es requerida'],
        min: [-180, 'La longitud debe estar entre -180 y 180'],
        max: [180, 'La longitud debe estar entre -180 y 180']
      }
    },
    direccion: {
      type: String,
      trim: true
    },
    vereda: {
      type: String,
      trim: true
    },
    municipio: {
      type: String,
      default: 'Granada'
    },
    departamento: {
      type: String,
      default: 'Meta'
    },
    pais: {
      type: String,
      default: 'Colombia'
    },
    altitud: {
      type: Number, // metros sobre el nivel del mar
      min: 0
    }
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
    type: Number, // plantas por hectárea
    required: [true, 'La densidad de siembra es requerida']
  },
  sistema_siembra: {
    type: String,
    enum: ['monocultivo', 'agroforestal', 'asociado'],
    default: 'agroforestal'
  },
  especies_sombra: [{
    nombre: String,
    cantidad: Number
  }],
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'en_renovacion', 'abandonado'],
    default: 'activo'
  },
  observaciones: {
    type: String,
    maxlength: [2000, 'Las observaciones no pueden exceder 2000 caracteres']
  },
  // Datos de productividad
  productividad_historica: [{
    año: {
      type: Number,
      required: true
    },
    mes: {
      type: Number,
      min: 1,
      max: 12
    },
    produccion_kg: {
      type: Number,
      required: true,
      min: 0
    },
    precio_promedio_kg: {
      type: Number,
      min: 0
    },
    ingresos_totales: {
      type: Number,
      min: 0
    },
    calidad_grano: {
      type: String,
      enum: ['premium', 'especial', 'corriente', 'defectuoso']
    },
    humedad_porcentaje: {
      type: Number,
      min: 0,
      max: 100
    },
    registrado_por: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    fecha_registro: {
      type: Date,
      default: Date.now
    }
  }],
  // Seguimiento fenológico
  seguimiento_fenologico: [{
    fecha: {
      type: Date,
      required: true
    },
    etapa_fenologica: {
      type: String,
      enum: [
        'brotacion',
        'floracion',
        'cuajado_frutos',
        'desarrollo_frutos',
        'maduracion',
        'cosecha',
        'poda',
        'fertilizacion'
      ],
      required: true
    },
    porcentaje_etapa: {
      type: Number,
      min: 0,
      max: 100
    },
    numero_flores: Number,
    numero_frutos_pequenos: Number,
    numero_frutos_medianos: Number,
    numero_frutos_maduros: Number,
    observaciones: String,
    fotos: [String], // URLs de fotos
    registrado_por: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  }],
  // Registro de plagas y enfermedades
  plagas_enfermedades: [{
    fecha_deteccion: {
      type: Date,
      required: true
    },
    tipo: {
      type: String,
      enum: ['plaga', 'enfermedad', 'desorden_nutricional'],
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    nombre_cientifico: String,
    severidad: {
      type: String,
      enum: ['muy_baja', 'baja', 'media', 'alta', 'muy_alta'],
      required: true
    },
    incidencia: {
      type: Number, // porcentaje de plantas afectadas
      min: 0,
      max: 100
    },
    area_afectada: {
      type: Number, // porcentaje del lote afectado
      min: 0,
      max: 100
    },
    sintomas: String,
    causas_probables: String,
    tratamiento_aplicado: String,
    productos_utilizados: [{
      nombre: String,
      dosis: String,
      fecha_aplicacion: Date
    }],
    fecha_control: Date,
    efectividad_control: {
      type: String,
      enum: ['excelente', 'bueno', 'regular', 'malo', 'sin_efecto']
    },
    costo_tratamiento: {
      type: Number,
      min: 0
    },
    observaciones: String,
    fotos: [String], // URLs de fotos
    registrado_por: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  }],
  // Aplicaciones químicas
  aplicaciones_quimicas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AplicacionQuimica'
  }],
  // Gastos asociados
  gastos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gasto'
  }],
  // Análisis de suelo
  analisis_suelo: [{
    fecha: {
      type: Date,
      required: true
    },
    ph: {
      type: Number,
      min: 0,
      max: 14
    },
    materia_organica: Number,
    nitrogeno: Number,
    fosforo: Number,
    potasio: Number,
    calcio: Number,
    magnesio: Number,
    azufre: Number,
    hierro: Number,
    manganeso: Number,
    zinc: Number,
    cobre: Number,
    boro: Number,
    recomendaciones: String,
    laboratorio: String,
    costo_analisis: Number
  }],
  // Datos climáticos (promedio del lote)
  datos_climaticos: [{
    fecha: Date,
    temperatura_promedio: Number,
    temperatura_maxima: Number,
    temperatura_minima: Number,
    humedad_relativa: Number,
    precipitacion: Number,
    horas_sol: Number
  }],
  // Metadatos
  creado_por: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices para optimizar consultas
loteSchema.index({ usuario: 1, estado: 1 });
loteSchema.index({ 'ubicacion.coordenadas': '2dsphere' });
loteSchema.index({ fecha_siembra: 1 });
loteSchema.index({ variedad_cacao: 1 });
loteSchema.index({ codigo: 1 });
loteSchema.index({ 'productividad_historica.año': 1 });

// Virtuals para cálculos
loteSchema.virtual('edad_años').get(function() {
  if (!this.fecha_siembra) return null;
  const hoy = new Date();
  const años = (hoy - this.fecha_siembra) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(años);
});

loteSchema.virtual('productividad_promedio').get(function() {
  if (!this.productividad_historica || this.productividad_historica.length === 0) return 0;
  const total = this.productividad_historica.reduce((sum, item) => sum + item.produccion_kg, 0);
  return total / this.productividad_historica.length;
});

loteSchema.virtual('productividad_por_hectarea').get(function() {
  const promedio = this.productividad_promedio;
  return this.area > 0 ? promedio / this.area : 0;
});

loteSchema.virtual('ingresos_totales').get(function() {
  if (!this.productividad_historica || this.productividad_historica.length === 0) return 0;
  return this.productividad_historica.reduce((sum, item) => sum + (item.ingresos_totales || 0), 0);
});

loteSchema.virtual('plantas_por_hectarea').get(function() {
  return this.area > 0 ? this.numero_plantas / this.area : 0;
});

// Método para generar código automático
loteSchema.methods.generarCodigo = function() {
  const año = new Date().getFullYear().toString().substr(-2);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `LT${año}${random}`;
};

// Middleware para generar código si no existe
loteSchema.pre('save', function(next) {
  this.fecha_actualizacion = new Date();
  
  if (this.isNew && !this.codigo) {
    this.codigo = this.generarCodigo();
  }
  
  // Calcular densidad de siembra automáticamente
  if (this.numero_plantas && this.area) {
    this.densidad_siembra = this.numero_plantas / this.area;
  }
  
  next();
});

// Método estático para estadísticas
loteSchema.statics.obtenerEstadisticas = async function(usuarioId) {
  try {
    const stats = await this.aggregate([
      { $match: { usuario: mongoose.Types.ObjectId(usuarioId) } },
      {
        $group: {
          _id: null,
          totalLotes: { $sum: 1 },
          areaTotal: { $sum: '$area' },
          totalPlantas: { $sum: '$numero_plantas' },
          produccionTotal: {
            $sum: {
              $reduce: {
                input: '$productividad_historica',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.produccion_kg'] }
              }
            }
          }
        }
      }
    ]);
    
    return stats[0] || {
      totalLotes: 0,
      areaTotal: 0,
      totalPlantas: 0,
      produccionTotal: 0
    };
  } catch (error) {
    return {
      totalLotes: 0,
      areaTotal: 0,
      totalPlantas: 0,
      produccionTotal: 0
    };
  }
};

module.exports = mongoose.model('Lote', loteSchema);