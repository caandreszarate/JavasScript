/*
    Ejercicios Basicos de Map y ForEach
*/

//1. Dado un arreglo de números, usa map() para obtener un nuevo arreglo donde cada número esté duplicado.

const numeros = [1,2,3,4,5];
const numerosDuplicados = numeros.map(num => num * 2);
console.log(numeros);
console.log(numerosDuplicados);

//2.Convierte un array de números a un array de strings


const numerosAtexto = [10,20,30,40]
const comoTexto = numerosAtexto.map( num => String(num));
console.log(comoTexto);


// 3. Enunciado: Dado un array de palabras, obtener un array con sus longitudes.
 
const arrayPalabras = ['Diosdado','Miguel','Camilo','Gonzalo'];
const arrayLongitudes = arrayPalabras.map(letras => letras.length);
console.log(arrayLongitudes);

// 4. Enunciado: Dado un array de temperaturas en Celsius, convertirlas a Fahrenheit. °F = (°C * 9/5) + 32

const  temCelcius = [30,25,28,37];
const temFahrenheit = temCelcius.map(temp => (temp * 9/5)+32);
console.log(temFahrenheit);




