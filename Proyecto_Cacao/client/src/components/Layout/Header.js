import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Bars3Icon,
  BellIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const { usuario, logout } = useAuth();
  const { 
    toggleSidebar, 
    theme, 
    setTheme, 
    notifications, 
    formatDate 
  } = useApp();
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Obtener notificaciones no leídas
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Lado izquierdo */}
        <div className="flex items-center space-x-4">
          {/* Botón toggle sidebar */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          {/* Breadcrumb o título de página */}
          <div className="hidden sm:block">
            <h2 className="text-lg font-semibold text-gray-900">
              {getPageTitle()}
            </h2>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="flex items-center space-x-3">
          {/* Toggle tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
          >
            {theme === 'light' ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </button>

          {/* Notificaciones */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <BellIcon className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Dropdown de notificaciones */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatDate(notification.timestamp)}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <BellIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>No hay notificaciones</p>
                    </div>
                  )}
                </div>
                
                {notifications.length > 5 && (
                  <div className="p-3 border-t border-gray-200 text-center">
                    <button className="text-sm text-cacao-600 hover:text-cacao-700 font-medium">
                      Ver todas las notificaciones
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Menú de usuario */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-cacao-100 rounded-full flex items-center justify-center">
                <span className="text-cacao-600 font-semibold text-sm">
                  {usuario?.nombre?.charAt(0)}{usuario?.apellido?.charAt(0)}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {usuario?.nombre} {usuario?.apellido}
                </p>
                <p className="text-xs text-gray-500">
                  {usuario?.rol}
                </p>
              </div>
            </button>

            {/* Dropdown del menú de usuario */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {usuario?.nombre_completo}
                  </p>
                  <p className="text-xs text-gray-500">
                    {usuario?.email}
                  </p>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navegar a configuración
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <CogIcon className="w-4 h-4 mr-3" />
                    Configuración
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navegar a perfil
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserCircleIcon className="w-4 h-4 mr-3" />
                    Mi Perfil
                  </button>
                </div>
                
                <div className="py-1 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  function getPageTitle() {
    const path = window.location.pathname;
    const titles = {
      '/dashboard': 'Dashboard',
      '/lotes': 'Gestión de Lotes',
      '/aplicaciones': 'Aplicaciones Químicas',
      '/gastos': 'Control de Gastos',
      '/reportes': 'Reportes',
      '/configuracion': 'Configuración'
    };
    
    for (const [route, title] of Object.entries(titles)) {
      if (path.startsWith(route)) {
        return title;
      }
    }
    
    return 'CacaoControl';
  }
};

export default Header;
