/*
Estructura del metodo for of:

itera ciertos elementos, lo vamos a estar utilizando en objetos iteralables, lista de algo

arrays y strings


for(variable of objeto){
    codigo a ejecutar
}

*/

let canasta = ['manzana','pera','naranaja','uva'];

for(fruta of canasta){
    console.log(fruta)
}

// ========================================
// EJEMPLOS DEL CICLO FOR...OF EN JAVASCRIPT
// ========================================

console.log("=== EJEMPLOS DEL CICLO FOR...OF ===\n");

// Ejemplo 1: Recorrer un arreglo de números (básico)
const numeros = [10, 20, 30, 40, 50];
for (const numero of numeros) {
    console.log(`Ejemplo 1 - Número: ${numero}`);
}
// Explicación: Recorre cada elemento del arreglo y lo muestra.

console.log("------------------------------");

// Ejemplo 2: Recorrer un arreglo de strings
const nombres = ["Ana", "Luis", "Pedro", "María"];
for (const nombre of nombres) {
    console.log(`Ejemplo 2 - Nombre: ${nombre}`);
}
// Explicación: Muestra cada nombre del arreglo uno por uno.

console.log("------------------------------");

// Ejemplo 3: Recorrer una cadena de texto carácter por carácter
const palabra = "Platzi";
for (const letra of palabra) {
    console.log(`Ejemplo 3 - Letra: ${letra}`);
}
// Explicación: El for...of también sirve para recorrer strings carácter por carácter.

console.log("------------------------------");

// Ejemplo 4: Sumar todos los valores de un arreglo usando for...of
const valores = [3, 7, 2, 9, 5];
let suma = 0;
for (const valor of valores) {
    suma += valor;
}
console.log(`Ejemplo 4 - La suma de los valores es: ${suma}`);
// Explicación: Se usa for...of para recorrer y sumar todos los elementos del arreglo.

console.log("------------------------------");

// Ejemplo 5: Recorrer un arreglo de objetos y mostrar propiedades
const personas = [
    { nombre: "Carlos", edad: 28 },
    { nombre: "Lucía", edad: 22 },
    { nombre: "Miguel", edad: 35 }
];
for (const persona of personas) {
    console.log(`Ejemplo 5 - ${persona.nombre} tiene ${persona.edad} años`);
}
// Explicación: Se recorre un arreglo de objetos y se accede a sus propiedades.

console.log("\n=== FIN DE EJEMPLOS DE FOR...OF ==="); 