const mongoose = require('mongoose');

const seguimientoFenologicoSchema = new mongoose.Schema({
  lote_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lote',
    required: [true, 'El lote es requerido']
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El usuario es requerido']
  },
  fecha_observacion: {
    type: Date,
    required: [true, 'La fecha de observación es requerida'],
    default: Date.now
  },
  etapa_fenologica: {
    type: String,
    required: [true, 'La etapa fenológica es requerida'],
    enum: [
      'brotacion',
      'floracion',
      'cuajado_frutos',
      'desarrollo_mazorcas',
      'maduracion',
      'cosecha'
    ]
  },
  porcentaje_plantas_etapa: {
    type: Number,
    required: [true, 'El porcentaje de plantas en la etapa es requerido'],
    min: [0, 'El porcentaje no puede ser negativo'],
    max: [100, 'El porcentaje no puede exceder 100']
  },
  detalles_etapa: {
    // Para brotación
    numero_brotes_promedio: Number,
    longitud_brotes_cm: Number,
    
    // Para floración
    numero_flores_promedio: Number,
    tipo_floracion: {
      type: String,
      enum: ['Cauliflora', 'Ramiflora', 'Mixta']
    },
    
    // Para cuajado de frutos
    porcentaje_cuajado: Number,
    numero_frutos_cuajados: Number,
    
    // Para desarrollo de mazorcas
    longitud_mazorca_cm: Number,
    diametro_mazorca_cm: Number,
    color_mazorca: {
      type: String,
      enum: ['Verde', 'Amarillo', 'Rojo', 'Morado', 'Otro']
    },
    
    // Para maduración
    mazorcas_maduras_estimadas: Number,
    tiempo_maduracion_semanas: Number,
    
    // Para cosecha
    mazorcas_cosechadas: Number,
    peso_mazorcas_kg: Number,
    peso_cacao_seco_kg: Number,
    rendimiento_porcentaje: Number
  },
  condiciones_climaticas: {
    temperatura_promedio: Number,
    humedad_relativa: Number,
    precipitacion_mm: Number,
    dias_soleados: Number,
    observaciones_clima: String
  },
  observaciones: {
    type: String,
    maxlength: [1000, 'Las observaciones no pueden exceder 1000 caracteres']
  },
  problemas_detectados: [{
    tipo: {
      type: String,
      enum: ['Plaga', 'Enfermedad', 'Nutricional', 'Climático', 'Otro']
    },
    descripcion: String,
    severidad: {
      type: String,
      enum: ['Baja', 'Media', 'Alta', 'Crítica']
    }
  }],
  fotos: [{
    url: String,
    descripcion: String,
    tipo_foto: {
      type: String,
      enum: ['General', 'Brotes', 'Flores', 'Frutos', 'Mazorcas', 'Problemas']
    },
    fecha_captura: {
      type: Date,
      default: Date.now
    }
  }],
  recomendaciones: [{
    tipo: {
      type: String,
      enum: ['Fertilización', 'Riego', 'Poda', 'Control fitosanitario', 'Cosecha', 'Otro']
    },
    descripcion: String,
    prioridad: {
      type: String,
      enum: ['Baja', 'Media', 'Alta', 'Urgente']
    },
    fecha_limite: Date
  }],
  siguiente_revision: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Virtual para calcular días desde la última observación
seguimientoFenologicoSchema.virtual('dias_desde_observacion').get(function() {
  const hoy = new Date();
  const dias = (hoy - this.fecha_observacion) / (24 * 60 * 60 * 1000);
  return Math.floor(dias);
});

// Método para calcular el progreso fenológico
seguimientoFenologicoSchema.methods.calcularProgreso = function() {
  const etapas = {
    'brotacion': 1,
    'floracion': 2,
    'cuajado_frutos': 3,
    'desarrollo_mazorcas': 4,
    'maduracion': 5,
    'cosecha': 6
  };
  
  const etapaActual = etapas[this.etapa_fenologica] || 1;
  const progreso = ((etapaActual - 1) / 5) * 100;
  
  return {
    etapa_numero: etapaActual,
    progreso_porcentaje: Math.round(progreso),
    etapa_nombre: this.etapa_fenologica
  };
};

// Método para determinar la siguiente etapa esperada
seguimientoFenologicoSchema.methods.siguienteEtapaEsperada = function() {
  const secuenciaEtapas = [
    'brotacion',
    'floracion',
    'cuajado_frutos',
    'desarrollo_mazorcas',
    'maduracion',
    'cosecha'
  ];
  
  const indiceActual = secuenciaEtapas.indexOf(this.etapa_fenologica);
  
  if (indiceActual < secuenciaEtapas.length - 1) {
    return secuenciaEtapas[indiceActual + 1];
  }
  
  return 'brotacion'; // Reinicia el ciclo
};

// Método para calcular duración estimada hasta próxima etapa
seguimientoFenologicoSchema.methods.duracionEstimadaProximaEtapa = function() {
  const duraciones = {
    'brotacion': 30, // días
    'floracion': 45,
    'cuajado_frutos': 21,
    'desarrollo_mazorcas': 90,
    'maduracion': 30,
    'cosecha': 7
  };
  
  const siguienteEtapa = this.siguienteEtapaEsperada();
  return duraciones[siguienteEtapa] || 30;
};

// Middleware para calcular automáticamente la siguiente revisión
seguimientoFenologicoSchema.pre('save', function(next) {
  if (!this.siguiente_revision) {
    const diasHastaSiguiente = this.duracionEstimadaProximaEtapa();
    const fechaRevision = new Date();
    fechaRevision.setDate(fechaRevision.getDate() + Math.floor(diasHastaSiguiente / 2));
    this.siguiente_revision = fechaRevision;
  }
  next();
});

// Método estático para obtener estadísticas por lote
seguimientoFenologicoSchema.statics.obtenerEstadisticasLote = async function(loteId, fechaInicio, fechaFin) {
  const pipeline = [
    {
      $match: {
        lote_id: mongoose.Types.ObjectId(loteId),
        fecha_observacion: {
          $gte: fechaInicio,
          $lte: fechaFin
        }
      }
    },
    {
      $group: {
        _id: '$etapa_fenologica',
        count: { $sum: 1 },
        porcentaje_promedio: { $avg: '$porcentaje_plantas_etapa' },
        ultima_observacion: { $max: '$fecha_observacion' }
      }
    },
    {
      $sort: { ultima_observacion: -1 }
    }
  ];
  
  return await this.aggregate(pipeline);
};

// Índices para optimizar consultas
seguimientoFenologicoSchema.index({ lote_id: 1, fecha_observacion: -1 });
seguimientoFenologicoSchema.index({ usuario_id: 1 });
seguimientoFenologicoSchema.index({ etapa_fenologica: 1 });
seguimientoFenologicoSchema.index({ siguiente_revision: 1 });

const SeguimientoFenologico = mongoose.model('SeguimientoFenologico', seguimientoFenologicoSchema);

module.exports = SeguimientoFenologico;
