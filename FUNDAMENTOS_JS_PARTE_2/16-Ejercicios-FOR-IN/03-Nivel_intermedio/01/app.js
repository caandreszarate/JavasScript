/*
Suma todos los valores numéricos de un objeto.

 */

const numeros = {a:3,b:8,c:12,d:23,e:45,f:56};
let suma = 0;

for(let valores in numeros){
    suma += numeros[valores]
}

console.log(`La suma de los valores del arreglo es: ${suma}`);

