const express = require('express');
const Gasto = require('../models/Gasto');
const { verificarToken, validarPermisos } = require('../middleware/auth');

const router = express.Router();

// Middleware para todas las rutas
router.use(verificarToken);

// @route   GET /api/gastos
// @desc    Obtener gastos del usuario con filtros
// @access  Privado
router.get('/', validarPermisos('gastos', 'leer'), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      categoria, 
      subcategoria,
      fecha_desde, 
      fecha_hasta,
      lote_id,
      año,
      mes
    } = req.query;
    
    // Construir filtros
    const filtros = { usuario_id: req.usuario._id };
    
    if (categoria) filtros.categoria = categoria;
    if (subcategoria) filtros.subcategoria = subcategoria;
    if (lote_id) filtros.lote_id = lote_id;
    if (año) filtros['periodo_contable.año'] = parseInt(año);
    if (mes) filtros['periodo_contable.mes'] = parseInt(mes);
    
    if (fecha_desde || fecha_hasta) {
      filtros.fecha_gasto = {};
      if (fecha_desde) filtros.fecha_gasto.$gte = new Date(fecha_desde);
      if (fecha_hasta) filtros.fecha_gasto.$lte = new Date(fecha_hasta);
    }

    // Ejecutar consulta con paginación
    const gastos = await Gasto.find(filtros)
      .sort({ fecha_gasto: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('lote_id', 'nombre_lote area_hectareas')
      .populate('usuario_id', 'nombre apellido');

    // Contar total de documentos
    const total = await Gasto.countDocuments(filtros);

    // Estadísticas adicionales
    const estadisticas = await Gasto.gastosPorCategoria(
      req.usuario._id,
      fecha_desde ? new Date(fecha_desde) : new Date(new Date().getFullYear(), 0, 1),
      fecha_hasta ? new Date(fecha_hasta) : new Date()
    );

    res.json({
      success: true,
      message: 'Gastos obtenidos exitosamente',
      data: {
        gastos,
        paginacion: {
          total,
          pagina_actual: parseInt(page),
          total_paginas: Math.ceil(total / limit),
          limite: parseInt(limit)
        },
        estadisticas_por_categoria: estadisticas
      }
    });

  } catch (error) {
    console.error('Error obteniendo gastos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/gastos
// @desc    Crear nuevo gasto
// @access  Privado
router.post('/', validarPermisos('gastos', 'crear'), async (req, res) => {
  try {
    const datosGasto = {
      ...req.body,
      usuario_id: req.usuario._id
    };

    const nuevoGasto = new Gasto(datosGasto);
    await nuevoGasto.save();

    // Poblar datos para respuesta
    await nuevoGasto.populate('lote_id', 'nombre_lote area_hectareas');
    await nuevoGasto.populate('usuario_id', 'nombre apellido');

    res.status(201).json({
      success: true,
      message: 'Gasto registrado exitosamente',
      data: {
        gasto: nuevoGasto
      }
    });

  } catch (error) {
    console.error('Error creando gasto:', error);
    
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

// @route   GET /api/gastos/resumen/:año/:mes?
// @desc    Obtener resumen de gastos por período
// @access  Privado
router.get('/resumen/:año/:mes?', validarPermisos('gastos', 'leer'), async (req, res) => {
  try {
    const año = parseInt(req.params.año);
    const mes = req.params.mes ? parseInt(req.params.mes) : null;

    const indicadores = await Gasto.indicadoresFinancieros(
      req.usuario._id,
      año,
      mes
    );

    const gastosPorCategoria = await Gasto.gastosPorCategoria(
      req.usuario._id,
      new Date(año, mes ? mes - 1 : 0, 1),
      mes ? new Date(año, mes, 0) : new Date(año, 11, 31)
    );

    res.json({
      success: true,
      message: 'Resumen obtenido exitosamente',
      data: {
        periodo: { año, mes },
        indicadores: indicadores[0] || {},
        gastos_por_categoria: gastosPorCategoria
      }
    });

  } catch (error) {
    console.error('Error obteniendo resumen:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
