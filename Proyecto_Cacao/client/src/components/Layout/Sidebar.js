import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  MapIcon,
  BeakerIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  CogIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, isMobile } = useApp();
  const { usuario, hasPermission } = useAuth();

  // Elementos del menú
  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      permission: null // Accesible para todos
    },
    {
      name: 'Gestión de Lotes',
      href: '/lotes',
      icon: MapIcon,
      permission: 'lotes:leer'
    },
    {
      name: 'Aplicaciones Químicas',
      href: '/aplicaciones',
      icon: BeakerIcon,
      permission: 'aplicaciones:leer'
    },
    {
      name: 'Control de Gastos',
      href: '/gastos',
      icon: CurrencyDollarIcon,
      permission: 'gastos:leer'
    },
    {
      name: 'Reportes',
      href: '/reportes',
      icon: DocumentChartBarIcon,
      permission: 'reportes:leer'
    },
    {
      name: 'Configuración',
      href: '/configuracion',
      icon: CogIcon,
      permission: null // Accesible para todos
    }
  ];

  // Filtrar elementos según permisos
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.permission) return true;
    const [recurso, accion] = item.permission.split(':');
    return hasPermission(recurso, accion);
  });

  const isActiveRoute = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-white border-r border-gray-200 shadow-lg
      `}>
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-cacao rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CacaoControl</h1>
              <p className="text-xs text-gray-500">Granada, Meta</p>
            </div>
          </div>
          
          {/* Botón cerrar en mobile */}
          {isMobile() && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Información del usuario */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-cacao-100 rounded-full flex items-center justify-center">
              <span className="text-cacao-600 font-semibold text-sm">
                {usuario?.nombre?.charAt(0)}{usuario?.apellido?.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {usuario?.nombre_completo}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {usuario?.finca?.nombre}
              </p>
              <span className={`
                inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                ${usuario?.rol === 'admin' ? 'bg-purple-100 text-purple-800' :
                  usuario?.rol === 'supervisor' ? 'bg-blue-100 text-blue-800' :
                  usuario?.rol === 'tecnico' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'}
              `}>
                {usuario?.rol}
              </span>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  nav-link group
                  ${isActive ? 'active' : ''}
                `}
                onClick={() => {
                  if (isMobile()) {
                    toggleSidebar();
                  }
                }}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-cacao-600 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              CacaoControl v1.0.0
            </p>
            <p className="text-xs text-gray-400 mt-1">
              © 2024 Granada, Meta
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
