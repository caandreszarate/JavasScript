// ===============================================
// OPERADOR SPREAD (...) EN JAVASCRIPT
// ===============================================

/* 
El operador SPREAD (...) es una característica introducida en ES6 (ES2015) 
que permite "expandir" o "descomponer" elementos iterables (arrays, strings, objetos) 
en lugares donde se esperan múltiples elementos.

SINTAXIS: ...nombreVariable
*/

console.log("=== INTRODUCCIÓN AL OPERADOR SPREAD ===");

// ===============================================
// 1. SPREAD CON ARRAYS
// ===============================================

console.log("\n1. SPREAD CON ARRAYS:");

// Ejemplo básico: expandir un array
const numeros = [1, 2, 3, 4, 5];
console.log("Array original:", numeros);
console.log("Con spread:", ...numeros); // Imprime: 1 2 3 4 5

// Uso en funciones que esperan múltiples parámetros
function sumar(a, b, c) {
    return a + b + c;
}

const valores = [10, 20, 30];
console.log("Suma tradicional:", sumar(valores[0], valores[1], valores[2]));
console.log("Suma con spread:", sumar(...valores));

// ===============================================
// 2. COPIAR ARRAYS
// ===============================================

console.log("\n2. COPIAR ARRAYS:");

const frutas = ['manzana', 'banana', 'naranja'];
const copiaFrutas = [...frutas]; // Copia superficial

console.log("Array original:", frutas);
console.log("Copia con spread:", copiaFrutas);

// Modificar la copia no afecta el original
copiaFrutas.push('uva');
console.log("Original después de modificar copia:", frutas);
console.log("Copia modificada:", copiaFrutas);

// ===============================================
// 3. CONCATENAR ARRAYS
// ===============================================

console.log("\n3. CONCATENAR ARRAYS:");

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [7, 8, 9];

// Método tradicional
const concatenadoTradicional = array1.concat(array2, array3);
console.log("Concatenación tradicional:", concatenadoTradicional);

// Con spread operator
const concatenadoSpread = [...array1, ...array2, ...array3];
console.log("Concatenación con spread:", concatenadoSpread);

// Insertar elementos en posiciones específicas
const inicio = [0];
const medio = [...array1, 'MEDIO', ...array2];
const final = [...array1, ...array2, 'FINAL'];

console.log("Con elemento al inicio:", [...inicio, ...array1]);
console.log("Con elemento en el medio:", medio);
console.log("Con elemento al final:", final);

// ===============================================
// 4. SPREAD CON STRINGS
// ===============================================

console.log("\n4. SPREAD CON STRINGS:");

const palabra = "JavaScript";
const letras = [...palabra];
console.log("String original:", palabra);
console.log("Array de letras:", letras);

// Útil para manipular caracteres
const vocales = [...'aeiou'];
console.log("Vocales como array:", vocales);

// ===============================================
// 5. SPREAD CON OBJETOS
// ===============================================

console.log("\n5. SPREAD CON OBJETOS:");

const persona = {
    nombre: 'Carlos',
    edad: 30,
    ciudad: 'Madrid'
};

// Copiar objeto
const copiaPersona = {...persona};
console.log("Objeto original:", persona);
console.log("Copia del objeto:", copiaPersona);

// Agregar nuevas propiedades
const personaCompleta = {
    ...persona,
    profesion: 'Desarrollador',
    salario: 50000
};
console.log("Persona con nuevas propiedades:", personaCompleta);

// Sobrescribir propiedades existentes
const personaActualizada = {
    ...persona,
    edad: 31,
    ciudad: 'Barcelona'
};
console.log("Persona actualizada:", personaActualizada);

// ===============================================
// 6. COMBINAR OBJETOS
// ===============================================

console.log("\n6. COMBINAR OBJETOS:");

const datosPersonales = {
    nombre: 'Ana',
    apellido: 'García'
};

const datosLaborales = {
    empresa: 'TechCorp',
    cargo: 'Frontend Developer'
};

const datosContacto = {
    email: 'ana@email.com',
    telefono: '123-456-789'
};

const perfilCompleto = {
    ...datosPersonales,
    ...datosLaborales,
    ...datosContacto
};

console.log("Perfil completo:", perfilCompleto);

// ===============================================
// 7. SPREAD EN PARÁMETROS DE FUNCIÓN
// ===============================================

console.log("\n7. SPREAD EN PARÁMETROS DE FUNCIÓN:");

function mostrarArgumentos(...argumentos) {
    console.log("Número de argumentos:", argumentos.length);
    console.log("Argumentos recibidos:", argumentos);
    
    argumentos.forEach((arg, index) => {
        console.log(`Argumento ${index + 1}:`, arg);
    });
}

mostrarArgumentos('Hola', 42, true, {nombre: 'Test'});

// Función que calcula el máximo de cualquier cantidad de números
function maximo(...numeros) {
    return Math.max(...numeros);
}

console.log("Máximo de varios números:", maximo(10, 5, 8, 20, 3));

// ===============================================
// 8. CASOS DE USO PRÁCTICOS
// ===============================================

console.log("\n8. CASOS DE USO PRÁCTICOS:");

// Convertir NodeList a Array
// const elementos = document.querySelectorAll('.clase');
// const arrayElementos = [...elementos];

// Encontrar el mínimo y máximo en un array
const calificaciones = [85, 92, 78, 96, 88, 75];
console.log("Calificaciones:", calificaciones);
console.log("Calificación más alta:", Math.max(...calificaciones));
console.log("Calificación más baja:", Math.min(...calificaciones));

// Eliminar duplicados de un array
const numerosConDuplicados = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const numerosSinDuplicados = [...new Set(numerosConDuplicados)];
console.log("Con duplicados:", numerosConDuplicados);
console.log("Sin duplicados:", numerosSinDuplicados);

// Convertir argumentos de función a array
function ejemploArgumentos() {
    const argumentosArray = [...arguments];
    console.log("Argumentos como array:", argumentosArray);
    return argumentosArray.reduce((sum, num) => sum + num, 0);
}

console.log("Suma de argumentos:", ejemploArgumentos(1, 2, 3, 4, 5));

// ===============================================
// 9. SPREAD VS REST OPERATOR
// ===============================================

console.log("\n9. SPREAD VS REST OPERATOR:");

// SPREAD: Expande elementos
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // SPREAD
console.log("Spread - expandir array:", arr2);

// REST: Recoge elementos en un array
function funcionRest(primero, segundo, ...resto) { // REST
    console.log("Primer parámetro:", primero);
    console.log("Segundo parámetro:", segundo);
    console.log("Resto de parámetros:", resto);
}

funcionRest('a', 'b', 'c', 'd', 'e');

// ===============================================
// 10. SPREAD CON ARRAYS ANIDADOS
// ===============================================

console.log("\n10. SPREAD CON ARRAYS ANIDADOS:");

const matriz = [[1, 2], [3, 4], [5, 6]];
const arrayPlano = [].concat(...matriz);
console.log("Matriz original:", matriz);
console.log("Array plano:", arrayPlano);

// Clonar arrays anidados (copia superficial)
const arrayAnidado = [[1, 2], [3, 4]];
const clonSuperficial = [...arrayAnidado];
console.log("Array anidado original:", arrayAnidado);
console.log("Clon superficial:", clonSuperficial);

// ¡CUIDADO! Es copia superficial
clonSuperficial[0].push(3);
console.log("Después de modificar clon:");
console.log("Original:", arrayAnidado); // ¡También se modifica!
console.log("Clon:", clonSuperficial);

// ===============================================
// 11. EJEMPLOS AVANZADOS
// ===============================================

console.log("\n11. EJEMPLOS AVANZADOS:");

// Intercambiar variables usando destructuring y spread
let a = 1, b = 2;
console.log("Antes del intercambio - a:", a, "b:", b);
[a, b] = [b, a];
console.log("Después del intercambio - a:", a, "b:", b);

// Crear función curry con spread
function multiplicar(factor) {
    return function(...numeros) {
        return numeros.map(num => num * factor);
    };
}

const duplicar = multiplicar(2);
const triplicar = multiplicar(3);

console.log("Duplicar [1,2,3,4]:", duplicar(...[1, 2, 3, 4]));
console.log("Triplicar [2,4,6]:", triplicar(...[2, 4, 6]));

// Filtrar y expandir
const estudiantes = [
    {nombre: 'Juan', calificaciones: [85, 90, 78]},
    {nombre: 'María', calificaciones: [92, 88, 95]},
    {nombre: 'Pedro', calificaciones: [76, 82, 89]}
];

const todasLasCalificaciones = [].concat(...estudiantes.map(est => est.calificaciones));
console.log("Todas las calificaciones:", todasLasCalificaciones);
console.log("Promedio general:", todasLasCalificaciones.reduce((a, b) => a + b) / todasLasCalificaciones.length);

// ===============================================
// 12. CASOS ESPECIALES Y LIMITACIONES
// ===============================================

console.log("\n12. CASOS ESPECIALES Y LIMITACIONES:");

// Con valores null y undefined
const arrayConNulos = [1, null, 3, undefined, 5];
const expandido = [...arrayConNulos];
console.log("Array con nulos:", expandido);

// Con objetos que no son iterables
try {
    const numero = 42;
    // const expandidoNumero = [...numero]; // Esto causaría error
    console.log("No se puede usar spread con números directamente");
} catch (error) {
    console.log("Error capturado:", error.message);
}

// Límite de argumentos en funciones
const arrayMuyGrande = new Array(100000).fill(1);
try {
    // Math.max(...arrayMuyGrande); // Podría causar "Maximum call stack size exceeded"
    console.log("Para arrays muy grandes, usar Math.max.apply() o reduce()");
    const maxSeguro = arrayMuyGrande.reduce((max, current) => Math.max(max, current), -Infinity);
    console.log("Máximo calculado de forma segura:", maxSeguro);
} catch (error) {
    console.log("Error con array muy grande:", error.message);
}

// ===============================================
// RESUMEN Y MEJORES PRÁCTICAS
// ===============================================

console.log("\n=== RESUMEN Y MEJORES PRÁCTICAS ===");

console.log(`
OPERADOR SPREAD (...):
- Expande elementos iterables en contextos donde se esperan múltiples elementos
- Útil para copiar, concatenar y pasar argumentos
- Crea copias superficiales (shallow copy)
- Funciona con arrays, strings, objetos y otros iterables

MEJORES PRÁCTICAS:
✅ Usar para copiar arrays y objetos de forma limpia
✅ Preferir sobre concat() para concatenar arrays
✅ Útil para convertir NodeList a arrays
✅ Excelente para pasar arrays como argumentos a funciones
✅ Combinar con destructuring para código más expresivo

⚠️ PRECAUCIONES:
- Solo hace copias superficiales
- Cuidado con arrays muy grandes en funciones
- No funciona con tipos primitivos no iterables
- Recordar la diferencia entre spread y rest operator
`);

console.log("¡Fin de la explicación del operador SPREAD!");
