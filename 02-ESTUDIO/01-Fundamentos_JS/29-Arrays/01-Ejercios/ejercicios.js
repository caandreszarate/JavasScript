// Formas de crear un array

// 1. New Array
const frutas = Array('Manzanas', 'Mora','Uvas');
console.log(frutas)

// 2. Sintaxis literal de un array

const numeros = [1,2,3,4];
console.log(numeros)

// 3. Array Vacio

const emtpyArray = [];
console.log(emtpyArray);


// 4. arrays Mixtos

const ingredientes = [
    'Manaza',
    23,
    true,
    {
        ingrediente: 'Leche',
        cantidad: '1 Taza',
    }
]
console.log(ingredientes.length)
const ingrediente = ingredientes[3];
console.log(ingrediente)

// Mutabilidad e inmutabildiad => si tenemos un array ese objeto puede tener diferentes metodos dependiendo cada uno de los metodos


// Metodo PUSH

frutas.push('Melon');
console.log(frutas)

const newFrutas = frutas.concat(['Mango', 'Papaya']);
console.log(newFrutas);

const arraySpread1 = [1,2,3]
const arraySpread2 = [...arraySpread1, 4, 5,6];
console.log(arraySpread2)

// revisar si un array es un array

const isArray = Array.isArray(frutas);
console.log(isArray);



// EJERCICIOS PRACTICA

// 1. Agregar el numero 4 al final del array [1,2,3] utilizando un metodo mutable

let arrayNumeros = [1,2,3];
arrayNumeros.push(4);
console.log(arrayNumeros);

// 2. Agrega el número 4 al final de [1, 2, 3] sin modificar el array original.

let arrayOriginalNum = [4,5,6];
let copiaArrayOriginal = [...arrayOriginalNum , 7];
console.log(copiaArrayOriginal);

// 3. Elimina el último elemento del array [1, 2, 3] => Utiliza el metodo POP

let metodoPop = [6,7,8];
metodoPop.pop(8);
console.log(metodoPop);

// 4. Crea un nuevo array a partir de [1, 2, 3] sin el último elemento. => Utiliza metodo slice

let arraySliceNvo = [7,8,9];
let nvoArraySlice = arraySliceNvo.slice(0 , -1)
console.log(arraySliceNvo);
console.log(nvoArraySlice);

// 5. Ordena el array [3, 1, 2] de forma ascendente. => Utiliza metodo SORT

let arraySort = [1,6,4,3,8,2,8,5];
arraySort.sort();
console.log(arraySort)

// 6. Ordena el array [3, 1, 2] sin modificar el original. => Utiliza metodo SORT y SPREAD

let originalSort = [1,3,2,5,4,7,6];
let copiaSort = [...originalSort].sort(); // SPREAD Y SORT();
console.log(originalSort);
console.log(copiaSort);

//7. Invierte el array [1, 2, 3]. => Utiliza metodo REVERSE

let arrayReverse = [3,4,5,6,7];
let nvoArrayReverse = [...arrayReverse].sort();
nvoArrayReverse.reverse();
console.log(arrayReverse);
console.log(nvoArrayReverse);

// 8. Invierte [1, 2, 3] sin afectar el original.

let originalReverse = [6,7,8,9];
let copiaReverse = [...originalReverse].reverse();
console.log(originalReverse);
console.log(copiaReverse);

//9. Reemplaza el segundo elemento de [1, 2, 3] por 9.

let reemplazaNumero = [1,2,3];
reemplazaNumero[1] = 9
console.log(reemplazaNumero);

// 10. Crea un nuevo array a partir de [1, 2, 3] donde el segundo elemento sea

let nvosNumeros = [1, 2, 3];
let nuevoArray = nvosNumeros.map((n, i) => i === 1 ? 9 : n);
console.log(nvosNumeros);
console.log(nuevoArray);

/*
Aquí tienes 10 ejercicios básicos en JavaScript para practicar los métodos .push() y .pop() utilizando funciones. Cada ejercicio incluye el enunciado, la función con la solución, la llamada a la función, y la salida esperada en consola.

*/

// 1. 












