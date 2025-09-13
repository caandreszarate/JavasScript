import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationContainer from '../UI/NotificationContainer';
import { useApp } from '../../context/AppContext';

const Layout = () => {
  const { sidebarOpen, isMobile } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Overlay para mobile cuando sidebar está abierto */}
      {isMobile() && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => {}} // Se manejará en Sidebar
        />
      )}

      {/* Contenido principal */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <Header />
        
        {/* Contenido de la página */}
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Contenedor de notificaciones */}
      <NotificationContainer />
    </div>
  );
};

export default Layout;
