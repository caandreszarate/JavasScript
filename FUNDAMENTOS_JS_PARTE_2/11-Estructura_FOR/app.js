/*
Estructura de FOR

for(variable; condicion; incremento){
    codigo a ejecutar
}
*/

let list = ["eat","sleep", "code", "repeat"];

for(let i = 0; i < list.length; i++){
    console.log(list[i]);
}


// ========================================
// 10. EJEMPLOS DEL CICLO FOR
// ========================================
console.log("10. EJEMPLOS DEL CICLO FOR:");
console.log("----------------------------");

// Ejemplo 1: Recorrer números del 1 al 5 (básico)
for (let i = 1; i <= 5; i++) {
    console.log(`Ejemplo 1 - Número: ${i}`);
}
// Explicación: El ciclo inicia en 1 y termina en 5, incrementando de uno en uno.

// Ejemplo 2: Sumar los números del 1 al 10
let suma = 0;
for (let i = 1; i <= 10; i++) {
    suma += i;
}
console.log(`Ejemplo 2 - La suma de 1 a 10 es: ${suma}`);
// Explicación: Se usa una variable acumuladora para sumar todos los números del 1 al 10.

// Ejemplo 3: Recorrer un arreglo y mostrar sus elementos
let frutas = ["manzana", "banana", "naranja", "uva"];
for (let i = 0; i < frutas.length; i++) {
    console.log(`Ejemplo 3 - Fruta en la posición ${i}: ${frutas[i]}`);
}
// Explicación: Se recorre el arreglo usando su longitud y se accede a cada elemento por su índice.

// Ejemplo 4: Imprimir solo los números pares del 1 al 10
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log(`Ejemplo 4 - Número par: ${i}`);
    }
}
// Explicación: Se utiliza una condición dentro del for para mostrar solo los números pares.

// Ejemplo 5: Matriz (arreglo de arreglos) - Recorrer filas y columnas
let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {
        console.log(`Ejemplo 5 - Elemento en [${fila}][${columna}]: ${matriz[fila][columna]}`);
    }
}
// Explicación: Se usan dos ciclos for anidados para recorrer todas las filas y columnas de una matriz.

console.log("\n=== FIN DE EJEMPLOS DE FOR ==="); 