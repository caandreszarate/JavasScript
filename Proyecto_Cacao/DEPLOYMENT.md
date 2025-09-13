# Guía de Despliegue - CacaoControl

Esta guía te ayudará a desplegar CacaoControl en diferentes entornos de producción.

## 📋 Requisitos Previos

### Software Necesario
- **Node.js** v16 o superior
- **MongoDB** v4.4 o superior (local o MongoDB Atlas)
- **Git** para control de versiones
- **PM2** para gestión de procesos en producción (opcional pero recomendado)

### APIs Externas (Opcionales)
- **OpenWeatherMap API** - Para datos meteorológicos reales
- **Google Maps API** - Para funcionalidades de mapas avanzadas
- **Cloudinary** - Para almacenamiento de imágenes en la nube

## 🚀 Despliegue Local

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd Proyecto_Cacao
```

### 2. Ejecutar Script de Instalación
```bash
./install.sh
```

### 3. Configurar Variables de Entorno
Edita el archivo `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cacao_control
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
```

### 4. Iniciar en Modo Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🌐 Despliegue en Producción

### Opción 1: Servidor VPS (Ubuntu/CentOS)

#### 1. Preparar el Servidor
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Instalar PM2
sudo npm install -g pm2
```

#### 2. Configurar MongoDB
```bash
# Iniciar MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Crear usuario para la base de datos
mongo
> use cacao_control
> db.createUser({
    user: "cacaouser",
    pwd: "password_seguro",
    roles: ["readWrite"]
  })
> exit
```

#### 3. Desplegar la Aplicación
```bash
# Clonar y configurar
git clone <url-del-repositorio>
cd Proyecto_Cacao

# Instalar dependencias
npm install
cd client && npm install && npm run build
cd ..

# Configurar variables de entorno para producción
cp env.example .env
nano .env
```

Configuración de producción en `.env`:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://cacaouser:password_seguro@localhost:27017/cacao_control
JWT_SECRET=jwt_secret_super_seguro_para_produccion
```

#### 4. Configurar PM2
```bash
# Crear archivo de configuración PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'cacao-control',
    script: 'server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
EOF

# Iniciar con PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

#### 5. Configurar Nginx (Proxy Reverso)
```bash
# Instalar Nginx
sudo apt install nginx -y

# Configurar sitio
sudo nano /etc/nginx/sites-available/cacaocontrol
```

Configuración de Nginx:
```nginx
server {
    listen 80;
    server_name cacaocontrol-granada.com www.cacaocontrol-granada.com;

    # Servir archivos estáticos del frontend
    location / {
        root /path/to/Proyecto_Cacao/client/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Proxy para API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/cacaocontrol /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 6. Configurar SSL con Let's Encrypt
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d cacaocontrol-granada.com -d www.cacaocontrol-granada.com
```

### Opción 2: Despliegue en la Nube

#### A. Heroku

1. **Preparar la aplicación**
```bash
# Crear Procfile
echo "web: node server/index.js" > Procfile

# Configurar package.json para Heroku
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
```

2. **Configurar variables de entorno en Heroku**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=tu_jwt_secret_seguro
heroku config:set MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/cacao_control
```

3. **Desplegar**
```bash
git add .
git commit -m "Preparar para despliegue en Heroku"
git push heroku main
```

#### B. DigitalOcean App Platform

1. **Conectar repositorio de GitHub**
2. **Configurar variables de entorno**
3. **Configurar build commands**:
   - Build: `npm install && cd client && npm install && npm run build`
   - Run: `node server/index.js`

#### C. AWS (EC2 + RDS + S3)

1. **EC2**: Seguir pasos similares al VPS
2. **RDS**: Usar MongoDB Atlas o DocumentDB
3. **S3**: Para almacenamiento de archivos estáticos
4. **CloudFront**: Para CDN

## 🔧 Configuración de Base de Datos

### MongoDB Local
```bash
# Crear base de datos y colecciones iniciales
mongo cacao_control
db.usuarios.createIndex({ "email": 1 }, { unique: true })
db.usuarios.createIndex({ "cedula": 1 }, { unique: true })
db.lotes.createIndex({ "usuario_id": 1 })
db.aplicacionesquimicas.createIndex({ "lote_id": 1, "fecha_programada": -1 })
db.gastos.createIndex({ "usuario_id": 1, "fecha_gasto": -1 })
```

### MongoDB Atlas (Cloud)
1. Crear cluster en MongoDB Atlas
2. Configurar usuario y permisos
3. Obtener string de conexión
4. Configurar IP whitelist

## 📊 Monitoreo y Mantenimiento

### Logs con PM2
```bash
# Ver logs en tiempo real
pm2 logs cacao-control

# Ver métricas
pm2 monit

# Reiniciar aplicación
pm2 restart cacao-control
```

### Backup de Base de Datos
```bash
# Backup automático diario
crontab -e

# Agregar línea para backup diario a las 2:00 AM
0 2 * * * mongodump --db cacao_control --out /backups/$(date +\%Y\%m\%d)
```

### Monitoreo de Salud
```bash
# Script de monitoreo
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health)
if [ $response != "200" ]; then
    pm2 restart cacao-control
    echo "$(date): Aplicación reiniciada" >> /var/log/cacao-control.log
fi
```

## 🔒 Seguridad

### Firewall
```bash
# Configurar UFW
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Actualizaciones
```bash
# Script de actualización
#!/bin/bash
cd /path/to/Proyecto_Cacao
git pull origin main
npm install
cd client && npm install && npm run build
pm2 restart cacao-control
```

## 📈 Optimización de Rendimiento

### Configuración de Nginx para Cache
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Configuración de Node.js
```bash
# Aumentar límites de memoria si es necesario
NODE_OPTIONS="--max-old-space-size=2048"
```

## 🆘 Solución de Problemas

### Problemas Comunes

1. **Error de conexión a MongoDB**
   - Verificar que MongoDB esté ejecutándose
   - Comprobar string de conexión
   - Verificar permisos de usuario

2. **Error 502 Bad Gateway**
   - Verificar que la aplicación Node.js esté ejecutándose
   - Comprobar configuración de Nginx
   - Revisar logs de PM2

3. **Problemas de permisos**
   - Verificar permisos de archivos
   - Comprobar usuario de ejecución

### Comandos Útiles
```bash
# Verificar estado de servicios
sudo systemctl status mongod
sudo systemctl status nginx
pm2 status

# Verificar puertos
sudo netstat -tulpn | grep :5000
sudo netstat -tulpn | grep :80

# Verificar logs
tail -f /var/log/nginx/error.log
pm2 logs cacao-control
```

## 📞 Soporte

Para soporte técnico:
- Email: soporte@cacaocontrol-granada.com
- Documentación: docs.cacaocontrol-granada.com
- Issues: GitHub Issues del repositorio

---

**Desarrollado con ❤️ para los productores de cacao de Granada, Meta, Colombia** 🇨🇴
