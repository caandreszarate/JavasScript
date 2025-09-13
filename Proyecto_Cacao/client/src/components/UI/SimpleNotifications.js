import React, { useState, useCallback, createContext, useContext } from 'react';

// Contexto simple para notificaciones
const SimpleNotificationContext = createContext();

export const SimpleNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      type,
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-remove después de 5 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showNotification = useCallback((message, type = 'info') => {
    // Como fallback temporal, también mostrar alert
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`${emoji} ${type.toUpperCase()}: ${message}`);
    
    return addNotification(message, type);
  }, [addNotification]);

  const value = {
    notifications,
    showNotification,
    removeNotification,
    // Aliases para compatibilidad
    showSuccess: (msg) => showNotification(msg, 'success'),
    showError: (msg) => showNotification(msg, 'error'),
    showWarning: (msg) => showNotification(msg, 'warning'),
    showInfo: (msg) => showNotification(msg, 'info'),
  };

  return (
    <SimpleNotificationContext.Provider value={value}>
      {children}
      <SimpleNotificationDisplay />
    </SimpleNotificationContext.Provider>
  );
};

export const useSimpleNotifications = () => {
  const context = useContext(SimpleNotificationContext);
  if (!context) {
    // Si no hay contexto, crear funciones de fallback
    return {
      showNotification: (message, type) => {
        const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
        console.log(`${emoji} ${type?.toUpperCase() || 'INFO'}: ${message}`);
        alert(`${emoji} ${message}`);
      },
      showSuccess: (msg) => {
        console.log(`✅ SUCCESS: ${msg}`);
        alert(`✅ ${msg}`);
      },
      showError: (msg) => {
        console.log(`❌ ERROR: ${msg}`);
        alert(`❌ ${msg}`);
      },
      showWarning: (msg) => {
        console.log(`⚠️ WARNING: ${msg}`);
        alert(`⚠️ ${msg}`);
      },
      showInfo: (msg) => {
        console.log(`ℹ️ INFO: ${msg}`);
        alert(`ℹ️ ${msg}`);
      },
      notifications: [],
      removeNotification: () => {}
    };
  }
  return context;
};

// Componente simple para mostrar notificaciones
const SimpleNotificationDisplay = () => {
  const { notifications, removeNotification } = useContext(SimpleNotificationContext);

  if (notifications.length === 0) {
    return null;
  }

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            px-4 py-3 rounded border-l-4 shadow-lg
            ${getStyles(notification.type)}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {getIcon(notification.type)}
              </span>
              <span className="text-sm font-medium">
                {notification.message}
              </span>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-lg hover:opacity-75"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleNotificationProvider;
