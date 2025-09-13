// Calculadora de Precios de Productos - Interfaz Gráfica
// Aplicación que calcula el precio final y margen de ganancia

// Variables globales para almacenar los datos calculados
let datosCalculados = null;
let preciosCalculados = null;

// Elementos del DOM
const formulario = document.getElementById('producto-form');
const ventasSection = document.getElementById('ventas-section');
const noResults = document.getElementById('no-results');
const precioResults = document.getElementById('precio-results');
const gananciasResults = document.getElementById('ganancias-results');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el formulario principal
    formulario.addEventListener('submit', manejarCalculoPrecio);
    
    // Limpiar mensajes cuando el usuario empiece a escribir
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', limpiarMensajes);
    });
    
    console.log("🎯 Calculadora de Precios cargada - Interfaz Gráfica");
});

// Función principal para manejar el cálculo de precio
function manejarCalculoPrecio(event) {
    event.preventDefault();
    
    try {
        // Limpiar mensajes anteriores
        limpiarMensajes();
        
        // 1. Obtener y validar datos del formulario
        const datosProducto = obtenerDatosFormulario();
        
        // 2. Calcular precio final
        const precios = calcularPrecioFinal(datosProducto);
        
        // 3. Mostrar resultados
        mostrarResultadosPrecios(datosProducto, precios);
        
        // 4. Guardar datos para cálculos posteriores
        datosCalculados = datosProducto;
        preciosCalculados = precios;
        
        // 5. Mostrar sección de ventas
        mostrarSeccionVentas();
        
        // 6. Mostrar mensaje de éxito
        mostrarMensajeExito("¡Precio calculado exitosamente!");
        
    } catch (error) {
        console.error("Error en el cálculo:", error.message);
        mostrarMensajeError(error.message);
    }
}

// Función para obtener y validar datos del formulario
function obtenerDatosFormulario() {
    const nombre = document.getElementById('nombre-producto').value.trim();
    const costoMateria = parseFloat(document.getElementById('costo-materia').value);
    const margenGanancia = parseFloat(document.getElementById('margen-ganancia').value);
    const impuestos = parseFloat(document.getElementById('impuestos').value);
    
    // Validar nombre
    if (!nombre) {
        throw new Error("El nombre del producto es obligatorio");
    }
    
    // Validar números
    if (isNaN(costoMateria) || isNaN(margenGanancia) || isNaN(impuestos)) {
        throw new Error("Todos los campos numéricos deben tener valores válidos");
    }
    
    // Validar valores positivos
    if (costoMateria < 0) {
        throw new Error("El costo de materia prima no puede ser negativo");
    }
    
    if (margenGanancia < 0) {
        throw new Error("El margen de ganancia no puede ser negativo");
    }
    
    if (impuestos < 0) {
        throw new Error("Los impuestos no pueden ser negativos");
    }
    
    // Validar rangos razonables
    if (margenGanancia > 1000) {
        throw new Error("El margen de ganancia parece demasiado alto (máximo 1000%)");
    }
    
    if (impuestos > 100) {
        throw new Error("El porcentaje de impuestos parece demasiado alto (máximo 100%)");
    }
    
    return {
        nombre: nombre,
        costoMateriaPrima: costoMateria,
        margenGanancia: margenGanancia,
        impuestos: impuestos
    };
}

// Función para calcular el precio final del producto (misma lógica original)
function calcularPrecioFinal(datos) {
    const { costoMateriaPrima, margenGanancia, impuestos } = datos;
    
    // Calcular precio con margen de ganancia
    const margenGananciaDecimal = margenGanancia / 100;
    const precioConMargen = costoMateriaPrima * (1 + margenGananciaDecimal);
    
    // Calcular impuestos sobre el precio con margen
    const impuestosDecimal = impuestos / 100;
    const montoImpuestos = precioConMargen * impuestosDecimal;
    
    // Precio final
    const precioFinal = precioConMargen + montoImpuestos;
    
    // Margen de ganancia en dinero
    const margenGananciaDinero = costoMateriaPrima * margenGananciaDecimal;
    
    return {
        precioConMargen: precioConMargen,
        montoImpuestos: montoImpuestos,
        precioFinal: precioFinal,
        margenGananciaDinero: margenGananciaDinero
    };
}

// Función para mostrar los resultados del cálculo de precios
function mostrarResultadosPrecios(datos, precios) {
    // Ocultar mensaje de "no results"
    noResults.style.display = 'none';
    
    // Actualizar nombre del producto
    document.getElementById('producto-nombre').textContent = `📦 ${datos.nombre}`;
    
    // Actualizar valores calculados
    document.getElementById('costo-display').textContent = formatearMoneda(datos.costoMateriaPrima);
    document.getElementById('margen-display').textContent = 
        `${formatearMoneda(precios.margenGananciaDinero)} (${datos.margenGanancia}%)`;
    document.getElementById('precio-margen-display').textContent = formatearMoneda(precios.precioConMargen);
    document.getElementById('impuestos-display').textContent = 
        `${formatearMoneda(precios.montoImpuestos)} (${datos.impuestos}%)`;
    document.getElementById('precio-final-display').textContent = formatearMoneda(precios.precioFinal);
    
    // Mostrar la tarjeta de resultados con animación
    precioResults.classList.add('show');
    
    // Scroll suave hacia los resultados
    precioResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Función para mostrar la sección de ventas
function mostrarSeccionVentas() {
    ventasSection.classList.add('show');
}

// Función para calcular las ganancias proyectadas
function calcularGanancias() {
    try {
        limpiarMensajes();
        
        // Validar que se haya calculado el precio primero
        if (!datosCalculados || !preciosCalculados) {
            throw new Error("Primero debes calcular el precio del producto");
        }
        
        // Obtener ventas esperadas
        const ventasEsperadas = parseInt(document.getElementById('ventas-esperadas').value);
        
        // Validar ventas esperadas
        if (isNaN(ventasEsperadas) || ventasEsperadas <= 0) {
            throw new Error("El número de ventas debe ser un número entero positivo");
        }
        
        if (ventasEsperadas > 1000000) {
            throw new Error("El número de ventas parece demasiado alto (máximo 1,000,000)");
        }
        
        // Calcular métricas de ganancias
        const margenTotalDinero = preciosCalculados.margenGananciaDinero * ventasEsperadas;
        const ingresosTotales = preciosCalculados.precioFinal * ventasEsperadas;
        const costoTotal = (preciosCalculados.precioFinal - preciosCalculados.margenGananciaDinero) * ventasEsperadas;
        const porcentajeGanancia = (margenTotalDinero / ingresosTotales) * 100;
        
        // Mostrar resultados de ganancias
        mostrarResultadosGanancias({
            ventasEsperadas,
            margenTotalDinero,
            ingresosTotales,
            costoTotal,
            porcentajeGanancia
        });
        
        // Mostrar mensaje de éxito
        mostrarMensajeExito("¡Proyección de ganancias calculada exitosamente!");
        
    } catch (error) {
        console.error("Error en el cálculo de ganancias:", error.message);
        mostrarMensajeError(error.message);
    }
}

// Función para mostrar los resultados de ganancias
function mostrarResultadosGanancias(resultados) {
    const { ventasEsperadas, margenTotalDinero, ingresosTotales, costoTotal, porcentajeGanancia } = resultados;
    
    // Actualizar valores en la interfaz
    document.getElementById('ventas-display').textContent = `${ventasEsperadas.toLocaleString()} unidades`;
    document.getElementById('ingresos-display').textContent = formatearMoneda(ingresosTotales);
    document.getElementById('costos-display').textContent = formatearMoneda(costoTotal);
    document.getElementById('margen-unidad-display').textContent = formatearMoneda(preciosCalculados.margenGananciaDinero);
    document.getElementById('ganancia-total-display').textContent = formatearMoneda(margenTotalDinero);
    document.getElementById('porcentaje-ganancia').textContent = 
        `📈 Margen sobre ventas: ${porcentajeGanancia.toFixed(2)}%`;
    
    // Mostrar la tarjeta de ganancias con animación
    gananciasResults.classList.add('show');
    
    // Scroll suave hacia los resultados
    gananciasResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Función para limpiar el formulario y resetear la aplicación
function limpiarFormulario() {
    // Limpiar formulario
    formulario.reset();
    document.getElementById('ventas-esperadas').value = '';
    
    // Resetear variables globales
    datosCalculados = null;
    preciosCalculados = null;
    
    // Ocultar secciones de resultados
    precioResults.classList.remove('show');
    gananciasResults.classList.remove('show');
    ventasSection.classList.remove('show');
    
    // Mostrar mensaje inicial
    noResults.style.display = 'block';
    
    // Limpiar mensajes
    limpiarMensajes();
    
    // Enfocar el primer campo
    document.getElementById('nombre-producto').focus();
    
    // Scroll al inicio del formulario
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// Función para mostrar mensajes de error
function mostrarMensajeError(mensaje) {
    document.getElementById('error-text').textContent = mensaje;
    errorMessage.classList.add('show');
    successMessage.classList.remove('show');
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

// Función para mostrar mensajes de éxito
function mostrarMensajeExito(mensaje) {
    document.getElementById('success-text').textContent = mensaje;
    successMessage.classList.add('show');
    errorMessage.classList.remove('show');
    
    // Auto-ocultar después de 3 segundos
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Función para limpiar mensajes
function limpiarMensajes() {
    errorMessage.classList.remove('show');
    successMessage.classList.remove('show');
}

// Función para formatear valores monetarios
function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

// Función para formatear números con separadores de miles
function formatearNumero(numero) {
    return numero.toLocaleString('es-MX');
}

// Funciones adicionales para mejorar la experiencia del usuario

// Validación en tiempo real para campos numéricos
document.addEventListener('DOMContentLoaded', function() {
    const numericalInputs = ['costo-materia', 'margen-ganancia', 'impuestos', 'ventas-esperadas'];
    
    numericalInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                // Remover caracteres no numéricos (excepto punto decimal)
                if (inputId !== 'ventas-esperadas') {
                    this.value = this.value.replace(/[^0-9.]/g, '');
                } else {
                    this.value = this.value.replace(/[^0-9]/g, '');
                }
                
                // Validar que solo haya un punto decimal
                const parts = this.value.split('.');
                if (parts.length > 2) {
                    this.value = parts[0] + '.' + parts.slice(1).join('');
                }
            });
        }
    });
});

// Atajos de teclado
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Enter para calcular precio
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        if (datosCalculados && preciosCalculados) {
            calcularGanancias();
        } else {
            formulario.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape para limpiar formulario
    if (event.key === 'Escape') {
        limpiarFormulario();
    }
});

// Mostrar tips de ayuda
function mostrarTips() {
    const tips = [
        "💡 Tip: El margen de ganancia típico varía entre 20% y 50%",
        "🏛️ Tip: Los impuestos varían por país (México: 16%, España: 21%, etc.)",
        "📊 Tip: Usa Ctrl+Enter para calcular rápidamente",
        "🔄 Tip: Presiona Escape para limpiar el formulario",
        "💰 Tip: Considera gastos adicionales como transporte y almacenamiento"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    mostrarMensajeExito(randomTip);
}

// Mostrar un tip aleatorio cada 30 segundos
setInterval(mostrarTips, 30000);

console.log("🎯 Calculadora de Precios - Interfaz Gráfica lista");
console.log("⌨️ Atajos: Ctrl+Enter (calcular), Escape (limpiar)");