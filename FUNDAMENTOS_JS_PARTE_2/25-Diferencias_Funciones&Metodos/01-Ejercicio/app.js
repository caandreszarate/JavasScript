// ===== EJERCICIOS BÁSICOS DE FUNCIONES Y MÉTODOS =====

console.log("=== EJERCICIOS BÁSICOS ===\n");

// ===== EJERCICIO 1: CALCULADORA BÁSICA =====
console.log("EJERCICIO 1: CALCULADORA BÁSICA");
console.log("Crea una función llamada 'calculadora' que reciba dos números y una operación (suma, resta, multiplicación, división) y retorne el resultado.");
// Codig

function calculadora (num1,num2, operacion){
    switch(operacion){
        case 'suma':
            return num1 + num2;
            break;
        case 'resta':
            return num1 - num2;
            break;
        case 'multiplicacion':
            return num1 * num2;
            break;
        case 'division':
            return num1 / num2;
            break;
        default:
            return `Operacion no valida`;
            break;  
    }
}
// Pruebas:
console.log("Suma:", calculadora(10, 5, 'suma')); // Debe mostrar: 15
console.log("Resta:", calculadora(10, 5, 'resta')); // Debe mostrar: 5
console.log("Multiplicación:", calculadora(10, 5, 'multiplicacion')); // Debe mostrar: 50
console.log(`Division: ${calculadora(10,2,'division')}`)

console.log("\n");