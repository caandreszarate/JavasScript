// ===============================================
// ARRAYS EN JAVASCRIPT - GUÍA COMPLETA
// ===============================================

console.log("=== ARRAYS EN JAVASCRIPT ===");

// ===============================================
// 1. ¿QUÉ SON LOS ARRAYS?
// ===============================================

/*
Los Arrays (arreglos) son estructuras de datos que permiten almacenar
múltiples valores en una sola variable. En JavaScript, los arrays son
objetos especiales que pueden contener diferentes tipos de datos.

Características principales:
- Son dinámicos (pueden cambiar de tamaño)
- Pueden contener diferentes tipos de datos
- Los índices comienzan en 0
- Tienen una propiedad 'length' que indica su longitud
*/

console.log("\n--- 1. DEFINICIÓN Y CARACTERÍSTICAS ---");

// ===============================================
// 2. FORMAS DE CREAR ARRAYS
// ===============================================

console.log("\n--- 2. CREACIÓN DE ARRAYS ---");

// Método 1: Array literal (más común y recomendado)
let frutas = ["manzana", "banana", "naranja", "uva"];
console.log("Array literal:", frutas);

// Método 2: Constructor Array()
let numeros = new Array(1, 2, 3, 4, 5);
console.log("Constructor Array:", numeros);

// Método 3: Array vacío
let arrayVacio = [];
console.log("Array vacío:", arrayVacio);

// Método 4: Array con longitud específica
let arrayConLongitud = new Array(5); // Crea array con 5 espacios vacíos
console.log("Array con longitud 5:", arrayConLongitud);
console.log("Longitud:", arrayConLongitud.length);

// Arrays mixtos (diferentes tipos de datos)
let arrayMixto = [1, "texto", true, null, {nombre: "Juan"}, [1, 2, 3]];
console.log("Array mixto:", arrayMixto);

// ===============================================
// 3. ACCESO Y MODIFICACIÓN DE ELEMENTOS
// ===============================================

console.log("\n--- 3. ACCESO Y MODIFICACIÓN ---");

// Acceso por índice
console.log("Primera fruta:", frutas[0]); // manzana
console.log("Segunda fruta:", frutas[1]); // banana
console.log("Última fruta:", frutas[frutas.length - 1]); // uva

// Modificación de elementos
frutas[1] = "pera"; // Cambia banana por pera
console.log("Después de modificar:", frutas);

// Agregar elementos al final
frutas[frutas.length] = "kiwi";
console.log("Después de agregar:", frutas);

// Propiedad length
console.log("Longitud del array:", frutas.length);

// ===============================================
// 4. MÉTODOS PRINCIPALES DE ARRAYS
// ===============================================

console.log("\n--- 4. MÉTODOS DE ARRAYS ---");

// Array de ejemplo para métodos
let animales = ["perro", "gato", "pájaro"];
console.log("Array original:", animales);

// MÉTODOS QUE MODIFICAN EL ARRAY ORIGINAL:

// push() - Agrega elementos al final
animales.push("pez");
console.log("Después de push('pez'):", animales);

// pop() - Elimina y retorna el último elemento
let ultimoAnimal = animales.pop();
console.log("Elemento eliminado con pop():", ultimoAnimal);
console.log("Array después de pop():", animales);

// unshift() - Agrega elementos al inicio
animales.unshift("hamster");
console.log("Después de unshift('hamster'):", animales);

// shift() - Elimina y retorna el primer elemento
let primerAnimal = animales.shift();
console.log("Elemento eliminado con shift():", primerAnimal);
console.log("Array después de shift():", animales);

// splice() - Elimina, agrega o reemplaza elementos
let colores = ["rojo", "verde", "azul", "amarillo"];
console.log("\nArray de colores original:", colores);

// splice(índice, cantidad_eliminar, elementos_agregar)
let eliminados = colores.splice(1, 2, "morado", "rosa");
console.log("Elementos eliminados:", eliminados);
console.log("Array después de splice:", colores);

// reverse() - Invierte el orden del array
let letras = ["a", "b", "c", "d"];
console.log("Letras original:", letras);
letras.reverse();
console.log("Letras después de reverse:", letras);

// sort() - Ordena el array
let numerosDesordenados = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("Números desordenados:", numerosDesordenados);
numerosDesordenados.sort();
console.log("Después de sort():", numerosDesordenados);

// Para ordenar números correctamente:
let numerosParaOrdenar = [10, 5, 40, 25, 1000, 1];
numerosParaOrdenar.sort((a, b) => a - b); // Orden ascendente
console.log("Números ordenados correctamente:", numerosParaOrdenar);

// ===============================================
// 5. MÉTODOS QUE NO MODIFICAN EL ARRAY ORIGINAL
// ===============================================

console.log("\n--- 5. MÉTODOS QUE NO MODIFICAN EL ARRAY ---");

let ciudades = ["Madrid", "Barcelona", "Valencia", "Sevilla"];
console.log("Array de ciudades:", ciudades);

// concat() - Une arrays
let ciudadesInternacionales = ["París", "Londres"];
let todasLasCiudades = ciudades.concat(ciudadesInternacionales);
console.log("Ciudades concatenadas:", todasLasCiudades);
console.log("Array original no cambia:", ciudades);

// slice() - Extrae una porción del array
let algunasCiudades = ciudades.slice(1, 3);
console.log("slice(1, 3):", algunasCiudades);

// join() - Convierte el array en string
let ciudadesTexto = ciudades.join(" - ");
console.log("join(' - '):", ciudadesTexto);

// indexOf() - Encuentra el índice de un elemento
let indiceValencia = ciudades.indexOf("Valencia");
console.log("Índice de Valencia:", indiceValencia);

// includes() - Verifica si un elemento existe
let existeSevilla = ciudades.includes("Sevilla");
console.log("¿Existe Sevilla?", existeSevilla);

// ===============================================
// 6. ITERACIÓN DE ARRAYS
// ===============================================

console.log("\n--- 6. FORMAS DE ITERAR ARRAYS ---");

let productos = ["laptop", "mouse", "teclado", "monitor"];

// Método 1: for tradicional
console.log("For tradicional:");
for (let i = 0; i < productos.length; i++) {
    console.log(`${i}: ${productos[i]}`);
}

// Método 2: for...of (más moderno)
console.log("\nFor...of:");
for (let producto of productos) {
    console.log(`Producto: ${producto}`);
}

// Método 3: forEach()
console.log("\nforEach:");
productos.forEach((producto, indice) => {
    console.log(`${indice}: ${producto}`);
});

// Método 4: for...in (para índices)
console.log("\nFor...in:");
for (let indice in productos) {
    console.log(`${indice}: ${productos[indice]}`);
}

// ===============================================
// 7. MÉTODOS AVANZADOS DE ARRAYS
// ===============================================

console.log("\n--- 7. MÉTODOS AVANZADOS ---");

let numeros2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map() - Transforma cada elemento
let numerosDuplicados = numeros2.map(num => num * 2);
console.log("map() - números duplicados:", numerosDuplicados);

// filter() - Filtra elementos que cumplen una condición
let numerosPares = numeros2.filter(num => num % 2 === 0);
console.log("filter() - números pares:", numerosPares);

// find() - Encuentra el primer elemento que cumple una condición
let primerMayorA5 = numeros2.find(num => num > 5);
console.log("find() - primer número mayor a 5:", primerMayorA5);

// reduce() - Reduce el array a un solo valor
let suma = numeros2.reduce((acumulador, num) => acumulador + num, 0);
console.log("reduce() - suma de todos los números:", suma);

// some() - Verifica si al menos un elemento cumple la condición
let hayMayoresA8 = numeros2.some(num => num > 8);
console.log("some() - ¿hay números mayores a 8?", hayMayoresA8);

// every() - Verifica si todos los elementos cumplen la condición
let todosSonPositivos = numeros2.every(num => num > 0);
console.log("every() - ¿todos son positivos?", todosSonPositivos);

// ===============================================
// 8. ARRAYS MULTIDIMENSIONALES
// ===============================================

console.log("\n--- 8. ARRAYS MULTIDIMENSIONALES ---");

// Array de arrays (matriz)
let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("Matriz completa:", matriz);
console.log("Elemento [1][2]:", matriz[1][2]); // 6

// Iterando una matriz
console.log("Iterando matriz:");
for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
        console.log(`matriz[${i}][${j}] = ${matriz[i][j]}`);
    }
}

// ===============================================
// 9. EJEMPLOS PRÁCTICOS
// ===============================================

console.log("\n--- 9. EJEMPLOS PRÁCTICOS ---");

// Ejemplo 1: Lista de compras
let listaCompras = [];

function agregarProducto(producto) {
    listaCompras.push(producto);
    console.log(`✓ ${producto} agregado a la lista`);
}

function mostrarLista() {
    console.log("\n=== LISTA DE COMPRAS ===");
    if (listaCompras.length === 0) {
        console.log("La lista está vacía");
    } else {
        listaCompras.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto}`);
        });
    }
}

agregarProducto("Pan");
agregarProducto("Leche");
agregarProducto("Huevos");
mostrarLista();

// Ejemplo 2: Gestión de calificaciones
let calificaciones = [85, 92, 78, 96, 88, 75, 89];

function analizarCalificaciones(notas) {
    let promedio = notas.reduce((sum, nota) => sum + nota, 0) / notas.length;
    let notaMaxima = Math.max(...notas);
    let notaMinima = Math.min(...notas);
    let aprobados = notas.filter(nota => nota >= 80).length;
    
    console.log("\n=== ANÁLISIS DE CALIFICACIONES ===");
    console.log(`Promedio: ${promedio.toFixed(2)}`);
    console.log(`Nota máxima: ${notaMaxima}`);
    console.log(`Nota mínima: ${notaMinima}`);
    console.log(`Estudiantes aprobados: ${aprobados}/${notas.length}`);
}

analizarCalificaciones(calificaciones);

// Ejemplo 3: Filtrado y transformación de datos
let empleados = [
    {nombre: "Ana", edad: 28, salario: 3000},
    {nombre: "Carlos", edad: 35, salario: 4500},
    {nombre: "María", edad: 42, salario: 5200},
    {nombre: "Pedro", edad: 29, salario: 3800}
];

console.log("\n=== GESTIÓN DE EMPLEADOS ===");

// Empleados con salario mayor a 4000
let empleadosBienPagados = empleados.filter(emp => emp.salario > 4000);
console.log("Empleados con salario > 4000:", empleadosBienPagados.map(emp => emp.nombre));

// Aumentar salario 10% a todos
let empleadosConAumento = empleados.map(emp => ({
    ...emp,
    salario: emp.salario * 1.1
}));
console.log("Salarios después del aumento:", empleadosConAumento);

// ===============================================
// 10. CONSEJOS Y BUENAS PRÁCTICAS
// ===============================================

console.log("\n--- 10. CONSEJOS Y BUENAS PRÁCTICAS ---");

/*
BUENAS PRÁCTICAS CON ARRAYS:

1. Usa nombres descriptivos:
   ✓ let estudiantes = [];
   ✗ let arr = [];

2. Prefiere métodos inmutables cuando sea posible:
   ✓ let nuevosNumeros = numeros.map(n => n * 2);
   ✗ for(let i = 0; i < numeros.length; i++) { numeros[i] *= 2; }

3. Usa const para arrays que no reasignarás:
   ✓ const frutas = ["manzana", "banana"];
   
4. Verifica la longitud antes de acceder:
   ✓ if (array.length > 0) { console.log(array[0]); }

5. Usa métodos apropiados para cada tarea:
   - Para encontrar: find(), includes(), indexOf()
   - Para filtrar: filter()
   - Para transformar: map()
   - Para reducir: reduce()

6. Evita modificar arrays durante la iteración:
   ✗ array.forEach((item, index) => { array.splice(index, 1); });
   ✓ array = array.filter(item => condicion);
*/

// ===============================================
// 11. EJERCICIOS PRÁCTICOS
// ===============================================

console.log("\n--- 11. EJERCICIOS PARA PRACTICAR ---");

console.log(`
EJERCICIOS SUGERIDOS:

1. Crear un array de números del 1 al 20 y:
   - Filtrar solo los números pares
   - Calcular la suma de todos
   - Encontrar el mayor y menor

2. Crear un sistema de inventario:
   - Array de productos con nombre, precio y cantidad
   - Funciones para agregar, eliminar y buscar productos
   - Calcular valor total del inventario

3. Procesar una lista de palabras:
   - Filtrar palabras con más de 5 letras
   - Convertir todas a mayúsculas
   - Ordenar alfabéticamente

4. Crear una calculadora de estadísticas:
   - Función que reciba array de números
   - Calcule promedio, mediana, moda
   - Identifique valores atípicos
`);

console.log("\n=== FIN DE LA GUÍA DE ARRAYS ===");
