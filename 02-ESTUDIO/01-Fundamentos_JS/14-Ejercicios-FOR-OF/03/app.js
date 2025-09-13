/*
3. Nivel Medio – Contar cuántas palabras tienen más de 5 letras
Objetivo: Usar for...of para contar palabras largas en una lista.

*/

let palabras = ['juan', 'pedro', 'ramiro', 'roberto', 'diosdado','carlos','santiago', 'rut', 'jhon'];
let contador = 0;

for(let letras of palabras){
    if(letras.length > 5){
        contador ++
    }
}

console.log(`La cantidad de plabras con mas de 5 letras es ${contador}`)