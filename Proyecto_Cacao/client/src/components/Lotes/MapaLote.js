import React, { useState, useEffect } from 'react';

const MapaLote = ({ lote }) => {
  const [mapaUrl, setMapaUrl] = useState('');
  const [coordenadas, setCoordenadas] = useState({
    latitud: lote.ubicacion.coordenadas.latitud,
    longitud: lote.ubicacion.coordenadas.longitud
  });

  useEffect(() => {
    if (lote && lote.ubicacion.coordenadas) {
      const lat = lote.ubicacion.coordenadas.latitud;
      const lng = lote.ubicacion.coordenadas.longitud;
      
      // Generar URL para Google Maps embebido
      const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'demo'}&q=${lat},${lng}&zoom=16&maptype=satellite`;
      setMapaUrl(googleMapsUrl);
    }
  }, [lote]);

  const abrirEnGoogleMaps = () => {
    const lat = coordenadas.latitud;
    const lng = coordenadas.longitud;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const copiarCoordenadas = async () => {
    const texto = `${coordenadas.latitud}, ${coordenadas.longitud}`;
    try {
      await navigator.clipboard.writeText(texto);
      // Mostrar notificación de éxito (se puede integrar con el sistema de notificaciones)
      alert('Coordenadas copiadas al portapapeles');
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Coordenadas de Granada, Meta para calcular distancia
  const granadaLat = 3.1569;
  const granadaLng = -73.7069;
  const distanciaGranada = calcularDistancia(
    coordenadas.latitud, 
    coordenadas.longitud, 
    granadaLat, 
    granadaLng
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          🗺️ Ubicación GPS del Lote
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={copiarCoordenadas}
            className="btn-outline"
            title="Copiar coordenadas"
          >
            📋 Copiar Coordenadas
          </button>
          <button
            onClick={abrirEnGoogleMaps}
            className="btn-primary"
          >
            🌐 Abrir en Google Maps
          </button>
        </div>
      </div>

      {/* Información de Coordenadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📍 Coordenadas
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Latitud:</label>
              <p className="font-mono text-lg font-semibold text-cacao-600">
                {coordenadas.latitud}°
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Longitud:</label>
              <p className="font-mono text-lg font-semibold text-cacao-600">
                {coordenadas.longitud}°
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Formato DMS:</label>
              <p className="text-sm text-gray-700">
                {convertirDMS(coordenadas.latitud, coordenadas.longitud)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📏 Información de Ubicación
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Distancia a Granada:</label>
              <p className="font-semibold text-verde-600">
                {distanciaGranada.toFixed(2)} km
              </p>
            </div>
            {lote.ubicacion.altitud && (
              <div>
                <label className="text-sm text-gray-600">Altitud:</label>
                <p className="font-semibold text-blue-600">
                  {lote.ubicacion.altitud} msnm
                </p>
              </div>
            )}
            <div>
              <label className="text-sm text-gray-600">Zona UTM:</label>
              <p className="font-semibold text-gray-700">
                {obtenerZonaUTM(coordenadas.longitud)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🌡️ Información Climática
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Zona Climática:</label>
              <p className="font-semibold text-green-600">
                Tropical húmeda
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Precipitación anual:</label>
              <p className="font-semibold text-blue-600">
                2,000-3,000 mm
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Temperatura promedio:</label>
              <p className="font-semibold text-orange-600">
                24-28°C
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🛰️ Vista Satelital
        </h3>
        
        {process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? (
          <div className="w-full h-96 rounded-lg overflow-hidden border">
            <iframe
              src={mapaUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa del lote ${lote.nombre}`}
            />
          </div>
        ) : (
          <div className="w-full h-96 bg-gray-100 rounded-lg border flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Mapa no disponible
              </h4>
              <p className="text-gray-600 mb-4">
                Configure la API key de Google Maps para ver el mapa interactivo
              </p>
              <button
                onClick={abrirEnGoogleMaps}
                className="btn-primary"
              >
                Ver en Google Maps
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enlaces Útiles */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🔗 Enlaces Útiles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${coordenadas.latitud},${coordenadas.longitud}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="text-2xl mr-3">🌐</span>
            <div>
              <p className="font-semibold">Google Maps</p>
              <p className="text-sm">Ver ubicación</p>
            </div>
          </a>

          <a
            href={`https://earth.google.com/web/search/${coordenadas.latitud},${coordenadas.longitud}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <span className="text-2xl mr-3">🌍</span>
            <div>
              <p className="font-semibold">Google Earth</p>
              <p className="text-sm">Vista 3D</p>
            </div>
          </a>

          <a
            href={`https://www.openstreetmap.org/?mlat=${coordenadas.latitud}&mlon=${coordenadas.longitud}&zoom=16`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <span className="text-2xl mr-3">🗺️</span>
            <div>
              <p className="font-semibold">OpenStreetMap</p>
              <p className="text-sm">Mapa libre</p>
            </div>
          </a>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-2xl mr-3">💡</span>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">
              Información sobre la Ubicación
            </h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Las coordenadas se muestran en formato decimal (WGS84)</li>
              <li>• La altitud puede afectar las características del cultivo</li>
              <li>• Granada, Meta está en la zona ideal para cultivo de cacao</li>
              <li>• Temperatura óptima: 24-28°C, precipitación: 1,500-2,500 mm/año</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Función auxiliar para convertir coordenadas decimales a DMS
const convertirDMS = (lat, lng) => {
  const convertir = (coord, isLat) => {
    const absolute = Math.abs(coord);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.floor((minutesFloat - minutes) * 60);
    
    const direction = isLat 
      ? (coord >= 0 ? 'N' : 'S')
      : (coord >= 0 ? 'E' : 'W');
    
    return `${degrees}°${minutes}'${seconds}"${direction}`;
  };

  return `${convertir(lat, true)}, ${convertir(lng, false)}`;
};

// Función auxiliar para obtener zona UTM
const obtenerZonaUTM = (lng) => {
  const zona = Math.floor((lng + 180) / 6) + 1;
  return `${zona}N`;
};

export default MapaLote;
