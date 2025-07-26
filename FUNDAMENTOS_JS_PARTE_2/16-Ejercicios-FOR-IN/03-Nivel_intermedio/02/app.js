/*

Contar cuántos valores son mayores a 50
*/

const numeros ={
    a:15,
    b:56,
    c:45,
    d:67,
    e:89,
    f:45,
    g:70,
    h:56,
    i:32,
    j:51
}
let contador = 0;
for(let valores in numeros){
    if(numeros[valores] >= 50){
        contador ++
    }
}
console.log(`${contador}`)