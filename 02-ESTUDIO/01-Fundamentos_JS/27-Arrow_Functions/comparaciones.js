// ====================================================================
// COMPARACIONES: FUNCIONES TRADICIONALES VS ARROW FUNCTIONS
// ====================================================================

console.log("⚡ COMPARACIONES: TRADICIONALES VS ARROW FUNCTIONS ⚡");
console.log("===================================================\n");

// ====================================================================
// 1. SINTAXIS Y ESCRITURA
// ====================================================================

console.log("1. COMPARACIÓN DE SINTAXIS");
console.log("--------------------------");

// FUNCIÓN TRADICIONAL
function sumarTradicional(a, b) {
    return a + b;
}

// ARROW FUNCTION
const sumarArrow = (a, b) => a + b;

console.log("Función tradicional:");
console.log("function sumarTradicional(a, b) { return a + b; }");
console.log("Arrow function:");
console.log("const sumarArrow = (a, b) => a + b;");
console.log("");

// ====================================================================
// 2. CONTEXTO 'THIS' - DIFERENCIA FUNDAMENTAL
// ====================================================================

console.log("2. CONTEXTO 'THIS' - DIFERENCIA CLAVE");
console.log("--------------------------------------");

const objetoEjemplo = {
    nombre: "Objeto de Prueba",
    valor: 100,
    
    // Método tradicional - tiene su propio 'this'
    metodoTradicional: function() {
        console.log("📍 Método tradicional:");
        console.log("  this.nombre:", this.nombre);
        console.log("  this.valor:", this.valor);
        
        // Función anidada tradicional - pierde el 'this'
        function funcionAnidada() {
            console.log("  🔍 Función anidada tradicional:");
            console.log("    this.nombre:", this?.nombre || "undefined");
            console.log("    this.valor:", this?.valor || "undefined");
        }
        
        // Arrow function anidada - mantiene el 'this'
        const arrowAnidada = () => {
            console.log("  🏹 Arrow function anidada:");
            console.log("    this.nombre:", this.nombre);
            console.log("    this.valor:", this.valor);
        };
        
        funcionAnidada();
        arrowAnidada();
    },
    
    // Arrow function como método - NO tiene 'this' del objeto
    metodoArrow: () => {
        console.log("🏹 Método arrow function:");
        console.log("  this.nombre:", this?.nombre || "undefined (no es el objeto)");
        console.log("  this.valor:", this?.valor || "undefined (no es el objeto)");
    }
};

objetoEjemplo.metodoTradicional();
objetoEjemplo.metodoArrow();
console.log("");

// ====================================================================
// 3. OBJETO 'ARGUMENTS' VS REST PARAMETERS
// ====================================================================

console.log("3. ARGUMENTS VS REST PARAMETERS");
console.log("--------------------------------");

// Función tradicional con 'arguments'
function funcionConArguments() {
    console.log("📋 Función tradicional con 'arguments':");
    console.log("  Tipo de arguments:", typeof arguments);
    console.log("  Es array?:", Array.isArray(arguments));
    console.log("  Argumentos recibidos:", Array.from(arguments));
    
    // Convertir arguments a array
    const arrayDeArgumentos = Array.from(arguments);
    const suma = arrayDeArgumentos.reduce((acc, num) => acc + num, 0);
    console.log("  Suma:", suma);
}

// Arrow function con rest parameters
const funcionConRest = (...numeros) => {
    console.log("🏹 Arrow function con rest parameters:");
    console.log("  Tipo de numeros:", typeof numeros);
    console.log("  Es array?:", Array.isArray(numeros));
    console.log("  Números recibidos:", numeros);
    
    // Ya es un array, no necesita conversión
    const suma = numeros.reduce((acc, num) => acc + num, 0);
    console.log("  Suma:", suma);
};

funcionConArguments(1, 2, 3, 4, 5);
funcionConRest(1, 2, 3, 4, 5);
console.log("");

// ====================================================================
// 4. HOISTING (ELEVACIÓN) - COMPORTAMIENTO DIFERENTE
// ====================================================================

console.log("4. HOISTING - COMPORTAMIENTO DIFERENTE");
console.log("---------------------------------------");

try {
    // ✅ FUNCIONA - Las funciones tradicionales son "elevadas"
    console.log("📤 Llamando función tradicional antes de declararla:");
    console.log("  Resultado:", funcionElevada());
    
    function funcionElevada() {
        return "¡Función tradicional elevada!";
    }
} catch (error) {
    console.log("❌ Error:", error.message);
}

try {
    // ❌ ERROR - Las arrow functions NO son elevadas
    console.log("🏹 Llamando arrow function antes de declararla:");
    console.log("  Resultado:", arrowNoElevada());
} catch (error) {
    console.log("❌ Error:", error.message);
}

const arrowNoElevada = () => "Arrow function no elevada";
console.log("✅ Ahora sí funciona:", arrowNoElevada());
console.log("");

// ====================================================================
// 5. CONSTRUCTORES - SOLO FUNCIONES TRADICIONALES
// ====================================================================

console.log("5. CONSTRUCTORES - SOLO FUNCIONES TRADICIONALES");
console.log("------------------------------------------------");

// Constructor tradicional - ✅ FUNCIONA
function PersonaTradicional(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this.saludar = function() {
        return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
    };
}

// Arrow function como constructor - ❌ NO FUNCIONA
const PersonaArrow = (nombre, edad) => {
    this.nombre = nombre;
    this.edad = edad;
};

try {
    console.log("👤 Creando persona con constructor tradicional:");
    const persona1 = new PersonaTradicional("Ana", 25);
    console.log("  ✅ Éxito:", persona1.saludar());
} catch (error) {
    console.log("  ❌ Error:", error.message);
}

try {
    console.log("🏹 Intentando usar arrow function como constructor:");
    const persona2 = new PersonaArrow("Carlos", 30);
    console.log("  ✅ Éxito:", persona2);
} catch (error) {
    console.log("  ❌ Error:", error.message);
}
console.log("");

// ====================================================================
// 6. MÉTODOS DE PROTOTIPO - COMPARACIÓN
// ====================================================================

console.log("6. MÉTODOS DE PROTOTIPO");
console.log("-----------------------");

function Vehiculo(marca) {
    this.marca = marca;
}

// Método tradicional en prototipo - ✅ RECOMENDADO
Vehiculo.prototype.arrancarTradicional = function() {
    return `${this.marca} arrancando con método tradicional`;
};

// Arrow function en prototipo - ❌ NO RECOMENDADO
Vehiculo.prototype.arrancarArrow = () => {
    return `${this?.marca || 'undefined'} arrancando con arrow function`;
};

const miCoche = new Vehiculo("Toyota");
console.log("🚗 Método tradicional:", miCoche.arrancarTradicional());
console.log("🏹 Arrow function:", miCoche.arrancarArrow());
console.log("");

// ====================================================================
// 7. RENDIMIENTO Y MEMORIA
// ====================================================================

console.log("7. RENDIMIENTO Y ANÁLISIS DE MEMORIA");
console.log("-------------------------------------");

// Comparación de rendimiento en loops
const numeros = Array.from({ length: 1000000 }, (_, i) => i + 1);

console.time("Función tradicional");
const resultadoTradicional = numeros.map(function(x) { return x * 2; });
console.timeEnd("Función tradicional");

console.time("Arrow function");
const resultadoArrow = numeros.map(x => x * 2);
console.timeEnd("Arrow function");

console.log("Ambos resultados son iguales:", 
    resultadoTradicional.length === resultadoArrow.length);
console.log("");

// ====================================================================
// 8. CASOS DE USO RECOMENDADOS
// ====================================================================

console.log("8. CUÁNDO USAR CADA TIPO");
console.log("-------------------------");

console.log("✅ USA FUNCIONES TRADICIONALES PARA:");
console.log("  • Métodos de objetos");
console.log("  • Constructores");
console.log("  • Cuando necesites 'this' dinámico");
console.log("  • Métodos de prototipo");
console.log("  • Funciones que requieren 'arguments'");

console.log("\n✅ USA ARROW FUNCTIONS PARA:");
console.log("  • Callbacks simples");
console.log("  • Métodos de array (map, filter, reduce)");
console.log("  • Event handlers en React/Vue");
console.log("  • Funciones cortas y expresivas");
console.log("  • Cuando quieras mantener el 'this' del contexto superior");
console.log("");

// ====================================================================
// 9. EJEMPLOS PRÁCTICOS LADO A LADO
// ====================================================================

console.log("9. EJEMPLOS PRÁCTICOS COMPARADOS");
console.log("---------------------------------");

// Event Handling
console.log("🎯 Event Handling:");

// Tradicional
function manejarClickTradicional(evento) {
    console.log("  Tradicional - Elemento clickeado:", evento?.target?.tagName || "simulado");
}

// Arrow
const manejarClickArrow = (evento) => {
    console.log("  Arrow - Elemento clickeado:", evento?.target?.tagName || "simulado");
};

// Simular eventos
manejarClickTradicional({ target: { tagName: "BUTTON" } });
manejarClickArrow({ target: { tagName: "BUTTON" } });

// Array Processing
console.log("\n📊 Procesamiento de Arrays:");
const datos = [1, 2, 3, 4, 5];

// Tradicional
const procesarTradicional = datos.map(function(item) {
    return item * item;
}).filter(function(item) {
    return item > 10;
});

// Arrow
const procesarArrow = datos
    .map(item => item * item)
    .filter(item => item > 10);

console.log("  Tradicional:", procesarTradicional);
console.log("  Arrow:", procesarArrow);

// Async/Await
console.log("\n⏰ Funciones Asíncronas:");

// Tradicional
async function obtenerDatosTradicional() {
    try {
        console.log("  Función tradicional asíncrona ejecutada");
        return "Datos obtenidos (tradicional)";
    } catch (error) {
        console.error("Error en función tradicional:", error);
    }
}

// Arrow
const obtenerDatosArrow = async () => {
    try {
        console.log("  Arrow function asíncrona ejecutada");
        return "Datos obtenidos (arrow)";
    } catch (error) {
        console.error("Error en arrow function:", error);
    }
};

obtenerDatosTradicional().then(resultado => console.log("  Resultado:", resultado));
obtenerDatosArrow().then(resultado => console.log("  Resultado:", resultado));

console.log("");

// ====================================================================
// 10. RESUMEN FINAL
// ====================================================================

console.log("10. RESUMEN EJECUTIVO");
console.log("=====================");

const resumen = {
    funcionesTradicionales: {
        ventajas: [
            "Tienen su propio 'this'",
            "Pueden ser constructores",
            "Tienen objeto 'arguments'",
            "Son elevadas (hoisting)",
            "Ideales para métodos de objeto"
        ],
        desventajas: [
            "Sintaxis más verbosa",
            "Pueden perder contexto en callbacks",
            "Menos expresivas para operaciones simples"
        ]
    },
    
    arrowFunctions: {
        ventajas: [
            "Sintaxis concisa",
            "Return implícito",
            "Mantienen el 'this' del contexto superior",
            "Ideales para programación funcional",
            "Perfectas para callbacks"
        ],
        desventajas: [
            "No tienen 'this' propio",
            "No pueden ser constructores",
            "No tienen 'arguments'",
            "No son elevadas",
            "No son ideales como métodos de objeto"
        ]
    }
};

console.log("📋 FUNCIONES TRADICIONALES:");
console.log("   Ventajas:", resumen.funcionesTradicionales.ventajas.length);
console.log("   Desventajas:", resumen.funcionesTradicionales.desventajas.length);

console.log("\n🏹 ARROW FUNCTIONS:");
console.log("   Ventajas:", resumen.arrowFunctions.ventajas.length);
console.log("   Desventajas:", resumen.arrowFunctions.desventajas.length);

console.log("\n🎯 RECOMENDACIÓN FINAL:");
console.log("   Usa arrow functions para callbacks y operaciones funcionales");
console.log("   Usa funciones tradicionales para métodos y constructores");
console.log("   La elección depende del contexto y las necesidades específicas");

console.log("\n🎉 ¡Comparación completa finalizada! 🎉");
console.log("=====================================");