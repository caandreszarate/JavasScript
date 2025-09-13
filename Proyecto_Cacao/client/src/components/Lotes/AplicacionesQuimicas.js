import React from 'react';
import { Link } from 'react-router-dom';

const AplicacionesQuimicas = ({ lote }) => {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatearMoneda = (cantidad) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(cantidad);
  };

  const calcularEstadisticas = () => {
    if (!lote.aplicaciones_quimicas || lote.aplicaciones_quimicas.length === 0) {
      return {
        total: 0,
        esteAño: 0,
        costoTotal: 0
      };
    }

    const añoActual = new Date().getFullYear();
    const esteAño = lote.aplicaciones_quimicas.filter(app => 
      new Date(app.fecha_aplicacion).getFullYear() === añoActual
    ).length;

    const costoTotal = lote.aplicaciones_quimicas.reduce((sum, app) => sum + (app.costo || 0), 0);

    return {
      total: lote.aplicaciones_quimicas.length,
      esteAño,
      costoTotal
    };
  };

  const estadisticas = calcularEstadisticas();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          🧪 Aplicaciones Químicas
        </h2>
        <Link
          to={`/aplicaciones/nueva?lote=${lote._id}`}
          className="btn-primary"
        >
          ➕ Nueva Aplicación
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{estadisticas.total}</p>
            <p className="text-sm text-gray-600">Total Aplicaciones</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{estadisticas.esteAño}</p>
            <p className="text-sm text-gray-600">Este Año</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{formatearMoneda(estadisticas.costoTotal)}</p>
            <p className="text-sm text-gray-600">Costo Total</p>
          </div>
        </div>
      </div>

      {/* Lista de Aplicaciones */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Aplicaciones Registradas
        </h3>

        {lote.aplicaciones_quimicas && lote.aplicaciones_quimicas.length > 0 ? (
          <div className="space-y-4">
            {lote.aplicaciones_quimicas
              .sort((a, b) => new Date(b.fecha_aplicacion) - new Date(a.fecha_aplicacion))
              .map((aplicacion, index) => (
              <div key={aplicacion._id || index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{aplicacion.producto}</h4>
                    <p className="text-sm text-gray-600">{aplicacion.tipo_aplicacion}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {formatearFecha(aplicacion.fecha_aplicacion)}
                    </p>
                    {aplicacion.costo && (
                      <p className="font-semibold text-green-600">
                        {formatearMoneda(aplicacion.costo)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Dosis:</span>
                    <span className="font-medium ml-1">{aplicacion.dosis}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Método:</span>
                    <span className="font-medium ml-1">{aplicacion.metodo_aplicacion}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Área:</span>
                    <span className="font-medium ml-1">{aplicacion.area_aplicada} ha</span>
                  </div>
                </div>

                {aplicacion.observaciones && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Observaciones:</span> {aplicacion.observaciones}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🧪</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              No hay aplicaciones químicas registradas
            </h4>
            <p className="text-gray-600 mb-4">
              Registra las aplicaciones de fertilizantes, pesticidas y otros productos
            </p>
            <Link
              to={`/aplicaciones/nueva?lote=${lote._id}`}
              className="btn-primary"
            >
              ➕ Primera Aplicación
            </Link>
          </div>
        )}
      </div>

      {/* Enlaces Rápidos */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🔗 Acciones Rápidas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to={`/aplicaciones/nueva?lote=${lote._id}&tipo=fertilizante`}
            className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <span className="text-2xl mr-3">🌿</span>
            <div>
              <p className="font-semibold">Fertilización</p>
              <p className="text-sm">Aplicar fertilizante</p>
            </div>
          </Link>

          <Link
            to={`/aplicaciones/nueva?lote=${lote._id}&tipo=fungicida`}
            className="flex items-center p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <span className="text-2xl mr-3">🦠</span>
            <div>
              <p className="font-semibold">Fungicida</p>
              <p className="text-sm">Control de hongos</p>
            </div>
          </Link>

          <Link
            to={`/aplicaciones/nueva?lote=${lote._id}&tipo=insecticida`}
            className="flex items-center p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
          >
            <span className="text-2xl mr-3">🐛</span>
            <div>
              <p className="font-semibold">Insecticida</p>
              <p className="text-sm">Control de plagas</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Información y Consejos */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-2xl mr-3">💡</span>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">
              Buenas Prácticas en Aplicaciones Químicas
            </h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Sigue siempre las recomendaciones de dosis del fabricante</li>
              <li>• Aplica en horas de menor temperatura (mañana o tarde)</li>
              <li>• Usa equipo de protección personal completo</li>
              <li>• Respeta los períodos de carencia antes de la cosecha</li>
              <li>• Rota productos para evitar resistencia</li>
              <li>• Mantén registros detallados para trazabilidad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AplicacionesQuimicas;
