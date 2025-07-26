
// ========================================
// 9. EJEMPLOS DE ESTRUCTURA SWITCH
// ========================================
console.log("9. EJEMPLOS DE ESTRUCTURA SWITCH:");
console.log("---------------------------------");

// Ejemplo 1: Días de la semana
let dia = 3;

switch (dia) {
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
        console.log("Sábado");
        break;
    case 7:
        console.log("Domingo");
        break;
    default:
        console.log("Día no válido");
}
// Explicación: Según el valor de 'dia', se imprime el nombre correspondiente. Si no coincide con ningún caso, se ejecuta 'default'.

// Ejemplo 2: Calificaciones con letras
let calificacion = 'B';

switch (calificacion) {
    case 'A':
        console.log("Excelente");
        break;
    case 'B':
        console.log("Muy bien");
        break;
    case 'C':
        console.log("Bien");
        break;
    case 'D':
        console.log("Suficiente");
        break;
    case 'F':
        console.log("Reprobado");
        break;
    default:
        console.log("Calificación no válida");
}
// Explicación: El switch compara el valor de 'calificacion' con cada caso. Si encuentra coincidencia, ejecuta ese bloque.

// Ejemplo 3: Agrupando casos
let colorSemaforo = "amarillo";

switch (colorSemaforo) {
    case "rojo":
        console.log("Detente");
        break;
    case "amarillo":
    case "naranja":
        console.log("Precaución");
        break;
    case "verde":
        console.log("Avanza");
        break;
    default:
        console.log("Color no reconocido");
}
// Explicación: Puedes agrupar varios casos para que ejecuten el mismo bloque de código.

// Ejemplo 4: Switch con operaciones
let operacion = "sumar";
let a = 5, b = 3;

switch (operacion) {
    case "sumar":
        console.log(`${a} + ${b} = ${a + b}`);
        break;
    case "restar":
        console.log(`${a} - ${b} = ${a - b}`);
        break;
    case "multiplicar":
        console.log(`${a} * ${b} = ${a * b}`);
        break;
    case "dividir":
        if (b !== 0) {
            console.log(`${a} / ${b} = ${a / b}`);
        } else {
            console.log("No se puede dividir entre cero");
        }
        break;
    default:
        console.log("Operación no reconocida");
}
// Explicación: El switch es útil para seleccionar entre varias operaciones posibles.

console.log("\n=== FIN DE EJEMPLOS DE SWITCH ==="); 

let producto = `Papayas`;

switch(producto){
    case `Peras`:
        console.log(`Las peras cuestan $10 Pesos`);
        break;
    
    case `Mangos`:
        console.log(`Los mangos cuestan $30 pesos`)
        break;
    
    case `Mandarinas`:
        console.log(`Las mandarinas cuestan $40 Pesos`);
        break;
    case `Mora`:
    case `Granadilla`:
        console.log(`La Mora y la Granadilla cuestan $50 Pesos el kilo`);
        break;

    default:
        console.log(`lo siento no contamos con ${producto}`)
}