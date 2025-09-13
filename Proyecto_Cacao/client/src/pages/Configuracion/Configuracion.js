import React from 'react';

const Configuracion = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600 mt-1">
            Personaliza tu experiencia en CacaoControl
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Módulo en Desarrollo</h2>
        <p className="text-gray-600 mb-4">
          Este módulo incluirá:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Configuración de perfil de usuario</li>
          <li>Información de la finca</li>
          <li>Preferencias de notificaciones</li>
          <li>Configuración de idioma</li>
          <li>Configuración de tema</li>
          <li>Gestión de usuarios (para administradores)</li>
          <li>Configuración de productos químicos</li>
          <li>Parámetros del sistema</li>
          <li>Respaldo y exportación de datos</li>
        </ul>
      </div>
    </div>
  );
};

export default Configuracion;
