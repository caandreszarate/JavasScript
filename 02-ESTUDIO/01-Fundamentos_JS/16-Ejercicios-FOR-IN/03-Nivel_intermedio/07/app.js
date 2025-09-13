/*

Cuenta cuántas propiedades tienen valores de tipo string.
*/

const datos ={
    a:1,
    b:`Andres`,
    c:`Felipe`,
    d:5,
    c:6,
    d:`Martin`,
    e:`Elias`,
    f:`Santiago`,
    g:`Andres`
};
let contador = 0;
for(let valores in datos){
    if( typeof datos[valores === `string`]){
        contador ++
    }
}
console.log(contador);

