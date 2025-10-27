// ========================================
// 10 EJERCICIOS BÁSICOS CON FUNCIONES EN JAVASCRIPT
// ========================================

console.log("=== EJERCICIOS BÁSICOS CON FUNCIONES EN JAVASCRIPT ===\n");

// ========================================
// EJERCICIO 1: Función que saluda
// Enunciado: Crear una función que reciba un nombre y retorne un saludo personalizado
// ========================================

function saludar(nombre) {
    return `¡Hola, ${nombre}! ¿Cómo estás?`;
}

// Prueba
console.log("EJERCICIO 1 - Función que saluda:");
console.log(saludar("María"));
console.log(saludar("Juan"));
console.log();

// ========================================
// EJERCICIO 2: Función que suma dos números
// Enunciado: Crear una función que reciba dos números y retorne su suma
// ========================================

function sumar(a, b) {
    return a + b;
}

// Prueba
console.log("EJERCICIO 2 - Función que suma:");
console.log(`5 + 3 = ${sumar(5, 3)}`);
console.log(`10 + 7 = ${sumar(10, 7)}`);
console.log();

// ========================================
// EJERCICIO 3: Función que determina si un número es par o impar
// Enunciado: Crear una función que reciba un número y retorne si es par o impar
// ========================================

function esParOImpar(numero) {
    return numero % 2 === 0 ? "par" : "impar";
}

// Prueba
console.log("EJERCICIO 3 - Par o impar:");
console.log(`El número 8 es ${esParOImpar(8)}`);
console.log(`El número 7 es ${esParOImpar(7)}`);
console.log();

// ========================================
// EJERCICIO 4: Función que calcula el área de un rectángulo
// Enunciado: Crear una función que reciba base y altura, y retorne el área del rectángulo
// ========================================

function calcularAreaRectangulo(base, altura) {
    return base * altura;
}

// Prueba
console.log("EJERCICIO 4 - Área de rectángulo:");
console.log(`Área de rectángulo (5x3): ${calcularAreaRectangulo(5, 3)} unidades²`);
console.log(`Área de rectángulo (8x4): ${calcularAreaRectangulo(8, 4)} unidades²`);
console.log();

// ========================================
// EJERCICIO 5: Función que encuentra el mayor de tres números
// Enunciado: Crear una función que reciba tres números y retorne el mayor
// ========================================

function encontrarMayor(a, b, c) {
    return Math.max(a, b, c);
}

// Alternativa sin Math.max
function encontrarMayorAlternativo(a, b, c) {
    if (a >= b && a >= c) {
        return a;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
}

// Prueba
console.log("EJERCICIO 5 - Mayor de tres números:");
console.log(`Mayor entre 10, 5, 8: ${encontrarMayor(10, 5, 8)}`);
console.log(`Mayor entre 3, 15, 7: ${encontrarMayorAlternativo(3, 15, 7)}`);
console.log();

// ========================================
// EJERCICIO 6: Función que convierte grados Celsius a Fahrenheit
// Enunciado: Crear una función que convierta temperatura de Celsius a Fahrenheit
// Fórmula: F = (C × 9/5) + 32
// ========================================

function celsiusAFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Prueba
console.log("EJERCICIO 6 - Conversión Celsius a Fahrenheit:");
console.log(`0°C = ${celsiusAFahrenheit(0)}°F`);
console.log(`25°C = ${celsiusAFahrenheit(25)}°F`);
console.log(`100°C = ${celsiusAFahrenheit(100)}°F`);
console.log();

// ========================================
// EJERCICIO 7: Función que calcula el factorial de un número
// Enunciado: Crear una función que calcule el factorial de un número positivo
// ========================================

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

// Versión recursiva
function factorialRecursivo(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursivo(n - 1);
}

// Prueba
console.log("EJERCICIO 7 - Factorial:");
console.log(`Factorial de 5: ${factorial(5)}`);
console.log(`Factorial de 6 (recursivo): ${factorialRecursivo(6)}`);
console.log();

// ========================================
// EJERCICIO 8: Función que cuenta las vocales en una cadena
// Enunciado: Crear una función que cuente cuántas vocales hay en una cadena de texto
// ========================================

function contarVocales(texto) {
    const vocales = 'aeiouAEIOU';
    let contador = 0;
    
    for (let i = 0; i < texto.length; i++) {
        if (vocales.includes(texto[i])) {
            contador++;
        }
    }
    
    return contador;
}

// Versión con expresión regular
function contarVocalesRegex(texto) {
    const vocales = texto.match(/[aeiouAEIOU]/g);
    return vocales ? vocales.length : 0;
}

// Prueba
console.log("EJERCICIO 8 - Contar vocales:");
console.log(`Vocales en "Hola mundo": ${contarVocales("Hola mundo")}`);
console.log(`Vocales en "JavaScript" (regex): ${contarVocalesRegex("JavaScript")}`);
console.log();

// ========================================
// EJERCICIO 9: Función que invierte una cadena
// Enunciado: Crear una función que reciba una cadena y la retorne invertida
// ========================================

function invertirCadena(texto) {
    return texto.split('').reverse().join('');
}

// Versión manual
function invertirCadenaManual(texto) {
    let resultado = '';
    for (let i = texto.length - 1; i >= 0; i--) {
        resultado += texto[i];
    }
    return resultado;
}

// Prueba
console.log("EJERCICIO 9 - Invertir cadena:");
console.log(`"Hola" invertida: "${invertirCadena("Hola")}"`);
console.log(`"JavaScript" invertida (manual): "${invertirCadenaManual("JavaScript")}"`);
console.log();

// ========================================
// EJERCICIO 10: Función que genera números aleatorios en un rango
// Enunciado: Crear una función que genere un número aleatorio entre un mínimo y máximo
// ========================================

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función que genera varios números aleatorios
function generarNumerosAleatorios(cantidad, min, max) {
    const numeros = [];
    for (let i = 0; i < cantidad; i++) {
        numeros.push(numeroAleatorio(min, max));
    }
    return numeros;
}

// Prueba
console.log("EJERCICIO 10 - Números aleatorios:");
console.log(`Número aleatorio entre 1 y 10: ${numeroAleatorio(1, 10)}`);
console.log(`5 números aleatorios entre 1 y 100: ${generarNumerosAleatorios(5, 1, 100)}`);
console.log();

// ========================================
// EJERCICIOS ADICIONALES PARA PRACTICAR
// ========================================

console.log("=== EJERCICIOS ADICIONALES PARA PRACTICAR ===");
console.log("1. Crear una función que determine si un año es bisiesto");
console.log("2. Crear una función que calcule el promedio de un array de números");
console.log("3. Crear una función que determine si una palabra es palíndromo");
console.log("4. Crear una función que convierta la primera letra de cada palabra a mayúscula");
console.log("5. Crear una función que calcule el área de un círculo");