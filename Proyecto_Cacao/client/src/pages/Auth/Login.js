import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const { showSuccess, showError } = useApp();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        showSuccess(result.message);
        navigate('/dashboard');
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Error inesperado al iniciar sesión');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo - Información */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-cacao flex-col justify-center p-12 text-white">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🌱</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">CacaoControl</h1>
            <p className="text-xl text-cacao-100">
              Sistema de Gestión de Cultivo de Cacao
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-lg">📍</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Específico para Granada, Meta</h3>
                <p className="text-cacao-100 text-sm">
                  Adaptado al clima tropical húmedo y condiciones específicas de la región
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Control Integral</h3>
                <p className="text-cacao-100 text-sm">
                  Gestiona lotes, aplicaciones químicas, gastos y genera reportes detallados
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-lg">⏰</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Calendario Automatizado</h3>
                <p className="text-cacao-100 text-sm">
                  Programa aplicaciones cada 20 días con alertas inteligentes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Logo para mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-cacao rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🌱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">CacaoControl</h1>
            <p className="text-gray-600">Granada, Meta</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-gray-600">
                Accede a tu sistema de gestión de cacao
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="form-input"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="form-input pr-10"
                    placeholder="Tu contraseña"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-cacao-600 focus:ring-cacao-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-cacao-600 hover:text-cacao-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full btn-primary
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link
                  to="/registro"
                  className="font-medium text-cacao-600 hover:text-cacao-500"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Desarrollado para productores de cacao en Granada, Meta, Colombia
            </p>
            <p className="mt-2">
              Soporte: soporte@cacaocontrol-granada.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
