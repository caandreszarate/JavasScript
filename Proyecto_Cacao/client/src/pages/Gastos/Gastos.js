import React from 'react';

const Gastos = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Control de Gastos</h1>
          <p className="text-gray-600 mt-1">
            Gestión financiera y control de costos del cultivo
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Módulo en Desarrollo</h2>
        <p className="text-gray-600 mb-4">
          Este módulo incluirá:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Categorización de gastos (insumos químicos, mano de obra, equipos, servicios, infraestructura)</li>
          <li>Registro detallado con proveedores y facturas</li>
          <li>Control de inventarios</li>
          <li>Reportes financieros mensuales y anuales</li>
          <li>Análisis de rentabilidad por lote</li>
          <li>Comparativas de costos</li>
          <li>Indicadores clave de desempeño financiero</li>
          <li>Proyecciones presupuestarias</li>
        </ul>
      </div>
    </div>
  );
};

export default Gastos;
