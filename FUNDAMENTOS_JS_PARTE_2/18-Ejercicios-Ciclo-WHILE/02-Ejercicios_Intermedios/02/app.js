/*
    Contar cuántos números del 1 al 20 son múltiplos de 3
*/

let i =1;
let contador = 0;

while( i <= 20){
  if( i % 3 === 0){
    contador++;
  }
  i++
}
console.log(`Cantidad de primos: ${contador}`)