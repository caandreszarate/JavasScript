import React from 'react';

const Aplicaciones = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Aplicaciones Químicas</h1>
          <p className="text-gray-600 mt-1">
            Control y programación de aplicaciones cada 20 días
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Módulo en Desarrollo</h2>
        <p className="text-gray-600 mb-4">
          Este módulo incluirá:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Calendario automatizado de aplicaciones (ciclos de 161 días)</li>
          <li>8 aplicaciones por ciclo cada 20 días</li>
          <li>Gestión de productos químicos (fertilizantes, fungicidas, insecticidas, bioestimulantes)</li>
          <li>Control de condiciones climáticas para aplicación</li>
          <li>Registro de equipos y operarios</li>
          <li>Seguimiento de efectividad</li>
          <li>Alertas de programación</li>
          <li>Costos por aplicación</li>
        </ul>
      </div>
    </div>
  );
};

export default Aplicaciones;
