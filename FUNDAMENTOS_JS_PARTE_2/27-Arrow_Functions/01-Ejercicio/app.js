//Convertir funciones tradiciones a arrow functions
//Funcion tradicional   
function doblar(numero) {
    return numero * 2;
}
// arrow function
const doblarArrow = numero => numero * 2;

console.log("Funcion Tradicional = doblar(5):" , doblar(5));
console.log("Arrow Function - doblarArrow(5): ", doblarArrow(5));

// Mas ejemplos para comvertir funciones basicas en arrow functions

function saludar(nombre){
    return `Hola ${nombre}`
};

const arrowSaludar = nombre => `Hola, ${nombre}`;
console.log(`ArrowSaludar("Juan")`, arrowSaludar("Juan"));


function esMayor(a,b){
    return a > b;
}
console.log(esMayor(5,4))

const arrowEsMayor = (b,c) => b > c;
console.log(arrowEsMayor(7,3))

function calcularAreaRadio(radio){
    return Math.PI * radio * radio
};
console.log(calcularAreaRadio(20));

const arrowCalcularRadio = radio => Math.PI * radio * radio;
console.log(arrowCalcularRadio(3).toFixed(1));

function cuadrado(x){
    return x * x;
}
console.log(cuadrado(2))

const arrowCuadrado = x => x * x ;
console.log(arrowCuadrado(3))

function esPar(numero){
    return numero % 2 === 0;
}
console.log(esPar(4));

const arrowEsPar = numero => numero % 2 ===0;
console.log(arrowEsPar(3));

function obtenerLongitud (str){
    return str.length;
}
console.log(obtenerLongitud("juan"))

const arrowLongitudStr = strlong => strlong.length;
console.log(arrowLongitudStr("santiagoandresmartinezcontreras"))

function multiplicar (x,y,z){
    return x * y * z
}
console.log(multiplicar(2,3,4))

const arrowMultiplicar = (f,g,h) => f * g * h;
console.log(arrowMultiplicar(2,1,3))

function obtenerMayor(a,b){
    if(a > b){
        return a;
    }else{
        return b;
    }
}
console.log(obtenerMayor(5,3));

const arrowObtenerMayor = (c , d) => {
    if(c > d){
        return c;
    }else{
        return d;
    }
}
console.log(arrowObtenerMayor(6,9))

function crearNuevoMensaje(nombre){
    return `Bienvenido: ` + nombre
}

console.log(crearNuevoMensaje(`Pedro`))

const arrowCrarNvoMensaje = nombre => `Hola! Como estas, ${nombre}`


console.log(arrowCrarNvoMensaje("Ivancito"))

//Calcular el area del radio


function calcularAreaRadio(radio){
    const pi = 3.14159;
    return pi * radio * radio
}

console.log(calcularAreaRadio(30));

const arrowCalcularAreaRadio = radio => {
    const pii = 3.14159;
    return pii * radio * radio
}

console.log(arrowCalcularAreaRadio(45));

//Numero es positivo

function numeroEsPositivo(numero){
    return numero > 0;
}
console.log(numeroEsPositivo(5));

const arrowNumeroPositivo = numero =>  numero > 0;
console.log(arrowNumeroPositivo(5));

// Concatenar una caena de caracteres

function concatenar (arg1 , arg2){
    return arg1 + arg2;
}
console.log(concatenar('hola',' mundo'));


// obtener primer caracter

function caracter (cadena){
    return cadena[0];
}
console.log(caracter('cadena'));

const arrowCaracter = cadena => cadena[0]
console.log(arrowCaracter('Mensaje'));

// convertir mayusculas

function convertirMayuscula(texto){
    return texto.toUpperCase();
}
console.log(convertirMayuscula('juan'));

const arrowConvertirMayusculas = texto => texto.toUpperCase();
console.log(arrowConvertirMayusculas('Daniel'));


// Calcular precio y porcentaje

function calcularDescuento (precio,porcentaje){
    return precio - (precio * porcentaje / 100);
}

console.log(calcularDescuento(100,12));

const arrowCalculaDescuento = (precio, porcentaje) => precio - (precio * porcentaje / 100);
console.log(arrowCalculaDescuento(100, 10));

// Determinar si es mayor de edad

function esMayorEdad(edad){
    if( edad >= 18){
        return true;
    }else{
        return false;
    }
}

console.log(esMayorEdad(18));

const arrowEsMayorEdad = edad => edad >= 18;
console.log(arrowEsMayorEdad(15));


// Crear persona

function crearPersona(nombre, edad){
    return {
        nombre: nombre,
        edad: edad
    };
}

console.log(crearPersona("Camilo", 45));

const arrowCrearPersona = (nombre, edad) => ({
    nombre: nombre,
    edad: edad
});
console.log(arrowCrearPersona('Mariana', 21));


// duplicar un array

function duplicarArray(arr){
    return arr.map(function(item){
        return item * 2
    })
}
console.log(duplicarArray([1,2,3]));


const arrowDuplicarArray = arr => arr.map(item => item *2);
console.log(arrowDuplicarArray([2,4,8]));

// Filtrar numeros pares

function filtrarPares(numeros){
    return numeros.filter(function(num){
        return num % 2 === 0;
    });
   
}
console.log(filtrarPares([1,2,3,4,5,6,7,8,9]))



const arrowFiltrarPares = numeros => numeros.filter(num => num % 2 === 0);
console.log(arrowFiltrarPares([10,11,12,13,14]));

//Saludar Persona
function saludarPersona (nombre){
    console.log('Hola ' + nombre);
    console.log('Como estas? ')
}
console.log(saludarPersona('Roberto'));


const arrowSaludarPersona =  nombre => {
    console.log('Hola ' + nombre);
    console.log('Como estas? ')
}
console.log(arrowSaludarPersona('PEDRO'))








