// ========================================
// MÉTODOS MAP Y FOREACH EN JAVASCRIPT
// ========================================

console.log("=== INTRODUCCIÓN A MAP Y FOREACH ===");

// Los métodos map() y forEach() son dos de los métodos más importantes
// para trabajar con arrays en JavaScript. Ambos iteran sobre elementos
// de un array, pero tienen propósitos y comportamientos diferentes.

// ========================================
// 1. MÉTODO FOREACH
// ========================================

console.log("\n--- 1. MÉTODO FOREACH ---");

// forEach() ejecuta una función para cada elemento del array
// NO retorna un nuevo array, solo ejecuta código para cada elemento
// Sintaxis: array.forEach(callback(elemento, índice, array))

const numeros = [1, 2, 3, 4, 5];

console.log("Array original:", numeros);

// Ejemplo básico de forEach
console.log("\nEjemplo básico forEach:");
numeros.forEach(function(numero) {
    console.log("Número:", numero);
});

// forEach con arrow function (más común)
console.log("\nforEach con arrow function:");
numeros.forEach(numero => {
    console.log("Número al cuadrado:", numero ** 2);
});

// forEach con todos los parámetros
console.log("\nforEach con todos los parámetros:");
numeros.forEach((elemento, indice, arrayCompleto) => {
    console.log(`Índice: ${indice}, Elemento: ${elemento}, Array: [${arrayCompleto}]`);
});

// ========================================
// 2. MÉTODO MAP
// ========================================

console.log("\n--- 2. MÉTODO MAP ---");

// map() crea un NUEVO array con los resultados de llamar
// a una función para cada elemento del array original
// Sintaxis: array.map(callback(elemento, índice, array))

const numerosOriginales = [1, 2, 3, 4, 5];

console.log("Array original para map:", numerosOriginales);

// Ejemplo básico de map
const numerosDobles = numerosOriginales.map(function(numero) {
    return numero * 2;
});

console.log("Números duplicados con map:", numerosDobles);
console.log("Array original sin cambios:", numerosOriginales);

// map con arrow function (más común)
const numerosCubicos = numerosOriginales.map(numero => numero ** 3);
console.log("Números al cubo:", numerosCubicos);

// map con todos los parámetros
const numerosConInfo = numerosOriginales.map((elemento, indice, array) => {
    return {
        valor: elemento,
        posicion: indice,
        esPar: elemento % 2 === 0,
        totalElementos: array.length
    };
});

console.log("Objetos creados con map:", numerosConInfo);

// ========================================
// 3. DIFERENCIAS PRINCIPALES
// ========================================

console.log("\n--- 3. DIFERENCIAS PRINCIPALES ---");

const frutas = ["manzana", "banana", "naranja"];

console.log("Array de frutas:", frutas);

// forEach NO retorna nada (undefined)
console.log("\nforEach:");
const resultadoForEach = frutas.forEach(fruta => {
    console.log(`Fruta: ${fruta.toUpperCase()}`);
});
console.log("Resultado de forEach:", resultadoForEach); // undefined

// map SÍ retorna un nuevo array
console.log("\nmap:");
const frutasMayusculas = frutas.map(fruta => fruta.toUpperCase());
console.log("Resultado de map:", frutasMayusculas);
console.log("Array original sin cambios:", frutas);

// ========================================
// 4. CASOS DE USO PRÁCTICOS
// ========================================

console.log("\n--- 4. CASOS DE USO PRÁCTICOS ---");

// Ejemplo con objetos - Lista de estudiantes
const estudiantes = [
    { nombre: "Ana", edad: 20, calificacion: 85 },
    { nombre: "Carlos", edad: 22, calificacion: 92 },
    { nombre: "María", edad: 21, calificacion: 78 },
    { nombre: "José", edad: 23, calificacion: 88 }
];

console.log("Lista de estudiantes:", estudiantes);

// Usando forEach para mostrar información
console.log("\nUsando forEach para mostrar información:");
estudiantes.forEach((estudiante, indice) => {
    console.log(`${indice + 1}. ${estudiante.nombre} (${estudiante.edad} años) - Calificación: ${estudiante.calificacion}`);
});

// Usando map para crear nuevos arrays
console.log("\nUsando map para extraer solo nombres:");
const soloNombres = estudiantes.map(estudiante => estudiante.nombre);
console.log("Solo nombres:", soloNombres);

console.log("\nUsando map para calcular si aprobaron:");
const estudiantesAprobacion = estudiantes.map(estudiante => ({
    nombre: estudiante.nombre,
    aprobo: estudiante.calificacion >= 80,
    calificacion: estudiante.calificacion
}));
console.log("Estudiantes con aprobación:", estudiantesAprobacion);

// ========================================
// 5. EJEMPLOS AVANZADOS
// ========================================

console.log("\n--- 5. EJEMPLOS AVANZADOS ---");

// Ejemplo 1: Procesamiento de datos de ventas
const ventas = [
    { producto: "Laptop", precio: 800, cantidad: 2 },
    { producto: "Mouse", precio: 25, cantidad: 5 },
    { producto: "Teclado", precio: 60, cantidad: 3 },
    { producto: "Monitor", precio: 300, cantidad: 1 }
];

console.log("Datos de ventas:", ventas);

// forEach para calcular total de ingresos
let totalIngresos = 0;
console.log("\nUsando forEach para calcular ingresos:");
ventas.forEach(venta => {
    const subtotal = venta.precio * venta.cantidad;
    console.log(`${venta.producto}: $${subtotal}`);
    totalIngresos += subtotal;
});
console.log(`Total de ingresos: $${totalIngresos}`);

// map para crear reporte de ventas
console.log("\nUsando map para crear reporte:");
const reporteVentas = ventas.map(venta => ({
    producto: venta.producto,
    subtotal: venta.precio * venta.cantidad,
    categoria: venta.precio > 100 ? "Premium" : "Estándar"
}));
console.log("Reporte de ventas:", reporteVentas);

// Ejemplo 2: Transformación de datos de API
const usuariosAPI = [
    { id: 1, first_name: "Juan", last_name: "Pérez", email: "juan@email.com" },
    { id: 2, first_name: "Ana", last_name: "García", email: "ana@email.com" },
    { id: 3, first_name: "Luis", last_name: "Martín", email: "luis@email.com" }
];

console.log("\nDatos de API:", usuariosAPI);

// map para transformar formato de datos
const usuariosFormateados = usuariosAPI.map(usuario => ({
    id: usuario.id,
    nombreCompleto: `${usuario.first_name} ${usuario.last_name}`,
    email: usuario.email,
    iniciales: `${usuario.first_name[0]}${usuario.last_name[0]}`
}));

console.log("Usuarios formateados:", usuariosFormateados);

// ========================================
// 6. CUÁNDO USAR CADA MÉTODO
// ========================================

console.log("\n--- 6. CUÁNDO USAR CADA MÉTODO ---");

console.log(`
USAR FOREACH CUANDO:
✓ Solo necesitas ejecutar código para cada elemento
✓ Quieres hacer console.log o mostrar datos
✓ Necesitas hacer operaciones de lado (side effects)
✓ No necesitas crear un nuevo array
✓ Quieres modificar elementos del array original (no recomendado)

USAR MAP CUANDO:
✓ Necesitas transformar cada elemento del array
✓ Quieres crear un nuevo array basado en el original
✓ Necesitas mantener el array original intacto
✓ Quieres aplicar una función a cada elemento y obtener resultados
✓ Trabajas con programación funcional
`);

// ========================================
// 7. ERRORES COMUNES
// ========================================

console.log("\n--- 7. ERRORES COMUNES ---");

const numeros2 = [1, 2, 3, 4, 5];

// ERROR: Usar forEach cuando necesitas un nuevo array
console.log("\n❌ ERROR - Usar forEach cuando necesitas nuevo array:");
let numerosTriples = []; // Esto funciona pero no es la mejor práctica
numeros2.forEach(num => {
    numerosTriples.push(num * 3);
});
console.log("Resultado con forEach (no recomendado):", numerosTriples);

// ✅ CORRECTO: Usar map para crear nuevo array
console.log("\n✅ CORRECTO - Usar map para nuevo array:");
const numerosTriples2 = numeros2.map(num => num * 3);
console.log("Resultado con map (recomendado):", numerosTriples2);

// ERROR: Usar map cuando solo necesitas ejecutar código
console.log("\n❌ ERROR - Usar map solo para ejecutar código:");
const resultadoInnecesario = numeros2.map(num => {
    console.log("Número:", num); // Solo queremos mostrar, no crear array nuevo
    return num; // Retornamos el mismo valor (innecesario)
});

// ✅ CORRECTO: Usar forEach para solo ejecutar código
console.log("\n✅ CORRECTO - Usar forEach para solo ejecutar:");
numeros2.forEach(num => {
    console.log("Número:", num); // Solo mostramos, no creamos array nuevo
});

// ========================================
// 8. RENDIMIENTO Y CONSIDERACIONES
// ========================================

console.log("\n--- 8. RENDIMIENTO Y CONSIDERACIONES ---");

console.log(`
RENDIMIENTO:
• forEach es ligeramente más rápido para operaciones simples
• map es más eficiente cuando necesitas transformar datos
• Ambos son más rápidos que un bucle for tradicional en la mayoría de casos

MEMORIA:
• forEach no crea arrays adicionales
• map crea un nuevo array (usa más memoria)

LEGIBILIDAD:
• Ambos hacen el código más legible que bucles tradicionales
• map es más expresivo para transformaciones
• forEach es más claro para efectos secundarios
`);

// ========================================
// 9. COMBINANDO CON OTROS MÉTODOS
// ========================================

console.log("\n--- 9. COMBINANDO CON OTROS MÉTODOS ---");

const productos = [
    { nombre: "Laptop", precio: 1200, categoria: "electrónica" },
    { nombre: "Camisa", precio: 30, categoria: "ropa" },
    { nombre: "Teléfono", precio: 800, categoria: "electrónica" },
    { nombre: "Zapatos", precio: 100, categoria: "ropa" },
    { nombre: "Tablet", precio: 400, categoria: "electrónica" }
];

console.log("Productos:", productos);

// Combinando filter + map
const electronicosCaros = productos
    .filter(producto => producto.categoria === "electrónica")
    .map(producto => ({
        nombre: producto.nombre,
        precioConDescuento: producto.precio * 0.9,
        esOferta: true
    }));

console.log("\nElectrónicos con descuento:", electronicosCaros);

// Combinando map + forEach
const productosConImpuesto = productos.map(producto => ({
    ...producto,
    precioConImpuesto: producto.precio * 1.16
}));

console.log("\nMostrando productos con impuesto:");
productosConImpuesto.forEach((producto, index) => {
    console.log(`${index + 1}. ${producto.nombre}: $${producto.precioConImpuesto.toFixed(2)}`);
});

// ========================================
// 10. EJERCICIOS PRÁCTICOS
// ========================================

console.log("\n--- 10. EJERCICIOS PRÁCTICOS ---");

// Ejercicio 1: Lista de tareas
const tareas = [
    { id: 1, titulo: "Estudiar JavaScript", completada: false, prioridad: "alta" },
    { id: 2, titulo: "Hacer ejercicio", completada: true, prioridad: "media" },
    { id: 3, titulo: "Leer libro", completada: false, prioridad: "baja" },
    { id: 4, titulo: "Llamar al médico", completada: false, prioridad: "alta" }
];

console.log("\nEjercicio 1 - Lista de tareas:");
console.log("Tareas originales:", tareas);

// Mostrar solo tareas pendientes con forEach
console.log("\nTareas pendientes (forEach):");
tareas.forEach(tarea => {
    if (!tarea.completada) {
        console.log(`- ${tarea.titulo} [${tarea.prioridad}]`);
    }
});

// Crear array de títulos con map
const titulosTareas = tareas.map(tarea => tarea.titulo);
console.log("\nTítulos de tareas (map):", titulosTareas);

// Crear reporte de estado con map
const reporteTareas = tareas.map(tarea => ({
    titulo: tarea.titulo,
    estado: tarea.completada ? "✅ Completada" : "⏳ Pendiente",
    urgencia: tarea.prioridad === "alta" ? "🔴 Urgente" : 
              tarea.prioridad === "media" ? "🟡 Normal" : "🟢 Baja"
}));

console.log("\nReporte de tareas (map):");
reporteTareas.forEach(reporte => {
    console.log(`${reporte.estado} ${reporte.titulo} ${reporte.urgencia}`);
});

console.log("\n=== FIN DE LA EXPLICACIÓN ===");
console.log("¡Ahora ya conoces los métodos map y forEach en detalle! 🚀");
