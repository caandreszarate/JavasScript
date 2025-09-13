const mongoose = require('mongoose');

const aplicacionQuimicaSchema = new mongoose.Schema({
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
  ciclo_aplicacion: {
    numero_ciclo: {
      type: Number,
      required: [true, 'El número de ciclo es requerido'],
      min: [1, 'El ciclo debe ser mayor a 0']
    },
    numero_aplicacion: {
      type: Number,
      required: [true, 'El número de aplicación es requerido'],
      min: [1, 'La aplicación debe ser mayor a 0'],
      max: [8, 'Máximo 8 aplicaciones por ciclo']
    },
    fecha_inicio_ciclo: {
      type: Date,
      required: [true, 'La fecha de inicio del ciclo es requerida']
    }
  },
  fecha_programada: {
    type: Date,
    required: [true, 'La fecha programada es requerida']
  },
  fecha_real_aplicacion: {
    type: Date
  },
  estado_aplicacion: {
    type: String,
    enum: ['Programada', 'En proceso', 'Completada', 'Pospuesta', 'Cancelada'],
    default: 'Programada'
  },
  productos_utilizados: [{
    categoria: {
      type: String,
      enum: ['fertilizante_foliar', 'fungicida', 'insecticida', 'bioestimulante', 'coadyuvante'],
      required: true
    },
    nombre_producto: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true
    },
    ingrediente_activo: String,
    marca: String,
    concentracion: String,
    dosis_recomendada: {
      type: String,
      required: [true, 'La dosis recomendada es requerida']
    },
    dosis_aplicada: {
      cantidad: {
        type: Number,
        required: [true, 'La cantidad aplicada es requerida'],
        min: [0, 'La cantidad no puede ser negativa']
      },
      unidad: {
        type: String,
        enum: ['g/L', 'ml/L', 'kg/ha', 'L/ha', 'cc/L'],
        required: true
      }
    },
    funcion_producto: String,
    costo_producto: {
      precio_unitario: Number,
      cantidad_comprada: Number,
      unidad_compra: String,
      costo_total: Number
    }
  }],
  mezcla_tanque: {
    volumen_agua_litros: {
      type: Number,
      required: [true, 'El volumen de agua es requerido'],
      min: [1, 'El volumen debe ser mayor a 0']
    },
    ph_agua: Number,
    conductividad_electrica: Number,
    orden_mezcla: [String], // Orden en que se agregaron los productos
    compatibilidad_verificada: {
      type: Boolean,
      default: true
    },
    observaciones_mezcla: String
  },
  area_tratada: {
    hectareas: {
      type: Number,
      required: [true, 'El área tratada es requerida'],
      min: [0.01, 'El área debe ser mayor a 0.01 hectáreas']
    },
    numero_plantas_tratadas: Number,
    cobertura_porcentaje: {
      type: Number,
      min: [0, 'La cobertura no puede ser negativa'],
      max: [100, 'La cobertura no puede exceder 100%']
    }
  },
  condiciones_aplicacion: {
    hora_inicio: {
      type: String,
      required: [true, 'La hora de inicio es requerida'],
      match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)']
    },
    hora_fin: {
      type: String,
      required: [true, 'La hora de fin es requerida'],
      match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)']
    },
    duracion_horas: Number,
    condiciones_climaticas: {
      temperatura_inicio: Number,
      temperatura_fin: Number,
      humedad_relativa: Number,
      velocidad_viento_kmh: {
        type: Number,
        max: [15, 'Viento muy fuerte para aplicación (máx. 15 km/h)']
      },
      direccion_viento: String,
      probabilidad_lluvia: Number,
      horas_sin_lluvia_previas: Number
    },
    calidad_aplicacion: {
      type: String,
      enum: ['Excelente', 'Buena', 'Regular', 'Deficiente'],
      default: 'Buena'
    }
  },
  equipo_utilizado: {
    tipo_equipo: {
      type: String,
      enum: ['Bomba espalda', 'Bomba estacionaria', 'Nebulizador', 'Atomizador', 'Otro'],
      required: true
    },
    marca_modelo: String,
    capacidad_litros: Number,
    tipo_boquilla: String,
    presion_trabajo_psi: Number,
    estado_equipo: {
      type: String,
      enum: ['Excelente', 'Bueno', 'Regular', 'Necesita mantenimiento'],
      default: 'Bueno'
    },
    ultima_calibracion: Date,
    observaciones_equipo: String
  },
  operario_responsable: {
    nombre: {
      type: String,
      required: [true, 'El nombre del operario es requerido']
    },
    cedula: String,
    experiencia_años: Number,
    certificacion_aplicador: Boolean,
    equipo_proteccion: {
      completo: Boolean,
      elementos_faltantes: [String]
    }
  },
  resultados_aplicacion: {
    efectividad_estimada: {
      type: String,
      enum: ['Excelente', 'Buena', 'Regular', 'Deficiente', 'Sin evaluar'],
      default: 'Sin evaluar'
    },
    problemas_presentados: [{
      tipo_problema: String,
      descripcion: String,
      solucion_aplicada: String
    }],
    area_no_tratada: {
      hectareas: Number,
      motivo: String
    },
    desperdicio_producto: {
      cantidad: Number,
      motivo: String,
      costo_desperdicio: Number
    }
  },
  costos_aplicacion: {
    costo_productos: {
      type: Number,
      default: 0
    },
    costo_mano_obra: {
      type: Number,
      default: 0
    },
    costo_combustible: {
      type: Number,
      default: 0
    },
    otros_costos: {
      type: Number,
      default: 0
    },
    costo_total: {
      type: Number,
      default: 0
    },
    costo_por_hectarea: {
      type: Number,
      default: 0
    }
  },
  seguimiento: [{
    fecha_evaluacion: Date,
    dias_post_aplicacion: Number,
    efectividad_observada: {
      type: String,
      enum: ['Excelente', 'Buena', 'Regular', 'Deficiente']
    },
    sintomas_fitotoxicidad: Boolean,
    descripcion_efectos: String,
    necesita_reaplicacion: Boolean,
    observaciones: String,
    fotos_seguimiento: [{
      url: String,
      descripcion: String
    }]
  }],
  proxima_aplicacion: {
    fecha_programada: Date,
    productos_recomendados: [String],
    observaciones_proxima: String
  },
  observaciones: {
    type: String,
    maxlength: [1000, 'Las observaciones no pueden exceder 1000 caracteres']
  },
  fotos_aplicacion: [{
    url: String,
    descripcion: String,
    tipo_foto: {
      type: String,
      enum: ['Antes', 'Durante', 'Después', 'Equipo', 'Mezcla', 'Problema']
    },
    fecha_captura: {
      type: Date,
      default: Date.now
    }
  }],
  alertas_generadas: [{
    tipo_alerta: {
      type: String,
      enum: ['Retraso', 'Clima adverso', 'Problema técnico', 'Costo elevado']
    },
    mensaje: String,
    fecha_alerta: {
      type: Date,
      default: Date.now
    },
    resuelta: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Virtual para calcular días de retraso
aplicacionQuimicaSchema.virtual('dias_retraso').get(function() {
  if (!this.fecha_real_aplicacion || !this.fecha_programada) return 0;
  const diferencia = this.fecha_real_aplicacion - this.fecha_programada;
  return Math.floor(diferencia / (24 * 60 * 60 * 1000));
});

// Virtual para determinar si está en ventana óptima de aplicación
aplicacionQuimicaSchema.virtual('en_ventana_optima').get(function() {
  if (!this.condiciones_aplicacion.hora_inicio) return false;
  
  const hora = parseInt(this.condiciones_aplicacion.hora_inicio.split(':')[0]);
  return (hora >= 6 && hora <= 9) || (hora >= 16 && hora <= 18);
});

// Método para calcular costos automáticamente
aplicacionQuimicaSchema.methods.calcularCostos = function() {
  let costoProductos = 0;
  
  // Calcular costo de productos
  this.productos_utilizados.forEach(producto => {
    if (producto.costo_producto && producto.costo_producto.costo_total) {
      costoProductos += producto.costo_producto.costo_total;
    }
  });
  
  this.costos_aplicacion.costo_productos = costoProductos;
  
  // Calcular costo total
  this.costos_aplicacion.costo_total = 
    this.costos_aplicacion.costo_productos +
    this.costos_aplicacion.costo_mano_obra +
    this.costos_aplicacion.costo_combustible +
    this.costos_aplicacion.otros_costos;
  
  // Calcular costo por hectárea
  if (this.area_tratada.hectareas > 0) {
    this.costos_aplicacion.costo_por_hectarea = 
      this.costos_aplicacion.costo_total / this.area_tratada.hectareas;
  }
  
  return this.costos_aplicacion;
};

// Método para programar próxima aplicación
aplicacionQuimicaSchema.methods.programarProximaAplicacion = function() {
  const fechaBase = this.fecha_real_aplicacion || this.fecha_programada;
  const proximaFecha = new Date(fechaBase);
  proximaFecha.setDate(proximaFecha.getDate() + 20); // Cada 20 días
  
  this.proxima_aplicacion.fecha_programada = proximaFecha;
  
  // Recomendar productos según el número de aplicación
  const recomendaciones = this.obtenerRecomendacionesProductos();
  this.proxima_aplicacion.productos_recomendados = recomendaciones;
  
  return this.proxima_aplicacion;
};

// Método para obtener recomendaciones de productos
aplicacionQuimicaSchema.methods.obtenerRecomendacionesProductos = function() {
  const numeroAplicacion = this.ciclo_aplicacion.numero_aplicacion;
  
  const recomendaciones = {
    1: ['NPK 20-20-20', 'Cobre + Mancozeb', 'Extracto de algas'],
    2: ['NPK 15-15-15', 'Triazol', 'Aminoácidos'],
    3: ['Alto en Potasio', 'Cobre + Mancozeb', 'Para trips y áfidos'],
    4: ['NPK 20-20-20', 'Bacillus thuringiensis'],
    5: ['NPK 15-15-15', 'Triazol', 'Extracto de algas'],
    6: ['Alto en Potasio', 'Cobre + Mancozeb'],
    7: ['NPK 20-20-20', 'Para trips y áfidos', 'Aminoácidos'],
    8: ['Alto en Potasio', 'Triazol', 'Extracto de algas']
  };
  
  return recomendaciones[numeroAplicacion] || ['NPK 15-15-15', 'Cobre + Mancozeb'];
};

// Middleware para validaciones y cálculos automáticos
aplicacionQuimicaSchema.pre('save', function(next) {
  // Calcular duración de la aplicación
  if (this.condiciones_aplicacion.hora_inicio && this.condiciones_aplicacion.hora_fin) {
    const inicio = this.condiciones_aplicacion.hora_inicio.split(':');
    const fin = this.condiciones_aplicacion.hora_fin.split(':');
    
    const inicioMinutos = parseInt(inicio[0]) * 60 + parseInt(inicio[1]);
    const finMinutos = parseInt(fin[0]) * 60 + parseInt(fin[1]);
    
    let duracion = finMinutos - inicioMinutos;
    if (duracion < 0) duracion += 24 * 60; // Cruzó medianoche
    
    this.condiciones_aplicacion.duracion_horas = duracion / 60;
  }
  
  // Calcular costos automáticamente
  this.calcularCostos();
  
  // Programar próxima aplicación si está completada
  if (this.estado_aplicacion === 'Completada' && !this.proxima_aplicacion.fecha_programada) {
    this.programarProximaAplicacion();
  }
  
  next();
});

// Método estático para obtener aplicaciones pendientes
aplicacionQuimicaSchema.statics.obtenerAplicacionesPendientes = async function(usuarioId, dias = 7) {
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() + dias);
  
  return await this.find({
    usuario_id: usuarioId,
    estado_aplicacion: 'Programada',
    fecha_programada: { $lte: fechaLimite }
  })
  .populate('lote_id', 'nombre_lote area_hectareas')
  .sort({ fecha_programada: 1 });
};

// Método estático para estadísticas de aplicaciones
aplicacionQuimicaSchema.statics.estadisticasAplicaciones = async function(usuarioId, fechaInicio, fechaFin) {
  const pipeline = [
    {
      $match: {
        usuario_id: mongoose.Types.ObjectId(usuarioId),
        fecha_real_aplicacion: {
          $gte: fechaInicio,
          $lte: fechaFin
        }
      }
    },
    {
      $group: {
        _id: null,
        total_aplicaciones: { $sum: 1 },
        costo_total: { $sum: '$costos_aplicacion.costo_total' },
        area_total_tratada: { $sum: '$area_tratada.hectareas' },
        promedio_costo_hectarea: { $avg: '$costos_aplicacion.costo_por_hectarea' }
      }
    }
  ];
  
  return await this.aggregate(pipeline);
};

// Índices para optimizar consultas
aplicacionQuimicaSchema.index({ lote_id: 1, fecha_programada: -1 });
aplicacionQuimicaSchema.index({ usuario_id: 1 });
aplicacionQuimicaSchema.index({ estado_aplicacion: 1 });
aplicacionQuimicaSchema.index({ fecha_programada: 1 });
aplicacionQuimicaSchema.index({ 'ciclo_aplicacion.numero_ciclo': 1, 'ciclo_aplicacion.numero_aplicacion': 1 });

const AplicacionQuimica = mongoose.model('AplicacionQuimica', aplicacionQuimicaSchema);

module.exports = AplicacionQuimica;
