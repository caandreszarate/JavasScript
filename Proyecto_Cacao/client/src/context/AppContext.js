import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Estado inicial
const initialState = {
  // UI State
  sidebarOpen: true,
  theme: 'light',
  language: 'es',
  
  // Loading states
  loading: {
    lotes: false,
    aplicaciones: false,
    gastos: false,
    reportes: false
  },
  
  // Notificaciones
  notifications: [],
  
  // Cache de datos
  cache: {
    lotes: null,
    aplicaciones: null,
    gastos: null,
    lastUpdate: null
  },
  
  // Filtros globales
  filters: {
    dateRange: {
      start: null,
      end: null
    },
    selectedLote: null
  },
  
  // Configuración de la aplicación
  config: {
    refreshInterval: 300000, // 5 minutos
    autoSave: true,
    notifications: {
      email: true,
      push: true,
      sound: true
    }
  }
};

// Tipos de acciones
const AppActionTypes = {
  // UI Actions
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  
  // Loading Actions
  SET_LOADING: 'SET_LOADING',
  
  // Notification Actions
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  
  // Cache Actions
  SET_CACHE: 'SET_CACHE',
  CLEAR_CACHE: 'CLEAR_CACHE',
  UPDATE_CACHE: 'UPDATE_CACHE',
  
  // Filter Actions
  SET_DATE_RANGE: 'SET_DATE_RANGE',
  SET_SELECTED_LOTE: 'SET_SELECTED_LOTE',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  
  // Config Actions
  UPDATE_CONFIG: 'UPDATE_CONFIG'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case AppActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };

    case AppActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };

    case AppActionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };

    case AppActionTypes.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value
        }
      };

    case AppActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };

    case AppActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };

    case AppActionTypes.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };

    case AppActionTypes.SET_CACHE:
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload.key]: action.payload.data,
          lastUpdate: new Date().toISOString()
        }
      };

    case AppActionTypes.UPDATE_CACHE:
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload.key]: {
            ...state.cache[action.payload.key],
            ...action.payload.data
          },
          lastUpdate: new Date().toISOString()
        }
      };

    case AppActionTypes.CLEAR_CACHE:
      return {
        ...state,
        cache: {
          lotes: null,
          aplicaciones: null,
          gastos: null,
          lastUpdate: null
        }
      };

    case AppActionTypes.SET_DATE_RANGE:
      return {
        ...state,
        filters: {
          ...state.filters,
          dateRange: action.payload
        }
      };

    case AppActionTypes.SET_SELECTED_LOTE:
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedLote: action.payload
        }
      };

    case AppActionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          dateRange: { start: null, end: null },
          selectedLote: null
        }
      };

    case AppActionTypes.UPDATE_CONFIG:
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

// Crear contexto
const AppContext = createContext();

// Provider del contexto
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Acciones UI
  const toggleSidebar = useCallback(() => {
    dispatch({ type: AppActionTypes.TOGGLE_SIDEBAR });
  }, []);

  const setTheme = useCallback((theme) => {
    dispatch({ type: AppActionTypes.SET_THEME, payload: theme });
    localStorage.setItem('theme', theme);
  }, []);

  const setLanguage = useCallback((language) => {
    dispatch({ type: AppActionTypes.SET_LANGUAGE, payload: language });
    localStorage.setItem('language', language);
  }, []);

  // Acciones de Loading
  const setLoading = useCallback((key, value) => {
    dispatch({
      type: AppActionTypes.SET_LOADING,
      payload: { key, value }
    });
  }, []);

  // Acciones de Notificaciones
  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const notificationWithId = {
      id,
      type: 'info',
      autoRemove: true,
      duration: 5000,
      ...notification
    };

    dispatch({
      type: AppActionTypes.ADD_NOTIFICATION,
      payload: notificationWithId
    });

    // Auto-remove notification
    if (notificationWithId.autoRemove) {
      setTimeout(() => {
        dispatch({
          type: AppActionTypes.REMOVE_NOTIFICATION,
          payload: id
        });
      }, notificationWithId.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({
      type: AppActionTypes.REMOVE_NOTIFICATION,
      payload: id
    });
  }, []);

  const clearNotifications = useCallback(() => {
    dispatch({ type: AppActionTypes.CLEAR_NOTIFICATIONS });
  }, []);

  // Helpers para tipos específicos de notificaciones
  const showSuccess = useCallback((message, options = {}) => {
    return addNotification({
      type: 'success',
      message,
      ...options
    });
  }, [addNotification]);

  const showError = useCallback((message, options = {}) => {
    return addNotification({
      type: 'error',
      message,
      duration: 7000,
      ...options
    });
  }, [addNotification]);

  const showWarning = useCallback((message, options = {}) => {
    return addNotification({
      type: 'warning',
      message,
      ...options
    });
  }, [addNotification]);

  const showInfo = useCallback((message, options = {}) => {
    return addNotification({
      type: 'info',
      message,
      ...options
    });
  }, [addNotification]);

  // Función genérica showNotification que mapea a los tipos específicos
  const showNotification = useCallback((message, type = 'info', options = {}) => {
    switch (type) {
      case 'success':
        return showSuccess(message, options);
      case 'error':
        return showError(message, options);
      case 'warning':
        return showWarning(message, options);
      case 'info':
      default:
        return showInfo(message, options);
    }
  }, [showSuccess, showError, showWarning, showInfo]);

  // Acciones de Cache
  const setCache = useCallback((key, data) => {
    dispatch({
      type: AppActionTypes.SET_CACHE,
      payload: { key, data }
    });
  }, []);

  const updateCache = useCallback((key, data) => {
    dispatch({
      type: AppActionTypes.UPDATE_CACHE,
      payload: { key, data }
    });
  }, []);

  const clearCache = useCallback(() => {
    dispatch({ type: AppActionTypes.CLEAR_CACHE });
  }, []);

  // Función para verificar si el cache es válido
  const isCacheValid = useCallback((key, maxAge = 300000) => { // 5 minutos por defecto
    const cacheData = state.cache[key];
    const lastUpdate = state.cache.lastUpdate;
    
    if (!cacheData || !lastUpdate) return false;
    
    const now = new Date();
    const cacheTime = new Date(lastUpdate);
    const age = now - cacheTime;
    
    return age < maxAge;
  }, [state.cache]);

  // Acciones de Filtros
  const setDateRange = useCallback((start, end) => {
    dispatch({
      type: AppActionTypes.SET_DATE_RANGE,
      payload: { start, end }
    });
  }, []);

  const setSelectedLote = useCallback((loteId) => {
    dispatch({
      type: AppActionTypes.SET_SELECTED_LOTE,
      payload: loteId
    });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: AppActionTypes.CLEAR_FILTERS });
  }, []);

  // Acciones de Configuración
  const updateConfig = useCallback((configUpdates) => {
    dispatch({
      type: AppActionTypes.UPDATE_CONFIG,
      payload: configUpdates
    });
    
    // Guardar en localStorage
    const newConfig = { ...state.config, ...configUpdates };
    localStorage.setItem('appConfig', JSON.stringify(newConfig));
  }, [state.config]);

  // Función para formatear fechas según el idioma
  const formatDate = useCallback((date, options = {}) => {
    const locale = state.language === 'es' ? 'es-CO' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    }).format(new Date(date));
  }, [state.language]);

  // Función para formatear números/moneda
  const formatCurrency = useCallback((amount) => {
    const locale = state.language === 'es' ? 'es-CO' : 'en-US';
    const currency = 'COP'; // Pesos colombianos
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }, [state.language]);

  // Función para formatear números
  const formatNumber = useCallback((number, decimals = 0) => {
    const locale = state.language === 'es' ? 'es-CO' : 'en-US';
    
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(number);
  }, [state.language]);

  // Función para obtener texto traducido (simple)
  const t = useCallback((key, defaultText) => {
    // Aquí se podría implementar un sistema de traducción más complejo
    // Por ahora retorna el texto por defecto
    return defaultText || key;
  }, [state.language]);

  // Función para verificar si es mobile
  const isMobile = useCallback(() => {
    return window.innerWidth < 768;
  }, []);

  const value = {
    // Estado
    sidebarOpen: state.sidebarOpen,
    theme: state.theme,
    language: state.language,
    loading: state.loading,
    notifications: state.notifications,
    cache: state.cache,
    filters: state.filters,
    config: state.config,
    
    // Acciones UI
    toggleSidebar,
    setTheme,
    setLanguage,
    
    // Acciones Loading
    setLoading,
    
    // Acciones Notificaciones
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showNotification,
    
    // Acciones Cache
    setCache,
    updateCache,
    clearCache,
    isCacheValid,
    
    // Acciones Filtros
    setDateRange,
    setSelectedLote,
    clearFilters,
    
    // Acciones Configuración
    updateConfig,
    
    // Utilidades
    formatDate,
    formatCurrency,
    formatNumber,
    t,
    isMobile
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export default AppContext;
