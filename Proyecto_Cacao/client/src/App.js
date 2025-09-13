import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { SimpleNotificationProvider } from './components/UI/SimpleNotifications';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Lotes from './pages/Lotes/Lotes';
import LoteDetalle from './pages/Lotes/LoteDetalle';
import LoteFormulario from './pages/Lotes/LoteFormulario';
import LoteFormularioSimple from './pages/Lotes/LoteFormularioSimple';
import Aplicaciones from './pages/Aplicaciones/Aplicaciones';
import AplicacionDetalle from './pages/Aplicaciones/AplicacionDetalle';
import Gastos from './pages/Gastos/Gastos';
import Reportes from './pages/Reportes/Reportes';
import Configuracion from './pages/Configuracion/Configuracion';
import TestNotifications from './pages/TestNotifications';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppProvider>
          <SimpleNotificationProvider>
            <Router>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              
              {/* Rutas protegidas */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                
                {/* Gestión de Lotes */}
                <Route path="lotes" element={<Lotes />} />
                <Route path="lotes/nuevo" element={<LoteFormulario />} />
                <Route path="lotes/nuevo-simple" element={<LoteFormularioSimple />} />
                <Route path="lotes/:id" element={<LoteDetalle />} />
                <Route path="lotes/:id/editar" element={<LoteFormulario />} />
                
                {/* Aplicaciones Químicas */}
                <Route path="aplicaciones" element={<Aplicaciones />} />
                <Route path="aplicaciones/:id" element={<AplicacionDetalle />} />
                
                {/* Control de Gastos */}
                <Route path="gastos" element={<Gastos />} />
                
                {/* Reportes */}
                <Route path="reportes" element={<Reportes />} />
                
                {/* Configuración */}
                <Route path="configuracion" element={<Configuracion />} />
                
                {/* Test de Notificaciones (temporal) */}
                <Route path="test-notifications" element={<TestNotifications />} />
              </Route>
              
              {/* Ruta por defecto */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            </Router>
          </SimpleNotificationProvider>
        </AppProvider>
      </AuthProvider>
    </div>
  );
}

export default App;