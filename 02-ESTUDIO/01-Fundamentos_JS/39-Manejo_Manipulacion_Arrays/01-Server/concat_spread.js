/*

Concat y spread :  Metodo que sirve para fusionar arrays, no modifica el array original sino crea un array nuevo

*/

const elementos = [1,1,2,2];
const otrosElementos = [3,3,4,4];

const newArray = elementos.concat(otrosElementos);
const rta = [...elementos, ...otrosElementos]
elementos.push(...otrosElementos)
console.log('Modifca Array Original ',elementos)
console.log("Spreat", rta)
console.log('Concat', newArray)

