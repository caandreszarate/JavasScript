import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useSimpleNotifications } from '../../components/UI/SimpleNotifications';
import axios from 'axios';

const LoteFormulario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showNotification: appShowNotification } = useApp();
  const { showNotification: simpleShowNotification } = useSimpleNotifications();
  
  // Función de notificación con fallback
  const showNotification = (message, type) => {
    try {
      if (appShowNotification && typeof appShowNotification === 'function') {
        return appShowNotification(message, type);
      }
    } catch (error) {
      console.error('Error con appShowNotification:', error);
    }
    
    // Fallback a sistema simple
    try {
      return simpleShowNotification(message, type);
    } catch (error) {
      console.error('Error con simpleShowNotification:', error);
      // Fallback final - alert
      const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
      alert(`${emoji} ${message}`);
    }
  };
  const [loading, setLoading] = useState(false);
  const [lote, setLote] = useState({
    nombre: '',
    ubicacion: {
      coordenadas: {
        latitud: 3.1569, // Granada, Meta por defecto
        longitud: -73.7069
      },
      direccion: '',
      vereda: '',
      municipio: 'Granada',
      departamento: 'Meta',
      pais: 'Colombia',
      altitud: ''
    },
    area: '',
    fecha_siembra: '',
    variedad_cacao: '',
    numero_plantas: '',
    sistema_siembra: 'agroforestal',
    especies_sombra: [],
    observaciones: ''
  });

  const [nuevaEspecieSombra, setNuevaEspecieSombra] = useState({
    nombre: '',
    cantidad: ''
  });

  const variedadesCacao = [
    'Trinitario',
    'Forastero', 
    'Criollo',
    'CCN-51',
    'TSH-565',
    'ICS-1',
    'ICS-6',
    'TCS-01',
    'TCS-13',
    'Otra'
  ];

  const sistemasSiembra = [
    { value: 'monocultivo', label: 'Monocultivo' },
    { value: 'agroforestal', label: 'Agroforestal' },
    { value: 'asociado', label: 'Asociado' }
  ];

  useEffect(() => {
    if (id && id !== 'nuevo') {
      cargarLote();
    }
  }, [id]);

  const cargarLote = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/lotes/${id}`);
      if (response.data.success) {
        setLote(response.data.data);
      }
    } catch (error) {
      showNotification('Error al cargar el lote', 'error');
      navigate('/lotes');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const keys = name.split('.');
      setLote(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: keys[2] ? {
            ...prev[keys[0]][keys[1]],
            [keys[2]]: value
          } : value
        }
      }));
    } else {
      setLote(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const agregarEspecieSombra = () => {
    if (nuevaEspecieSombra.nombre && nuevaEspecieSombra.cantidad) {
      setLote(prev => ({
        ...prev,
        especies_sombra: [
          ...prev.especies_sombra,
          {
            nombre: nuevaEspecieSombra.nombre,
            cantidad: parseInt(nuevaEspecieSombra.cantidad)
          }
        ]
      }));
      setNuevaEspecieSombra({ nombre: '', cantidad: '' });
    }
  };

  const eliminarEspecieSombra = (index) => {
    setLote(prev => ({
      ...prev,
      especies_sombra: prev.especies_sombra.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loteData = {
        ...lote,
        area: parseFloat(lote.area),
        numero_plantas: parseInt(lote.numero_plantas),
        ubicacion: {
          ...lote.ubicacion,
          coordenadas: {
            latitud: parseFloat(lote.ubicacion.coordenadas.latitud),
            longitud: parseFloat(lote.ubicacion.coordenadas.longitud)
          },
          altitud: lote.ubicacion.altitud ? parseInt(lote.ubicacion.altitud) : undefined
        }
      };

      let response;
      if (id && id !== 'nuevo') {
        response = await axios.put(`/api/lotes/${id}`, loteData);
        showNotification('Lote actualizado exitosamente', 'success');
      } else {
        response = await axios.post('/api/lotes', loteData);
        showNotification('Lote creado exitosamente', 'success');
      }

      if (response.data.success) {
        navigate('/lotes');
      }
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al guardar el lote';
      showNotification(mensaje, 'error');
      
      if (error.response?.data?.errores) {
        error.response.data.errores.forEach(err => {
          showNotification(err, 'error');
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const obtenerUbicacionActual = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLote(prev => ({
            ...prev,
            ubicacion: {
              ...prev.ubicacion,
              coordenadas: {
                latitud: position.coords.latitude,
                longitud: position.coords.longitude
              }
            }
          }));
          showNotification('Ubicación obtenida exitosamente', 'success');
        },
        (error) => {
          showNotification('Error al obtener la ubicación', 'error');
        }
      );
    } else {
      showNotification('Geolocalización no soportada', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {id && id !== 'nuevo' ? 'Editar Lote' : 'Nuevo Lote'}
              </h1>
              <p className="text-gray-600 mt-2">
                Complete la información del lote de cacao
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/lotes')}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información Básica */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">
                  📋 Información Básica
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">
                    Nombre del Lote *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={lote.nombre}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Ej: Lote Norte, Parcela 1..."
                  />
                </div>

                <div>
                  <label className="form-label">
                    Área (hectáreas) *
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={lote.area}
                    onChange={handleChange}
                    className="form-input"
                    step="0.01"
                    min="0.01"
                    required
                    placeholder="Ej: 2.5"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Fecha de Siembra *
                  </label>
                  <input
                    type="date"
                    name="fecha_siembra"
                    value={lote.fecha_siembra ? lote.fecha_siembra.split('T')[0] : ''}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">
                    Variedad de Cacao *
                  </label>
                  <select
                    name="variedad_cacao"
                    value={lote.variedad_cacao}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Seleccionar variedad</option>
                    {variedadesCacao.map(variedad => (
                      <option key={variedad} value={variedad}>
                        {variedad}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">
                    Número de Plantas *
                  </label>
                  <input
                    type="number"
                    name="numero_plantas"
                    value={lote.numero_plantas}
                    onChange={handleChange}
                    className="form-input"
                    min="1"
                    required
                    placeholder="Ej: 1000"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Sistema de Siembra
                  </label>
                  <select
                    name="sistema_siembra"
                    value={lote.sistema_siembra}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {sistemasSiembra.map(sistema => (
                      <option key={sistema.value} value={sistema.value}>
                        {sistema.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Ubicación y GPS */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">
                  🗺️ Ubicación y GPS
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">
                    Latitud *
                  </label>
                  <input
                    type="number"
                    name="ubicacion.coordenadas.latitud"
                    value={lote.ubicacion.coordenadas.latitud}
                    onChange={handleChange}
                    className="form-input"
                    step="any"
                    required
                    placeholder="Ej: 3.1569"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Longitud *
                  </label>
                  <input
                    type="number"
                    name="ubicacion.coordenadas.longitud"
                    value={lote.ubicacion.coordenadas.longitud}
                    onChange={handleChange}
                    className="form-input"
                    step="any"
                    required
                    placeholder="Ej: -73.7069"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={obtenerUbicacionActual}
                    className="btn-outline"
                  >
                    📍 Obtener Ubicación Actual
                  </button>
                </div>

                <div>
                  <label className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="ubicacion.direccion"
                    value={lote.ubicacion.direccion}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Dirección específica"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Vereda
                  </label>
                  <input
                    type="text"
                    name="ubicacion.vereda"
                    value={lote.ubicacion.vereda}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Nombre de la vereda"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Municipio
                  </label>
                  <input
                    type="text"
                    name="ubicacion.municipio"
                    value={lote.ubicacion.municipio}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Altitud (msnm)
                  </label>
                  <input
                    type="number"
                    name="ubicacion.altitud"
                    value={lote.ubicacion.altitud}
                    onChange={handleChange}
                    className="form-input"
                    min="0"
                    placeholder="Ej: 350"
                  />
                </div>
              </div>
            </div>

            {/* Especies de Sombra */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">
                  🌳 Especies de Sombra
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="form-label">
                      Nombre de la Especie
                    </label>
                    <input
                      type="text"
                      value={nuevaEspecieSombra.nombre}
                      onChange={(e) => setNuevaEspecieSombra(prev => ({
                        ...prev,
                        nombre: e.target.value
                      }))}
                      className="form-input"
                      placeholder="Ej: Guamo, Nogal..."
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      value={nuevaEspecieSombra.cantidad}
                      onChange={(e) => setNuevaEspecieSombra(prev => ({
                        ...prev,
                        cantidad: e.target.value
                      }))}
                      className="form-input"
                      min="1"
                      placeholder="Número de árboles"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={agregarEspecieSombra}
                      className="btn-primary w-full"
                    >
                      Agregar
                    </button>
                  </div>
                </div>

                {lote.especies_sombra.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Especies Registradas:
                    </h4>
                    <div className="space-y-2">
                      {lote.especies_sombra.map((especie, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span>
                            <strong>{especie.nombre}</strong> - {especie.cantidad} árboles
                          </span>
                          <button
                            type="button"
                            onClick={() => eliminarEspecieSombra(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ❌ Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Observaciones */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">
                  📝 Observaciones
                </h2>
              </div>

              <div>
                <label className="form-label">
                  Observaciones Adicionales
                </label>
                <textarea
                  name="observaciones"
                  value={lote.observaciones}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="4"
                  placeholder="Información adicional sobre el lote..."
                />
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/lotes')}
                className="btn-secondary"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner inline-block w-4 h-4 mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  id && id !== 'nuevo' ? 'Actualizar Lote' : 'Crear Lote'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoteFormulario;
