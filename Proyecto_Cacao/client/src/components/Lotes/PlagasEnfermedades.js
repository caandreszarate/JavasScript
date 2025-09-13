import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

const PlagasEnfermedades = ({ lote, onUpdate }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    fecha_deteccion: new Date().toISOString().split('T')[0],
    tipo: 'plaga',
    nombre: '',
    nombre_cientifico: '',
    severidad: 'media',
    incidencia: '',
    area_afectada: '',
    sintomas: '',
    causas_probables: '',
    tratamiento_aplicado: '',
    productos_utilizados: [],
    observaciones: ''
  });
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    dosis: '',
    fecha_aplicacion: ''
  });
  const [loading, setLoading] = useState(false);
  const { showNotification } = useApp();

  const tiposProblemas = [
    { value: 'plaga', label: '🐛 Plaga', color: 'bg-red-100 text-red-800' },
    { value: 'enfermedad', label: '🦠 Enfermedad', color: 'bg-orange-100 text-orange-800' },
    { value: 'desorden_nutricional', label: '🌿 Desorden Nutricional', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const nivelesSeveridad = [
    { value: 'muy_baja', label: 'Muy Baja', color: 'bg-green-100 text-green-800' },
    { value: 'baja', label: 'Baja', color: 'bg-blue-100 text-blue-800' },
    { value: 'media', label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'alta', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
    { value: 'muy_alta', label: 'Muy Alta', color: 'bg-red-100 text-red-800' }
  ];

  const problemasComunes = {
    plagas: [
      'Monilia (Moniliophthora roreri)',
      'Mazorca Negra (Phytophthora palmivora)',
      'Escoba de Bruja (Moniliophthora perniciosa)',
      'Chinche de Cacao (Monalonion dissimulatum)',
      'Barrenador del Tronco (Xyleborus spp.)',
      'Thrips del Cacao (Selenothrips rubrocinctus)',
      'Ácaros (Oligonychus yothersi)',
      'Hormiga Arriera (Atta spp.)'
    ],
    enfermedades: [
      'Antracnosis (Colletotrichum spp.)',
      'Mal de Machete (Ceratocystis cacaofunesta)',
      'Pudrición Parda (Phytophthora spp.)',
      'Muerte Regresiva (Lasiodiplodia theobromae)',
      'Mancha Parda (Cercospora spp.)',
      'Fumagina (Capnodium spp.)'
    ],
    desordenes: [
      'Deficiencia de Nitrógeno',
      'Deficiencia de Fósforo',
      'Deficiencia de Potasio',
      'Deficiencia de Magnesio',
      'Deficiencia de Zinc',
      'Toxicidad por Aluminio',
      'Estrés Hídrico'
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registro = {
        ...nuevoRegistro,
        incidencia: nuevoRegistro.incidencia ? parseFloat(nuevoRegistro.incidencia) : undefined,
        area_afectada: nuevoRegistro.area_afectada ? parseFloat(nuevoRegistro.area_afectada) : undefined
      };

      const response = await axios.post(`/api/lotes/${lote._id}/plagas`, registro);
      
      if (response.data.success) {
        showNotification('Registro de plaga/enfermedad agregado exitosamente', 'success');
        setMostrarFormulario(false);
        resetFormulario();
        onUpdate();
      }
    } catch (error) {
      showNotification('Error al agregar registro', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetFormulario = () => {
    setNuevoRegistro({
      fecha_deteccion: new Date().toISOString().split('T')[0],
      tipo: 'plaga',
      nombre: '',
      nombre_cientifico: '',
      severidad: 'media',
      incidencia: '',
      area_afectada: '',
      sintomas: '',
      causas_probables: '',
      tratamiento_aplicado: '',
      productos_utilizados: [],
      observaciones: ''
    });
    setNuevoProducto({
      nombre: '',
      dosis: '',
      fecha_aplicacion: ''
    });
  };

  const agregarProducto = () => {
    if (nuevoProducto.nombre && nuevoProducto.dosis) {
      setNuevoRegistro(prev => ({
        ...prev,
        productos_utilizados: [
          ...prev.productos_utilizados,
          {
            ...nuevoProducto,
            fecha_aplicacion: nuevoProducto.fecha_aplicacion || new Date().toISOString().split('T')[0]
          }
        ]
      }));
      setNuevoProducto({ nombre: '', dosis: '', fecha_aplicacion: '' });
    }
  };

  const eliminarProducto = (index) => {
    setNuevoRegistro(prev => ({
      ...prev,
      productos_utilizados: prev.productos_utilizados.filter((_, i) => i !== index)
    }));
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const obtenerTipoInfo = (tipo) => {
    return tiposProblemas.find(t => t.value === tipo) || 
           { label: tipo, color: 'bg-gray-100 text-gray-800' };
  };

  const obtenerSeveridadInfo = (severidad) => {
    return nivelesSeveridad.find(s => s.value === severidad) || 
           { label: severidad, color: 'bg-gray-100 text-gray-800' };
  };

  const calcularEstadisticas = () => {
    if (!lote.plagas_enfermedades || lote.plagas_enfermedades.length === 0) {
      return {
        total: 0,
        activas: 0,
        controladas: 0,
        porTipo: {},
        porSeveridad: {}
      };
    }

    const datos = lote.plagas_enfermedades;
    const activas = datos.filter(p => !p.fecha_control).length;
    const controladas = datos.filter(p => p.fecha_control).length;

    const porTipo = {};
    const porSeveridad = {};

    datos.forEach(item => {
      porTipo[item.tipo] = (porTipo[item.tipo] || 0) + 1;
      porSeveridad[item.severidad] = (porSeveridad[item.severidad] || 0) + 1;
    });

    return {
      total: datos.length,
      activas,
      controladas,
      porTipo,
      porSeveridad
    };
  };

  const estadisticas = calcularEstadisticas();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          🐛 Plagas y Enfermedades
        </h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="btn-primary"
        >
          ➕ Nuevo Registro
        </button>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{estadisticas.total}</p>
            <p className="text-sm text-gray-600">Total Registros</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{estadisticas.activas}</p>
            <p className="text-sm text-gray-600">Problemas Activos</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{estadisticas.controladas}</p>
            <p className="text-sm text-gray-600">Controlados</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {estadisticas.total > 0 ? ((estadisticas.controladas / estadisticas.total) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-sm text-gray-600">Eficacia Control</p>
          </div>
        </div>
      </div>

      {/* Formulario para nuevo registro */}
      {mostrarFormulario && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📝 Nuevo Registro de Plaga/Enfermedad
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Fecha de Detección *</label>
                <input
                  type="date"
                  value={nuevoRegistro.fecha_deteccion}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    fecha_deteccion: e.target.value
                  }))}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">Tipo de Problema *</label>
                <select
                  value={nuevoRegistro.tipo}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    tipo: e.target.value,
                    nombre: '' // Reset nombre cuando cambia tipo
                  }))}
                  className="form-select"
                  required
                >
                  {tiposProblemas.map(tipo => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Nombre del Problema *</label>
                <select
                  value={nuevoRegistro.nombre}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    nombre: e.target.value
                  }))}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar problema</option>
                  {(nuevoRegistro.tipo === 'plaga' ? problemasComunes.plagas :
                    nuevoRegistro.tipo === 'enfermedad' ? problemasComunes.enfermedades :
                    problemasComunes.desordenes).map(problema => (
                    <option key={problema} value={problema}>
                      {problema}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Nombre Científico</label>
                <input
                  type="text"
                  value={nuevoRegistro.nombre_cientifico}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    nombre_cientifico: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Ej: Moniliophthora roreri"
                />
              </div>

              <div>
                <label className="form-label">Severidad *</label>
                <select
                  value={nuevoRegistro.severidad}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    severidad: e.target.value
                  }))}
                  className="form-select"
                  required
                >
                  {nivelesSeveridad.map(nivel => (
                    <option key={nivel.value} value={nivel.value}>
                      {nivel.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Incidencia (% plantas afectadas)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={nuevoRegistro.incidencia}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    incidencia: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Ej: 15.5"
                />
              </div>

              <div>
                <label className="form-label">Área Afectada (% del lote)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={nuevoRegistro.area_afectada}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    area_afectada: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Ej: 25.0"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Síntomas Observados</label>
              <textarea
                value={nuevoRegistro.sintomas}
                onChange={(e) => setNuevoRegistro(prev => ({
                  ...prev,
                  sintomas: e.target.value
                }))}
                className="form-textarea"
                rows="3"
                placeholder="Describe los síntomas observados en las plantas..."
              />
            </div>

            <div>
              <label className="form-label">Causas Probables</label>
              <textarea
                value={nuevoRegistro.causas_probables}
                onChange={(e) => setNuevoRegistro(prev => ({
                  ...prev,
                  causas_probables: e.target.value
                }))}
                className="form-textarea"
                rows="2"
                placeholder="Factores que pueden haber causado el problema..."
              />
            </div>

            <div>
              <label className="form-label">Tratamiento Aplicado</label>
              <textarea
                value={nuevoRegistro.tratamiento_aplicado}
                onChange={(e) => setNuevoRegistro(prev => ({
                  ...prev,
                  tratamiento_aplicado: e.target.value
                }))}
                className="form-textarea"
                rows="3"
                placeholder="Describe el tratamiento aplicado o medidas tomadas..."
              />
            </div>

            {/* Productos Utilizados */}
            <div>
              <label className="form-label">Productos Utilizados</label>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto(prev => ({
                      ...prev,
                      nombre: e.target.value
                    }))}
                    className="form-input"
                    placeholder="Nombre del producto"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={nuevoProducto.dosis}
                    onChange={(e) => setNuevoProducto(prev => ({
                      ...prev,
                      dosis: e.target.value
                    }))}
                    className="form-input"
                    placeholder="Dosis aplicada"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={nuevoProducto.fecha_aplicacion}
                    onChange={(e) => setNuevoProducto(prev => ({
                      ...prev,
                      fecha_aplicacion: e.target.value
                    }))}
                    className="form-input"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={agregarProducto}
                    className="btn-outline w-full"
                  >
                    ➕ Agregar
                  </button>
                </div>
              </div>

              {nuevoRegistro.productos_utilizados.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Productos Agregados:</h4>
                  {nuevoRegistro.productos_utilizados.map((producto, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="font-medium">{producto.nombre}</span>
                        <span className="text-gray-600 ml-2">- {producto.dosis}</span>
                        {producto.fecha_aplicacion && (
                          <span className="text-gray-500 ml-2">
                            ({formatearFecha(producto.fecha_aplicacion)})
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => eliminarProducto(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="form-label">Observaciones Adicionales</label>
              <textarea
                value={nuevoRegistro.observaciones}
                onChange={(e) => setNuevoRegistro(prev => ({
                  ...prev,
                  observaciones: e.target.value
                }))}
                className="form-textarea"
                rows="3"
                placeholder="Información adicional relevante..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setMostrarFormulario(false);
                  resetFormulario();
                }}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Guardando...' : 'Guardar Registro'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Historial de Registros */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Historial de Plagas y Enfermedades
        </h3>

        {lote.plagas_enfermedades && lote.plagas_enfermedades.length > 0 ? (
          <div className="space-y-4">
            {lote.plagas_enfermedades
              .sort((a, b) => new Date(b.fecha_deteccion) - new Date(a.fecha_deteccion))
              .map((registro, index) => {
                const tipoInfo = obtenerTipoInfo(registro.tipo);
                const severidadInfo = obtenerSeveridadInfo(registro.severidad);
                const esActivo = !registro.fecha_control;
                
                return (
                  <div key={index} className={`border rounded-lg p-4 ${esActivo ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${tipoInfo.color}`}>
                          {tipoInfo.label}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${severidadInfo.color}`}>
                          {severidadInfo.label}
                        </span>
                        {esActivo && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            🚨 ACTIVO
                          </span>
                        )}
                      </div>
                      
                      <span className="text-gray-600 text-sm">
                        Detectado: {formatearFecha(registro.fecha_deteccion)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{registro.nombre}</h4>
                        {registro.nombre_cientifico && (
                          <p className="text-sm italic text-gray-600">{registro.nombre_cientifico}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {registro.incidencia && (
                          <div>
                            <span className="text-gray-600">Incidencia:</span>
                            <span className="font-semibold ml-1">{registro.incidencia}%</span>
                          </div>
                        )}
                        {registro.area_afectada && (
                          <div>
                            <span className="text-gray-600">Área afectada:</span>
                            <span className="font-semibold ml-1">{registro.area_afectada}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {registro.sintomas && (
                      <div className="mb-3">
                        <p className="text-sm">
                          <span className="font-medium text-gray-900">Síntomas:</span> {registro.sintomas}
                        </p>
                      </div>
                    )}

                    {registro.tratamiento_aplicado && (
                      <div className="mb-3">
                        <p className="text-sm">
                          <span className="font-medium text-gray-900">Tratamiento:</span> {registro.tratamiento_aplicado}
                        </p>
                      </div>
                    )}

                    {registro.productos_utilizados && registro.productos_utilizados.length > 0 && (
                      <div className="mb-3">
                        <p className="font-medium text-gray-900 text-sm mb-2">Productos utilizados:</p>
                        <div className="space-y-1">
                          {registro.productos_utilizados.map((producto, pIndex) => (
                            <div key={pIndex} className="text-sm bg-white p-2 rounded border">
                              <span className="font-medium">{producto.nombre}</span>
                              <span className="text-gray-600 ml-2">- {producto.dosis}</span>
                              {producto.fecha_aplicacion && (
                                <span className="text-gray-500 ml-2">
                                  ({formatearFecha(producto.fecha_aplicacion)})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {registro.fecha_control && (
                      <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                        <p className="text-sm text-green-800">
                          <span className="font-medium">✅ Controlado:</span> {formatearFecha(registro.fecha_control)}
                        </p>
                        {registro.efectividad_control && (
                          <p className="text-sm text-green-700">
                            <span className="font-medium">Efectividad:</span> {registro.efectividad_control}
                          </p>
                        )}
                      </div>
                    )}

                    {registro.observaciones && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Observaciones:</span> {registro.observaciones}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🐛</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              No hay registros de plagas o enfermedades
            </h4>
            <p className="text-gray-600 mb-4">
              Mantén un registro de los problemas fitosanitarios para un mejor control
            </p>
            <button
              onClick={() => setMostrarFormulario(true)}
              className="btn-primary"
            >
              ➕ Primer Registro
            </button>
          </div>
        )}
      </div>

      {/* Información y Consejos */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-2xl mr-3">💡</span>
          <div>
            <h4 className="font-semibold text-yellow-900 mb-2">
              Consejos para el Manejo Integrado de Plagas (MIP)
            </h4>
            <ul className="text-yellow-800 space-y-1 text-sm">
              <li>• Realiza inspecciones semanales para detección temprana</li>
              <li>• Mantén registros detallados de incidencia y tratamientos</li>
              <li>• Combina métodos biológicos, culturales y químicos</li>
              <li>• Rota productos químicos para evitar resistencia</li>
              <li>• Fomenta la biodiversidad para control biológico natural</li>
              <li>• Capacítate en identificación de plagas y enfermedades</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlagasEnfermedades;
