const express = require('express');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

// Middleware para todas las rutas
router.use(verificarToken);

// @route   GET /api/dashboard
// @desc    Obtener datos del dashboard principal
// @access  Privado
router.get('/', async (req, res) => {
  try {
    // Simulación de datos del dashboard
    // En producción, estos datos vendrían de consultas a la base de datos
    
    const dashboardData = {
      usuario: {
        nombre: req.usuario.nombre_completo,
        finca: req.usuario.finca.nombre,
        ultima_conexion: new Date().toISOString()
      },
      estadisticas: {
        lotes: {
          total: 3,
          activos: 3,
          area_total: 12.5,
          productividad_promedio: 850
        },
        aplicaciones: {
          pendientes: 2,
          completadas_mes: 8,
          proxima_fecha: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          ciclo_actual: 2,
          aplicacion_actual: 3
        },
        gastos: {
          mes_actual: 850000,
          comparacion_mes_anterior: 12,
          categoria_mayor: 'Insumos Químicos',
          porcentaje_presupuesto: 65
        },
        alertas: {
          total: 4,
          criticas: 1,
          altas: 1,
          medias: 2
        }
      },
      clima: {
        temperatura: 26,
        humedad: 78,
        precipitacion_hoy: 15,
        pronostico: 'Parcialmente nublado',
        condiciones_aplicacion: 'Favorables',
        proxima_lluvia: '2 días'
      },
      actividades_recientes: [
        {
          id: 1,
          tipo: 'aplicacion',
          titulo: 'Aplicación completada - Lote Norte',
          descripcion: 'NPK + Fungicida preventivo aplicado exitosamente',
          fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'completada'
        },
        {
          id: 2,
          tipo: 'gasto',
          titulo: 'Nuevo gasto registrado',
          descripcion: 'Compra de fertilizante foliar - $180,000',
          fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'registrado'
        },
        {
          id: 3,
          tipo: 'alerta',
          titulo: 'Monitoreo de plagas',
          descripcion: 'Revisar presencia de trips en Lote Sur',
          fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'pendiente'
        }
      ],
      proximas_aplicaciones: [
        {
          id: 1,
          lote: 'Lote Norte',
          fecha_programada: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          ciclo: 2,
          aplicacion: 4,
          productos: ['NPK 15-15-15', 'Triazol'],
          estado: 'programada',
          prioridad: 'alta'
        },
        {
          id: 2,
          lote: 'Lote Sur',
          fecha_programada: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          ciclo: 1,
          aplicacion: 2,
          productos: ['Bioestimulante', 'Insecticida'],
          estado: 'programada',
          prioridad: 'media'
        }
      ],
      alertas_activas: [
        {
          id: 1,
          tipo: 'aplicacion',
          titulo: 'Aplicación Vencida',
          mensaje: 'Lote Norte: Aplicación programada para ayer no completada',
          prioridad: 'critica',
          fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          tipo: 'plaga',
          titulo: 'Monitoreo de Plagas',
          mensaje: 'Revisar presencia de trips en Lote Sur',
          prioridad: 'media',
          fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 3,
          tipo: 'clima',
          titulo: 'Condiciones Favorables',
          mensaje: 'Próximos 3 días ideales para aplicaciones',
          prioridad: 'baja',
          fecha: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        }
      ],
      resumen_financiero: {
        gastos_mes: {
          insumos_quimicos: 450000,
          mano_obra: 280000,
          equipos: 85000,
          servicios: 35000
        },
        comparacion_mensual: {
          mes_actual: 850000,
          mes_anterior: 760000,
          variacion_porcentaje: 11.8
        },
        proyeccion_anual: 10200000,
        eficiencia_presupuestal: 87
      }
    };

    res.json({
      success: true,
      message: 'Dashboard cargado exitosamente',
      data: dashboardData
    });

  } catch (error) {
    console.error('Error cargando dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/dashboard/widgets/:widget
// @desc    Obtener datos específicos de un widget
// @access  Privado
router.get('/widgets/:widget', async (req, res) => {
  try {
    const { widget } = req.params;
    
    let widgetData = {};
    
    switch (widget) {
      case 'clima':
        widgetData = {
          temperatura: 26,
          humedad: 78,
          pronostico: 'Parcialmente nublado',
          condiciones_aplicacion: 'Favorables'
        };
        break;
        
      case 'aplicaciones':
        widgetData = {
          pendientes: 2,
          completadas_mes: 8,
          proxima: {
            lote: 'Lote Norte',
            fecha: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
          }
        };
        break;
        
      case 'gastos':
        widgetData = {
          mes_actual: 850000,
          comparacion_anterior: 12,
          categoria_principal: 'Insumos Químicos'
        };
        break;
        
      case 'alertas':
        widgetData = {
          total: 4,
          criticas: 1,
          recientes: [
            {
              titulo: 'Aplicación Vencida',
              prioridad: 'critica'
            }
          ]
        };
        break;
        
      default:
        return res.status(404).json({
          success: false,
          message: 'Widget no encontrado'
        });
    }
    
    res.json({
      success: true,
      message: `Widget ${widget} cargado exitosamente`,
      data: widgetData
    });

  } catch (error) {
    console.error('Error cargando widget:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/dashboard/actualizar
// @desc    Forzar actualización de datos del dashboard
// @access  Privado
router.post('/actualizar', async (req, res) => {
  try {
    // Aquí se implementaría la lógica para actualizar cachés
    // y recalcular estadísticas
    
    res.json({
      success: true,
      message: 'Dashboard actualizado exitosamente',
      data: {
        fecha_actualizacion: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error actualizando dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
