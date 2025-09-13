import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

const SeguimientoFenologico = ({ lote, onUpdate }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoSeguimiento, setNuevoSeguimiento] = useState({
    fecha: new Date().toISOString().split('T')[0],
    etapa_fenologica: '',
    porcentaje_etapa: '',
    numero_flores: '',
    numero_frutos_pequenos: '',
    numero_frutos_medianos: '',
    numero_frutos_maduros: '',
    observaciones: ''
  });
  const [loading, setLoading] = useState(false);
  const { showNotification } = useApp();

  const etapasFenologicas = [
    { 
      value: 'brotacion', 
      label: '🌱 Brotación', 
      descripcion: 'Aparición de nuevos brotes y hojas jóvenes',
      color: 'bg-green-100 text-green-800'
    },
    { 
      value: 'floracion', 
      label: '🌸 Floración', 
      descripcion: 'Desarrollo y apertura de flores',
      color: 'bg-pink-100 text-pink-800'
    },
    { 
      value: 'cuajado_frutos', 
      label: '🌰 Cuajado de Frutos', 
      descripcion: 'Formación inicial de frutos pequeños',
      color: 'bg-yellow-100 text-yellow-800'
    },
    { 
      value: 'desarrollo_frutos', 
      label: '🥭 Desarrollo de Frutos', 
      descripcion: 'Crecimiento y desarrollo de frutos',
      color: 'bg-orange-100 text-orange-800'
    },
    { 
      value: 'maduracion', 
      label: '🍎 Maduración', 
      descripcion: 'Frutos alcanzando la madurez',
      color: 'bg-red-100 text-red-800'
    },
    { 
      value: 'cosecha', 
      label: '🌾 Cosecha', 
      descripcion: 'Recolección de frutos maduros',
      color: 'bg-purple-100 text-purple-800'
    },
    { 
      value: 'poda', 
      label: '✂️ Poda', 
      descripcion: 'Actividades de poda y mantenimiento',
      color: 'bg-blue-100 text-blue-800'
    },
    { 
      value: 'fertilizacion', 
      label: '🌿 Fertilización', 
      descripcion: 'Aplicación de fertilizantes',
      color: 'bg-teal-100 text-teal-800'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const seguimiento = {
        ...nuevoSeguimiento,
        porcentaje_etapa: nuevoSeguimiento.porcentaje_etapa ? parseFloat(nuevoSeguimiento.porcentaje_etapa) : undefined,
        numero_flores: nuevoSeguimiento.numero_flores ? parseInt(nuevoSeguimiento.numero_flores) : undefined,
        numero_frutos_pequenos: nuevoSeguimiento.numero_frutos_pequenos ? parseInt(nuevoSeguimiento.numero_frutos_pequenos) : undefined,
        numero_frutos_medianos: nuevoSeguimiento.numero_frutos_medianos ? parseInt(nuevoSeguimiento.numero_frutos_medianos) : undefined,
        numero_frutos_maduros: nuevoSeguimiento.numero_frutos_maduros ? parseInt(nuevoSeguimiento.numero_frutos_maduros) : undefined
      };

      const response = await axios.post(`/api/lotes/${lote._id}/seguimiento`, seguimiento);
      
      if (response.data.success) {
        showNotification('Seguimiento fenológico agregado exitosamente', 'success');
        setMostrarFormulario(false);
        setNuevoSeguimiento({
          fecha: new Date().toISOString().split('T')[0],
          etapa_fenologica: '',
          porcentaje_etapa: '',
          numero_flores: '',
          numero_frutos_pequenos: '',
          numero_frutos_medianos: '',
          numero_frutos_maduros: '',
          observaciones: ''
        });
        onUpdate();
      }
    } catch (error) {
      showNotification('Error al agregar seguimiento fenológico', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const obtenerEtapaInfo = (etapa) => {
    return etapasFenologicas.find(e => e.value === etapa) || 
           { label: etapa, descripcion: '', color: 'bg-gray-100 text-gray-800' };
  };

  const calcularResumenEtapas = () => {
    if (!lote.seguimiento_fenologico || lote.seguimiento_fenologico.length === 0) {
      return {};
    }

    const resumen = {};
    lote.seguimiento_fenologico.forEach(seguimiento => {
      const etapa = seguimiento.etapa_fenologica;
      if (!resumen[etapa]) {
        resumen[etapa] = {
          count: 0,
          ultimaFecha: seguimiento.fecha
        };
      }
      resumen[etapa].count++;
      if (new Date(seguimiento.fecha) > new Date(resumen[etapa].ultimaFecha)) {
        resumen[etapa].ultimaFecha = seguimiento.fecha;
      }
    });

    return resumen;
  };

  const resumenEtapas = calcularResumenEtapas();

  const obtenerUltimaEtapa = () => {
    if (!lote.seguimiento_fenologico || lote.seguimiento_fenologico.length === 0) {
      return null;
    }

    const seguimientos = [...lote.seguimiento_fenologico].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
    
    return seguimientos[0];
  };

  const ultimaEtapa = obtenerUltimaEtapa();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          🌱 Seguimiento Fenológico
        </h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="btn-primary"
        >
          ➕ Nuevo Seguimiento
        </button>
      </div>

      {/* Estado Actual */}
      {ultimaEtapa && (
        <div className="card bg-gradient-to-r from-cacao-50 to-verde-50 border-cacao-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Estado Actual del Lote
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Última Etapa Registrada:</h4>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${obtenerEtapaInfo(ultimaEtapa.etapa_fenologica).color}`}>
                  {obtenerEtapaInfo(ultimaEtapa.etapa_fenologica).label}
                </span>
                <span className="text-gray-600">
                  {formatearFecha(ultimaEtapa.fecha)}
                </span>
              </div>
              {ultimaEtapa.porcentaje_etapa && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Porcentaje de la etapa:</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                    <div
                      className="bg-cacao-500 h-3 rounded-full flex items-center justify-center"
                      style={{ width: `${ultimaEtapa.porcentaje_etapa}%` }}
                    >
                      <span className="text-white text-xs font-medium">
                        {ultimaEtapa.porcentaje_etapa}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Conteo de Frutos:</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {ultimaEtapa.numero_flores > 0 && (
                  <div className="flex justify-between">
                    <span>🌸 Flores:</span>
                    <span className="font-semibold">{ultimaEtapa.numero_flores}</span>
                  </div>
                )}
                {ultimaEtapa.numero_frutos_pequenos > 0 && (
                  <div className="flex justify-between">
                    <span>🌰 Frutos pequeños:</span>
                    <span className="font-semibold">{ultimaEtapa.numero_frutos_pequenos}</span>
                  </div>
                )}
                {ultimaEtapa.numero_frutos_medianos > 0 && (
                  <div className="flex justify-between">
                    <span>🥭 Frutos medianos:</span>
                    <span className="font-semibold">{ultimaEtapa.numero_frutos_medianos}</span>
                  </div>
                )}
                {ultimaEtapa.numero_frutos_maduros > 0 && (
                  <div className="flex justify-between">
                    <span>🍎 Frutos maduros:</span>
                    <span className="font-semibold">{ultimaEtapa.numero_frutos_maduros}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario para nuevo seguimiento */}
      {mostrarFormulario && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📝 Nuevo Seguimiento Fenológico
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Fecha de Observación *</label>
                <input
                  type="date"
                  value={nuevoSeguimiento.fecha}
                  onChange={(e) => setNuevoSeguimiento(prev => ({
                    ...prev,
                    fecha: e.target.value
                  }))}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">Etapa Fenológica *</label>
                <select
                  value={nuevoSeguimiento.etapa_fenologica}
                  onChange={(e) => setNuevoSeguimiento(prev => ({
                    ...prev,
                    etapa_fenologica: e.target.value
                  }))}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar etapa</option>
                  {etapasFenologicas.map(etapa => (
                    <option key={etapa.value} value={etapa.value}>
                      {etapa.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Porcentaje de la Etapa (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  value={nuevoSeguimiento.porcentaje_etapa}
                  onChange={(e) => setNuevoSeguimiento(prev => ({
                    ...prev,
                    porcentaje_etapa: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Ej: 75"
                />
              </div>

              <div>
                <label className="form-label">Número de Flores</label>
                <input
                  type="number"
                  min="0"
                  value={nuevoSeguimiento.numero_flores}
                  onChange={(e) => setNuevoSeguimiento(prev => ({
                    ...prev,
                    numero_flores: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Conteo aproximado"
                />
              </div>

              <div>
                <label className="form-label">Frutos Pequeños</label>
                <input
                  type="number"
                  min="0"
                  value={nuevoSeguimiento.numero_frutos_pequenos}
                  onChange={(e) => setNuevoSeguimiento(prev => ({
                    ...prev,
                    numero_frutos_pequenos: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Frutos en desarrollo inicial"
                />
              </div>

              <div>
                <label className="form-label">Frutos Medianos</label>
                <input
                  type="number"
                  min="0"
                  value={nuevoSeguimiento.numero_frutos_medianos}
                  onChange={(e) => setNuevoSeguimiento(prev => ({
                    ...prev,
                    numero_frutos_medianos: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Frutos en desarrollo medio"
                />
              </div>

              <div>
                <label className="form-label">Frutos Maduros</label>
                <input
                  type="number"
                  min="0"
                  value={nuevoSeguimiento.numero_frutos_maduros}
                  onChange={(e) => setNuevoSeguimiento(prev => ({
                    ...prev,
                    numero_frutos_maduros: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Frutos listos para cosecha"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Observaciones</label>
              <textarea
                value={nuevoSeguimiento.observaciones}
                onChange={(e) => setNuevoSeguimiento(prev => ({
                  ...prev,
                  observaciones: e.target.value
                }))}
                className="form-textarea"
                rows="3"
                placeholder="Observaciones adicionales sobre el estado del cultivo..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setMostrarFormulario(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Guardando...' : 'Guardar Seguimiento'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resumen por Etapas */}
      {Object.keys(resumenEtapas).length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📈 Resumen por Etapas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(resumenEtapas).map(([etapa, datos]) => {
              const etapaInfo = obtenerEtapaInfo(etapa);
              return (
                <div key={etapa} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${etapaInfo.color}`}>
                      {etapaInfo.label}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {datos.count} registros
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Último: {formatearFecha(datos.ultimaFecha)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Historial de Seguimientos */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Historial de Seguimientos
        </h3>

        {lote.seguimiento_fenologico && lote.seguimiento_fenologico.length > 0 ? (
          <div className="space-y-4">
            {lote.seguimiento_fenologico
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .map((seguimiento, index) => {
                const etapaInfo = obtenerEtapaInfo(seguimiento.etapa_fenologica);
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${etapaInfo.color}`}>
                          {etapaInfo.label}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {formatearFecha(seguimiento.fecha)}
                        </span>
                      </div>
                      
                      {seguimiento.porcentaje_etapa && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Progreso:</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-cacao-500 h-2 rounded-full"
                              style={{ width: `${seguimiento.porcentaje_etapa}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {seguimiento.porcentaje_etapa}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Conteo de frutos */}
                    {(seguimiento.numero_flores || seguimiento.numero_frutos_pequenos || 
                      seguimiento.numero_frutos_medianos || seguimiento.numero_frutos_maduros) && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                        {seguimiento.numero_flores > 0 && (
                          <div className="flex justify-between bg-pink-50 p-2 rounded">
                            <span>🌸 Flores:</span>
                            <span className="font-semibold">{seguimiento.numero_flores}</span>
                          </div>
                        )}
                        {seguimiento.numero_frutos_pequenos > 0 && (
                          <div className="flex justify-between bg-yellow-50 p-2 rounded">
                            <span>🌰 Pequeños:</span>
                            <span className="font-semibold">{seguimiento.numero_frutos_pequenos}</span>
                          </div>
                        )}
                        {seguimiento.numero_frutos_medianos > 0 && (
                          <div className="flex justify-between bg-orange-50 p-2 rounded">
                            <span>🥭 Medianos:</span>
                            <span className="font-semibold">{seguimiento.numero_frutos_medianos}</span>
                          </div>
                        )}
                        {seguimiento.numero_frutos_maduros > 0 && (
                          <div className="flex justify-between bg-red-50 p-2 rounded">
                            <span>🍎 Maduros:</span>
                            <span className="font-semibold">{seguimiento.numero_frutos_maduros}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {seguimiento.observaciones && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Observaciones:</span> {seguimiento.observaciones}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🌱</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              No hay seguimientos registrados
            </h4>
            <p className="text-gray-600 mb-4">
              Comienza registrando el primer seguimiento fenológico del lote
            </p>
            <button
              onClick={() => setMostrarFormulario(true)}
              className="btn-primary"
            >
              ➕ Primer Seguimiento
            </button>
          </div>
        )}
      </div>

      {/* Guía de Etapas Fenológicas */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-2xl mr-3">📚</span>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">
              Guía de Etapas Fenológicas del Cacao
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
              {etapasFenologicas.map(etapa => (
                <div key={etapa.value} className="flex items-start space-x-2">
                  <span className="font-medium">{etapa.label}:</span>
                  <span>{etapa.descripcion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeguimientoFenologico;
