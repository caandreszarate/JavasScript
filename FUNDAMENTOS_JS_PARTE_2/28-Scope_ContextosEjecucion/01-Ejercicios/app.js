/*
Ejercicios de scope y contextos de ejecucion
*/

// 1. que imprime el sisguiente codigo

function mostrarNombre(){
    let nombre = 'Carlos';
    console.log(nombre)
}
mostrarNombre();


// 2. Scope local vs scope global

let saludo = 'Scope Global'; // Variable Global

function funcionSaludo (){
    let saludo = 'Scope Local' // Variable Local
    console.log(`Estoy dentro de la Funcion por lo tanto soy un: ${saludo}`)
}
funcionSaludo();
console.log(`Esteoy por fuera de la funcion por lo tanto soy un ${saludo}`);

//3. Variables comparatidas

var x = 10;

function test(){
    x = 20;
}
test();
console.log(x)

// 4. Clouseeres y scope
function crearContador(){
    let contador = 0;
    return function(){
        contador ++;
        return contador;
    };
}
  
const contar = crearContador();
console.log(contar());
console.log(contar())
console.log(contar());

saludar();

function saludar(){
    console.log('Hola Hoisting')
}

function saludito(){
    console.log('Esto es un SALUDITO')
}

saludito();



