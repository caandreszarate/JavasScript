# Instrucciones para Agregar el Logo Original

## 📁 Estructura de Archivos

Crea una carpeta `assets` en el directorio `impulso_pro/` y coloca tu imagen del logo ahí:

```
impulso_pro/
├── assets/
│   └── logo-impulso-profesional.png  (tu imagen del logo)
├── index.html
├── styles.css
├── script.js
└── README.md
```

## 🔄 Pasos para Agregar el Logo

1. **Crea la carpeta assets:**
   ```bash
   mkdir impulso_pro/assets
   ```

2. **Coloca tu imagen del logo** en `impulso_pro/assets/logo-impulso-profesional.png`

3. **Edita el archivo `index.html`** y reemplaza las líneas comentadas:

   **Encuentra estas líneas en el HTML:**
   ```html
   <!-- Reemplaza esta línea con tu imagen del logo -->
   <!-- <img src="assets/logo-impulso-profesional.png" alt="Impulso Profesional" class="logo-image"> -->
   
   <!-- Logo temporal (eliminar cuando agregues la imagen) -->
   <div class="logo-text">
       <!-- ... contenido temporal ... -->
   </div>
   ```

   **Reemplázalas con:**
   ```html
   <img src="assets/logo-impulso-profesional.png" alt="Impulso Profesional" class="logo-image">
   ```

4. **Elimina el logo temporal** (todo el contenido entre `<!-- Logo temporal -->` y `</div>`)

## ✅ Resultado Final

El logo se mostrará tal como está en tu imagen original, sin ninguna modificación.

## 📱 Responsive Design

El logo se adaptará automáticamente a diferentes tamaños de pantalla:
- **Desktop:** Altura 50px
- **Tablet:** Altura 40px  
- **Mobile:** Altura 35px

## 🎨 Características

- ✅ **Imagen original** sin modificaciones
- ✅ **Responsive** para todos los dispositivos
- ✅ **Efecto hover** suave
- ✅ **Optimización automática** de tamaño 