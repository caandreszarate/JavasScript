import React from 'react';
import { useApp } from '../../context/AppContext';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            p-4 rounded-lg border shadow-lg transition-all duration-300
            ${getStyles(notification.type)}
          `}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 text-lg mr-3">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              {notification.title && (
                <h4 className="text-sm font-medium mb-1">
                  {notification.title}
                </h4>
              )}
              <p className="text-sm">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 ml-4 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors text-lg"
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
