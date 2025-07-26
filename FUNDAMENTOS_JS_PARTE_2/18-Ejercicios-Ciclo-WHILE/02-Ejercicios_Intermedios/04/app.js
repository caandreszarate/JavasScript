/*
 Sumar los números impares del 1 al 10

*/

let i = 1;
let suma = 0;

while( i <= 10){
    if(i % 2 !== 0){
        suma += i;
    }
    i++
}
console.log(`La suma de los numeros impares es: ${suma}`)