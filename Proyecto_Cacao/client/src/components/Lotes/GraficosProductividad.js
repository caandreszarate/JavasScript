import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

const GraficosProductividad = ({ lote, onUpdate }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    año: new Date().getFullYear(),
    mes: new Date().getMonth() + 1,
    produccion_kg: '',
    precio_promedio_kg: '',
    calidad_grano: 'corriente',
    humedad_porcentaje: ''
  });
  const [loading, setLoading] = useState(false);
  const { showNotification } = useApp();

  const calidadesGrano = [
    { value: 'premium', label: 'Premium', color: 'text-green-600' },
    { value: 'especial', label: 'Especial', color: 'text-blue-600' },
    { value: 'corriente', label: 'Corriente', color: 'text-yellow-600' },
    { value: 'defectuoso', label: 'Defectuoso', color: 'text-red-600' }
  ];

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registro = {
        ...nuevoRegistro,
        produccion_kg: parseFloat(nuevoRegistro.produccion_kg),
        precio_promedio_kg: parseFloat(nuevoRegistro.precio_promedio_kg),
        humedad_porcentaje: nuevoRegistro.humedad_porcentaje ? parseFloat(nuevoRegistro.humedad_porcentaje) : undefined,
        ingresos_totales: parseFloat(nuevoRegistro.produccion_kg) * parseFloat(nuevoRegistro.precio_promedio_kg)
      };

      const response = await axios.post(`/api/lotes/${lote._id}/productividad`, registro);
      
      if (response.data.success) {
        showNotification('Registro de productividad agregado exitosamente', 'success');
        setMostrarFormulario(false);
        setNuevoRegistro({
          año: new Date().getFullYear(),
          mes: new Date().getMonth() + 1,
          produccion_kg: '',
          precio_promedio_kg: '',
          calidad_grano: 'corriente',
          humedad_porcentaje: ''
        });
        onUpdate();
      }
    } catch (error) {
      showNotification('Error al agregar registro de productividad', 'error');
    } finally {
      setLoading(false);
    }
  };

  const calcularEstadisticas = () => {
    if (!lote.productividad_historica || lote.productividad_historica.length === 0) {
      return {
        totalProduccion: 0,
        promedioProduccion: 0,
        mejorAño: null,
        ingresosTotales: 0,
        productividadPorHectarea: 0
      };
    }

    const datos = lote.productividad_historica;
    const totalProduccion = datos.reduce((sum, item) => sum + item.produccion_kg, 0);
    const ingresosTotales = datos.reduce((sum, item) => sum + (item.ingresos_totales || 0), 0);
    
    // Agrupar por año para encontrar el mejor
    const produccionPorAño = {};
    datos.forEach(item => {
      if (!produccionPorAño[item.año]) {
        produccionPorAño[item.año] = 0;
      }
      produccionPorAño[item.año] += item.produccion_kg;
    });

    const mejorAño = Object.keys(produccionPorAño).reduce((a, b) => 
      produccionPorAño[a] > produccionPorAño[b] ? a : b
    );

    return {
      totalProduccion,
      promedioProduccion: totalProduccion / datos.length,
      mejorAño: { año: mejorAño, produccion: produccionPorAño[mejorAño] },
      ingresosTotales,
      productividadPorHectarea: totalProduccion / lote.area
    };
  };

  const estadisticas = calcularEstadisticas();

  const formatearNumero = (numero) => {
    return new Intl.NumberFormat('es-CO').format(numero);
  };

  const formatearMoneda = (cantidad) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(cantidad);
  };

  // Crear datos para gráfico simple (representación visual básica)
  const crearGraficoSimple = () => {
    if (!lote.productividad_historica || lote.productividad_historica.length === 0) {
      return null;
    }

    // Agrupar por año
    const produccionPorAño = {};
    lote.productividad_historica.forEach(item => {
      if (!produccionPorAño[item.año]) {
        produccionPorAño[item.año] = 0;
      }
      produccionPorAño[item.año] += item.produccion_kg;
    });

    const años = Object.keys(produccionPorAño).sort();
    const maxProduccion = Math.max(...Object.values(produccionPorAño));

    return años.map(año => ({
      año,
      produccion: produccionPorAño[año],
      porcentaje: (produccionPorAño[año] / maxProduccion) * 100
    }));
  };

  const datosGrafico = crearGraficoSimple();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          📈 Productividad del Lote
        </h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="btn-primary"
        >
          ➕ Agregar Registro
        </button>
      </div>

      {/* Formulario para nuevo registro */}
      {mostrarFormulario && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Nuevo Registro de Productividad
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Año *</label>
                <select
                  value={nuevoRegistro.año}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    año: parseInt(e.target.value)
                  }))}
                  className="form-select"
                  required
                >
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(año => (
                    <option key={año} value={año}>{año}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Mes *</label>
                <select
                  value={nuevoRegistro.mes}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    mes: parseInt(e.target.value)
                  }))}
                  className="form-select"
                  required
                >
                  {meses.map((mes, index) => (
                    <option key={index + 1} value={index + 1}>{mes}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Producción (kg) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={nuevoRegistro.produccion_kg}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    produccion_kg: e.target.value
                  }))}
                  className="form-input"
                  required
                  placeholder="Ej: 150.5"
                />
              </div>

              <div>
                <label className="form-label">Precio por kg *</label>
                <input
                  type="number"
                  step="100"
                  min="0"
                  value={nuevoRegistro.precio_promedio_kg}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    precio_promedio_kg: e.target.value
                  }))}
                  className="form-input"
                  required
                  placeholder="Ej: 8500"
                />
              </div>

              <div>
                <label className="form-label">Calidad del Grano</label>
                <select
                  value={nuevoRegistro.calidad_grano}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    calidad_grano: e.target.value
                  }))}
                  className="form-select"
                >
                  {calidadesGrano.map(calidad => (
                    <option key={calidad.value} value={calidad.value}>
                      {calidad.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Humedad (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={nuevoRegistro.humedad_porcentaje}
                  onChange={(e) => setNuevoRegistro(prev => ({
                    ...prev,
                    humedad_porcentaje: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Ej: 7.5"
                />
              </div>
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
                {loading ? 'Guardando...' : 'Guardar Registro'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="text-center">
            <p className="text-3xl font-bold text-cacao-600">
              {formatearNumero(estadisticas.totalProduccion)}
            </p>
            <p className="text-sm text-gray-600">kg Producidos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="text-center">
            <p className="text-3xl font-bold text-verde-600">
              {formatearNumero(estadisticas.productividadPorHectarea.toFixed(1))}
            </p>
            <p className="text-sm text-gray-600">kg/hectárea</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">
              {formatearMoneda(estadisticas.ingresosTotales)}
            </p>
            <p className="text-sm text-gray-600">Ingresos Totales</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">
              {estadisticas.mejorAño?.año || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">Mejor Año</p>
          </div>
        </div>
      </div>

      {/* Gráfico Simple de Barras */}
      {datosGrafico && datosGrafico.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Producción por Año
          </h3>
          
          <div className="space-y-4">
            {datosGrafico.map(item => (
              <div key={item.año} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium text-gray-600">
                  {item.año}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div
                    className="bg-cacao-500 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${item.porcentaje}%` }}
                  >
                    <span className="text-white text-xs font-medium">
                      {formatearNumero(item.produccion)} kg
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historial de Registros */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Historial de Registros
        </h3>

        {lote.productividad_historica && lote.productividad_historica.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio/kg
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingresos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Humedad
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lote.productividad_historica
                  .sort((a, b) => b.año - a.año || b.mes - a.mes)
                  .map((registro, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {meses[registro.mes - 1]} {registro.año}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatearNumero(registro.produccion_kg)} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatearMoneda(registro.precio_promedio_kg)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-verde-600">
                      {formatearMoneda(registro.ingresos_totales || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        registro.calidad_grano === 'premium' ? 'bg-green-100 text-green-800' :
                        registro.calidad_grano === 'especial' ? 'bg-blue-100 text-blue-800' :
                        registro.calidad_grano === 'corriente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {calidadesGrano.find(c => c.value === registro.calidad_grano)?.label || registro.calidad_grano}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {registro.humedad_porcentaje ? `${registro.humedad_porcentaje}%` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              No hay registros de productividad
            </h4>
            <p className="text-gray-600 mb-4">
              Comienza agregando el primer registro de cosecha
            </p>
            <button
              onClick={() => setMostrarFormulario(true)}
              className="btn-primary"
            >
              ➕ Agregar Primer Registro
            </button>
          </div>
        )}
      </div>

      {/* Información y Consejos */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-2xl mr-3">💡</span>
          <div>
            <h4 className="font-semibold text-green-900 mb-2">
              Consejos para Mejorar la Productividad
            </h4>
            <ul className="text-green-800 space-y-1 text-sm">
              <li>• Registra la producción mensualmente para un mejor seguimiento</li>
              <li>• La humedad del grano debe estar entre 6-8% para mejor calidad</li>
              <li>• El cacao premium puede alcanzar precios 20-30% superiores</li>
              <li>• Una hectárea de cacao puede producir entre 400-800 kg/año</li>
              <li>• Mantén registros detallados para identificar patrones estacionales</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficosProductividad;
