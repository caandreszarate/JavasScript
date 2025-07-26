/*
Multiplica todos los valores numéricos de un objeto.

*/

const numeros = {
    a:10,
    b:5,
    c:3
}

let producto = 1;

for(let clave in numeros){
    producto *= numeros[clave];
}

console.log(producto)