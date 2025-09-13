/*

🟡 2. Nivel Medio – Sumar todos los elementos de un arreglo
Objetivo: Sumar los números de un arreglo usando for...of.

*/

let numeros = [1,2,3,4];
let suma = 0;


for(let numero of numeros){
    suma += numero;
}

console.log(`La sumas es: ${suma}`)