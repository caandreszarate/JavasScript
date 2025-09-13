import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import axios from 'axios';
import MapaLote from '../../components/Lotes/MapaLote';
import GraficosProductividad from '../../components/Lotes/GraficosProductividad';
import SeguimientoFenologico from '../../components/Lotes/SeguimientoFenologico';
import PlagasEnfermedades from '../../components/Lotes/PlagasEnfermedades';
import AplicacionesQuimicas from '../../components/Lotes/AplicacionesQuimicas';
import GastosLote from '../../components/Lotes/GastosLote';

const LoteDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useApp();
  const [lote, setLote] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: '📋 General', icon: '📋' },
    { id: 'mapa', label: '🗺️ Mapa GPS', icon: '🗺️' },
    { id: 'seguimiento', label: '🌱 Seguimiento', icon: '🌱' },
    { id: 'plagas', label: '🐛 Plagas', icon: '🐛' },
    { id: 'productividad', label: '📈 Productividad', icon: '📈' },
    { id: 'aplicaciones', label: '🧪 Aplicaciones', icon: '🧪' },
    { id: 'gastos', label: '💰 Gastos', icon: '💰' }
  ];

  useEffect(() => {
    if (id) {
      cargarLote();
      cargarEstadisticas();
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

  const cargarEstadisticas = async () => {
    try {
      const response = await axios.get(`/api/lotes/${id}/estadisticas`);
      if (response.data.success) {
        setEstadisticas(response.data.data);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatearNumero = (numero) => {
    return new Intl.NumberFormat('es-CO').format(numero);
  };

  const calcularEdad = (fechaSiembra) => {
    const hoy = new Date();
    const siembra = new Date(fechaSiembra);
    const años = Math.floor((hoy - siembra) / (1000 * 60 * 60 * 24 * 365.25));
    return años;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del lote...</p>
        </div>
      </div>
    );
  }

  if (!lote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Lote no encontrado
          </h3>
          <Link to="/lotes" className="btn-primary">
            Volver a Lotes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <button
            onClick={() => navigate('/lotes')}
            className="btn-secondary"
          >
            ← Volver
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {lote.nombre}
            </h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-gray-600">
                🌱 {lote.variedad_cacao}
              </span>
              {lote.codigo && (
                <span className="text-cacao-600 font-mono text-sm">
                  📋 {lote.codigo}
                </span>
              )}
              <span className={`badge ${
                lote.estado === 'activo' ? 'badge-success' :
                lote.estado === 'inactivo' ? 'badge-gray' :
                lote.estado === 'en_renovacion' ? 'badge-warning' :
                'badge-error'
              }`}>
                {lote.estado === 'en_renovacion' ? 'En Renovación' : 
                 lote.estado.charAt(0).toUpperCase() + lote.estado.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/lotes/${id}/editar`}
            className="btn-outline"
          >
            ✏️ Editar
          </Link>
          <button
            onClick={() => window.print()}
            className="btn-secondary"
          >
            🖨️ Imprimir
          </button>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      {estadisticas && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-cacao-600">
                {estadisticas.informacion_basica.area}
              </p>
              <p className="text-sm text-gray-600">Hectáreas</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-verde-600">
                {formatearNumero(estadisticas.informacion_basica.numero_plantas)}
              </p>
              <p className="text-sm text-gray-600">Plantas</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {estadisticas.informacion_basica.edad_años}
              </p>
              <p className="text-sm text-gray-600">Años</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {estadisticas.seguimiento_fenologico.total_registros}
              </p>
              <p className="text-sm text-gray-600">Seguimientos</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {estadisticas.plagas_enfermedades.activas}
              </p>
              <p className="text-sm text-gray-600">Plagas Activas</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {estadisticas.productividad.registros}
              </p>
              <p className="text-sm text-gray-600">Cosechas</p>
            </div>
          </div>
        </div>
      )}

      {/* Navegación por Tabs */}
      <div className="card mb-8">
        <div className="flex flex-wrap border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cacao-500 text-cacao-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido de Tabs */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                📋 Información General
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Información Básica */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    🌱 Datos del Cultivo
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nombre:</span>
                      <span className="font-medium">{lote.nombre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Código:</span>
                      <span className="font-medium">{lote.codigo || 'No asignado'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Área:</span>
                      <span className="font-medium">{lote.area} hectáreas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Variedad:</span>
                      <span className="font-medium">{lote.variedad_cacao}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plantas:</span>
                      <span className="font-medium">{formatearNumero(lote.numero_plantas)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Densidad:</span>
                      <span className="font-medium">{Math.round(lote.densidad_siembra)} plantas/ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sistema:</span>
                      <span className="font-medium capitalize">{lote.sistema_siembra}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha Siembra:</span>
                      <span className="font-medium">{formatearFecha(lote.fecha_siembra)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Edad:</span>
                      <span className="font-medium">{calcularEdad(lote.fecha_siembra)} años</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <span className={`badge ${
                        lote.estado === 'activo' ? 'badge-success' :
                        lote.estado === 'inactivo' ? 'badge-gray' :
                        lote.estado === 'en_renovacion' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {lote.estado === 'en_renovacion' ? 'En Renovación' : 
                         lote.estado.charAt(0).toUpperCase() + lote.estado.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ubicación */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    📍 Ubicación
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Latitud:</span>
                      <span className="font-medium">{lote.ubicacion.coordenadas.latitud}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Longitud:</span>
                      <span className="font-medium">{lote.ubicacion.coordenadas.longitud}</span>
                    </div>
                    {lote.ubicacion.direccion && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dirección:</span>
                        <span className="font-medium">{lote.ubicacion.direccion}</span>
                      </div>
                    )}
                    {lote.ubicacion.vereda && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vereda:</span>
                        <span className="font-medium">{lote.ubicacion.vereda}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Municipio:</span>
                      <span className="font-medium">{lote.ubicacion.municipio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departamento:</span>
                      <span className="font-medium">{lote.ubicacion.departamento}</span>
                    </div>
                    {lote.ubicacion.altitud && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Altitud:</span>
                        <span className="font-medium">{lote.ubicacion.altitud} msnm</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Especies de Sombra */}
              {lote.especies_sombra && lote.especies_sombra.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    🌳 Especies de Sombra
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lote.especies_sombra.map((especie, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">{especie.nombre}</h4>
                        <p className="text-gray-600">{especie.cantidad} árboles</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observaciones */}
              {lote.observaciones && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    📝 Observaciones
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{lote.observaciones}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'mapa' && (
            <MapaLote lote={lote} />
          )}

          {activeTab === 'seguimiento' && (
            <SeguimientoFenologico lote={lote} onUpdate={cargarLote} />
          )}

          {activeTab === 'plagas' && (
            <PlagasEnfermedades lote={lote} onUpdate={cargarLote} />
          )}

          {activeTab === 'productividad' && (
            <GraficosProductividad lote={lote} onUpdate={cargarLote} />
          )}

          {activeTab === 'aplicaciones' && (
            <AplicacionesQuimicas lote={lote} onUpdate={cargarLote} />
          )}

          {activeTab === 'gastos' && (
            <GastosLote lote={lote} onUpdate={cargarLote} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoteDetalle;