import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useSimpleNotifications } from '../../components/UI/SimpleNotifications';
import axios from 'axios';

const Lotes = () => {
  const [lotes, setLotes] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    estado: 'todos',
    variedad: 'todas'
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });
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

  useEffect(() => {
    loadLotes();
  }, [filtros]);

  useEffect(() => {
    loadEstadisticas();
  }, []);

  const loadLotes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filtros.busqueda) params.append('buscar', filtros.busqueda);
      if (filtros.estado !== 'todos') params.append('estado', filtros.estado);
      if (filtros.variedad !== 'todas') params.append('variedad', filtros.variedad);

      const response = await axios.get(`/api/lotes?${params.toString()}`);
      
      if (response.data.success) {
        // Asegurar que data sea siempre un array
        const lotesData = Array.isArray(response.data.data) ? response.data.data : [];
        setLotes(lotesData);
        setPagination(response.data.pagination || { current: 1, pages: 1, total: lotesData.length });
      } else {
        // Si no es exitoso, establecer array vacío
        setLotes([]);
        showNotification(response.data.message || 'Error al cargar los lotes', 'error');
      }
    } catch (error) {
      console.error('Error al cargar lotes:', error);
      // En caso de error, asegurar que lotes sea un array vacío
      setLotes([]);
      setPagination({ current: 1, pages: 1, total: 0 });
      
      if (error.response) {
        // Error del servidor
        showNotification(error.response.data?.message || 'Error del servidor al cargar los lotes', 'error');
      } else if (error.request) {
        // Error de red
        showNotification('Error de conexión. Verifica que el servidor esté funcionando.', 'error');
      } else {
        // Otro tipo de error
        showNotification('Error inesperado al cargar los lotes', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadEstadisticas = async () => {
    try {
      const response = await axios.get('/api/lotes/estadisticas/resumen');
      if (response.data.success) {
        setEstadisticas(response.data.data);
      } else {
        setEstadisticas(null);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      setEstadisticas(null);
      // No mostrar error para estadísticas ya que no es crítico
    }
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const eliminarLote = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el lote "${nombre}"?`)) {
      try {
        const response = await axios.delete(`/api/lotes/${id}`);
        
        if (response.data.success) {
          showNotification('Lote eliminado exitosamente', 'success');
          loadLotes();
          loadEstadisticas(); // Actualizar estadísticas
        }
      } catch (error) {
        console.error('Error al eliminar lote:', error);
        showNotification('Error al eliminar el lote', 'error');
      }
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO');
  };

  const calcularEdad = (fechaSiembra) => {
    const hoy = new Date();
    const siembra = new Date(fechaSiembra);
    const años = Math.floor((hoy - siembra) / (1000 * 60 * 60 * 24 * 365.25));
    return años;
  };

  const formatearNumero = (numero) => {
    return new Intl.NumberFormat('es-CO').format(numero);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando lotes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🌱 Gestión de Lotes</h1>
          <p className="text-gray-600 mt-2">
            Administra los lotes de cacao de tu finca en Granada, Meta
          </p>
        </div>
        <Link
          to="/lotes/nuevo"
          className="btn-primary"
        >
          ➕ Nuevo Lote
        </Link>
      </div>

      {/* Estadísticas Generales */}
      {estadisticas && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-cacao-100 text-cacao-600 mr-4">
                🏡
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Lotes</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.totalLotes}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-verde-100 text-verde-600 mr-4">
                📏
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Área Total</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.areaTotal?.toFixed(2)} ha</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                🌳
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plantas</p>
                <p className="text-2xl font-bold text-gray-900">{formatearNumero(estadisticas.totalPlantas)}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                📅
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Edad Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.promedioEdad?.toFixed(1)} años</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="form-label">🔍 Buscar</label>
            <input
              type="text"
              placeholder="Nombre del lote..."
              className="form-input"
              value={filtros.busqueda}
              onChange={(e) => handleFiltroChange('busqueda', e.target.value)}
            />
          </div>
          
          <div>
            <label className="form-label">📊 Estado</label>
            <select
              className="form-select"
              value={filtros.estado}
              onChange={(e) => handleFiltroChange('estado', e.target.value)}
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="en_renovacion">En Renovación</option>
              <option value="abandonado">Abandonado</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">🌱 Variedad</label>
            <select
              className="form-select"
              value={filtros.variedad}
              onChange={(e) => handleFiltroChange('variedad', e.target.value)}
            >
              <option value="todas">Todas las variedades</option>
              <option value="CCN-51">CCN-51</option>
              <option value="Trinitario">Trinitario</option>
              <option value="Criollo">Criollo</option>
              <option value="Forastero">Forastero</option>
              <option value="ICS-1">ICS-1</option>
              <option value="ICS-6">ICS-6</option>
              <option value="TSH-565">TSH-565</option>
              <option value="TCS-01">TCS-01</option>
              <option value="TCS-13">TCS-13</option>
              <option value="Otra">Otra</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => setFiltros({ busqueda: '', estado: 'todos', variedad: 'todas' })}
              className="btn-secondary w-full"
            >
              🧹 Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Lotes */}
      {!Array.isArray(lotes) || lotes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No hay lotes registrados
          </h3>
          <p className="text-gray-600 mb-6">
            Comienza creando tu primer lote de cacao en Granada, Meta
          </p>
          <Link
            to="/lotes/nuevo"
            className="btn-primary"
          >
            🌱 Crear Primer Lote
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(lotes) && lotes.map((lote) => (
            <div key={lote._id} className="card hover:shadow-xl transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {lote.nombre}
                  </h3>
                  <p className="text-sm text-gray-600">
                    🌱 {lote.variedad_cacao}
                  </p>
                  {lote.codigo && (
                    <p className="text-xs text-cacao-600 font-mono">
                      📋 {lote.codigo}
                    </p>
                  )}
                </div>
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

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">📏 Área:</span>
                  <span className="font-medium">{lote.area} ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">🌳 Plantas:</span>
                  <span className="font-medium">{formatearNumero(lote.numero_plantas)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">📅 Edad:</span>
                  <span className="font-medium">{calcularEdad(lote.fecha_siembra)} años</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">🌱 Siembra:</span>
                  <span className="font-medium">{formatearFecha(lote.fecha_siembra)}</span>
                </div>
                {lote.ubicacion?.vereda && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">📍 Vereda:</span>
                    <span className="font-medium">{lote.ubicacion.vereda}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">🌲 Sistema:</span>
                  <span className="font-medium capitalize">{lote.sistema_siembra}</span>
                </div>
              </div>

              {/* Indicadores rápidos */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600">Seguimiento</p>
                  <p className="font-bold text-sm">{lote.seguimiento_fenologico?.length || 0}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600">Plagas</p>
                  <p className="font-bold text-sm">{lote.plagas_enfermedades?.length || 0}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600">Productividad</p>
                  <p className="font-bold text-sm">{lote.productividad_historica?.length || 0}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/lotes/${lote._id}`}
                  className="flex-1 btn-primary text-center text-sm"
                >
                  👁️ Ver Detalle
                </Link>
                <Link
                  to={`/lotes/${lote._id}/editar`}
                  className="flex-1 btn-outline text-center text-sm"
                >
                  ✏️ Editar
                </Link>
                <button
                  onClick={() => eliminarLote(lote._id, lote.nombre)}
                  className="btn-danger px-3 text-sm"
                  title="Eliminar lote"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {pagination.pages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => {/* Implementar cambio de página */}}
                className={`px-3 py-2 rounded ${
                  page === pagination.current 
                    ? 'bg-cacao-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lotes;