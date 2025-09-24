/*
Repaso de Operadores En javaScript
*/

/*
📝 Ejercicio 1: Operadores aritméticos - suma
Enunciado: Declara dos números y súmalos.
Explicación: El operador + sirve para sumar valores numéricos.
*/

let numero_1 = 100;
let numero_2 = 200;
let resultado = numero_1 + numero_2;
console.log(`La suma es: ${resultado}`);

/*
📝 Ejercicio 2: Operadores aritméticos - resta
Enunciado: Resta 10 - 4 y muestra el resultado.
Explicación: El operador - realiza una resta.
*/

let resta_1 = 10;
let resta_2 = 4;
let resultado_resta = resta_1 - resta_2;
console.log(`La resta es: ${resultado_resta}`);

/*
📝 Ejercicio 3: Operadores aritméticos - multiplicación
Enunciado: Multiplica 6 × 7.
Explicación: El operador * realiza una multiplicación.
*/

let multiplicacion_1 = 10;
let multiplicacion_2 = 2;
let resultaMulti = multiplicacion_1 * multiplicacion_2;

console.log(`La multiplicacione es: ${resultaMulti}`);

/*

📝 Ejercicio 4: Operadores aritméticos - división
Enunciado: Divide 20 ÷ 5.
Explicación: El operador / realiza una división.
js
Copiar código

*/

let divi_1 = 10;
let divi_2 = 2;
let resulDivi = divi_1 / divi_2;
console.log(`La division es: ${resulDivi}`);

/*
📝 Ejercicio 5: Módulo (resto de división)
Enunciado: Calcula el residuo de dividir 10 ÷ 3.
Explicación: El operador % devuelve el resto de una división.
*/

let modulo_1 = 10;
let modulo_2 = 3;
let resulModulo = modulo_1 % modulo_2;
console.log(`El modulo es: ${resulModulo}`);

/*

📝 Ejercicio 6: Operador de incremento
Enunciado: Declara un número y aumenta su valor en 1.
Explicación: ++ incrementa en 1 el valor de una variable numérica.


*/

let contador = 1;
contador ++;
console.log(`El contador es: ${contador}`);

/*
📝 Ejercicio 7: Operador de decremento
Enunciado: Declara un número y reduce su valor en 1.
Explicación: -- disminuye en 1 el valor de una variable numérica.
*/

let reduceValor = 6;
reduceValor --;
console.log(reduceValor);

/*

📝 Ejercicio 8: Operadores de comparación - igualdad
Enunciado: Verifica si 5 es igual a "5".
Explicación: == compara valores, === compara valor y tipo.
*/

let comparaValor = 5;
let compraValor_1 = '5';
console.log(comparaValor == compraValor_1);

/*

📝 Ejercicio 9: Operadores lógicos - AND
Enunciado: Comprueba si una persona es mayor de edad y tiene identificación.
Explicación: && es el operador lógico AND (ambas condiciones deben ser verdaderas).
 */

let edad = 20;
let identidad = true;
console.log(edad >= 18 && identidad);

/*

📝 Ejercicio 10: Operadores lógicos - OR y NOT
Enunciado: Verifica si un número es menor que 5 o mayor que 10, y luego niega la condición.
Explicación: || es OR (una condición debe cumplirse) y ! invierte el resultado.
*/

let validaNumero = 7;
console.log(validaNumero < 5 || validaNumero > 10);

console.log(!(validaNumero < 5 || validaNumero > 10));














