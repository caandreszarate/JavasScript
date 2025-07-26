/*

Estructuras condicionales:
1. if
2. else
3. else if

*/

console.log("=== EJEMPLOS DE ESTRUCTURAS CONDICIONALES EN JAVASCRIPT ===\n");

// ========================================
// 1. ESTRUCTURA IF BÁSICA
// ========================================
console.log("1. ESTRUCTURA IF BÁSICA:");
console.log("------------------------");

let edad = 18;

if (edad >= 18) {
    console.log("Eres mayor de edad");
}

// Ejemplo con múltiples condiciones usando operadores lógicos
let tieneLicencia = true;
let edadConductor = 20;

if (edadConductor >= 18 && tieneLicencia) {
    console.log("Puedes conducir legalmente");
}

console.log("\n");

// ========================================
// 2. ESTRUCTURA IF-ELSE
// ========================================
console.log("2. ESTRUCTURA IF-ELSE:");
console.log("----------------------");

let temperatura = 25;

if (temperatura > 30) {
    console.log("Hace mucho calor");
} else {
    console.log("La temperatura está agradable");
}

// Ejemplo con números
let numero = 7;

if (numero % 2 === 0) {
    console.log(`${numero} es un número par`);
} else {
    console.log(`${numero} es un número impar`);
}

console.log("\n");

// ========================================
// 3. ESTRUCTURA IF-ELSE IF-ELSE
// ========================================
console.log("3. ESTRUCTURA IF-ELSE IF-ELSE:");
console.log("-------------------------------");

let calificacion = 85;

if (calificacion >= 90) {
    console.log("Excelente - Calificación A");
} else if (calificacion >= 80) {
    console.log("Muy bien - Calificación B");
} else if (calificacion >= 70) {
    console.log("Bien - Calificación C");
} else if (calificacion >= 60) {
    console.log("Aprobado - Calificación D");
} else {
    console.log("Reprobado - Calificación F");
}

// Ejemplo con rangos de edad
let edadPersona = 25;

if (edadPersona < 13) {
    console.log("Eres un niño");
} else if (edadPersona < 20) {
    console.log("Eres un adolescente");
} else if (edadPersona < 65) {
    console.log("Eres un adulto");
} else {
    console.log("Eres un adulto mayor");
}

console.log("\n");

// ========================================
// 4. ESTRUCTURAS CONDICIONALES ANIDADAS
// ========================================
console.log("4. ESTRUCTURAS CONDICIONALES ANIDADAS:");
console.log("--------------------------------------");

let esEstudiante = true;
let tieneBeca = false;
let promedio = 8.5;

if (esEstudiante) {
    if (tieneBeca) {
        console.log("Eres estudiante con beca");
    } else {
        if (promedio >= 8.0) {
            console.log("Eres estudiante sin beca pero con buen promedio");
        } else {
            console.log("Eres estudiante sin beca, mejora tu promedio");
        }
    }
} else {
    console.log("No eres estudiante");
}

console.log("\n");

// ========================================
// 5. OPERADORES TERNARIOS
// ========================================
console.log("5. OPERADORES TERNARIOS:");
console.log("------------------------");

// Sintaxis: condición ? valorSiVerdadero : valorSiFalso
let edadVotar = 20;
let puedeVotar = edadVotar >= 18 ? "Puede votar" : "No puede votar";
console.log(puedeVotar);

// Ternario anidado
let hora = 14;
let saludo = hora < 12 ? "Buenos días" : hora < 18 ? "Buenas tardes" : "Buenas noches";
console.log(saludo);

console.log("\n");

// ========================================
// 6. ESTRUCTURA SWITCH
// ========================================
console.log("6. ESTRUCTURA SWITCH:");
console.log("---------------------");

let diaSemana = 3;

switch (diaSemana) {
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("Miércoles");
        break;
    case 4:
        console.log("Jueves");
        break;
    case 5:
        console.log("Viernes");
        break;
    case 6:
    case 7:
        console.log("Fin de semana");
        break;
    default:
        console.log("Día no válido");
}

// Switch con strings
let color = "rojo";

switch (color) {
    case "rojo":
        console.log("El color es rojo");
        break;
    case "azul":
        console.log("El color es azul");
        break;
    case "verde":
        console.log("El color es verde");
        break;
    default:
        console.log("Color no reconocido");
}

console.log("\n");

// ========================================
// 7. EJEMPLOS PRÁCTICOS
// ========================================
console.log("7. EJEMPLOS PRÁCTICOS:");
console.log("----------------------");

// Verificar si un número es positivo, negativo o cero
let numeroVerificar = -5;

if (numeroVerificar > 0) {
    console.log(`${numeroVerificar} es positivo`);
} else if (numeroVerificar < 0) {
    console.log(`${numeroVerificar} es negativo`);
} else {
    console.log(`${numeroVerificar} es cero`);
}

// Verificar si un año es bisiesto
let año = 2024;
let esBisiesto = (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);

if (esBisiesto) {
    console.log(`${año} es un año bisiesto`);
} else {
    console.log(`${año} no es un año bisiesto`);
}

// Verificar el tipo de usuario según su rol
let rolUsuario = "admin";
let tienePermisos = false;

switch (rolUsuario) {
    case "admin":
        tienePermisos = true;
        console.log("Usuario administrador con todos los permisos");
        break;
    case "moderador":
        tienePermisos = true;
        console.log("Usuario moderador con permisos limitados");
        break;
    case "usuario":
        tienePermisos = false;
        console.log("Usuario regular sin permisos especiales");
        break;
    default:
        console.log("Rol de usuario no reconocido");
}

console.log("\n=== FIN DE EJEMPLOS ===");


console.log('=========EJEMPLOS PLATZI=======');

let nombre = 'Juan';

if(nombre === 'Diego'){
    console.log(`Hola ${nombre}`);
}else{
    console.log(`Nombre no encontrado`);
}

