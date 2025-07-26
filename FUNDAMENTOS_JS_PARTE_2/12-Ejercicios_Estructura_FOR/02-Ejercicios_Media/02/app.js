/*
Contar cuántos números pares hay entre 1 y 100

*/

let contador = 0;

for(let i = 1; i <= 100; i++){
    if(i % 2 === 0) contador ++
}

console.log(`la cantidad de numeros pares que hay entre 1 y 100 son:  ${contador}`)