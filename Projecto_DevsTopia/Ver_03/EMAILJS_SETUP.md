# 🔧 Configuración de EmailJS para Envío de Emails

## 📋 Problema Actual
Tu formulario de contacto actualmente **NO envía emails reales** - solo simula el envío. Para solucionarlo, necesitas configurar EmailJS.

## 🚀 Solución: EmailJS (Gratuito)

### **Paso 1: Crear cuenta en EmailJS**
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Confirma tu email

### **Paso 2: Configurar Email Service**
1. En tu dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona "Gmail" (o el servicio que prefieras)
4. Conecta tu cuenta de Gmail
5. **Guarda el Service ID** (ejemplo: `service_abc123`)

### **Paso 3: Crear Email Template**
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este template:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo Mensaje de Contacto</title>
</head>
<body>
    <h2>Nuevo mensaje de contacto desde DevsTopia</h2>
    
    <h3>Información del remitente:</h3>
    <p><strong>Nombre:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    
    <h3>Detalles del mensaje:</h3>
    <p><strong>Asunto:</strong> {{subject}}</p>
    <p><strong>Mensaje:</strong></p>
    <p>{{message}}</p>
    
    <hr>
    <p><em>Este mensaje fue enviado desde el formulario de contacto de DevsTopia</em></p>
</body>
</html>
```

4. **Guarda el Template ID** (ejemplo: `template_xyz789`)

### **Paso 4: Obtener Public Key**
1. Ve a "Account" → "API Keys"
2. **Copia tu Public Key** (ejemplo: `user_public_key_123`)

### **Paso 5: Actualizar tu código**

Reemplaza en `index.html`:
```javascript
emailjs.init("TU_CLAVE_PUBLICA_AQUI");
```

Con tu clave real:
```javascript
emailjs.init("user_public_key_123");
```

Reemplaza en `script.js`:
```javascript
emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
```

Con tus IDs reales:
```javascript
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## 🎯 Configuración Completa

### **En index.html (línea 15):**
```javascript
emailjs.init("TU_CLAVE_PUBLICA_REAL");
```

### **En script.js (línea 280):**
```javascript
emailjs.send('TU_SERVICE_ID_REAL', 'TU_TEMPLATE_ID_REAL', templateParams)
```

## ✅ Verificación

1. **Abre tu sitio web**
2. **Llena el formulario de contacto**
3. **Envía el mensaje**
4. **Revisa tu email** - deberías recibir el mensaje
5. **Revisa la consola del navegador** para ver logs

## 🔧 Alternativas Gratuitas

### **Opción 1: Formspree**
```html
<form action="https://formspree.io/f/TU_ID" method="POST">
    <input type="text" name="nombre" required>
    <input type="email" name="email" required>
    <textarea name="mensaje" required></textarea>
    <button type="submit">Enviar</button>
</form>
```

### **Opción 2: Netlify Forms**
```html
<form name="contact" netlify>
    <input type="text" name="nombre" required>
    <input type="email" name="email" required>
    <textarea name="mensaje" required></textarea>
    <button type="submit">Enviar</button>
</form>
```

## 🚨 Solución Rápida (Sin Backend)

Si quieres una solución inmediata, puedes usar **Formspree**:

1. Ve a [https://formspree.io/](https://formspree.io/)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Reemplaza tu formulario actual con:

```html
<form action="https://formspree.io/f/TU_ID_DE_FORMSPREE" method="POST" class="contact-form" id="contact-form">
    <div class="form-group">
        <input type="text" name="nombre" placeholder="Tu nombre" required>
    </div>
    <div class="form-group">
        <input type="email" name="email" placeholder="Tu email" required>
    </div>
    <div class="form-group">
        <input type="text" name="asunto" placeholder="Asunto" required>
    </div>
    <div class="form-group">
        <textarea name="mensaje" placeholder="Tu mensaje" rows="5" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
</form>
```

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que las claves estén correctas
3. Asegúrate de que el email de destino sea válido
4. Revisa la carpeta de spam

---

**¡Con EmailJS tu formulario enviará emails reales!** 🎉 