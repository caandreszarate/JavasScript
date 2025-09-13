import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoteFormularioSimple = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lote, setLote] = useState({
    nombre: '',
    ubicacion: {
      coordenadas: {
        latitud: 3.1569,
        longitud: -73.7069
      },
      municipio: 'Granada',
      departamento: 'Meta',
      pais: 'Colombia'
    },
    area: '',
    fecha_siembra: '',
    variedad_cacao: '',
    numero_plantas: ''
  });

  const variedadesCacao = [
    'Trinitario',
    'Forastero', 
    'Criollo',
    'CCN-51',
    'TSH-565',
    'ICS-1',
    'ICS-6',
    'Otra'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const keys = name.split('.');
      setLote(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: keys[2] ? {
            ...prev[keys[0]][keys[1]],
            [keys[2]]: value
          } : value
        }
      }));
    } else {
      setLote(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('🚀 Iniciando creación de lote...');
    console.log('📋 Datos del lote:', lote);

    try {
      const loteData = {
        ...lote,
        area: parseFloat(lote.area),
        numero_plantas: parseInt(lote.numero_plantas),
        ubicacion: {
          ...lote.ubicacion,
          coordenadas: {
            latitud: parseFloat(lote.ubicacion.coordenadas.latitud),
            longitud: parseFloat(lote.ubicacion.coordenadas.longitud)
          }
        }
      };

      console.log('📤 Enviando datos:', loteData);

      const response = await axios.post('/api/lotes', loteData);
      
      console.log('📥 Respuesta recibida:', response.data);

      if (response.data.success) {
        console.log('✅ Lote creado exitosamente');
        alert('✅ Lote creado exitosamente');
        navigate('/lotes');
      } else {
        console.log('❌ Error en la respuesta:', response.data.message);
        alert(`❌ Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('❌ Error completo:', error);
      
      let mensaje = 'Error desconocido';
      
      if (error.response) {
        console.error('📄 Respuesta de error:', error.response.data);
        mensaje = error.response.data?.message || `Error del servidor: ${error.response.status}`;
        
        if (error.response.data?.errores) {
          console.error('📝 Errores de validación:', error.response.data.errores);
          mensaje += '\nErrores: ' + error.response.data.errores.join(', ');
        }
      } else if (error.request) {
        console.error('📡 Error de red:', error.request);
        mensaje = 'Error de conexión con el servidor';
      } else {
        console.error('⚙️ Error de configuración:', error.message);
        mensaje = error.message;
      }
      
      alert(`❌ ${mensaje}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🌱 Nuevo Lote (Versión Simple)
              </h1>
              <p className="text-gray-600 mt-2">
                Formulario simplificado para diagnóstico
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/lotes')}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">
                  Nombre del Lote *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={lote.nombre}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Ej: Lote Norte"
                />
              </div>

              <div>
                <label className="form-label">
                  Área (hectáreas) *
                </label>
                <input
                  type="number"
                  name="area"
                  value={lote.area}
                  onChange={handleChange}
                  className="form-input"
                  step="0.01"
                  min="0.01"
                  required
                  placeholder="Ej: 2.5"
                />
              </div>

              <div>
                <label className="form-label">
                  Fecha de Siembra *
                </label>
                <input
                  type="date"
                  name="fecha_siembra"
                  value={lote.fecha_siembra}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  Variedad de Cacao *
                </label>
                <select
                  name="variedad_cacao"
                  value={lote.variedad_cacao}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar variedad</option>
                  {variedadesCacao.map(variedad => (
                    <option key={variedad} value={variedad}>
                      {variedad}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">
                  Número de Plantas *
                </label>
                <input
                  type="number"
                  name="numero_plantas"
                  value={lote.numero_plantas}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  required
                  placeholder="Ej: 1000"
                />
              </div>

              <div>
                <label className="form-label">
                  Latitud
                </label>
                <input
                  type="number"
                  name="ubicacion.coordenadas.latitud"
                  value={lote.ubicacion.coordenadas.latitud}
                  onChange={handleChange}
                  className="form-input"
                  step="any"
                  placeholder="Ej: 3.1569"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/lotes')}
                className="btn-secondary"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner inline-block w-4 h-4 mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  'Crear Lote'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <div className="text-sm space-y-1">
              <p>Todos los mensajes aparecerán en console.log y alert</p>
              <p>Revisa la consola del navegador para más detalles</p>
              <p>Estado actual: {loading ? 'Cargando...' : 'Listo'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoteFormularioSimple;
