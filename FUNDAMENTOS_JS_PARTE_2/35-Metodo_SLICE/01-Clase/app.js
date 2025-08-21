/*
==========================================
MÉTODO SLICE() EN JAVASCRIPT - GUÍA COMPLETA
==========================================

El método slice() es un método de arrays que extrae una sección de un array 
y devuelve una copia superficial de esa sección como un nuevo array.
El array original NO se modifica.

SINTAXIS:
array.slice(inicio, fin)

PARÁMETROS:
- inicio (opcional): Índice donde comenzar la extracción (incluido)
- fin (opcional): Índice donde terminar la extracción (no incluido)

CARACTERÍSTICAS IMPORTANTES:
- NO modifica el array original
- Devuelve un nuevo array
- Si no se especifican parámetros, devuelve una copia completa del array
- Los índices negativos cuentan desde el final del array
*/

console.log("=== MÉTODO SLICE() - EJEMPLOS PRÁCTICOS ===\n");

// ==========================================
// 1. EJEMPLO BÁSICO - Sin parámetros
// ==========================================
console.log("1. SLICE SIN PARÁMETROS (copia completa):");
const frutas = ["manzana", "banana", "naranja", "uva", "kiwi"];
console.log("Array original:", frutas);

const copiaFrutas = frutas.slice();
console.log("Copia con slice():", copiaFrutas);
console.log("¿Son el mismo array?", frutas === copiaFrutas); // false
console.log("¿Tienen el mismo contenido?", JSON.stringify(frutas) === JSON.stringify(copiaFrutas)); // true
console.log("\n");

// ==========================================
// 2. SLICE CON ÍNDICE DE INICIO
// ==========================================
console.log("2. SLICE CON ÍNDICE DE INICIO:");
const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("Array original:", numeros);

const desdeIndice3 = numeros.slice(3);
console.log("slice(3) - desde índice 3:", desdeIndice3);

const desdeIndice5 = numeros.slice(5);
console.log("slice(5) - desde índice 5:", desdeIndice5);
console.log("\n");

// ==========================================
// 3. SLICE CON ÍNDICE DE INICIO Y FIN
// ==========================================
console.log("3. SLICE CON ÍNDICE DE INICIO Y FIN:");
const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
console.log("Array original:", letras);

const segmento1 = letras.slice(2, 5);
console.log("slice(2, 5) - desde índice 2 hasta 5 (no incluido):", segmento1);

const segmento2 = letras.slice(1, 4);
console.log("slice(1, 4) - desde índice 1 hasta 4 (no incluido):", segmento2);

const segmento3 = letras.slice(0, 3);
console.log("slice(0, 3) - primeros 3 elementos:", segmento3);
console.log("\n");

// ==========================================
// 4. ÍNDICES NEGATIVOS
// ==========================================
console.log("4. SLICE CON ÍNDICES NEGATIVOS:");
const colores = ["rojo", "verde", "azul", "amarillo", "morado", "rosa"];
console.log("Array original:", colores);

const ultimosDos = colores.slice(-2);
console.log("slice(-2) - últimos 2 elementos:", ultimosDos);

const ultimosTres = colores.slice(-3);
console.log("slice(-3) - últimos 3 elementos:", ultimosTres);

const segmentoNegativo = colores.slice(-4, -1);
console.log("slice(-4, -1) - desde -4 hasta -1 (no incluido):", segmentoNegativo);

const mixto = colores.slice(1, -1);
console.log("slice(1, -1) - desde índice 1 hasta el penúltimo:", mixto);
console.log("\n");

// ==========================================
// 5. CASOS ESPECIALES
// ==========================================
console.log("5. CASOS ESPECIALES:");
const datos = [10, 20, 30, 40, 50];
console.log("Array original:", datos);

// Índice de inicio mayor que el de fin
const vacio1 = datos.slice(3, 1);
console.log("slice(3, 1) - inicio > fin:", vacio1); // []

// Índice fuera de rango
const fueraRango = datos.slice(10, 15);
console.log("slice(10, 15) - fuera de rango:", fueraRango); // []

// Índice de inicio negativo mayor que la longitud
const negativoGrande = datos.slice(-10, 3);
console.log("slice(-10, 3) - índice negativo grande:", negativoGrande);

// Índice de fin mayor que la longitud
const finGrande = datos.slice(2, 20);
console.log("slice(2, 20) - fin mayor que longitud:", finGrande);
console.log("\n");

// ==========================================
// 6. EJEMPLOS PRÁCTICOS DE USO
// ==========================================
console.log("6. EJEMPLOS PRÁCTICOS:");

// Obtener los primeros N elementos
const tareas = ["estudiar", "trabajar", "ejercitarse", "cocinar", "leer"];
const primeras3Tareas = tareas.slice(0, 3);
console.log("Primeras 3 tareas:", primeras3Tareas);

// Obtener los últimos N elementos
const ultimasTareas = tareas.slice(-2);
console.log("Últimas 2 tareas:", ultimasTareas);

// Obtener elementos del medio
const tareasDelMedio = tareas.slice(1, -1);
console.log("Tareas del medio (sin primera ni última):", tareasDelMedio);

// Crear una copia para modificar sin afectar el original
const copiaParaModificar = tareas.slice();
copiaParaModificar.push("dormir");
console.log("Array original después de modificar copia:", tareas);
console.log("Copia modificada:", copiaParaModificar);
console.log("\n");

// ==========================================
// 7. SLICE CON STRINGS (también funciona)
// ==========================================
console.log("7. SLICE CON STRINGS:");
const texto = "JavaScript";
console.log("String original:", texto);
console.log("slice(0, 4):", texto.slice(0, 4));
console.log("slice(4):", texto.slice(4));
console.log("slice(-6):", texto.slice(-6));
console.log("slice(-6, -2):", texto.slice(-6, -2));
console.log("\n");

// ==========================================
// 8. COMPARACIÓN CON OTROS MÉTODOS
// ==========================================
console.log("8. COMPARACIÓN CON OTROS MÉTODOS:");
const arrayComparacion = [1, 2, 3, 4, 5];
console.log("Array original:", arrayComparacion);

// SLICE - NO modifica el original
const resultadoSlice = arrayComparacion.slice(1, 4);
console.log("Después de slice(1, 4):");
console.log("- Resultado:", resultadoSlice);
console.log("- Original:", arrayComparacion);

// SPLICE - SÍ modifica el original (para comparar)
const arrayParaSplice = [1, 2, 3, 4, 5];
const resultadoSplice = arrayParaSplice.splice(1, 3);
console.log("Después de splice(1, 3):");
console.log("- Resultado:", resultadoSplice);
console.log("- Original modificado:", arrayParaSplice);
console.log("\n");

// ==========================================
// 9. CASOS DE USO AVANZADOS
// ==========================================
console.log("9. CASOS DE USO AVANZADOS:");

// Paginación
function paginar(array, pagina, elementosPorPagina) {
    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    return array.slice(inicio, fin);
}

const productos = ["Producto1", "Producto2", "Producto3", "Producto4", "Producto5", "Producto6", "Producto7"];
console.log("Productos completos:", productos);
console.log("Página 1 (3 por página):", paginar(productos, 1, 3));
console.log("Página 2 (3 por página):", paginar(productos, 2, 3));
console.log("Página 3 (3 por página):", paginar(productos, 3, 3));

// Obtener elementos aleatorios
function obtenerElementosAleatorios(array, cantidad) {
    const copia = array.slice(); // Crear copia para no modificar original
    const resultado = [];
    
    for (let i = 0; i < cantidad && copia.length > 0; i++) {
        const indiceAleatorio = Math.floor(Math.random() * copia.length);
        resultado.push(copia[indiceAleatorio]);
        copia.splice(indiceAleatorio, 1); // Remover para evitar repetidos
    }
    
    return resultado;
}

const animales = ["perro", "gato", "elefante", "león", "tigre", "oso", "conejo"];
console.log("Animales:", animales);
console.log("3 animales aleatorios:", obtenerElementosAleatorios(animales, 3));
console.log("Array original sin cambios:", animales);
console.log("\n");

// ==========================================
// 10. EJERCICIOS PRÁCTICOS
// ==========================================
console.log("10. EJERCICIOS PRÁCTICOS:");

// Ejercicio 1: Función para obtener los primeros N elementos
function primeros(array, n) {
    return array.slice(0, n);
}

// Ejercicio 2: Función para obtener los últimos N elementos
function ultimos(array, n) {
    return array.slice(-n);
}

// Ejercicio 3: Función para obtener elementos del medio
function medio(array) {
    const inicio = Math.floor(array.length / 4);
    const fin = Math.floor(3 * array.length / 4);
    return array.slice(inicio, fin);
}

const numeros1a10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Array de prueba:", numeros1a10);
console.log("Primeros 4:", primeros(numeros1a10, 4));
console.log("Últimos 3:", ultimos(numeros1a10, 3));
console.log("Elementos del medio:", medio(numeros1a10));
console.log("\n");

// ==========================================
// RESUMEN DE CARACTERÍSTICAS CLAVE
// ==========================================
console.log("=== RESUMEN DE CARACTERÍSTICAS CLAVE ===");
console.log("✅ NO modifica el array original");
console.log("✅ Devuelve un nuevo array");
console.log("✅ Acepta índices negativos");
console.log("✅ Si inicio > fin, devuelve array vacío");
console.log("✅ Si no hay parámetros, devuelve copia completa");
console.log("✅ Útil para crear copias superficiales");
console.log("✅ Perfecto para paginación y segmentación");
console.log("✅ También funciona con strings");
console.log("\n=== FIN DE LA EXPLICACIÓN ===");
