# 🏷️ Calculadora de Precios de Productos

Una aplicación completa en JavaScript que calcula el precio final de productos considerando materia prima, margen de ganancia e impuestos, y proyecta las ganancias basadas en ventas esperadas.

## ✨ Características

- 📊 **Cálculo preciso de precios**: Considera costo de materia prima, margen de ganancia e impuestos
- 💰 **Precio final sugerido**: Calcula automáticamente el precio de venta óptimo
- 📈 **Proyección de ganancias**: Estima ganancias totales basadas en ventas esperadas
- 🔄 **Múltiples cálculos**: Permite calcular precios para varios productos en una sesión
- 🎯 **Interfaz intuitiva**: Formularios modernos con validación en tiempo real
- 📱 **Responsive**: Funciona en cualquier dispositivo

## 🚀 Cómo usar

### Interfaz Gráfica Completa

1. Abre el archivo `index.html` en tu navegador
2. Completa el formulario con los datos de tu producto:
   - Nombre del producto
   - Costo de materia prima
   - Margen de ganancia deseado (%)
   - Porcentaje de impuestos (%)
3. Haz clic en "🧮 Calcular Precio Final"
4. Los resultados aparecerán automáticamente en tiempo real
5. Ingresa las ventas esperadas para ver la proyección de ganancias
6. Usa "🔄 Nuevo Cálculo" para calcular otro producto

## 📝 Flujo de la aplicación

1. **Ingreso de datos del producto**:
   - Nombre del producto
   - Costo de materia prima ($)
   - Margen de ganancia deseado (%)
   - Porcentaje de impuestos (%)

2. **Cálculo automático**:
   - Precio con margen de ganancia
   - Monto de impuestos
   - Precio final sugerido

3. **Proyección de ventas**:
   - Cantidad de ventas esperadas
   - Cálculo de ganancia total
   - Porcentaje de margen sobre ventas

## 💡 Ejemplo de uso

```text
Producto: Camiseta Premium
Costo materia prima: $15.00
Margen de ganancia (40%): $6.00
Impuestos (16%): $3.36
─────────────────────────────
PRECIO FINAL: $24.36

Ventas proyectadas: 100 unidades
Ingresos totales: $2,436.00
Ganancia total: $600.00
Margen sobre ventas: 24.63%
```

## 🔧 Funcionalidades técnicas

- **Interfaz gráfica moderna**: Diseño responsivo con CSS Grid y Flexbox
- **Validación en tiempo real**: Verifica datos mientras el usuario escribe
- **Animaciones suaves**: Transiciones CSS para mejor experiencia de usuario
- **Messages sistema**: Alertas de éxito y error integradas
- **Cálculos precisos**: JavaScript nativo para matemáticas exactas
- **Formato automático**: Valores monetarios con separadores de miles
- **Atajos de teclado**: Ctrl+Enter para calcular, Escape para limpiar
- **Responsive design**: Se adapta a móviles, tablets y escritorio

## 📊 Fórmulas utilizadas

1. **Precio con margen**: `Costo × (1 + Margen%/100)`
2. **Impuestos**: `Precio con margen × (Impuestos%/100)`
3. **Precio final**: `Precio con margen + Impuestos`
4. **Ganancia total**: `Margen por unidad × Ventas esperadas`
5. **Porcentaje sobre ventas**: `(Ganancia total / Ingresos totales) × 100`

## 🛠️ Personalización

Puedes modificar fácilmente:

- **Campos adicionales**: Agregar costos de transporte, almacenamiento, etc.
- **Estilos CSS**: Cambiar colores, fuentes y animaciones
- **Monedas**: Modificar formato de números y símbolos monetarios
- **Validaciones**: Ajustar rangos y reglas de validación
- **Cálculos**: Añadir descuentos, promociones o impuestos complejos
- **Idiomas**: Cambiar textos e interfaz a otros idiomas

## 📱 Compatibilidad

- ✅ **Navegadores**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- ✅ **Móviles**: iOS Safari, Chrome Mobile, Samsung Internet
- ✅ **Tablets**: iPad, Android tablets
- ✅ **Escritorio**: Windows, macOS, Linux
- ✅ **Sin conexión**: Funciona completamente offline
- ✅ **Accesibilidad**: Compatible con lectores de pantalla

## 🎯 Casos de uso

- **Emprendedores**: Calcular precios para nuevos productos
- **PYMES**: Establecer precios competitivos
- **Estudiantes**: Aprender sobre formación de precios
- **Freelancers**: Calcular tarifas de servicios

## 👨‍💻 Desarrollado con

- **JavaScript ES6+**: Funciones flecha, destructuring, async/await
- **HTML5 semántico**: Formularios accesibles y validación nativa
- **CSS3 moderno**: Grid, Flexbox, animaciones y gradientes
- **Responsive Design**: Media queries para todos los dispositivos
- **UX/UI moderno**: Interfaz intuitiva con feedback visual
- **Sin dependencias**: 100% código nativo, sin librerías externas

---

**¡Listo para calcular precios como un profesional!** 🚀💰
