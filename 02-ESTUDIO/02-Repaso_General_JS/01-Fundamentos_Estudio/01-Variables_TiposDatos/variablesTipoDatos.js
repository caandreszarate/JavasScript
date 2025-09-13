/*
📝 Ejercicio 1: Declarar una variable con let
Enunciado: Declara una variable nombre con tu nombre y muéstralo en consola.
Explicación: Usamos let para declarar variables que pueden cambiar su valor.
*/


let myVariable = 'Carlos'
console.log(myVariable);

/*
📝 Ejercicio 2: Declarar una constante con const
Enunciado: Crea una constante pi con el valor 3.1416 y muéstrala en consola.
Explicación: Con const declaramos valores que no deben cambiar.
*/

const pi = 3.1416;
console.log(pi);

/*

📝 Ejercicio 3: Tipos de datos - String
Enunciado: Declara una variable con un texto y muestra su tipo con typeof.
Explicación: typeof nos dice el tipo de dato de la variable.

js
Copiar código

*/

const myTexto = 'Hola Mundo!'
console.log(typeof myTexto);
const myNumber = 345456;
console.log(typeof myNumber);


/*
 📝 Ejercicio 4: Tipos de datos - Number
Enunciado: Declara un número y muestra su tipo.
Explicación: Los números en JS pueden ser enteros o decimales.
*/

let myNumber2 = 234;
let myNuymberFloat = 13.5;

console.log(typeof myNumber2);
console.log(typeof myNuymberFloat);


/*
📝 Ejercicio 5: Tipos de datos - Boolean
Enunciado: Declara una variable con valor true y muestra su tipo.
Explicación: Los booleanos representan verdadero o falso.
*/

let myVariablebol = true;
console.log(typeof myVariablebol);

/*
📝 Ejercicio 6: Concatenación de Strings
Enunciado: Declara dos variables nombre y apellido, y únelas en un solo string.
Explicación: Se pueden concatenar con +.
 */

let nombre = 'Juan Dario ';
let apellido = 'Gomez Gomez';
let nombreCompleto = nombre + apellido;
console.log(nombreCompleto);

/*
📝 Ejercicio 7: Template Strings
Enunciado: Usa template literals (`) para concatenar variables.
Explicación: Los template strings permiten insertar variables fácilmente con ${}.
*/

let variable_1 = 'Daniel Dario ';
let variable_2 = 'Gomez Gomez'
console.log(`Hola me llamo: ${variable_1} ${variable_2}`);


/*
📝 Ejercicio 8: Valores null y undefined
Enunciado: Declara una variable vacía y otra con valor null.
Explicación: undefined significa que la variable fue declarada pero no tiene valor, null es ausencia intencional de valor.
*/

let variableVacia;
let variableNull = null;
console.log(variableVacia);
console.log(variableNull);



/*
📝 Ejercicio 9: Convertir número a string
Enunciado: Convierte el número 123 a string.
Explicación: Se usa el método toString().
*/

let variableNumero = 123;
console.log(variableNumero.toString());
console.log(typeof variableNumero.toString());

/*
📝 Ejercicio 10: Convertir string a número
Enunciado: Convierte el string "456" a número.
Explicación: Se usa Number() o parseInt().
*/

let letras = '123';
let numeros_1 = Number(letras);
console.log(numeros_1);
console.log(typeof numeros_1);




















