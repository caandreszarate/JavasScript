const express = require('express');
const Lote = require('../models/Lote');
const AplicacionQuimica = require('../models/AplicacionQuimica');
const Gasto = require('../models/Gasto');
const { verificarToken, logActividad } = require('../middleware/auth');

const router = express.Router();

// Middleware para verificar autenticación en todas las rutas
router.use(verificarToken);

// @route   GET /api/lotes
// @desc    Obtener todos los lotes del usuario autenticado
// @access  Privado
router.get('/', logActividad('consultar_lotes'), async (req, res) => {
  try {
    const { page = 1, limit = 10, estado, variedad, buscar } = req.query;
    
    // Construir filtros
    const filtros = { usuario: req.usuario.id };
    
    if (estado && estado !== 'todos') {
      filtros.estado = estado;
    }
    
    if (variedad && variedad !== 'todas') {
      filtros.variedad_cacao = variedad;
    }
    
    if (buscar) {
      filtros.$or = [
        { nombre: { $regex: buscar, $options: 'i' } },
        { codigo: { $regex: buscar, $options: 'i' } },
        { 'ubicacion.vereda': { $regex: buscar, $options: 'i' } }
      ];
    }

    const lotes = await Lote.find(filtros)
      .populate('creado_por', 'nombre apellido')
      .populate('aplicaciones_quimicas')
      .populate('gastos')
      .sort({ fecha_creacion: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Lote.countDocuments(filtros);

    res.json({
      success: true,
      data: lotes,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
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

// @route   GET /api/lotes/:id
// @desc    Obtener un lote específico con todos sus datos
// @access  Privado
router.get('/:id', logActividad('consultar_lote'), async (req, res) => {
  try {
    const lote = await Lote.findOne({
      _id: req.params.id,
      usuario: req.usuario.id
    })
    .populate('creado_por', 'nombre apellido')
    .populate('aplicaciones_quimicas')
    .populate('gastos')
    .populate('seguimiento_fenologico.registrado_por', 'nombre apellido')
    .populate('plagas_enfermedades.registrado_por', 'nombre apellido');

    if (!lote) {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    res.json({
      success: true,
      data: lote
    });
  } catch (error) {
    console.error('Error al obtener lote:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/lotes
// @desc    Crear un nuevo lote
// @access  Privado
router.post('/', logActividad('crear_lote'), async (req, res) => {
  try {
    const nuevoLote = new Lote({
      ...req.body,
      usuario: req.usuario.id,
      creado_por: req.usuario.id
    });

    await nuevoLote.save();

    // Poblar datos para la respuesta
    await nuevoLote.populate('creado_por', 'nombre apellido');

    res.status(201).json({
      success: true,
      message: 'Lote creado exitosamente',
      data: nuevoLote
    });
  } catch (error) {
    console.error('Error al crear lote:', error);
    
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errores
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un lote con ese código'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/lotes/:id
// @desc    Actualizar un lote
// @access  Privado
router.put('/:id', logActividad('actualizar_lote'), async (req, res) => {
  try {
    const lote = await Lote.findOneAndUpdate(
      {
        _id: req.params.id,
        usuario: req.usuario.id
      },
      {
        ...req.body,
        fecha_actualizacion: new Date()
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('creado_por', 'nombre apellido');

    if (!lote) {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Lote actualizado exitosamente',
      data: lote
    });
  } catch (error) {
    console.error('Error al actualizar lote:', error);
    
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errores
      });
    }

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   DELETE /api/lotes/:id
// @desc    Eliminar un lote
// @access  Privado
router.delete('/:id', logActividad('eliminar_lote'), async (req, res) => {
  try {
    const lote = await Lote.findOneAndDelete({
      _id: req.params.id,
      usuario: req.usuario.id
    });

    if (!lote) {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Lote eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar lote:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/lotes/:id/seguimiento
// @desc    Agregar seguimiento fenológico
// @access  Privado
router.post('/:id/seguimiento', logActividad('agregar_seguimiento'), async (req, res) => {
  try {
    const lote = await Lote.findOne({
      _id: req.params.id,
      usuario: req.usuario.id
    });

    if (!lote) {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    const nuevoSeguimiento = {
      ...req.body,
      registrado_por: req.usuario.id
    };

    lote.seguimiento_fenologico.push(nuevoSeguimiento);
    await lote.save();

    res.status(201).json({
      success: true,
      message: 'Seguimiento fenológico agregado exitosamente',
      data: lote.seguimiento_fenologico[lote.seguimiento_fenologico.length - 1]
    });
  } catch (error) {
    console.error('Error al agregar seguimiento:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/lotes/:id/plagas
// @desc    Registrar plaga o enfermedad
// @access  Privado
router.post('/:id/plagas', logActividad('registrar_plaga'), async (req, res) => {
  try {
    const lote = await Lote.findOne({
      _id: req.params.id,
      usuario: req.usuario.id
    });

    if (!lote) {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    const nuevaPlaga = {
      ...req.body,
      registrado_por: req.usuario.id
    };

    lote.plagas_enfermedades.push(nuevaPlaga);
    await lote.save();

    res.status(201).json({
      success: true,
      message: 'Plaga/enfermedad registrada exitosamente',
      data: lote.plagas_enfermedades[lote.plagas_enfermedades.length - 1]
    });
  } catch (error) {
    console.error('Error al registrar plaga:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/lotes/:id/productividad
// @desc    Agregar registro de productividad
// @access  Privado
router.post('/:id/productividad', logActividad('agregar_productividad'), async (req, res) => {
  try {
    const lote = await Lote.findOne({
      _id: req.params.id,
      usuario: req.usuario.id
    });

    if (!lote) {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    const nuevaProductividad = {
      ...req.body,
      registrado_por: req.usuario.id
    };

    lote.productividad_historica.push(nuevaProductividad);
    await lote.save();

    res.status(201).json({
      success: true,
      message: 'Registro de productividad agregado exitosamente',
      data: lote.productividad_historica[lote.productividad_historica.length - 1]
    });
  } catch (error) {
    console.error('Error al agregar productividad:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/lotes/:id/estadisticas
// @desc    Obtener estadísticas específicas del lote
// @access  Privado
router.get('/:id/estadisticas', logActividad('consultar_estadisticas_lote'), async (req, res) => {
  try {
    const lote = await Lote.findOne({
      _id: req.params.id,
      usuario: req.usuario.id
    })
    .populate('aplicaciones_quimicas')
    .populate('gastos');

    if (!lote) {
      return res.status(404).json({
        success: false,
        message: 'Lote no encontrado'
      });
    }

    // Calcular estadísticas
    const estadisticas = {
      informacion_basica: {
        codigo: lote.codigo,
        area: lote.area,
        edad_años: lote.edad_años,
        numero_plantas: lote.numero_plantas,
        densidad_siembra: lote.densidad_siembra,
        plantas_por_hectarea: lote.plantas_por_hectarea
      },
      productividad: {
        promedio_kg: lote.productividad_promedio,
        por_hectarea: lote.productividad_por_hectarea,
        ingresos_totales: lote.ingresos_totales,
        registros: lote.productividad_historica.length
      },
      seguimiento_fenologico: {
        total_registros: lote.seguimiento_fenologico.length,
        ultima_etapa: lote.seguimiento_fenologico.length > 0 
          ? lote.seguimiento_fenologico[lote.seguimiento_fenologico.length - 1].etapa_fenologica 
          : null,
        ultima_fecha: lote.seguimiento_fenologico.length > 0 
          ? lote.seguimiento_fenologico[lote.seguimiento_fenologico.length - 1].fecha 
          : null
      },
      plagas_enfermedades: {
        total_registros: lote.plagas_enfermedades.length,
        activas: lote.plagas_enfermedades.filter(p => !p.fecha_control).length,
        controladas: lote.plagas_enfermedades.filter(p => p.fecha_control).length
      },
      aplicaciones_quimicas: {
        total: lote.aplicaciones_quimicas.length,
        este_año: lote.aplicaciones_quimicas.filter(app => 
          new Date(app.fecha_aplicacion).getFullYear() === new Date().getFullYear()
        ).length
      },
      gastos: {
        total: lote.gastos.reduce((sum, gasto) => sum + gasto.monto, 0),
        este_año: lote.gastos
          .filter(gasto => new Date(gasto.fecha).getFullYear() === new Date().getFullYear())
          .reduce((sum, gasto) => sum + gasto.monto, 0)
      }
    };

    res.json({
      success: true,
      data: estadisticas
    });
  } catch (error) {
    console.error('Error al obtener estadísticas del lote:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/lotes/estadisticas/resumen
// @desc    Obtener estadísticas generales de todos los lotes del usuario
// @access  Privado
router.get('/estadisticas/resumen', logActividad('consultar_estadisticas_generales'), async (req, res) => {
  try {
    const estadisticas = await Lote.obtenerEstadisticas(req.usuario.id);
    
    // Obtener datos adicionales
    const lotes = await Lote.find({ usuario: req.usuario.id });
    
    const estadisticasDetalladas = {
      ...estadisticas,
      variedadesPrincipales: {},
      promedioEdad: 0,
      estadosLotes: {
        activo: 0,
        inactivo: 0,
        en_renovacion: 0,
        abandonado: 0
      },
      sistemasSiembra: {
        monocultivo: 0,
        agroforestal: 0,
        asociado: 0
      }
    };

    // Calcular estadísticas adicionales
    let sumaEdades = 0;
    let lotesConEdad = 0;
    
    lotes.forEach(lote => {
      // Variedades
      const variedad = lote.variedad_cacao;
      estadisticasDetalladas.variedadesPrincipales[variedad] = 
        (estadisticasDetalladas.variedadesPrincipales[variedad] || 0) + 1;

      // Edad promedio
      const edad = lote.edad_años;
      if (edad !== null && edad >= 0) {
        sumaEdades += edad;
        lotesConEdad++;
      }

      // Estados
      estadisticasDetalladas.estadosLotes[lote.estado] = 
        (estadisticasDetalladas.estadosLotes[lote.estado] || 0) + 1;

      // Sistemas de siembra
      estadisticasDetalladas.sistemasSiembra[lote.sistema_siembra] = 
        (estadisticasDetalladas.sistemasSiembra[lote.sistema_siembra] || 0) + 1;
    });

    estadisticasDetalladas.promedioEdad = lotesConEdad > 0 ? sumaEdades / lotesConEdad : 0;

    res.json({
      success: true,
      data: estadisticasDetalladas
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;