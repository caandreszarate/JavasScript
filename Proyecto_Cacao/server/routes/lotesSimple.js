const express = require('express');
const LoteSimple = require('../models/LoteSimple');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

// Middleware para verificar autenticación
router.use(verificarToken);

// GET /api/lotes-simple
router.get('/', async (req, res) => {
  try {
    const lotes = await LoteSimple.find({ usuario: req.usuario.id })
      .populate('creado_por', 'nombre apellido')
      .sort({ fecha_creacion: -1 });

    res.json({
      success: true,
      data: lotes
    });
  } catch (error) {
    console.error('Error al obtener lotes:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// POST /api/lotes-simple
router.post('/', async (req, res) => {
  try {
    console.log('📥 Datos recibidos:', req.body);
    console.log('👤 Usuario:', req.usuario.email);

    const nuevoLote = new LoteSimple({
      ...req.body,
      usuario: req.usuario.id,
      creado_por: req.usuario.id
    });

    console.log('💾 Guardando lote:', nuevoLote);

    await nuevoLote.save();

    // Poblar datos para la respuesta
    await nuevoLote.populate('creado_por', 'nombre apellido');

    console.log('✅ Lote guardado exitosamente');

    res.status(201).json({
      success: true,
      message: 'Lote creado exitosamente',
      data: nuevoLote
    });
  } catch (error) {
    console.error('❌ Error al crear lote:', error);
    
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

module.exports = router;
