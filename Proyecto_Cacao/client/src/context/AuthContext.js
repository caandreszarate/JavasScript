import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Estado inicial
const initialState = {
  usuario: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Tipos de acciones
const AuthActionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  LOAD_USER_START: 'LOAD_USER_START',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE: 'LOAD_USER_FAILURE',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
    case AuthActionTypes.REGISTER_START:
    case AuthActionTypes.LOAD_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
      return {
        ...state,
        usuario: action.payload.usuario,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AuthActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        usuario: action.payload.usuario,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AuthActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        usuario: { ...state.usuario, ...action.payload }
      };

    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.REGISTER_FAILURE:
    case AuthActionTypes.LOAD_USER_FAILURE:
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        usuario: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case AuthActionTypes.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        usuario: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };

    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Crear contexto
const AuthContext = createContext();

// Configurar axios interceptors
const setupAxiosInterceptors = (dispatch) => {
  // Request interceptor para agregar token
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor para manejar errores de autenticación
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            const response = await axios.post('/api/auth/refresh', {
              refreshToken
            });

            const { token, refreshToken: newRefreshToken } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          dispatch({ type: AuthActionTypes.LOGOUT });
          window.location.href = '/login';
        }
      }

      return Promise.reject(error);
    }
  );
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Configurar interceptors al montar el componente
  useEffect(() => {
    setupAxiosInterceptors(dispatch);
    loadUser();
  }, []);

  // Configurar base URL de axios
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

  // Cargar usuario al iniciar la aplicación
  const loadUser = async () => {
    if (!state.token) {
      dispatch({ type: AuthActionTypes.LOAD_USER_FAILURE, payload: 'No token found' });
      return;
    }

    try {
      dispatch({ type: AuthActionTypes.LOAD_USER_START });
      const response = await axios.get('/api/auth/perfil');
      
      dispatch({
        type: AuthActionTypes.LOAD_USER_SUCCESS,
        payload: response.data.data
      });
    } catch (error) {
      console.error('Error loading user:', error);
      dispatch({
        type: AuthActionTypes.LOAD_USER_FAILURE,
        payload: error.response?.data?.message || 'Error al cargar usuario'
      });
    }
  };

  // Función de login
  const login = async (email, password) => {
    try {
      dispatch({ type: AuthActionTypes.LOGIN_START });
      
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: response.data.data
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: errorMessage
      });
      return { success: false, message: errorMessage };
    }
  };

  // Función de registro
  const register = async (userData) => {
    try {
      dispatch({ type: AuthActionTypes.REGISTER_START });
      
      const response = await axios.post('/api/auth/registro', userData);

      dispatch({
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: response.data.data
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario';
      dispatch({
        type: AuthActionTypes.REGISTER_FAILURE,
        payload: errorMessage
      });
      return { success: false, message: errorMessage, errors: error.response?.data?.errores };
    }
  };

  // Función de logout
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      dispatch({ type: AuthActionTypes.LOGOUT });
    }
  };

  // Función para actualizar perfil
  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/auth/perfil', profileData);
      
      dispatch({
        type: AuthActionTypes.UPDATE_PROFILE,
        payload: response.data.data.usuario
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al actualizar perfil';
      return { success: false, message: errorMessage, errors: error.response?.data?.errores };
    }
  };

  // Función para cambiar contraseña
  const changePassword = async (passwordData) => {
    try {
      const response = await axios.put('/api/auth/cambiar-password', passwordData);
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al cambiar contraseña';
      return { success: false, message: errorMessage };
    }
  };

  // Función para recuperar contraseña
  const forgotPassword = async (email) => {
    try {
      const response = await axios.post('/api/auth/recuperar-password', { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al enviar email de recuperación';
      return { success: false, message: errorMessage };
    }
  };

  // Función para limpiar errores
  const clearError = () => {
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });
  };

  // Función para verificar permisos
  const hasPermission = (recurso, accion) => {
    if (!state.usuario) return false;
    
    const { rol } = state.usuario;
    
    // Definir matriz de permisos (debe coincidir con el backend)
    const permisos = {
      admin: {
        lotes: ['crear', 'leer', 'actualizar', 'eliminar'],
        aplicaciones: ['crear', 'leer', 'actualizar', 'eliminar'],
        gastos: ['crear', 'leer', 'actualizar', 'eliminar'],
        usuarios: ['crear', 'leer', 'actualizar', 'eliminar'],
        reportes: ['leer', 'exportar']
      },
      supervisor: {
        lotes: ['leer', 'actualizar'],
        aplicaciones: ['leer', 'actualizar'],
        gastos: ['leer'],
        usuarios: ['leer'],
        reportes: ['leer', 'exportar']
      },
      tecnico: {
        lotes: ['leer'],
        aplicaciones: ['leer', 'actualizar'],
        gastos: ['leer'],
        usuarios: [],
        reportes: ['leer']
      },
      productor: {
        lotes: ['crear', 'leer', 'actualizar'],
        aplicaciones: ['crear', 'leer', 'actualizar'],
        gastos: ['crear', 'leer', 'actualizar'],
        usuarios: [],
        reportes: ['leer']
      }
    };
    
    const permisosUsuario = permisos[rol];
    return permisosUsuario && permisosUsuario[recurso] && permisosUsuario[recurso].includes(accion);
  };

  const value = {
    // Estado
    usuario: state.usuario,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    
    // Acciones
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    clearError,
    hasPermission,
    loadUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;
