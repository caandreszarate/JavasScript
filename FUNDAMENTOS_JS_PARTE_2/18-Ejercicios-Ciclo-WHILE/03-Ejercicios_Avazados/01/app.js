/*
    Leer un número aleatorio hasta que sea 7
*/

let numero;
while(numero !== 7){
    numero = Math.floor(Math.random()*10);
    console.log(`Numero Gnerado ${numero}`)
}