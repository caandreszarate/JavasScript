/*
Funciones Puras e impuras

FUNCIONES PURAS
- No dependen de variables externas
- No modifican el estado del programa
- No tienen efectos secundarios

side effects:
- Son predecibles y reutilizables
- Modificar variables globales
- Modificar parametros 
- Solicitudes http
- Imprimir mensajes console.log o alert
- Manipulacion de DOM
- Obtener la hora actual

FUNCIONES IMPURAS
- Dependen de variables externas
- Modifican el estado del programa
- Tienen efectos secundarios


*/

// Ejemplo de funcion pura

function suma (a,b){
    return a + b;
}

// Ejercicio 1: Crea una función que reciba dos números y devuelva su suma.

function suma (a,b){
    return a + b;
}
suma(1,2);

// Ejercicio 2: Obtener la hora actual

function obtenerHoraActual(){
    return new Date().toLocaleDateString();
}
console.log(obtenerHoraActual());

// Ejercicio 3: filtrar numeros pares

function filtrarPares(arr){
    return arr.filter( num => num % 2 === 0)
}
console.log(filtrarPares([1,2,3,4,5,6,7,8,9,10]));

// Modifica variable externa

let contador = 0;

function incrementarContador(){
    contador++;
    return contador;
}

console.log(incrementarContador());
console.log(incrementarContador());


// Ejercicio 4 : Convertir texto a Mayusculas

function convertirMayusculas(texto){
    return texto.toUpperCase();
}
console.log(convertirMayusculas("roberto"));

//Ejercicion 5 : Función pura + impura – Registrar actividad del usuario

let log = [];

function formatearNensaje (nombre){
    return `Usuario ${nombre} ha iniciado sesion`;
}

function registrarEnLog(mensaje){
    log.push(mensaje);
    return log;
}

const mensaje = formatearNensaje("Juan");
console.log(registrarEnLog(mensaje));


// Ejercicio 6: Pura + impura = calcular edad y registrar fecha 

let fechaActual = new Date();

function calcularEdad(fechaNacimiento){
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    return edad;
}

function registrarFecha(fecha){
    return fecha;   
}

const fechaNacimiento = new Date(1976, 8, 18);
const edad = calcularEdad(fechaNacimiento);
const fecha = registrarFecha(fechaActual);

console.log(`Edad: ${edad}`);
console.log(`Fecha: ${fecha}`);


