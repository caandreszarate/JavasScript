import React from 'react';

const Reportes = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes y Analytics</h1>
          <p className="text-gray-600 mt-1">
            Análisis detallados y reportes del cultivo
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Módulo en Desarrollo</h2>
        <p className="text-gray-600 mb-4">
          Este módulo incluirá:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Reportes de productividad por lote</li>
          <li>Análisis financiero detallado</li>
          <li>Reportes de aplicaciones químicas</li>
          <li>Seguimiento fenológico</li>
          <li>Análisis de plagas y enfermedades</li>
          <li>Comparativas históricas</li>
          <li>Exportación a PDF y Excel</li>
          <li>Gráficos interactivos</li>
          <li>Indicadores de sostenibilidad</li>
        </ul>
      </div>
    </div>
  );
};

export default Reportes;
