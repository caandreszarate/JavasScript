const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Middleware para verificar token JWT
const verificarToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Acceso denegado. Token no proporcionado.'
      });
    }
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuario
    const usuario = await Usuario.findById(decoded.id).select('-password');
    
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido. Usuario no encontrado.'
      });
    }
    
    if (usuario.estado !== 'activo') {
      return res.status(401).json({
        success: false,
        message: 'Cuenta inactiva. Contacte al administrador.'
      });
    }
    
    // Actualizar último acceso
    await usuario.actualizarUltimoAcceso();
    
    // Agregar usuario a la request
    req.usuario = usuario;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado. Por favor, inicie sesión nuevamente.'
      });
    }
    
    console.error('Error en verificación de token:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Middleware para verificar roles específicos
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }
    
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        success: false,
        message: 'Permisos insuficientes para realizar esta acción'
      });
    }
    
    next();
  };
};

// Middleware para verificar que el usuario es propietario del recurso
const verificarPropietario = (campoUsuario = 'usuario_id') => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }
    
    // Los administradores pueden acceder a todos los recursos
    if (req.usuario.rol === 'admin') {
      return next();
    }
    
    // Para otros roles, verificar que el recurso les pertenece
    // Esta verificación se completa en el controlador específico
    req.verificarPropietario = {
      campo: campoUsuario,
      usuarioId: req.usuario._id
    };
    
    next();
  };
};

// Middleware para generar token
const generarToken = (usuario) => {
  const payload = {
    id: usuario._id,
    email: usuario.email,
    rol: usuario.rol,
    nombre: usuario.nombre_completo
  };
  
  const options = {
    expiresIn: '24h', // Token válido por 24 horas
    issuer: 'CacaoControl',
    audience: 'CacaoControl-Users'
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Middleware para generar refresh token
const generarRefreshToken = (usuario) => {
  const payload = {
    id: usuario._id,
    tipo: 'refresh'
  };
  
  const options = {
    expiresIn: '7d', // Refresh token válido por 7 días
    issuer: 'CacaoControl',
    audience: 'CacaoControl-Refresh'
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Middleware para verificar refresh token
const verificarRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token no proporcionado'
      });
    }
    
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    
    if (decoded.tipo !== 'refresh') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    
    const usuario = await Usuario.findById(decoded.id).select('-password');
    
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    if (usuario.estado !== 'activo') {
      return res.status(401).json({
        success: false,
        message: 'Cuenta inactiva'
      });
    }
    
    req.usuario = usuario;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Refresh token inválido o expirado'
      });
    }
    
    console.error('Error en verificación de refresh token:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Middleware para validar permisos específicos por recurso
const validarPermisos = (recurso, accion) => {
  return (req, res, next) => {
    const { rol } = req.usuario;
    
    // Definir matriz de permisos
    const permisos = {
      admin: {
        lotes: ['crear', 'leer', 'actualizar', 'eliminar'],
        aplicaciones: ['crear', 'leer', 'actualizar', 'eliminar'],
        gastos: ['crear', 'leer', 'actualizar', 'eliminar'],
        usuarios: ['crear', 'leer', 'actualizar', 'eliminar'],
        reportes: ['leer', 'exportar']
      },
      supervisor: {
        lotes: ['leer', 'actualizar'],
        aplicaciones: ['leer', 'actualizar'],
        gastos: ['leer'],
        usuarios: ['leer'],
        reportes: ['leer', 'exportar']
      },
      tecnico: {
        lotes: ['leer'],
        aplicaciones: ['leer', 'actualizar'],
        gastos: ['leer'],
        usuarios: [],
        reportes: ['leer']
      },
      productor: {
        lotes: ['crear', 'leer', 'actualizar'],
        aplicaciones: ['crear', 'leer', 'actualizar'],
        gastos: ['crear', 'leer', 'actualizar'],
        usuarios: [],
        reportes: ['leer']
      }
    };
    
    const permisosUsuario = permisos[rol];
    
    if (!permisosUsuario || !permisosUsuario[recurso]) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para acceder a este recurso'
      });
    }
    
    if (!permisosUsuario[recurso].includes(accion)) {
      return res.status(403).json({
        success: false,
        message: `No tiene permisos para ${accion} en ${recurso}`
      });
    }
    
    next();
  };
};

// Middleware para logging de actividades de autenticación
const logActividad = (accion) => {
  return (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Log de la actividad
      const logData = {
        usuario: req.usuario ? req.usuario.email : 'No autenticado',
        accion: accion,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString(),
        success: res.statusCode < 400
      };
      
      console.log('Actividad de autenticación:', JSON.stringify(logData));
      
      // Llamar al método original
      originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = {
  verificarToken,
  verificarRol,
  verificarPropietario,
  generarToken,
  generarRefreshToken,
  verificarRefreshToken,
  validarPermisos,
  logActividad
};
