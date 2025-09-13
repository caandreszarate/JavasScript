const mongoose = require('mongoose');

const gastoSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El usuario es requerido']
  },
  lote_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lote',
    required: [true, 'El lote es requerido']
  },
  fecha_gasto: {
    type: Date,
    required: [true, 'La fecha del gasto es requerida'],
    default: Date.now
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: [
      'insumos_quimicos',
      'mano_obra',
      'equipos_herramientas',
      'servicios',
      'infraestructura'
    ]
  },
  subcategoria: {
    type: String,
    required: [true, 'La subcategoría es requerida'],
    enum: [
      // Insumos químicos
      'fertilizantes',
      'fungicidas',
      'insecticidas',
      'bioestimulantes',
      'coadyuvantes',
      
      // Mano de obra
      'aplicacion_productos',
      'poda',
      'cosecha',
      'mantenimiento_general',
      
      // Equipos y herramientas
      'aspersores',
      'bombas_fumigacion',
      'herramientas_poda',
      'mantenimiento_equipos',
      
      // Servicios
      'transporte',
      'analisis_suelo',
      'asistencia_tecnica',
      'servicios_publicos',
      
      // Infraestructura
      'riego',
      'drenaje',
      'cercas',
      'bodega_almacenamiento'
    ]
  },
  descripcion_detallada: {
    type: String,
    required: [true, 'La descripción detallada es requerida'],
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  proveedor: {
    nombre: {
      type: String,
      required: [true, 'El nombre del proveedor es requerido'],
      trim: true
    },
    nit: String,
    telefono: String,
    direccion: String,
    email: String,
    tipo_proveedor: {
      type: String,
      enum: ['Distribuidor autorizado', 'Cooperativa', 'Particular', 'Empresa', 'Gobierno']
    }
  },
  detalle_compra: {
    cantidad: {
      type: Number,
      required: [true, 'La cantidad es requerida'],
      min: [0, 'La cantidad no puede ser negativa']
    },
    unidad_medida: {
      type: String,
      required: [true, 'La unidad de medida es requerida'],
      enum: [
        'kg', 'g', 'L', 'ml', 'unidad', 'caja', 'bulto', 'galón',
        'jornal', 'hora', 'día', 'mes', 'm²', 'm³', 'metro'
      ]
    },
    precio_unitario: {
      type: Number,
      required: [true, 'El precio unitario es requerido'],
      min: [0, 'El precio no puede ser negativo']
    },
    descuento_porcentaje: {
      type: Number,
      default: 0,
      min: [0, 'El descuento no puede ser negativo'],
      max: [100, 'El descuento no puede exceder 100%']
    },
    descuento_valor: {
      type: Number,
      default: 0
    },
    impuestos: {
      iva_porcentaje: {
        type: Number,
        default: 19, // IVA Colombia
        min: [0, 'El IVA no puede ser negativo']
      },
      iva_valor: {
        type: Number,
        default: 0
      },
      otros_impuestos: {
        type: Number,
        default: 0
      }
    },
    precio_total: {
      type: Number,
      required: [true, 'El precio total es requerido'],
      min: [0, 'El precio total no puede ser negativo']
    }
  },
  facturacion: {
    numero_factura: String,
    fecha_factura: Date,
    tipo_documento: {
      type: String,
      enum: ['Factura', 'Recibo', 'Nota de venta', 'Comprobante', 'Otro'],
      default: 'Factura'
    },
    forma_pago: {
      type: String,
      required: [true, 'La forma de pago es requerida'],
      enum: ['Efectivo', 'Transferencia', 'Cheque', 'Tarjeta débito', 'Tarjeta crédito', 'Crédito']
    },
    plazo_pago_dias: {
      type: Number,
      default: 0,
      min: [0, 'El plazo no puede ser negativo']
    },
    fecha_vencimiento: Date,
    pagado: {
      type: Boolean,
      default: true
    },
    fecha_pago: Date
  },
  aplicacion_relacionada: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AplicacionQuimica'
  },
  responsable_compra: {
    nombre: {
      type: String,
      required: [true, 'El responsable de la compra es requerido']
    },
    cedula: String,
    cargo: String
  },
  ubicacion_uso: {
    area_aplicacion_hectareas: Number,
    sector_lote: String,
    rendimiento_esperado: String // ej: "para 5 aplicaciones", "para 2 meses"
  },
  control_inventario: {
    cantidad_utilizada: {
      type: Number,
      default: 0,
      min: [0, 'La cantidad utilizada no puede ser negativa']
    },
    cantidad_restante: Number,
    fecha_ultimo_uso: Date,
    fecha_vencimiento: Date,
    estado_producto: {
      type: String,
      enum: ['Nuevo', 'En uso', 'Agotado', 'Vencido', 'Dañado'],
      default: 'Nuevo'
    }
  },
  impacto_economico: {
    costo_por_hectarea: Number,
    porcentaje_presupuesto_mes: Number,
    comparacion_precio_mercado: {
      precio_promedio_mercado: Number,
      diferencia_porcentaje: Number,
      es_buen_precio: Boolean
    }
  },
  observaciones: {
    type: String,
    maxlength: [1000, 'Las observaciones no pueden exceder 1000 caracteres']
  },
  archivos_adjuntos: [{
    tipo_archivo: {
      type: String,
      enum: ['Factura', 'Recibo', 'Cotización', 'Foto producto', 'Certificado', 'Otro']
    },
    url: String,
    nombre_archivo: String,
    tamaño_bytes: Number,
    fecha_subida: {
      type: Date,
      default: Date.now
    }
  }],
  etiquetas: [String], // Para categorización adicional
  periodo_contable: {
    año: {
      type: Number,
      required: true,
      default: function() { return new Date().getFullYear(); }
    },
    mes: {
      type: Number,
      required: true,
      min: [1, 'El mes debe ser entre 1 y 12'],
      max: [12, 'El mes debe ser entre 1 y 12'],
      default: function() { return new Date().getMonth() + 1; }
    },
    trimestre: {
      type: Number,
      min: [1, 'El trimestre debe ser entre 1 y 4'],
      max: [4, 'El trimestre debe ser entre 1 y 4']
    }
  },
  estado_gasto: {
    type: String,
    enum: ['Registrado', 'Verificado', 'Aprobado', 'Rechazado'],
    default: 'Registrado'
  },
  aprobacion: {
    requiere_aprobacion: {
      type: Boolean,
      default: false
    },
    aprobado_por: String,
    fecha_aprobacion: Date,
    comentarios_aprobacion: String
  }
}, {
  timestamps: true
});

// Virtual para calcular días desde el gasto
gastoSchema.virtual('dias_desde_gasto').get(function() {
  const hoy = new Date();
  const dias = (hoy - this.fecha_gasto) / (24 * 60 * 60 * 1000);
  return Math.floor(dias);
});

// Virtual para determinar si el pago está vencido
gastoSchema.virtual('pago_vencido').get(function() {
  if (!this.facturacion.fecha_vencimiento || this.facturacion.pagado) return false;
  return new Date() > this.facturacion.fecha_vencimiento;
});

// Método para calcular precios automáticamente
gastoSchema.methods.calcularPrecios = function() {
  const subtotal = this.detalle_compra.cantidad * this.detalle_compra.precio_unitario;
  
  // Calcular descuento
  this.detalle_compra.descuento_valor = 
    subtotal * (this.detalle_compra.descuento_porcentaje / 100);
  
  const subtotalConDescuento = subtotal - this.detalle_compra.descuento_valor;
  
  // Calcular IVA
  this.detalle_compra.impuestos.iva_valor = 
    subtotalConDescuento * (this.detalle_compra.impuestos.iva_porcentaje / 100);
  
  // Calcular precio total
  this.detalle_compra.precio_total = 
    subtotalConDescuento + 
    this.detalle_compra.impuestos.iva_valor + 
    this.detalle_compra.impuestos.otros_impuestos;
  
  return this.detalle_compra.precio_total;
};

// Método para calcular costo por hectárea
gastoSchema.methods.calcularCostoPorHectarea = function() {
  if (!this.ubicacion_uso.area_aplicacion_hectareas || this.ubicacion_uso.area_aplicacion_hectareas === 0) {
    // Si no hay área específica, usar área total del lote
    return this.populate('lote_id').then(gasto => {
      if (gasto.lote_id && gasto.lote_id.area_hectareas) {
        this.impacto_economico.costo_por_hectarea = 
          this.detalle_compra.precio_total / gasto.lote_id.area_hectareas;
      }
      return this.impacto_economico.costo_por_hectarea;
    });
  }
  
  this.impacto_economico.costo_por_hectarea = 
    this.detalle_compra.precio_total / this.ubicacion_uso.area_aplicacion_hectareas;
  
  return this.impacto_economico.costo_por_hectarea;
};

// Método para actualizar inventario
gastoSchema.methods.actualizarInventario = function(cantidadUsada) {
  this.control_inventario.cantidad_utilizada += cantidadUsada;
  this.control_inventario.cantidad_restante = 
    this.detalle_compra.cantidad - this.control_inventario.cantidad_utilizada;
  
  this.control_inventario.fecha_ultimo_uso = new Date();
  
  // Actualizar estado
  if (this.control_inventario.cantidad_restante <= 0) {
    this.control_inventario.estado_producto = 'Agotado';
  } else if (this.control_inventario.cantidad_utilizada > 0) {
    this.control_inventario.estado_producto = 'En uso';
  }
  
  return this.save();
};

// Middleware para cálculos automáticos antes de guardar
gastoSchema.pre('save', function(next) {
  // Calcular precios
  this.calcularPrecios();
  
  // Calcular trimestre
  this.periodo_contable.trimestre = Math.ceil(this.periodo_contable.mes / 3);
  
  // Calcular fecha de vencimiento si hay plazo
  if (this.facturacion.plazo_pago_dias > 0 && !this.facturacion.fecha_vencimiento) {
    const fechaVencimiento = new Date(this.fecha_gasto);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + this.facturacion.plazo_pago_dias);
    this.facturacion.fecha_vencimiento = fechaVencimiento;
  }
  
  // Inicializar cantidad restante
  if (this.control_inventario.cantidad_restante === undefined) {
    this.control_inventario.cantidad_restante = this.detalle_compra.cantidad;
  }
  
  // Determinar si requiere aprobación (gastos > $500,000)
  if (this.detalle_compra.precio_total > 500000) {
    this.aprobacion.requiere_aprobacion = true;
  }
  
  next();
});

// Método estático para obtener gastos por categoría
gastoSchema.statics.gastosPorCategoria = async function(usuarioId, fechaInicio, fechaFin) {
  const pipeline = [
    {
      $match: {
        usuario_id: mongoose.Types.ObjectId(usuarioId),
        fecha_gasto: {
          $gte: fechaInicio,
          $lte: fechaFin
        }
      }
    },
    {
      $group: {
        _id: {
          categoria: '$categoria',
          subcategoria: '$subcategoria'
        },
        total_gastos: { $sum: '$detalle_compra.precio_total' },
        cantidad_compras: { $sum: 1 },
        promedio_compra: { $avg: '$detalle_compra.precio_total' }
      }
    },
    {
      $sort: { total_gastos: -1 }
    }
  ];
  
  return await this.aggregate(pipeline);
};

// Método estático para obtener gastos pendientes de pago
gastoSchema.statics.gastosPendientesPago = async function(usuarioId) {
  return await this.find({
    usuario_id: usuarioId,
    'facturacion.pagado': false,
    'facturacion.fecha_vencimiento': { $lte: new Date() }
  })
  .populate('lote_id', 'nombre_lote')
  .sort({ 'facturacion.fecha_vencimiento': 1 });
};

// Método estático para indicadores financieros
gastoSchema.statics.indicadoresFinancieros = async function(usuarioId, año, mes = null) {
  const matchConditions = {
    usuario_id: mongoose.Types.ObjectId(usuarioId),
    'periodo_contable.año': año
  };
  
  if (mes) {
    matchConditions['periodo_contable.mes'] = mes;
  }
  
  const pipeline = [
    { $match: matchConditions },
    {
      $group: {
        _id: null,
        total_gastos: { $sum: '$detalle_compra.precio_total' },
        total_compras: { $sum: 1 },
        promedio_gasto: { $avg: '$detalle_compra.precio_total' },
        gasto_maximo: { $max: '$detalle_compra.precio_total' },
        gasto_minimo: { $min: '$detalle_compra.precio_total' }
      }
    }
  ];
  
  return await this.aggregate(pipeline);
};

// Índices para optimizar consultas
gastoSchema.index({ usuario_id: 1, fecha_gasto: -1 });
gastoSchema.index({ lote_id: 1 });
gastoSchema.index({ categoria: 1, subcategoria: 1 });
gastoSchema.index({ 'periodo_contable.año': 1, 'periodo_contable.mes': 1 });
gastoSchema.index({ 'facturacion.pagado': 1, 'facturacion.fecha_vencimiento': 1 });
gastoSchema.index({ estado_gasto: 1 });

const Gasto = mongoose.model('Gasto', gastoSchema);

module.exports = Gasto;
