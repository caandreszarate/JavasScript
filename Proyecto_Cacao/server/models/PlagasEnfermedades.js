const mongoose = require('mongoose');

const plagasEnfermedadesSchema = new mongoose.Schema({
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
  fecha_deteccion: {
    type: Date,
    required: [true, 'La fecha de detección es requerida'],
    default: Date.now
  },
  tipo_problema: {
    type: String,
    required: [true, 'El tipo de problema es requerido'],
    enum: ['Plaga', 'Enfermedad']
  },
  nombre_problema: {
    type: String,
    required: [true, 'El nombre del problema es requerido'],
    enum: [
      // Plagas comunes en Granada, Meta
      'trips (Selenothrips rubrocinctus)',
      'afidos (Toxoptera aurantii)',
      'perforador_frutos (Carmenta foraseminis)',
      'chinche_cacao (Monalonion dissimulatum)',
      'barrenador_tallo (Xyleborus spp)',
      'hormiga_cortadora (Atta spp)',
      'cochinilla (Planococcus citri)',
      'araña_roja (Tetranychus urticae)',
      
      // Enfermedades comunes en la región
      'monilia (Moniliophthora roreri)',
      'mazorca_negra (Phytophthora palmivora)',
      'antracnosis (Colletotrichum gloeosporioides)',
      'escoba_bruja (Moniliophthora perniciosa)',
      'mal_machete (Ceratocystis cacaofunesta)',
      'pudricion_raiz (Phytophthora megakarya)',
      'mancha_negra (Phoma spp)',
      'muerte_regresiva (Lasiodiplodia theobromae)',
      
      // Otros
      'Otro'
    ]
  },
  problema_personalizado: {
    type: String,
    trim: true,
    maxlength: [100, 'El problema personalizado no puede exceder 100 caracteres']
  },
  nivel_incidencia: {
    type: String,
    required: [true, 'El nivel de incidencia es requerido'],
    enum: ['Bajo', 'Medio', 'Alto', 'Crítico']
  },
  porcentaje_incidencia: {
    type: Number,
    required: [true, 'El porcentaje de incidencia es requerido'],
    min: [0, 'El porcentaje no puede ser negativo'],
    max: [100, 'El porcentaje no puede exceder 100']
  },
  plantas_afectadas: {
    numero_plantas: {
      type: Number,
      required: [true, 'El número de plantas afectadas es requerido'],
      min: [1, 'Debe haber al menos 1 planta afectada']
    },
    distribucion: {
      type: String,
      enum: ['Focal', 'Dispersa', 'Uniforme', 'Bordes'],
      required: true
    }
  },
  area_afectada_m2: {
    type: Number,
    min: [1, 'El área afectada debe ser mayor a 1 m²']
  },
  sintomas_descripcion: {
    type: String,
    required: [true, 'La descripción de síntomas es requerida'],
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  organos_afectados: [{
    type: String,
    enum: ['Hojas', 'Tallos', 'Ramas', 'Flores', 'Frutos', 'Mazorcas', 'Raíces', 'Tronco']
  }],
  condiciones_favorables: {
    temperatura_promedio: Number,
    humedad_relativa: Number,
    precipitacion_reciente: Boolean,
    estres_hidrico: Boolean,
    deficiencia_nutricional: Boolean,
    heridas_poda: Boolean,
    alta_densidad: Boolean
  },
  fotos_diagnostico: [{
    url: String,
    descripcion: String,
    tipo_foto: {
      type: String,
      enum: ['Síntoma', 'Plaga', 'Daño', 'Área afectada', 'Comparación']
    },
    fecha_captura: {
      type: Date,
      default: Date.now
    }
  }],
  diagnostico_confirmado: {
    confirmado: {
      type: Boolean,
      default: false
    },
    metodo_confirmacion: {
      type: String,
      enum: ['Visual', 'Laboratorio', 'Técnico especialista', 'Literatura']
    },
    fecha_confirmacion: Date,
    tecnico_responsable: String
  },
  acciones_tomadas: [{
    tipo_accion: {
      type: String,
      enum: [
        'Control químico',
        'Control biológico',
        'Control cultural',
        'Control mecánico',
        'Eliminación plantas',
        'Mejora drenaje',
        'Fertilización',
        'Poda sanitaria',
        'Otra'
      ],
      required: true
    },
    descripcion: {
      type: String,
      required: true,
      maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    productos_utilizados: [{
      nombre_producto: String,
      ingrediente_activo: String,
      dosis_aplicada: String,
      fecha_aplicacion: Date
    }],
    costo_accion: Number,
    fecha_accion: {
      type: Date,
      required: true
    },
    responsable: String,
    efectividad: {
      type: String,
      enum: ['Excelente', 'Buena', 'Regular', 'Deficiente', 'Sin evaluar'],
      default: 'Sin evaluar'
    }
  }],
  seguimiento: [{
    fecha_revision: {
      type: Date,
      required: true
    },
    estado_problema: {
      type: String,
      enum: ['Controlado', 'En control', 'Sin cambios', 'Empeorado', 'Resuelto'],
      required: true
    },
    porcentaje_mejora: Number,
    nuevos_sintomas: String,
    observaciones: String,
    fotos_seguimiento: [{
      url: String,
      descripcion: String
    }]
  }],
  estado_actual: {
    type: String,
    enum: ['Activo', 'En tratamiento', 'Controlado', 'Resuelto', 'Recurrente'],
    default: 'Activo'
  },
  prioridad: {
    type: String,
    enum: ['Baja', 'Media', 'Alta', 'Crítica'],
    required: true
  },
  impacto_economico_estimado: {
    perdida_produccion_kg: Number,
    costo_tratamiento: Number,
    perdida_economica_total: Number
  },
  proxima_revision: {
    type: Date,
    required: true
  },
  notas_adicionales: {
    type: String,
    maxlength: [1000, 'Las notas no pueden exceder 1000 caracteres']
  }
}, {
  timestamps: true
});

// Virtual para calcular días desde detección
plagasEnfermedadesSchema.virtual('dias_desde_deteccion').get(function() {
  const hoy = new Date();
  const dias = (hoy - this.fecha_deteccion) / (24 * 60 * 60 * 1000);
  return Math.floor(dias);
});

// Método para calcular la severidad basada en múltiples factores
plagasEnfermedadesSchema.methods.calcularSeveridad = function() {
  let puntos = 0;
  
  // Puntos por porcentaje de incidencia
  if (this.porcentaje_incidencia > 50) puntos += 4;
  else if (this.porcentaje_incidencia > 25) puntos += 3;
  else if (this.porcentaje_incidencia > 10) puntos += 2;
  else puntos += 1;
  
  // Puntos por órganos afectados críticos
  const organosCriticos = ['Frutos', 'Mazorcas', 'Tronco', 'Raíces'];
  const tieneOrganosCriticos = this.organos_afectados.some(organo => 
    organosCriticos.includes(organo)
  );
  if (tieneOrganosCriticos) puntos += 2;
  
  // Puntos por distribución
  if (this.plantas_afectadas.distribucion === 'Uniforme') puntos += 2;
  else if (this.plantas_afectadas.distribucion === 'Dispersa') puntos += 1;
  
  // Determinar severidad final
  if (puntos >= 7) return 'Crítica';
  if (puntos >= 5) return 'Alta';
  if (puntos >= 3) return 'Media';
  return 'Baja';
};

// Método para determinar la próxima fecha de revisión
plagasEnfermedadesSchema.methods.calcularProximaRevision = function() {
  const diasSegunPrioridad = {
    'Crítica': 3,
    'Alta': 7,
    'Media': 14,
    'Baja': 21
  };
  
  const dias = diasSegunPrioridad[this.prioridad] || 14;
  const proximaFecha = new Date();
  proximaFecha.setDate(proximaFecha.getDate() + dias);
  
  return proximaFecha;
};

// Middleware para validaciones y cálculos automáticos
plagasEnfermedadesSchema.pre('save', function(next) {
  // Validar problema personalizado
  if (this.nombre_problema === 'Otro' && !this.problema_personalizado) {
    return next(new Error('Debe especificar el problema personalizado'));
  }
  
  // Calcular próxima revisión si no está definida
  if (!this.proxima_revision) {
    this.proxima_revision = this.calcularProximaRevision();
  }
  
  // Calcular impacto económico estimado
  if (!this.impacto_economico_estimado.perdida_economica_total) {
    const costoPorKg = 8000; // Precio promedio cacao en Colombia (COP)
    const perdidaProduccion = this.impacto_economico_estimado.perdida_produccion_kg || 0;
    const costoTratamiento = this.impacto_economico_estimado.costo_tratamiento || 0;
    
    this.impacto_economico_estimado.perdida_economica_total = 
      (perdidaProduccion * costoPorKg) + costoTratamiento;
  }
  
  next();
});

// Método estático para obtener alertas tempranas
plagasEnfermedadesSchema.statics.obtenerAlertasTempranas = async function(usuarioId) {
  const hoy = new Date();
  const enTresDias = new Date();
  enTresDias.setDate(hoy.getDate() + 3);
  
  return await this.find({
    usuario_id: usuarioId,
    estado_actual: { $in: ['Activo', 'En tratamiento', 'Recurrente'] },
    proxima_revision: { $lte: enTresDias }
  })
  .populate('lote_id', 'nombre_lote')
  .sort({ prioridad: 1, proxima_revision: 1 });
};

// Método estático para estadísticas por región
plagasEnfermedadesSchema.statics.estadisticasRegion = async function(fechaInicio, fechaFin) {
  const pipeline = [
    {
      $match: {
        fecha_deteccion: {
          $gte: fechaInicio,
          $lte: fechaFin
        }
      }
    },
    {
      $group: {
        _id: '$nombre_problema',
        total_casos: { $sum: 1 },
        incidencia_promedio: { $avg: '$porcentaje_incidencia' },
        casos_criticos: {
          $sum: {
            $cond: [{ $eq: ['$prioridad', 'Crítica'] }, 1, 0]
          }
        }
      }
    },
    {
      $sort: { total_casos: -1 }
    }
  ];
  
  return await this.aggregate(pipeline);
};

// Índices para optimizar consultas
plagasEnfermedadesSchema.index({ lote_id: 1, fecha_deteccion: -1 });
plagasEnfermedadesSchema.index({ usuario_id: 1 });
plagasEnfermedadesSchema.index({ nombre_problema: 1 });
plagasEnfermedadesSchema.index({ estado_actual: 1 });
plagasEnfermedadesSchema.index({ prioridad: 1 });
plagasEnfermedadesSchema.index({ proxima_revision: 1 });

const PlagasEnfermedades = mongoose.model('PlagasEnfermedades', plagasEnfermedadesSchema);

module.exports = PlagasEnfermedades;
