const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { 
  generarToken, 
  generarRefreshToken, 
  verificarToken, 
  verificarRefreshToken,
  logActividad
} = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/registro
// @desc    Registrar nuevo usuario
// @access  Público
router.post('/registro', logActividad('registro'), async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      password,
      telefono,
      cedula,
      finca,
      configuracion
    } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ 
      $or: [{ email }, { cedula }]
    });

    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: usuarioExistente.email === email 
          ? 'Ya existe un usuario con este email' 
          : 'Ya existe un usuario con esta cédula'
      });
    }

    // Validar datos requeridos
    if (!nombre || !apellido || !email || !password || !cedula || !finca) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos obligatorios deben ser completados'
      });
    }

    // Validar fortaleza de la contraseña
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email: email.toLowerCase(),
      password,
      telefono,
      cedula,
      finca: {
        nombre: finca.nombre,
        ubicacion: {
          municipio: finca.ubicacion?.municipio || 'Granada',
          departamento: finca.ubicacion?.departamento || 'Meta',
          vereda: finca.ubicacion?.vereda,
          coordenadas: finca.ubicacion?.coordenadas
        },
        area_total: finca.area_total
      },
      configuracion: {
        idioma: configuracion?.idioma || 'es',
        zona_horaria: configuracion?.zona_horaria || 'America/Bogota',
        notificaciones: {
          email: configuracion?.notificaciones?.email !== false,
          aplicaciones: configuracion?.notificaciones?.aplicaciones !== false,
          clima: configuracion?.notificaciones?.clima !== false,
          gastos: configuracion?.notificaciones?.gastos || false
        }
      },
      rol: 'productor' // Rol por defecto
    });

    await nuevoUsuario.save();

    // Generar tokens
    const token = generarToken(nuevoUsuario);
    const refreshToken = generarRefreshToken(nuevoUsuario);

    // Respuesta sin password
    const usuarioRespuesta = nuevoUsuario.toObject();
    delete usuarioRespuesta.password;

    res.status(201).json({
      success: true,
      message: '¡Usuario registrado exitosamente! Bienvenido a CacaoControl',
      data: {
        usuario: usuarioRespuesta,
        token,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    
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
      message: 'Error interno del servidor durante el registro'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Iniciar sesión
// @access  Público
router.post('/login', logActividad('login'), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos requeridos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Buscar usuario incluyendo password
    const usuario = await Usuario.findOne({ 
      email: email.toLowerCase() 
    }).select('+password');

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar estado del usuario
    if (usuario.estado !== 'activo') {
      return res.status(401).json({
        success: false,
        message: 'Cuenta inactiva. Contacte al administrador'
      });
    }

    // Verificar contraseña
    const passwordValida = await usuario.compararPassword(password);

    if (!passwordValida) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Actualizar último acceso
    await usuario.actualizarUltimoAcceso();

    // Generar tokens
    const token = generarToken(usuario);
    const refreshToken = generarRefreshToken(usuario);

    // Respuesta sin password
    const usuarioRespuesta = usuario.toObject();
    delete usuarioRespuesta.password;

    res.json({
      success: true,
      message: `¡Bienvenido de vuelta, ${usuario.nombre}!`,
      data: {
        usuario: usuarioRespuesta,
        token,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor durante el inicio de sesión'
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Renovar token usando refresh token
// @access  Privado
router.post('/refresh', verificarRefreshToken, (req, res) => {
  try {
    const nuevoToken = generarToken(req.usuario);
    const nuevoRefreshToken = generarRefreshToken(req.usuario);

    res.json({
      success: true,
      message: 'Token renovado exitosamente',
      data: {
        token: nuevoToken,
        refreshToken: nuevoRefreshToken
      }
    });

  } catch (error) {
    console.error('Error en refresh token:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Cerrar sesión
// @access  Privado
router.post('/logout', verificarToken, logActividad('logout'), (req, res) => {
  // En una implementación completa, aquí se agregaría el token a una lista negra
  // Por ahora, solo enviamos confirmación
  res.json({
    success: true,
    message: 'Sesión cerrada exitosamente'
  });
});

// @route   GET /api/auth/perfil
// @desc    Obtener perfil del usuario autenticado
// @access  Privado
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id)
      .select('-password')
      .populate({
        path: 'finca',
        select: 'nombre ubicacion area_total'
      });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Perfil obtenido exitosamente',
      data: {
        usuario
      }
    });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/auth/perfil
// @desc    Actualizar perfil del usuario
// @access  Privado
router.put('/perfil', verificarToken, async (req, res) => {
  try {
    const actualizaciones = req.body;
    const camposPermitidos = [
      'nombre', 'apellido', 'telefono', 'finca', 'configuracion'
    ];

    // Filtrar solo campos permitidos
    const actualizacionesFiltradas = {};
    Object.keys(actualizaciones).forEach(campo => {
      if (camposPermitidos.includes(campo)) {
        actualizacionesFiltradas[campo] = actualizaciones[campo];
      }
    });

    const usuario = await Usuario.findByIdAndUpdate(
      req.usuario._id,
      actualizacionesFiltradas,
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: {
        usuario
      }
    });

  } catch (error) {
    console.error('Error actualizando perfil:', error);
    
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

// @route   PUT /api/auth/cambiar-password
// @desc    Cambiar contraseña del usuario
// @access  Privado
router.put('/cambiar-password', verificarToken, logActividad('cambio_password'), async (req, res) => {
  try {
    const { passwordActual, passwordNuevo } = req.body;

    if (!passwordActual || !passwordNuevo) {
      return res.status(400).json({
        success: false,
        message: 'Contraseña actual y nueva contraseña son requeridas'
      });
    }

    if (passwordNuevo.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La nueva contraseña debe tener al menos 6 caracteres'
      });
    }

    // Buscar usuario con password
    const usuario = await Usuario.findById(req.usuario._id).select('+password');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar contraseña actual
    const passwordValida = await usuario.compararPassword(passwordActual);

    if (!passwordValida) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña actual incorrecta'
      });
    }

    // Actualizar contraseña
    usuario.password = passwordNuevo;
    await usuario.save();

    res.json({
      success: true,
      message: 'Contraseña actualizada exitosamente'
    });

  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/auth/recuperar-password
// @desc    Solicitar recuperación de contraseña
// @access  Público
router.post('/recuperar-password', logActividad('recuperar_password'), async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email es requerido'
      });
    }

    const usuario = await Usuario.findOne({ email: email.toLowerCase() });

    // Por seguridad, siempre devolver el mismo mensaje
    const mensaje = 'Si el email existe en nuestro sistema, recibirás instrucciones para recuperar tu contraseña';

    if (usuario) {
      // Aquí se implementaría el envío de email con token de recuperación
      // Por ahora solo logueamos la solicitud
      console.log(`Solicitud de recuperación de contraseña para: ${email}`);
      
      // En producción, aquí se enviaría un email con un token temporal
      // const tokenRecuperacion = jwt.sign(
      //   { id: usuario._id, tipo: 'recuperacion' },
      //   process.env.JWT_SECRET,
      //   { expiresIn: '1h' }
      // );
    }

    res.json({
      success: true,
      message: mensaje
    });

  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/auth/verificar-token
// @desc    Verificar si el token es válido
// @access  Privado
router.get('/verificar-token', verificarToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token válido',
    data: {
      usuario: {
        id: req.usuario._id,
        nombre: req.usuario.nombre_completo,
        email: req.usuario.email,
        rol: req.usuario.rol
      }
    }
  });
});

module.exports = router;
