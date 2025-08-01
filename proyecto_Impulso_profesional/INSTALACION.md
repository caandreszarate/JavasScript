# Guía de Instalación - Impulso Profesional

## Requisitos del Sistema

- **Hosting**: Hostinger (recomendado) o cualquier hosting con PHP 8.0+
- **Base de Datos**: MySQL 5.7+ o MariaDB 10.3+
- **PHP**: 8.0 o superior
- **Extensiones PHP**: PDO, MySQL, JSON, cURL, GD, mbstring
- **Espacio en Disco**: Mínimo 500MB
- **Ancho de Banda**: Recomendado ilimitado

## Paso 1: Preparación del Hosting

### 1.1 Crear Base de Datos en Hostinger

1. Accede al panel de control de Hostinger
2. Ve a **Bases de Datos** > **MySQL**
3. Crea una nueva base de datos:
   - **Nombre**: `impulso_profesional`
   - **Usuario**: `tu_usuario_db`
   - **Contraseña**: `tu_password_seguro`
   - **Host**: `localhost`

### 1.2 Configurar Dominio

1. En el panel de Hostinger, ve a **Dominios**
2. Configura tu dominio principal o subdominio
3. Asegúrate de que apunte al directorio `public_html`

## Paso 2: Subir Archivos

### 2.1 Subir vía FTP

1. Descarga todos los archivos del proyecto
2. Conecta vía FTP a tu hosting
3. Sube todos los archivos al directorio `public_html`
4. Asegúrate de mantener la estructura de carpetas

### 2.2 Subir vía File Manager

1. Accede al **File Manager** de Hostinger
2. Navega a `public_html`
3. Sube todos los archivos manteniendo la estructura

## Paso 3: Configurar Base de Datos

### 3.1 Importar Esquema

1. Accede a **phpMyAdmin** desde el panel de Hostinger
2. Selecciona tu base de datos `impulso_profesional`
3. Ve a la pestaña **Importar**
4. Sube el archivo `backend/database/schema.sql`
5. Ejecuta la importación

### 3.2 Verificar Tablas

Después de la importación, deberías ver las siguientes tablas:
- `users`
- `professional_profiles`
- `company_profiles`
- `job_postings`
- `applications`
- `job_categories`
- `skills`
- `notifications`
- `messages`
- `sessions`
- `activity_logs`
- `settings`

## Paso 4: Configurar Archivos

### 4.1 Configurar Base de Datos

Edita el archivo `backend/config/database.php`:

```php
// Cambiar estas líneas con tus credenciales de Hostinger
define('DB_HOST', 'localhost');
define('DB_NAME', 'impulso_profesional');
define('DB_USER', 'tu_usuario_db');
define('DB_PASS', 'tu_password_db');
```

### 4.2 Configurar Dominio

En el mismo archivo, cambia:

```php
define('APP_URL', 'https://tu-dominio.com');
```

### 4.3 Configurar JWT Secret

Cambia la clave JWT por una segura:

```php
define('JWT_SECRET', 'tu_clave_jwt_muy_segura_aqui');
```

### 4.4 Configurar Email (Opcional)

Si quieres usar el sistema de emails:

```php
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'tu_email@tudominio.com');
define('SMTP_PASS', 'tu_password_email');
define('SMTP_FROM', 'noreply@tudominio.com');
```

## Paso 5: Configurar Permisos

### 5.1 Permisos de Archivos

Configura los siguientes permisos vía FTP o File Manager:

```
uploads/ - 755
backend/uploads/ - 755
dashboard/uploads/ - 755
logs/ - 755 (si existe)
```

### 5.2 Verificar .htaccess

Asegúrate de que el archivo `.htaccess` esté en la raíz del proyecto y tenga los permisos correctos (644).

## Paso 6: Crear Directorios

### 6.1 Crear Carpetas de Uploads

Crea las siguientes carpetas si no existen:

```
uploads/
├── avatars/
├── resumes/
├── company_logos/
├── job_attachments/
└── temp/
```

### 6.2 Crear Carpetas de Logs

```
logs/
├── error.log
├── access.log
└── application.log
```

## Paso 7: Verificar Instalación

### 7.1 Probar Acceso

1. Visita tu dominio: `https://tu-dominio.com`
2. Deberías ver la página principal de Impulso Profesional
3. Prueba el registro de usuarios
4. Prueba el inicio de sesión

### 7.2 Verificar Dashboard

1. Regístrate como profesional
2. Accede al dashboard: `https://tu-dominio.com/dashboard/user/`
3. Verifica que todas las funcionalidades funcionen

### 7.3 Verificar API

Prueba los endpoints de la API:

```
GET https://tu-dominio.com/api/jobs/list
POST https://tu-dominio.com/api/auth/login
```

## Paso 8: Configuración Adicional

### 8.1 Configurar SSL

1. En Hostinger, ve a **SSL**
2. Activa SSL para tu dominio
3. Configura redirección HTTPS en `.htaccess`

### 8.2 Configurar Backup

1. Configura backup automático de la base de datos
2. Configura backup de archivos importantes
3. Prueba la restauración

### 8.3 Configurar Monitoreo

1. Configura alertas de error
2. Configura monitoreo de rendimiento
3. Configura logs de seguridad

## Paso 9: Optimización

### 9.1 Optimizar Base de Datos

```sql
-- Ejecutar en phpMyAdmin
OPTIMIZE TABLE users;
OPTIMIZE TABLE job_postings;
OPTIMIZE TABLE applications;
```

### 9.2 Configurar Caché

1. Activa caché de navegador
2. Configura caché de PHP si está disponible
3. Optimiza imágenes

### 9.3 Configurar CDN (Opcional)

Si tienes muchos usuarios, considera usar un CDN para archivos estáticos.

## Paso 10: Seguridad

### 10.1 Cambiar Contraseñas por Defecto

1. Cambia la contraseña del administrador
2. Cambia todas las claves JWT
3. Configura contraseñas seguras para la base de datos

### 10.2 Configurar Firewall

1. Configura firewall en Hostinger
2. Bloquea IPs maliciosas
3. Configura rate limiting

### 10.3 Configurar Logs de Seguridad

1. Activa logs de acceso
2. Configura alertas de seguridad
3. Revisa logs regularmente

## Solución de Problemas

### Error de Conexión a Base de Datos

1. Verifica credenciales en `database.php`
2. Verifica que la base de datos existe
3. Verifica permisos del usuario de la base de datos

### Error 500

1. Revisa logs de error en Hostinger
2. Verifica permisos de archivos
3. Verifica sintaxis PHP

### Error 404

1. Verifica configuración de `.htaccess`
2. Verifica rutas en el código
3. Verifica configuración de dominio

### Problemas de Upload

1. Verifica permisos de carpetas
2. Verifica límites de PHP (`upload_max_filesize`)
3. Verifica configuración de `.htaccess`

## Mantenimiento

### Actualizaciones

1. Haz backup antes de actualizar
2. Prueba en entorno de desarrollo
3. Actualiza archivos y base de datos
4. Verifica funcionalidad

### Backups

1. Backup diario de base de datos
2. Backup semanal de archivos
3. Prueba restauración regularmente

### Monitoreo

1. Revisa logs regularmente
2. Monitorea rendimiento
3. Configura alertas

## Contacto y Soporte

Para soporte técnico:
- Email: soporte@impulsoprofesionalge.org
- Documentación: [URL de documentación]
- GitHub: [URL del repositorio]

## Notas Importantes

1. **Siempre haz backup antes de cambios importantes**
2. **Prueba en entorno de desarrollo antes de producción**
3. **Mantén actualizado el sistema de seguridad**
4. **Monitorea el rendimiento regularmente**
5. **Documenta todos los cambios realizados**

---

**¡Tu plataforma Impulso Profesional está lista para conectar talento con oportunidades en Guinea Ecuatorial!** 