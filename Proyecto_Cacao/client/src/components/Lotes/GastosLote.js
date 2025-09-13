import React from 'react';
import { Link } from 'react-router-dom';

const GastosLote = ({ lote }) => {
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
    if (!lote.gastos || lote.gastos.length === 0) {
      return {
        total: 0,
        esteAño: 0,
        esteMes: 0,
        porCategoria: {}
      };
    }

    const hoy = new Date();
    const añoActual = hoy.getFullYear();
    const mesActual = hoy.getMonth();

    const esteAño = lote.gastos
      .filter(gasto => new Date(gasto.fecha).getFullYear() === añoActual)
      .reduce((sum, gasto) => sum + gasto.monto, 0);

    const esteMes = lote.gastos
      .filter(gasto => {
        const fechaGasto = new Date(gasto.fecha);
        return fechaGasto.getFullYear() === añoActual && fechaGasto.getMonth() === mesActual;
      })
      .reduce((sum, gasto) => sum + gasto.monto, 0);

    const total = lote.gastos.reduce((sum, gasto) => sum + gasto.monto, 0);

    const porCategoria = {};
    lote.gastos.forEach(gasto => {
      const categoria = gasto.categoria || 'Sin categoría';
      porCategoria[categoria] = (porCategoria[categoria] || 0) + gasto.monto;
    });

    return {
      total,
      esteAño,
      esteMes,
      porCategoria
    };
  };

  const estadisticas = calcularEstadisticas();

  const categorias = [
    { value: 'semillas_plantas', label: '🌱 Semillas y Plantas', color: 'bg-green-100 text-green-800' },
    { value: 'fertilizantes', label: '🌿 Fertilizantes', color: 'bg-blue-100 text-blue-800' },
    { value: 'pesticidas', label: '🧪 Pesticidas', color: 'bg-orange-100 text-orange-800' },
    { value: 'herramientas', label: '🔧 Herramientas', color: 'bg-gray-100 text-gray-800' },
    { value: 'mano_obra', label: '👷 Mano de Obra', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'transporte', label: '🚛 Transporte', color: 'bg-purple-100 text-purple-800' },
    { value: 'servicios', label: '⚡ Servicios', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'otros', label: '📦 Otros', color: 'bg-pink-100 text-pink-800' }
  ];

  const obtenerCategoriaInfo = (categoria) => {
    return categorias.find(c => c.value === categoria) || 
           { label: categoria, color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          💰 Gastos del Lote
        </h2>
        <Link
          to={`/gastos/nuevo?lote=${lote._id}`}
          className="btn-primary"
        >
          ➕ Nuevo Gasto
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{formatearMoneda(estadisticas.total)}</p>
            <p className="text-sm text-gray-600">Total Histórico</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{formatearMoneda(estadisticas.esteAño)}</p>
            <p className="text-sm text-gray-600">Este Año</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{formatearMoneda(estadisticas.esteMes)}</p>
            <p className="text-sm text-gray-600">Este Mes</p>
          </div>
        </div>
      </div>

      {/* Gastos por Categoría */}
      {Object.keys(estadisticas.porCategoria).length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Gastos por Categoría
          </h3>
          
          <div className="space-y-3">
            {Object.entries(estadisticas.porCategoria)
              .sort(([,a], [,b]) => b - a)
              .map(([categoria, monto]) => {
                const categoriaInfo = obtenerCategoriaInfo(categoria);
                const porcentaje = (monto / estadisticas.total) * 100;
                
                return (
                  <div key={categoria} className="flex items-center space-x-4">
                    <div className="w-32">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${categoriaInfo.color}`}>
                        {categoriaInfo.label}
                      </span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                      <div
                        className="bg-cacao-500 h-4 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${porcentaje}%` }}
                      >
                        <span className="text-white text-xs font-medium">
                          {porcentaje.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-32 text-right">
                      <span className="font-semibold text-gray-900">
                        {formatearMoneda(monto)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Lista de Gastos */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Gastos Registrados
        </h3>

        {lote.gastos && lote.gastos.length > 0 ? (
          <div className="space-y-4">
            {lote.gastos
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .slice(0, 10) // Mostrar solo los últimos 10
              .map((gasto, index) => {
                const categoriaInfo = obtenerCategoriaInfo(gasto.categoria);
                
                return (
                  <div key={gasto._id || index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{gasto.descripcion}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${categoriaInfo.color}`}>
                            {categoriaInfo.label}
                          </span>
                          {gasto.proveedor && (
                            <span className="text-sm text-gray-600">
                              Proveedor: {gasto.proveedor}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <p className="font-bold text-xl text-red-600">
                          {formatearMoneda(gasto.monto)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatearFecha(gasto.fecha)}
                        </p>
                      </div>
                    </div>

                    {gasto.cantidad && gasto.unidad && (
                      <div className="text-sm text-gray-600 mb-2">
                        Cantidad: {gasto.cantidad} {gasto.unidad}
                      </div>
                    )}

                    {gasto.observaciones && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Observaciones:</span> {gasto.observaciones}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

            {lote.gastos.length > 10 && (
              <div className="text-center">
                <Link
                  to={`/gastos?lote=${lote._id}`}
                  className="btn-outline"
                >
                  Ver Todos los Gastos ({lote.gastos.length})
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              No hay gastos registrados
            </h4>
            <p className="text-gray-600 mb-4">
              Registra los gastos del lote para llevar un control financiero
            </p>
            <Link
              to={`/gastos/nuevo?lote=${lote._id}`}
              className="btn-primary"
            >
              ➕ Primer Gasto
            </Link>
          </div>
        )}
      </div>

      {/* Acciones Rápidas */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🔗 Acciones Rápidas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to={`/gastos/nuevo?lote=${lote._id}&categoria=fertilizantes`}
            className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="text-xl mr-2">🌿</span>
            <div>
              <p className="font-semibold text-sm">Fertilizantes</p>
            </div>
          </Link>

          <Link
            to={`/gastos/nuevo?lote=${lote._id}&categoria=pesticidas`}
            className="flex items-center p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <span className="text-xl mr-2">🧪</span>
            <div>
              <p className="font-semibold text-sm">Pesticidas</p>
            </div>
          </Link>

          <Link
            to={`/gastos/nuevo?lote=${lote._id}&categoria=mano_obra`}
            className="flex items-center p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <span className="text-xl mr-2">👷</span>
            <div>
              <p className="font-semibold text-sm">Mano de Obra</p>
            </div>
          </Link>

          <Link
            to={`/gastos/nuevo?lote=${lote._id}&categoria=herramientas`}
            className="flex items-center p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl mr-2">🔧</span>
            <div>
              <p className="font-semibold text-sm">Herramientas</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Resumen Financiero */}
      {estadisticas.total > 0 && (
        <div className="card bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📈 Resumen Financiero del Lote
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Costos por Hectárea:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total histórico/ha:</span>
                  <span className="font-semibold">{formatearMoneda(estadisticas.total / lote.area)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Este año/ha:</span>
                  <span className="font-semibold">{formatearMoneda(estadisticas.esteAño / lote.area)}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Información Adicional:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total gastos:</span>
                  <span className="font-semibold">{lote.gastos?.length || 0} registros</span>
                </div>
                <div className="flex justify-between">
                  <span>Promedio mensual:</span>
                  <span className="font-semibold">{formatearMoneda(estadisticas.esteAño / 12)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Información y Consejos */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-2xl mr-3">💡</span>
          <div>
            <h4 className="font-semibold text-green-900 mb-2">
              Consejos para el Control de Gastos
            </h4>
            <ul className="text-green-800 space-y-1 text-sm">
              <li>• Registra todos los gastos inmediatamente después de realizarlos</li>
              <li>• Guarda facturas y comprobantes para respaldo</li>
              <li>• Categoriza correctamente para análisis posteriores</li>
              <li>• Compara costos por hectárea con otros productores</li>
              <li>• Busca oportunidades de reducir costos sin afectar calidad</li>
              <li>• Planifica compras para aprovechar descuentos por volumen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GastosLote;
