# Solución de Problemas - CacaoControl

## 🚨 Errores Comunes y Sus Soluciones

### Error 1: Problema con Tailwind CSS PostCSS Plugin

**Error:**
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin...
```

**Solución:**
```bash
# Ejecutar el script de solución automática
./fix-errors.sh
```

O manualmente:
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm uninstall tailwindcss @tailwindcss/forms
npm install -D tailwindcss@^3.4.0 @tailwindcss/forms
npm start
```

### Error 2: React Hook llamado condicionalmente

**Error:**
```
React Hook "useAuth" is called conditionally...
```

**Solución:**
Este error ya fue corregido en el código. Si persiste, asegúrate de que todos los hooks de React se llamen al inicio del componente, antes de cualquier return condicional.

### Error 3: Problemas de compilación con CSS

**Solución:**
1. Verifica que `postcss.config.js` tenga la configuración correcta:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

2. Verifica que `tailwind.config.js` esté configurado correctamente:
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### Error 4: Problemas con Create React App

**Solución usando CRACO:**
```bash
cd client
npm install @craco/craco --save-dev
```

Actualiza `package.json`:
```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

## 🔧 Comandos Útiles para Debugging

### Limpiar caché y reinstalar
```bash
cd client
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Verificar versiones instaladas
```bash
npm list tailwindcss
npm list react
npm list react-scripts
```

### Verificar configuración de Tailwind
```bash
npx tailwindcss --help
```

### Compilar CSS manualmente (para testing)
```bash
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

## 🐛 Debugging del Backend

### Verificar que MongoDB esté ejecutándose
```bash
# En macOS con Homebrew
brew services start mongodb-community

# En Ubuntu/Debian
sudo systemctl status mongod
sudo systemctl start mongod
```

### Verificar conexión a la base de datos
```bash
cd server
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cacao_control')
  .then(() => console.log('✅ Conexión exitosa a MongoDB'))
  .catch(err => console.error('❌ Error:', err));
"
```

### Verificar que el servidor backend esté ejecutándose
```bash
curl http://localhost:5000/api/health
```

## 🌐 Problemas de Red y APIs

### Error de CORS
Si ves errores de CORS, verifica que en `server/index.js` esté configurado correctamente:
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://cacaocontrol-granada.com' 
    : 'http://localhost:3000',
  credentials: true
}));
```

### APIs Externas
Para configurar las APIs externas, edita el archivo `.env`:
```env
OPENWEATHER_API_KEY=tu_api_key_aqui
GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

## 🔍 Logs y Monitoreo

### Ver logs del frontend
Los errores aparecerán en la consola del navegador (F12 → Console)

### Ver logs del backend
```bash
cd server
npm start
# Los logs aparecerán en la terminal
```

### Usar herramientas de desarrollo
- **React Developer Tools**: Para debugging de componentes
- **Network Tab**: Para verificar llamadas a la API
- **Console**: Para errores de JavaScript

## 📱 Problemas de Responsividad

### Verificar breakpoints de Tailwind
```css
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

### Testing en diferentes dispositivos
```bash
# Abrir en modo responsive
# Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
```

## 🚀 Optimización de Rendimiento

### Bundle analyzer para React
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Optimizar imágenes
```bash
# Comprimir imágenes antes de subirlas
# Usar formatos modernos: WebP, AVIF
```

## 📞 Obtener Ayuda

### Información del sistema
```bash
node --version
npm --version
git --version
```

### Generar reporte de error
```bash
cd client
npm run build 2>&1 | tee error-report.txt
```

### Contacto de Soporte
- **Email**: soporte@cacaocontrol-granada.com
- **GitHub Issues**: Crear un issue con el reporte de error
- **Documentación**: README.md y DEPLOYMENT.md

## 🔄 Reinicio Completo

Si nada más funciona, ejecuta estos comandos para reiniciar completamente:

```bash
# Detener todos los procesos
pkill -f "react-scripts"
pkill -f "node"

# Limpiar todo
cd Proyecto_Cacao
rm -rf client/node_modules client/package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar todo
npm install
cd client && npm install

# Configurar variables de entorno
cp ../env.example ../.env

# Iniciar de nuevo
cd ..
npm run dev
```

---

**💡 Consejo**: Siempre verifica que tengas las versiones correctas de Node.js (v16+) y npm antes de reportar problemas.
