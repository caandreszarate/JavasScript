const express = require('express');
const AplicacionQuimica = require('../models/AplicacionQuimica');
const Lote = require('../models/Lote');
const { 
  verificarToken, 
  validarPermisos 
} = require('../middleware/auth');

const router = express.Router();

// Middleware para todas las rutas
router.use(verificarToken);

// @route   GET /api/aplicaciones
// @desc    Obtener aplicaciones del usuario con filtros
// @access  Privado
router.get('/', validarPermisos('aplicaciones', 'leer'), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      lote_id, 
      estado, 
      fecha_desde, 
      fecha_hasta,
      ciclo 
    } = req.query;
    
    // Construir filtros
    const filtros = { usuario_id: req.usuario._id };
    
    if (lote_id) filtros.lote_id = lote_id;
    if (estado) filtros.estado_aplicacion = estado;
    if (ciclo) filtros['ciclo_aplicacion.numero_ciclo'] = parseInt(ciclo);
    
    if (fecha_desde || fecha_hasta) {
      filtros.fecha_programada = {};
      if (fecha_desde) filtros.fecha_programada.$gte = new Date(fecha_desde);
      if (fecha_hasta) filtros.fecha_programada.$lte = new Date(fecha_hasta);
    }

    // Ejecutar consulta con paginación
    const aplicaciones = await AplicacionQuimica.find(filtros)
      .sort({ fecha_programada: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('lote_id', 'nombre_lote area_hectareas variedad_cacao')
      .populate('usuario_id', 'nombre apellido');

    // Contar total de documentos
    const total = await AplicacionQuimica.countDocuments(filtros);

    // Estadísticas adicionales
    const estadisticas = await AplicacionQuimica.aggregate([
      { $match: filtros },
      {
        $group: {
          _id: null,
          total_aplicaciones: { $sum: 1 },
          aplicaciones_completadas: {
            $sum: { $cond: [{ $eq: ['$estado_aplicacion', 'Completada'] }, 1, 0] }
          },
          aplicaciones_pendientes: {
            $sum: { $cond: [{ $eq: ['$estado_aplicacion', 'Programada'] }, 1, 0] }
          },
          costo_total: { $sum: '$costos_aplicacion.costo_total' },
          area_total_tratada: { $sum: '$area_tratada.hectareas' }
        }
      }
    ]);

    res.json({
      success: true,
      message: 'Aplicaciones obtenidas exitosamente',
      data: {
        aplicaciones,
        paginacion: {
          total,
          pagina_actual: parseInt(page),
          total_paginas: Math.ceil(total / limit),
          limite: parseInt(limit)
        },
        estadisticas: estadisticas[0] || {}
      }
    });

  } catch (error) {
    console.error('Error obteniendo aplicaciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/aplicaciones/pendientes
// @desc    Obtener aplicaciones pendientes próximas
// @access  Privado
router.get('/pendientes', validarPermisos('aplicaciones', 'leer'), async (req, res) => {
  try {
    const { dias = 7 } = req.query;
    
    const aplicacionesPendientes = await AplicacionQuimica.obtenerAplicacionesPendientes(
      req.usuario._id, 
      parseInt(dias)
    );

    // Agrupar por urgencia
    const hoy = new Date();
    const mañana = new Date(hoy);
    mañana.setDate(hoy.getDate() + 1);
    const enTresDias = new Date(hoy);
    enTresDias.setDate(hoy.getDate() + 3);

    const agrupadas = {
      vencidas: aplicacionesPendientes.filter(app => app.fecha_programada < hoy),
      hoy: aplicacionesPendientes.filter(app => 
        app.fecha_programada >= hoy && app.fecha_programada < mañana
      ),
      proximos_3_dias: aplicacionesPendientes.filter(app => 
        app.fecha_programada >= mañana && app.fecha_programada < enTresDias
      ),
      proxima_semana: aplicacionesPendientes.filter(app => 
        app.fecha_programada >= enTresDias
      )
    };

    res.json({
      success: true,
      message: 'Aplicaciones pendientes obtenidas exitosamente',
      data: {
        total_pendientes: aplicacionesPendientes.length,
        aplicaciones_agrupadas: agrupadas,
        todas_las_aplicaciones: aplicacionesPendientes
      }
    });

  } catch (error) {
    console.error('Error obteniendo aplicaciones pendientes:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/aplicaciones/:id
// @desc    Obtener una aplicación específica
// @access  Privado
router.get('/:id', validarPermisos('aplicaciones', 'leer'), async (req, res) => {
  try {
    const aplicacion = await AplicacionQuimica.findById(req.params.id)
      .populate('lote_id', 'nombre_lote area_hectareas variedad_cacao coordenadas_gps')
      .populate('usuario_id', 'nombre apellido');

    if (!aplicacion) {
      return res.status(404).json({
        success: false,
        message: 'Aplicación no encontrada'
      });
    }

    // Verificar propiedad
    if (req.usuario.rol !== 'admin' && aplicacion.usuario_id._id.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para ver esta aplicación'
      });
    }

    res.json({
      success: true,
      message: 'Aplicación obtenida exitosamente',
      data: {
        aplicacion
      }
    });

  } catch (error) {
    console.error('Error obteniendo aplicación:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/aplicaciones
// @desc    Crear nueva aplicación
// @access  Privado
router.post('/', validarPermisos('aplicaciones', 'crear'), async (req, res) => {
  try {
    const datosAplicacion = {
      ...req.body,
      usuario_id: req.usuario._id
    };

    // Verificar que el lote pertenece al usuario
    const lote = await Lote.findById(datosAplicacion.lote_id);
    if (!lote) {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    if (req.usuario.rol !== 'admin' && lote.usuario_id.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para crear aplicaciones en este lote'
      });
    }

    // Validar que no haya conflictos de programación
    const aplicacionesConflicto = await AplicacionQuimica.find({
      lote_id: datosAplicacion.lote_id,
      fecha_programada: {
        $gte: new Date(datosAplicacion.fecha_programada),
        $lt: new Date(new Date(datosAplicacion.fecha_programada).getTime() + 24 * 60 * 60 * 1000)
      },
      estado_aplicacion: { $in: ['Programada', 'En proceso'] }
    });

    if (aplicacionesConflicto.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una aplicación programada para esta fecha en este lote'
      });
    }

    // Determinar ciclo y número de aplicación si no se proporciona
    if (!datosAplicacion.ciclo_aplicacion) {
      const ultimaAplicacion = await AplicacionQuimica.findOne({
        lote_id: datosAplicacion.lote_id
      }).sort({ 'ciclo_aplicacion.numero_ciclo': -1, 'ciclo_aplicacion.numero_aplicacion': -1 });

      if (ultimaAplicacion) {
        if (ultimaAplicacion.ciclo_aplicacion.numero_aplicacion >= 8) {
          // Nuevo ciclo
          datosAplicacion.ciclo_aplicacion = {
            numero_ciclo: ultimaAplicacion.ciclo_aplicacion.numero_ciclo + 1,
            numero_aplicacion: 1,
            fecha_inicio_ciclo: new Date(datosAplicacion.fecha_programada)
          };
        } else {
          // Mismo ciclo, siguiente aplicación
          datosAplicacion.ciclo_aplicacion = {
            numero_ciclo: ultimaAplicacion.ciclo_aplicacion.numero_ciclo,
            numero_aplicacion: ultimaAplicacion.ciclo_aplicacion.numero_aplicacion + 1,
            fecha_inicio_ciclo: ultimaAplicacion.ciclo_aplicacion.fecha_inicio_ciclo
          };
        }
      } else {
        // Primera aplicación
        datosAplicacion.ciclo_aplicacion = {
          numero_ciclo: 1,
          numero_aplicacion: 1,
          fecha_inicio_ciclo: new Date(datosAplicacion.fecha_programada)
        };
      }
    }

    const nuevaAplicacion = new AplicacionQuimica(datosAplicacion);
    await nuevaAplicacion.save();

    // Poblar datos para respuesta
    await nuevaAplicacion.populate('lote_id', 'nombre_lote area_hectareas');
    await nuevaAplicacion.populate('usuario_id', 'nombre apellido');

    res.status(201).json({
      success: true,
      message: 'Aplicación creada exitosamente',
      data: {
        aplicacion: nuevaAplicacion
      }
    });

  } catch (error) {
    console.error('Error creando aplicación:', error);
    
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

// @route   PUT /api/aplicaciones/:id
// @desc    Actualizar aplicación
// @access  Privado
router.put('/:id', validarPermisos('aplicaciones', 'actualizar'), async (req, res) => {
  try {
    const aplicacion = await AplicacionQuimica.findById(req.params.id);

    if (!aplicacion) {
      return res.status(404).json({
        success: false,
        message: 'Aplicación no encontrada'
      });
    }

    // Verificar propiedad
    if (req.usuario.rol !== 'admin' && aplicacion.usuario_id.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para actualizar esta aplicación'
      });
    }

    const aplicacionActualizada = await AplicacionQuimica.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    )
    .populate('lote_id', 'nombre_lote area_hectareas')
    .populate('usuario_id', 'nombre apellido');

    res.json({
      success: true,
      message: 'Aplicación actualizada exitosamente',
      data: {
        aplicacion: aplicacionActualizada
      }
    });

  } catch (error) {
    console.error('Error actualizando aplicación:', error);
    
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

// @route   POST /api/aplicaciones/:id/completar
// @desc    Marcar aplicación como completada
// @access  Privado
router.post('/:id/completar', validarPermisos('aplicaciones', 'actualizar'), async (req, res) => {
  try {
    const aplicacion = await AplicacionQuimica.findById(req.params.id);

    if (!aplicacion) {
      return res.status(404).json({
        success: false,
        message: 'Aplicación no encontrada'
      });
    }

    // Verificar propiedad
    if (req.usuario.rol !== 'admin' && aplicacion.usuario_id.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para completar esta aplicación'
      });
    }

    if (aplicacion.estado_aplicacion === 'Completada') {
      return res.status(400).json({
        success: false,
        message: 'La aplicación ya está completada'
      });
    }

    // Actualizar datos de completación
    const datosCompletacion = {
      estado_aplicacion: 'Completada',
      fecha_real_aplicacion: req.body.fecha_real_aplicacion || new Date(),
      ...req.body
    };

    const aplicacionCompletada = await AplicacionQuimica.findByIdAndUpdate(
      req.params.id,
      datosCompletacion,
      { 
        new: true, 
        runValidators: true 
      }
    )
    .populate('lote_id', 'nombre_lote area_hectareas')
    .populate('usuario_id', 'nombre apellido');

    res.json({
      success: true,
      message: 'Aplicación completada exitosamente',
      data: {
        aplicacion: aplicacionCompletada,
        proxima_aplicacion: aplicacionCompletada.proxima_aplicacion
      }
    });

  } catch (error) {
    console.error('Error completando aplicación:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/aplicaciones/programar-ciclo
// @desc    Programar ciclo completo de aplicaciones
// @access  Privado
router.post('/programar-ciclo', validarPermisos('aplicaciones', 'crear'), async (req, res) => {
  try {
    const { lote_id, fecha_inicio, productos_base } = req.body;

    // Verificar que el lote pertenece al usuario
    const lote = await Lote.findById(lote_id);
    if (!lote) {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    if (req.usuario.rol !== 'admin' && lote.usuario_id.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para programar aplicaciones en este lote'
      });
    }

    // Determinar número de ciclo
    const ultimaAplicacion = await AplicacionQuimica.findOne({
      lote_id: lote_id
    }).sort({ 'ciclo_aplicacion.numero_ciclo': -1 });

    const numeroCiclo = ultimaAplicacion ? ultimaAplicacion.ciclo_aplicacion.numero_ciclo + 1 : 1;

    // Crear 8 aplicaciones del ciclo
    const aplicaciones = [];
    const fechaInicioCiclo = new Date(fecha_inicio);

    for (let i = 1; i <= 8; i++) {
      const fechaAplicacion = new Date(fechaInicioCiclo);
      fechaAplicacion.setDate(fechaInicioCiclo.getDate() + (i - 1) * 20);

      const aplicacion = new AplicacionQuimica({
        usuario_id: req.usuario._id,
        lote_id: lote_id,
        ciclo_aplicacion: {
          numero_ciclo: numeroCiclo,
          numero_aplicacion: i,
          fecha_inicio_ciclo: fechaInicioCiclo
        },
        fecha_programada: fechaAplicacion,
        productos_utilizados: productos_base || [],
        estado_aplicacion: 'Programada'
      });

      await aplicacion.save();
      aplicaciones.push(aplicacion);
    }

    res.status(201).json({
      success: true,
      message: `Ciclo ${numeroCiclo} programado exitosamente con 8 aplicaciones`,
      data: {
        ciclo_numero: numeroCiclo,
        total_aplicaciones: 8,
        fecha_inicio: fechaInicioCiclo,
        fecha_fin: aplicaciones[7].fecha_programada,
        aplicaciones: aplicaciones
      }
    });

  } catch (error) {
    console.error('Error programando ciclo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/aplicaciones/productos/recomendados
// @desc    Obtener productos recomendados por aplicación
// @access  Privado
router.get('/productos/recomendados', (req, res) => {
  const productosRecomendados = {
    fertilizantes_foliares: [
      {
        nombre: 'NPK 20-20-20',
        dosis_recomendada: '2-3 g/L',
        funcion: 'Crecimiento balanceado',
        aplicaciones_recomendadas: [1, 4, 7]
      },
      {
        nombre: 'NPK 15-15-15',
        dosis_recomendada: '2-3 g/L',
        funcion: 'Mantenimiento',
        aplicaciones_recomendadas: [2, 5]
      },
      {
        nombre: 'Alto en Potasio (0-0-50)',
        dosis_recomendada: '2 g/L',
        funcion: 'Llenado de frutos',
        aplicaciones_recomendadas: [3, 6, 8]
      }
    ],
    fungicidas: [
      {
        nombre: 'Cobre + Mancozeb',
        dosis_recomendada: '2-3 g/L',
        funcion: 'Preventivo amplio espectro',
        aplicaciones_recomendadas: [1, 3, 6]
      },
      {
        nombre: 'Triazol',
        dosis_recomendada: 'Según etiqueta',
        funcion: 'Sistémico para monilia y mazorca negra',
        aplicaciones_recomendadas: [2, 5, 8]
      }
    ],
    insecticidas: [
      {
        nombre: 'Para trips y áfidos',
        dosis_recomendada: 'Según etiqueta',
        funcion: 'Control de plagas chupadoras',
        aplicaciones_recomendadas: [3, 7]
      },
      {
        nombre: 'Bacillus thuringiensis',
        dosis_recomendada: 'Según etiqueta',
        funcion: 'Biológico para lepidópteros',
        aplicaciones_recomendadas: [4]
      }
    ],
    bioestimulantes: [
      {
        nombre: 'Extracto de algas',
        dosis_recomendada: '1-2 mL/L',
        funcion: 'Estimulante de crecimiento',
        aplicaciones_recomendadas: [1, 5, 8]
      },
      {
        nombre: 'Aminoácidos',
        dosis_recomendada: '1-2 mL/L',
        funcion: 'Recuperación de estrés',
        aplicaciones_recomendadas: [2, 7]
      }
    ]
  };

  res.json({
    success: true,
    message: 'Productos recomendados obtenidos exitosamente',
    data: {
      productos_recomendados: productosRecomendados,
      notas: [
        'Las dosis pueden variar según las condiciones específicas del cultivo',
        'Siempre verificar compatibilidad entre productos',
        'Aplicar en horas de menor temperatura (6-9 AM o 4-6 PM)',
        'Evitar aplicaciones con viento superior a 15 km/h'
      ]
    }
  });
});

// @route   DELETE /api/aplicaciones/:id
// @desc    Eliminar aplicación
// @access  Privado
router.delete('/:id', validarPermisos('aplicaciones', 'eliminar'), async (req, res) => {
  try {
    const aplicacion = await AplicacionQuimica.findById(req.params.id);

    if (!aplicacion) {
      return res.status(404).json({
        success: false,
        message: 'Aplicación no encontrada'
      });
    }

    // Verificar propiedad
    if (req.usuario.rol !== 'admin' && aplicacion.usuario_id.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para eliminar esta aplicación'
      });
    }

    // No permitir eliminar aplicaciones completadas
    if (aplicacion.estado_aplicacion === 'Completada') {
      return res.status(400).json({
        success: false,
        message: 'No se puede eliminar una aplicación completada'
      });
    }

    await AplicacionQuimica.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Aplicación eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando aplicación:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
