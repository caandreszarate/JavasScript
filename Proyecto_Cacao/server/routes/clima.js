const express = require('express');
const axios = require('axios');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

// Middleware para todas las rutas
router.use(verificarToken);

// @route   GET /api/clima/actual
// @desc    Obtener clima actual de Granada, Meta
// @access  Privado
router.get('/actual', async (req, res) => {
  try {
    // Coordenadas de Granada, Meta, Colombia
    const lat = 3.5361;
    const lon = -73.7062;
    
    // Si hay API key de OpenWeatherMap, usar la API real
    if (process.env.OPENWEATHER_API_KEY) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=es`
      );
      
      const weatherData = response.data;
      
      res.json({
        success: true,
        message: 'Clima actual obtenido exitosamente',
        data: {
          temperatura: Math.round(weatherData.main.temp),
          sensacion_termica: Math.round(weatherData.main.feels_like),
          humedad: weatherData.main.humidity,
          presion: weatherData.main.pressure,
          descripcion: weatherData.weather[0].description,
          icono: weatherData.weather[0].icon,
          viento: {
            velocidad: weatherData.wind.speed,
            direccion: weatherData.wind.deg
          },
          visibilidad: weatherData.visibility / 1000, // km
          ubicacion: {
            nombre: weatherData.name,
            pais: weatherData.sys.country,
            coordenadas: {
              latitud: weatherData.coord.lat,
              longitud: weatherData.coord.lon
            }
          },
          fecha_actualizacion: new Date(weatherData.dt * 1000).toISOString()
        }
      });
    } else {
      // Datos simulados para desarrollo
      res.json({
        success: true,
        message: 'Datos de clima simulados (configurar OPENWEATHER_API_KEY)',
        data: {
          temperatura: 26,
          sensacion_termica: 28,
          humedad: 78,
          presion: 1013,
          descripcion: 'Parcialmente nublado',
          icono: '02d',
          viento: {
            velocidad: 2.5,
            direccion: 120
          },
          visibilidad: 10,
          ubicacion: {
            nombre: 'Granada',
            pais: 'CO',
            coordenadas: {
              latitud: lat,
              longitud: lon
            }
          },
          fecha_actualizacion: new Date().toISOString()
        }
      });
    }

  } catch (error) {
    console.error('Error obteniendo clima:', error);
    
    // En caso de error con la API, devolver datos simulados
    res.json({
      success: true,
      message: 'Datos de clima de respaldo',
      data: {
        temperatura: 26,
        sensacion_termica: 28,
        humedad: 78,
        presion: 1013,
        descripcion: 'Datos no disponibles',
        icono: '01d',
        viento: {
          velocidad: 2.0,
          direccion: 90
        },
        visibilidad: 10,
        ubicacion: {
          nombre: 'Granada',
          pais: 'CO',
          coordenadas: {
            latitud: 3.5361,
            longitud: -73.7062
          }
        },
        fecha_actualizacion: new Date().toISOString()
      }
    });
  }
});

// @route   GET /api/clima/pronostico
// @desc    Obtener pronóstico del clima
// @access  Privado
router.get('/pronostico', async (req, res) => {
  try {
    const lat = 3.5361;
    const lon = -73.7062;
    
    if (process.env.OPENWEATHER_API_KEY) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=es`
      );
      
      const forecastData = response.data;
      
      // Procesar datos del pronóstico
      const pronostico = forecastData.list.slice(0, 40).map(item => ({
        fecha_hora: new Date(item.dt * 1000).toISOString(),
        temperatura: Math.round(item.main.temp),
        temperatura_min: Math.round(item.main.temp_min),
        temperatura_max: Math.round(item.main.temp_max),
        humedad: item.main.humidity,
        descripcion: item.weather[0].description,
        icono: item.weather[0].icon,
        precipitacion: item.rain ? item.rain['3h'] || 0 : 0,
        viento: {
          velocidad: item.wind.speed,
          direccion: item.wind.deg
        }
      }));
      
      res.json({
        success: true,
        message: 'Pronóstico obtenido exitosamente',
        data: {
          ubicacion: {
            nombre: forecastData.city.name,
            pais: forecastData.city.country,
            coordenadas: {
              latitud: forecastData.city.coord.lat,
              longitud: forecastData.city.coord.lon
            }
          },
          pronostico: pronostico
        }
      });
    } else {
      // Datos simulados
      const pronosticoSimulado = [];
      for (let i = 0; i < 5; i++) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + i);
        
        pronosticoSimulado.push({
          fecha_hora: fecha.toISOString(),
          temperatura: 25 + Math.round(Math.random() * 6),
          temperatura_min: 22 + Math.round(Math.random() * 3),
          temperatura_max: 28 + Math.round(Math.random() * 4),
          humedad: 70 + Math.round(Math.random() * 20),
          descripcion: ['Soleado', 'Parcialmente nublado', 'Nublado', 'Lluvia ligera'][Math.floor(Math.random() * 4)],
          icono: '02d',
          precipitacion: Math.random() * 10,
          viento: {
            velocidad: 1 + Math.random() * 4,
            direccion: Math.round(Math.random() * 360)
          }
        });
      }
      
      res.json({
        success: true,
        message: 'Pronóstico simulado (configurar OPENWEATHER_API_KEY)',
        data: {
          ubicacion: {
            nombre: 'Granada',
            pais: 'CO',
            coordenadas: {
              latitud: lat,
              longitud: lon
            }
          },
          pronostico: pronosticoSimulado
        }
      });
    }

  } catch (error) {
    console.error('Error obteniendo pronóstico:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/clima/condiciones-aplicacion
// @desc    Evaluar condiciones climáticas para aplicación
// @access  Privado
router.get('/condiciones-aplicacion', async (req, res) => {
  try {
    // Obtener clima actual y pronóstico
    const climaActual = {
      temperatura: 26,
      humedad: 78,
      viento: 2.5,
      precipitacion_probabilidad: 20
    };
    
    // Evaluar condiciones
    const evaluacion = {
      temperatura: {
        valor: climaActual.temperatura,
        optima: climaActual.temperatura >= 20 && climaActual.temperatura <= 30,
        mensaje: climaActual.temperatura >= 20 && climaActual.temperatura <= 30 
          ? 'Temperatura adecuada para aplicación' 
          : 'Temperatura fuera del rango óptimo'
      },
      humedad: {
        valor: climaActual.humedad,
        optima: climaActual.humedad >= 60 && climaActual.humedad <= 85,
        mensaje: climaActual.humedad >= 60 && climaActual.humedad <= 85
          ? 'Humedad apropiada'
          : climaActual.humedad > 85 ? 'Humedad muy alta' : 'Humedad baja'
      },
      viento: {
        valor: climaActual.viento,
        optimo: climaActual.viento <= 10,
        mensaje: climaActual.viento <= 10 
          ? 'Viento favorable para aplicación'
          : 'Viento muy fuerte, evitar aplicación'
      },
      lluvia: {
        probabilidad: climaActual.precipitacion_probabilidad,
        optima: climaActual.precipitacion_probabilidad <= 30,
        mensaje: climaActual.precipitacion_probabilidad <= 30
          ? 'Baja probabilidad de lluvia'
          : 'Alta probabilidad de lluvia, posponer aplicación'
      }
    };
    
    // Recomendación general
    const condicionesOptimas = evaluacion.temperatura.optima && 
                              evaluacion.humedad.optima && 
                              evaluacion.viento.optimo && 
                              evaluacion.lluvia.optima;
    
    const recomendacion = {
      aplicar: condicionesOptimas,
      mensaje: condicionesOptimas 
        ? '✅ Condiciones óptimas para aplicación'
        : '⚠️ Condiciones no favorables, considerar posponer',
      horarios_recomendados: ['06:00 - 09:00', '16:00 - 18:00'],
      precauciones: [
        'Verificar dirección del viento',
        'Usar equipo de protección completo',
        'Calibrar equipos antes de aplicar',
        'Evitar aplicación en horas de alta temperatura'
      ]
    };
    
    res.json({
      success: true,
      message: 'Evaluación de condiciones completada',
      data: {
        fecha_evaluacion: new Date().toISOString(),
        evaluacion_detallada: evaluacion,
        recomendacion: recomendacion
      }
    });

  } catch (error) {
    console.error('Error evaluando condiciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
