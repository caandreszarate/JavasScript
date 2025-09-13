import React from 'react';
import { useApp } from '../context/AppContext';
import { useSimpleNotifications } from '../components/UI/SimpleNotifications';

const TestNotifications = () => {
  const { showNotification: appShowNotification } = useApp();
  const { showNotification: simpleShowNotification } = useSimpleNotifications();

  const testAppNotifications = () => {
    try {
      console.log('Probando AppContext notifications...');
      appShowNotification('Prueba de éxito', 'success');
      appShowNotification('Prueba de error', 'error');
      appShowNotification('Prueba de advertencia', 'warning');
      appShowNotification('Prueba de info', 'info');
    } catch (error) {
      console.error('Error con AppContext notifications:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const testSimpleNotifications = () => {
    try {
      console.log('Probando Simple notifications...');
      simpleShowNotification('Prueba simple de éxito', 'success');
      simpleShowNotification('Prueba simple de error', 'error');
      simpleShowNotification('Prueba simple de advertencia', 'warning');
      simpleShowNotification('Prueba simple de info', 'info');
    } catch (error) {
      console.error('Error con Simple notifications:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const testFallback = () => {
    alert('✅ Prueba de fallback funcionando');
    console.log('✅ Fallback test');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🧪 Prueba de Notificaciones
        </h1>

        <div className="space-y-4">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">AppContext Notifications</h2>
            <button
              onClick={testAppNotifications}
              className="btn-primary"
            >
              Probar AppContext
            </button>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Simple Notifications</h2>
            <button
              onClick={testSimpleNotifications}
              className="btn-secondary"
            >
              Probar Simple
            </button>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Fallback Test</h2>
            <button
              onClick={testFallback}
              className="btn-outline"
            >
              Probar Fallback
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Información de Debug:</h3>
          <div className="text-sm space-y-1">
            <p>AppContext showNotification: {typeof appShowNotification}</p>
            <p>Simple showNotification: {typeof simpleShowNotification}</p>
            <p>Console logs aparecerán en las herramientas de desarrollador</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestNotifications;
