/*
Usa for in para contar cuántas propiedades tiene un objeto.
*/

let persona ={
    nombre: `juan`,
    edad: 35,
    ciudad:`Bogota`,
    cedula: 123,
    estatura: 1.86,
};

let contador = 0;

for(let valor in persona){
    contador ++;
}
console.log(contador)