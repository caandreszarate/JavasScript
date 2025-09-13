import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showSuccess, showError } = useApp();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    cedula: '',
    finca: {
      nombre: '',
      area_total: '',
      ubicacion: {
        vereda: '',
        coordenadas: {
          latitud: '',
          longitud: ''
        }
      }
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const keys = name.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        let current = newData;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.cedula.trim()) newErrors.cedula = 'La cédula es requerida';
    if (!formData.finca.nombre.trim()) newErrors['finca.nombre'] = 'El nombre de la finca es requerido';
    if (!formData.finca.area_total) newErrors['finca.area_total'] = 'El área total es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Por favor, corrige los errores en el formulario');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const result = await register(formData);
      
      if (result.success) {
        showSuccess('¡Registro exitoso! Bienvenido a CacaoControl');
        navigate('/dashboard');
      } else {
        showError(result.message);
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      showError('Error inesperado al registrar usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-cacao rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🌱</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Únete a CacaoControl
          </h1>
          <p className="text-gray-600">
            Registra tu finca y comienza a gestionar tu cultivo de cacao
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-input"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                  {errors.nombre && <p className="form-error">{errors.nombre}</p>}
                </div>
                
                <div>
                  <label className="form-label">Apellido *</label>
                  <input
                    type="text"
                    name="apellido"
                    className="form-input"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                  {errors.apellido && <p className="form-error">{errors.apellido}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="form-input"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 3001234567"
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Cédula *</label>
                <input
                  type="text"
                  name="cedula"
                  className="form-input"
                  value={formData.cedula}
                  onChange={handleChange}
                  required
                />
                {errors.cedula && <p className="form-error">{errors.cedula}</p>}
              </div>
            </div>

            {/* Información de la Finca */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información de la Finca
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nombre de la Finca *</label>
                  <input
                    type="text"
                    name="finca.nombre"
                    className="form-input"
                    value={formData.finca.nombre}
                    onChange={handleChange}
                    required
                  />
                  {errors['finca.nombre'] && <p className="form-error">{errors['finca.nombre']}</p>}
                </div>
                
                <div>
                  <label className="form-label">Área Total (hectáreas) *</label>
                  <input
                    type="number"
                    name="finca.area_total"
                    className="form-input"
                    value={formData.finca.area_total}
                    onChange={handleChange}
                    step="0.1"
                    min="0.1"
                    required
                  />
                  {errors['finca.area_total'] && <p className="form-error">{errors['finca.area_total']}</p>}
                </div>
              </div>
              
              <div>
                <label className="form-label">Vereda</label>
                <input
                  type="text"
                  name="finca.ubicacion.vereda"
                  className="form-input"
                  value={formData.finca.ubicacion.vereda}
                  onChange={handleChange}
                  placeholder="Nombre de la vereda"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Latitud (opcional)</label>
                  <input
                    type="number"
                    name="finca.ubicacion.coordenadas.latitud"
                    className="form-input"
                    value={formData.finca.ubicacion.coordenadas.latitud}
                    onChange={handleChange}
                    step="0.000001"
                    placeholder="Ej: 3.123456"
                  />
                </div>
                
                <div>
                  <label className="form-label">Longitud (opcional)</label>
                  <input
                    type="number"
                    name="finca.ubicacion.coordenadas.longitud"
                    className="form-input"
                    value={formData.finca.ubicacion.coordenadas.longitud}
                    onChange={handleChange}
                    step="0.000001"
                    placeholder="Ej: -73.123456"
                  />
                </div>
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contraseña
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Contraseña *</label>
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  {errors.password && <p className="form-error">{errors.password}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    Mínimo 6 caracteres
                  </p>
                </div>
                
                <div>
                  <label className="form-label">Confirmar Contraseña *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Términos y condiciones */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 text-cacao-600 focus:ring-cacao-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Acepto los{' '}
                <Link to="/terminos" className="text-cacao-600 hover:text-cacao-500">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link to="/privacidad" className="text-cacao-600 hover:text-cacao-500">
                  política de privacidad
                </Link>
              </label>
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
                  Registrando...
                </div>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/login"
                className="font-medium text-cacao-600 hover:text-cacao-500"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
