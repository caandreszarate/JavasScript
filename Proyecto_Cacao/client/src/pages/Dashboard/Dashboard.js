import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  MapIcon,
  BeakerIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { usuario } = useAuth();
  const { formatCurrency, formatNumber, showSuccess } = useApp();
  const [dashboardData, setDashboardData] = useState({
    loading: true,
    stats: {
      lotes: { total: 0, activos: 0, area_total: 0 },
      aplicaciones: { pendientes: 0, completadas_mes: 0, proxima: null },
      gastos: { mes_actual: 0, comparacion_mes_anterior: 0 },
      alertas: { total: 0, criticas: 0 }
    },
    clima: {
      temperatura: 26,
      humedad: 78,
      precipitacion: 15,
      pronostico: 'Parcialmente nublado'
    }
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Simular carga de datos (aquí se harían las llamadas a la API)
      setTimeout(() => {
        setDashboardData(prev => ({
          ...prev,
          loading: false,
          stats: {
            lotes: { total: 3, activos: 3, area_total: 12.5 },
            aplicaciones: { pendientes: 2, completadas_mes: 8, proxima: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
            gastos: { mes_actual: 850000, comparacion_mes_anterior: 12 },
            alertas: { total: 4, criticas: 1 }
          }
        }));
      }, 1000);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'cacao', trend, onClick }) => (
    <div 
      className={`stat-card cursor-pointer ${onClick ? 'hover-lift' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="stat-value">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={`stat-change ${trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral'}`}>
              {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {Math.abs(trend)}% vs mes anterior
            </p>
          )}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ type, title, message, priority, date }) => {
    const getAlertStyles = (priority) => {
      switch (priority) {
        case 'critica':
          return 'border-l-red-500 bg-red-50';
        case 'alta':
          return 'border-l-orange-500 bg-orange-50';
        case 'media':
          return 'border-l-yellow-500 bg-yellow-50';
        default:
          return 'border-l-blue-500 bg-blue-50';
      }
    };

    const getIcon = (type) => {
      switch (type) {
        case 'aplicacion':
          return <BeakerIcon className="w-5 h-5" />;
        case 'plaga':
          return <ExclamationTriangleIcon className="w-5 h-5" />;
        case 'clima':
          return <CloudIcon className="w-5 h-5" />;
        default:
          return <ClockIcon className="w-5 h-5" />;
      }
    };

    return (
      <div className={`border-l-4 p-4 rounded-r-lg ${getAlertStyles(priority)}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getIcon(type)}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{message}</p>
            <p className="text-xs text-gray-500 mt-2">{date}</p>
          </div>
        </div>
      </div>
    );
  };

  if (dashboardData.loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-card">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta, {usuario?.nombre}! 👋
          </h1>
          <p className="text-gray-600">
            Aquí tienes un resumen de tu finca {usuario?.finca?.nombre} en Granada, Meta
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="text-right">
            <p className="text-sm text-gray-500">Última actualización</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date().toLocaleString('es-CO')}
            </p>
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Lotes Activos"
          value={dashboardData.stats.lotes.activos}
          subtitle={`${formatNumber(dashboardData.stats.lotes.area_total)} hectáreas`}
          icon={MapIcon}
          color="verde"
          onClick={() => window.location.href = '/lotes'}
        />
        
        <StatCard
          title="Aplicaciones Pendientes"
          value={dashboardData.stats.aplicaciones.pendientes}
          subtitle={`${dashboardData.stats.aplicaciones.completadas_mes} completadas este mes`}
          icon={BeakerIcon}
          color="cacao"
          onClick={() => window.location.href = '/aplicaciones'}
        />
        
        <StatCard
          title="Gastos del Mes"
          value={formatCurrency(dashboardData.stats.gastos.mes_actual)}
          icon={CurrencyDollarIcon}
          color="blue"
          trend={dashboardData.stats.gastos.comparacion_mes_anterior}
          onClick={() => window.location.href = '/gastos'}
        />
        
        <StatCard
          title="Alertas Activas"
          value={dashboardData.stats.alertas.total}
          subtitle={`${dashboardData.stats.alertas.criticas} críticas`}
          icon={ExclamationTriangleIcon}
          color="red"
        />
      </div>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Próximas aplicaciones */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Próximas Aplicaciones</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <BeakerIcon className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Lote Norte - Aplicación #3</h4>
                    <p className="text-sm text-gray-600">NPK + Fungicida preventivo</p>
                    <p className="text-xs text-gray-500">Programada para mañana, 8:00 AM</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="badge badge-warning">Pendiente</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BeakerIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Lote Sur - Aplicación #2</h4>
                    <p className="text-sm text-gray-600">Bioestimulante + Insecticida</p>
                    <p className="text-xs text-gray-500">Programada para el 2 de enero</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="badge badge-info">Programada</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to="/aplicaciones"
                className="text-sm font-medium text-cacao-600 hover:text-cacao-700"
              >
                Ver todas las aplicaciones →
              </Link>
            </div>
          </div>

          {/* Resumen de gastos */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Resumen de Gastos - Diciembre</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(450000)}</p>
                <p className="text-sm text-gray-600">Insumos Químicos</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(280000)}</p>
                <p className="text-sm text-gray-600">Mano de Obra</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fertilizantes</span>
                <span className="text-sm font-medium">{formatCurrency(180000)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fungicidas</span>
                <span className="text-sm font-medium">{formatCurrency(150000)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Aplicación</span>
                <span className="text-sm font-medium">{formatCurrency(120000)}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to="/gastos"
                className="text-sm font-medium text-cacao-600 hover:text-cacao-700"
              >
                Ver detalles de gastos →
              </Link>
            </div>
          </div>
        </div>

        {/* Columna derecha - Información secundaria */}
        <div className="space-y-6">
          {/* Clima actual */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Clima Actual</h3>
              <p className="text-sm text-gray-500">Granada, Meta</p>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🌤️</div>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.clima.temperatura}°C</p>
              <p className="text-sm text-gray-600">{dashboardData.clima.pronostico}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-gray-900">{dashboardData.clima.humedad}%</p>
                <p className="text-xs text-gray-600">Humedad</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{dashboardData.clima.precipitacion}mm</p>
                <p className="text-xs text-gray-600">Lluvia hoy</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ Condiciones favorables para aplicaciones
              </p>
            </div>
          </div>

          {/* Alertas y notificaciones */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Alertas Recientes</h3>
            </div>
            
            <div className="space-y-3">
              <AlertCard
                type="aplicacion"
                title="Aplicación Vencida"
                message="Lote Norte: Aplicación programada para ayer no completada"
                priority="critica"
                date="Hace 1 día"
              />
              
              <AlertCard
                type="plaga"
                title="Monitoreo de Plagas"
                message="Revisar presencia de trips en Lote Sur"
                priority="media"
                date="Hace 2 días"
              />
              
              <AlertCard
                type="clima"
                title="Condiciones Favorables"
                message="Próximos 3 días ideales para aplicaciones"
                priority="baja"
                date="Hace 1 hora"
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-sm font-medium text-cacao-600 hover:text-cacao-700 w-full text-left">
                Ver todas las alertas →
              </button>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
            </div>
            
            <div className="space-y-3">
              <Link
                to="/lotes/nuevo"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MapIcon className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Registrar nuevo lote</span>
              </Link>
              
              <Link
                to="/aplicaciones/nueva"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <BeakerIcon className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Programar aplicación</span>
              </Link>
              
              <Link
                to="/gastos/nuevo"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <CurrencyDollarIcon className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Registrar gasto</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
