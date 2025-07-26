/*

Sumar todos los valores numéricos de un objeto
*/

const numeros = {
    a:5,
    b:`true`,
    c:16,
    d:`Santiago`,
    e:67,
    f:56,
    g:13,
    h:`false`
};


let suma = 0;
for(let valores in numeros){
    if(typeof numeros[valores] === `number`){
        suma += numeros[valores];
    }
}

console.log(`la suma de los valores es: ${suma}`);

