// ====================================================================
// ARROW FUNCTIONS - FUNCIONES FLECHA EN JAVASCRIPT
// ====================================================================

console.log("🏹 EJEMPLOS DE ARROW FUNCTIONS 🏹");
console.log("=====================================\n");

// ====================================================================
// 1. SINTAXIS BÁSICA - COMPARACIÓN CON FUNCIONES TRADICIONALES
// ====================================================================

console.log("1. SINTAXIS BÁSICA - COMPARACIÓN");
console.log("----------------------------------");

// Función tradicional
function saludoTradicional(nombre) {
    return `Hola, ${nombre}!`;
}

// Arrow function equivalente
const saludoArrow = (nombre) => {
    return `Hola, ${nombre}!`;
};

// Arrow function más concisa (return implícito)
const saludoConciso = nombre => `Hola, ${nombre}!`;

console.log("Función tradicional:", saludoTradicional("Carlos"));
console.log("Arrow function:", saludoArrow("Ana"));
console.log("Arrow concisa:", saludoConciso("Luis"));
console.log("");

// ====================================================================
// 2. DIFERENTES FORMAS DE ESCRIBIR ARROW FUNCTIONS
// ====================================================================

console.log("2. DIFERENTES FORMAS DE ARROW FUNCTIONS");
console.log("----------------------------------------");

// Sin parámetros
const sinParametros = () => "No necesito parámetros";

// Un parámetro (paréntesis opcionales)
const unParametro = x => x * 2;
const unParametroConParentesis = (x) => x * 2;

// Múltiples parámetros
const dosParametros = (a, b) => a + b;

// Return implícito con una expresión
const cuadrado = x => x * x;

// Return explícito con bloque de código
const esPar = (numero) => {
    if (numero % 2 === 0) {
        return true;
    } else {
        return false;
    }
};

console.log("Sin parámetros:", sinParametros());
console.log("Un parámetro:", unParametro(5));
console.log("Dos parámetros:", dosParametros(3, 7));
console.log("Cuadrado de 4:", cuadrado(4));
console.log("¿Es 8 par?:", esPar(8));
console.log("");

// ====================================================================
// 3. ARROW FUNCTIONS CON OBJETOS Y ARRAYS
// ====================================================================

console.log("3. ARROW FUNCTIONS CON OBJETOS Y ARRAYS");
console.log("----------------------------------------");

// Retornar un objeto (necesita paréntesis)
const crearPersona = (nombre, edad) => ({
    nombre: nombre,
    edad: edad,
    saludar: () => `Hola, soy ${nombre}`
});

// Array de números para ejemplos
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Métodos de array con arrow functions
const numerosPares = numeros.filter(num => num % 2 === 0);
const numerosDobles = numeros.map(num => num * 2);
const sumaTotal = numeros.reduce((acc, num) => acc + num, 0);

const persona = crearPersona("María", 25);
console.log("Persona creada:", persona);
console.log("Números pares:", numerosPares);
console.log("Números dobles:", numerosDobles);
console.log("Suma total:", sumaTotal);
console.log("");

// ====================================================================
// 4. EJEMPLOS PRÁCTICOS CON MÉTODOS DE ARRAY
// ====================================================================

console.log("4. EJEMPLOS PRÁCTICOS CON MÉTODOS DE ARRAY");
console.log("-------------------------------------------");

const productos = [
    { nombre: "Laptop", precio: 1200, categoria: "tecnología" },
    { nombre: "Mouse", precio: 25, categoria: "tecnología" },
    { nombre: "Teclado", precio: 80, categoria: "tecnología" },
    { nombre: "Silla", precio: 150, categoria: "muebles" },
    { nombre: "Mesa", precio: 300, categoria: "muebles" }
];

// Filtrar productos por precio
const productosCaros = productos.filter(producto => producto.precio > 100);

// Obtener solo los nombres
const nombresProductos = productos.map(producto => producto.nombre);

// Calcular precio total
const precioTotal = productos.reduce((total, producto) => total + producto.precio, 0);

// Encontrar un producto específico
const laptop = productos.find(producto => producto.nombre === "Laptop");

// Verificar si todos los productos tienen precio mayor a 20
const todosMayorA20 = productos.every(producto => producto.precio > 20);

console.log("Productos caros (>$100):", productosCaros);
console.log("Nombres de productos:", nombresProductos);
console.log("Precio total:", `$${precioTotal}`);
console.log("Laptop encontrada:", laptop);
console.log("¿Todos los productos cuestan más de $20?:", todosMayorA20);
console.log("");

// ====================================================================
// 5. ARROW FUNCTIONS COMO CALLBACKS
// ====================================================================

console.log("5. ARROW FUNCTIONS COMO CALLBACKS");
console.log("----------------------------------");

// Simulando una función asíncrona
const simularCarga = (callback) => {
    console.log("Iniciando carga...");
    setTimeout(callback, 1000);
};

// Usando arrow function como callback
simularCarga(() => {
    console.log("¡Carga completada!");
});

// Event listeners simulados
const eventos = {
    onClick: callback => {
        console.log("Simulando click...");
        callback("Click detectado");
    },
    
    onSubmit: callback => {
        console.log("Simulando envío de formulario...");
        callback({ status: "success", data: "Formulario enviado" });
    }
};

// Usando arrow functions como event handlers
eventos.onClick(mensaje => console.log(`Evento: ${mensaje}`));
eventos.onSubmit(resultado => console.log(`Resultado: ${JSON.stringify(resultado)}`));
console.log("");

// ====================================================================
// 6. ARROW FUNCTIONS Y SCOPE (ALCANCE)
// ====================================================================

console.log("6. ARROW FUNCTIONS Y SCOPE");
console.log("---------------------------");

// Arrow functions no tienen su propio 'this'
const objetoEjemplo = {
    nombre: "Objeto de Ejemplo",
    
    // Método tradicional
    metodoTradicional: function() {
        console.log("Método tradicional - this.nombre:", this.nombre);
        
        // Arrow function dentro del método - mantiene el 'this' del método
        const funcionInterna = () => {
            console.log("Arrow function interna - this.nombre:", this.nombre);
        };
        
        funcionInterna();
    },
    
    // Arrow function como método (NO recomendado para métodos de objeto)
    metodoArrow: () => {
        console.log("Método arrow - this.nombre:", this?.nombre || "undefined");
    }
};

objetoEjemplo.metodoTradicional();
objetoEjemplo.metodoArrow();
console.log("");

// ====================================================================
// 7. CASOS DE USO COMUNES Y ÚTILES
// ====================================================================

console.log("7. CASOS DE USO COMUNES");
console.log("------------------------");

// Validación de datos
const validarEmail = email => email.includes("@") && email.includes(".");
const validarPassword = password => password.length >= 8;

// Formateo de datos
const formatearMoneda = cantidad => `$${cantidad.toFixed(2)}`;
const formatearFecha = fecha => fecha.toLocaleDateString("es-ES");

// Utilidades matemáticas
const calcularDescuento = (precio, descuento) => precio * (1 - descuento / 100);
const calcularImpuesto = (precio, impuesto = 21) => precio * (impuesto / 100);

// Manipulación de strings
const capitalizar = texto => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
const limpiarEspacios = texto => texto.trim().replace(/\s+/g, ' ');

// Ejemplos de uso
console.log("Email válido:", validarEmail("usuario@ejemplo.com"));
console.log("Password válida:", validarPassword("mipassword123"));
console.log("Formato moneda:", formatearMoneda(1234.567));
console.log("Fecha formateada:", formatearFecha(new Date()));
console.log("Precio con descuento (20%):", formatearMoneda(calcularDescuento(100, 20)));
console.log("Impuesto calculado:", formatearMoneda(calcularImpuesto(100)));
console.log("Texto capitalizado:", capitalizar("hOLA mUnDo"));
console.log("Espacios limpiados:", `"${limpiarEspacios("  texto   con    espacios  ")}"`);
console.log("");

// ====================================================================
// 8. LIMITACIONES DE LAS ARROW FUNCTIONS
// ====================================================================

console.log("8. LIMITACIONES DE ARROW FUNCTIONS");
console.log("-----------------------------------");

console.log("Las arrow functions NO pueden ser usadas como:");
console.log("• Constructores (no se pueden usar con 'new')");
console.log("• No tienen su propio 'this'");
console.log("• No tienen objeto 'arguments'");
console.log("• No pueden ser usadas como generadores");
console.log("");

// Ejemplo de limitación con 'arguments'
function funcionTradicionalConArguments() {
    console.log("Función tradicional - arguments:", Array.from(arguments));
}

const arrowSinArguments = (...args) => {
    console.log("Arrow function - usando rest parameters:", args);
};

funcionTradicionalConArguments(1, 2, 3, 4);
arrowSinArguments(1, 2, 3, 4);
console.log("");

// ====================================================================
// 9. EJERCICIOS PRÁCTICOS
// ====================================================================

console.log("9. EJERCICIOS PRÁCTICOS");
console.log("------------------------");

// Ejercicio 1: Procesamiento de array de estudiantes
const estudiantes = [
    { nombre: "Ana", calificaciones: [85, 90, 78] },
    { nombre: "Luis", calificaciones: [92, 88, 94] },
    { nombre: "María", calificaciones: [76, 82, 80] },
    { nombre: "Carlos", calificaciones: [95, 91, 89] }
];

// Calcular promedio de cada estudiante
const estudiantesConPromedio = estudiantes.map(estudiante => ({
    ...estudiante,
    promedio: estudiante.calificaciones.reduce((sum, nota) => sum + nota, 0) / estudiante.calificaciones.length
}));

// Filtrar estudiantes con promedio mayor a 85
const estudiantesDestacados = estudiantesConPromedio.filter(estudiante => estudiante.promedio > 85);

// Ordenar por promedio descendente
const estudiantesOrdenados = estudiantesDestacados.sort((a, b) => b.promedio - a.promedio);

console.log("Estudiantes con promedio:");
estudiantesConPromedio.forEach(estudiante => 
    console.log(`${estudiante.nombre}: ${estudiante.promedio.toFixed(2)}`)
);

console.log("\nEstudiantes destacados (promedio > 85):");
estudiantesOrdenados.forEach(estudiante => 
    console.log(`${estudiante.nombre}: ${estudiante.promedio.toFixed(2)}`)
);
console.log("");

// Ejercicio 2: API simulada con arrow functions
const apiSimulada = {
    usuarios: [
        { id: 1, nombre: "Juan", email: "juan@email.com", activo: true },
        { id: 2, nombre: "Ana", email: "ana@email.com", activo: false },
        { id: 3, nombre: "Carlos", email: "carlos@email.com", activo: true }
    ],
    
    obtenerTodos: () => apiSimulada.usuarios,
    obtenerActivos: () => apiSimulada.usuarios.filter(usuario => usuario.activo),
    buscarPorId: id => apiSimulada.usuarios.find(usuario => usuario.id === id),
    buscarPorEmail: email => apiSimulada.usuarios.find(usuario => usuario.email === email)
};

console.log("API Simulada - Todos los usuarios:");
console.log(apiSimulada.obtenerTodos());

console.log("\nAPI Simulada - Usuarios activos:");
console.log(apiSimulada.obtenerActivos());

console.log("\nAPI Simulada - Usuario con ID 2:");
console.log(apiSimulada.buscarPorId(2));

console.log("\n🎉 ¡Ejemplos de Arrow Functions completados! 🎉");
console.log("================================================");