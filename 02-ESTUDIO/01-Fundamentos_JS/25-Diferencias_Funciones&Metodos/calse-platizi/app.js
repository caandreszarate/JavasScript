// ===== DIFERENCIAS ENTRE FUNCIONES Y MÉTODOS =====

console.log("=== EJEMPLOS DE FUNCIONES Y MÉTODOS ===\n");

// ===== 1. FUNCIONES BÁSICAS =====
console.log("1. FUNCIONES BÁSICAS:");

// Función declarativa (Function Declaration)
function saludar(nombre) {
    return `Hola ${nombre}`;
}
console.log("Función declarativa:", saludar("Juan"));
console.log("Tipo de función:", typeof saludar);

// Función expresiva (Function Expression)
const saludarExpresivo = function(nombre) {
    return `Hola ${nombre}`;
};
console.log("Función expresiva:", saludarExpresivo("María"));

// Arrow Function (Función flecha)
const saludarFlecha = (nombre) => `Hola ${nombre}`;
console.log("Arrow function:", saludarFlecha("Pedro"));

console.log("\n");

// ===== 2. MÉTODOS (Funciones dentro de objetos) =====
console.log("2. MÉTODOS:");

const persona = {
    nombre: "Juan",
    edad: 25,
    ciudad: "Madrid",
    
    // Método básico
    saludar: function() {
        return `Hola, soy ${this.nombre}`;
    },
    
    // Método con arrow function (NO usa 'this' correctamente)
    saludarFlecha: () => {
        return `Hola, soy ${this.nombre}`; // this será undefined
    },
    
    // Método con parámetros
    presentarse: function(ciudad) {
        return `Hola, soy ${this.nombre} y vivo en ${ciudad}`;
    },
    
    // Método que modifica propiedades del objeto
    cumplirAños: function() {
        this.edad += 1;
        return `Ahora tengo ${this.edad} años`;
    }
};

console.log("Método básico:", persona.saludar());
console.log("Método con parámetros:", persona.presentarse("Barcelona"));
console.log("Método que modifica:", persona.cumplirAños());
console.log("Arrow function como método:", persona.saludarFlecha()); // this será undefined

console.log("\n");

// ===== 3. FUNCIONES COMO ARGUMENTOS (CALLBACKS) =====
console.log("3. FUNCIONES COMO ARGUMENTOS (CALLBACKS):");

// Función que recibe otra función como parámetro
function procesarDatos(datos, callback) {
    console.log("Procesando datos...");
    const resultado = callback(datos);
    return resultado;
}

// Callback function
function duplicar(numero) {
    return numero * 2;
}

function triplicar(numero) {
    return numero * 3;
}

console.log("Callback duplicar:", procesarDatos(5, duplicar));
console.log("Callback triplicar:", procesarDatos(5, triplicar));

// Callback con arrow function
console.log("Callback arrow:", procesarDatos(5, (num) => num * 4));

console.log("\n");

// ===== 4. FUNCIONES QUE RETORNAN FUNCIONES =====
console.log("4. FUNCIONES QUE RETORNAN FUNCIONES:");

// Función que retorna otra función
function crearSaludo(saludo) {
    return function(nombre) {
        return `${saludo} ${nombre}`;
    };
}

const saludarEspañol = crearSaludo("Hola");
const saludarIngles = crearSaludo("Hello");

console.log("Saludo español:", saludarEspañol("Ana"));
console.log("Saludo inglés:", saludarIngles("John"));

// Función que retorna función con closure
function multiplicador(factor) {
    return function(numero) {
        return numero * factor;
    };
}

const duplicar = multiplicador(2);
const triplicar = multiplicador(3);

console.log("Duplicar 5:", duplicar(5));
console.log("Triplicar 5:", triplicar(5));

console.log("\n");

// ===== 5. FUNCIONES ASIGNADAS A VARIABLES =====
console.log("5. FUNCIONES ASIGNADAS A VARIABLES:");

// Función expresiva
const sumar = function(a, b) {
    return a + b;
};

// Arrow function
const restar = (a, b) => a - b;

// Función con múltiples operaciones
const calcular = function(operacion, a, b) {
    switch(operacion) {
        case 'suma':
            return a + b;
        case 'resta':
            return a - b;
        case 'multiplicacion':
            return a * b;
        case 'division':
            return a / b;
        default:
            return 'Operación no válida';
    }
};

console.log("Suma:", sumar(10, 5));
console.log("Resta:", restar(10, 5));
console.log("Multiplicación:", calcular('multiplicacion', 10, 5));

console.log("\n");

// ===== 6. FUNCIONES CON PROPIEDADES Y MÉTODOS =====
console.log("6. FUNCIONES CON PROPIEDADES Y MÉTODOS:");

// Función que tiene propiedades
function calculadora() {
    return "Calculadora";
}

// Agregar propiedades a la función
calculadora.version = "1.0";
calculadora.autor = "Juan Pérez";

// Agregar método a la función
calculadora.info = function() {
    return `Calculadora v${this.version} por ${this.autor}`;
};

console.log("Función con propiedades:", calculadora.version);
console.log("Método de función:", calculadora.info());

console.log("\n");

// ===== 7. FUNCIONES ANIDADAS (NESTED FUNCTIONS) =====
console.log("7. FUNCIONES ANIDADAS:");

function procesarUsuario(nombre, edad) {
    // Función anidada que valida la edad
    function validarEdad(edad) {
        return edad >= 0 && edad <= 120;
    }
    
    // Función anidada que formatea el nombre
    function formatearNombre(nombre) {
        return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    }
    
    // Función anidada que determina la categoría
    function obtenerCategoria(edad) {
        if (edad < 18) return "Menor de edad";
        if (edad < 65) return "Adulto";
        return "Adulto mayor";
    }
    
    if (!validarEdad(edad)) {
        return "Edad no válida";
    }
    
    const nombreFormateado = formatearNombre(nombre);
    const categoria = obtenerCategoria(edad);
    
    return `${nombreFormateado} es ${categoria}`;
}

console.log("Función anidada:", procesarUsuario("juan", 25));
console.log("Función anidada:", procesarUsuario("maria", 15));
console.log("Función anidada:", procesarUsuario("pedro", 70));

console.log("\n");

// ===== 8. MÉTODOS EN CLASES =====
console.log("8. MÉTODOS EN CLASES:");

class Estudiante {
    constructor(nombre, edad, curso) {
        this.nombre = nombre;
        this.edad = edad;
        this.curso = curso;
        this.notas = [];
    }
    
    // Método para agregar notas
    agregarNota(nota) {
        if (nota >= 0 && nota <= 10) {
            this.notas.push(nota);
            return `Nota ${nota} agregada`;
        }
        return "Nota no válida";
    }
    
    // Método para calcular promedio
    calcularPromedio() {
        if (this.notas.length === 0) {
            return "No hay notas";
        }
        const suma = this.notas.reduce((total, nota) => total + nota, 0);
        return (suma / this.notas.length).toFixed(2);
    }
    
    // Método para obtener información
    obtenerInfo() {
        return `Estudiante: ${this.nombre}, Edad: ${this.edad}, Curso: ${this.curso}`;
    }
    
    // Método estático
    static crearEstudiante(datos) {
        return new Estudiante(datos.nombre, datos.edad, datos.curso);
    }
}

const estudiante1 = new Estudiante("Ana", 20, "JavaScript");
console.log("Info estudiante:", estudiante1.obtenerInfo());
console.log("Agregar nota:", estudiante1.agregarNota(8.5));
console.log("Agregar nota:", estudiante1.agregarNota(9.0));
console.log("Promedio:", estudiante1.calcularPromedio());

// Crear estudiante con método estático
const estudiante2 = Estudiante.crearEstudiante({
    nombre: "Carlos",
    edad: 22,
    curso: "Python"
});
console.log("Estudiante creado:", estudiante2.obtenerInfo());

console.log("\n");

// ===== 9. DIFERENCIAS CLAVE ENTRE FUNCIONES Y MÉTODOS =====
console.log("9. DIFERENCIAS CLAVE:");

// Función independiente
function funcionIndependiente() {
    console.log("Esta es una función independiente");
    console.log("this en función:", this); // this será global o undefined
}

// Método en objeto
const objeto = {
    propiedad: "valor",
    metodo: function() {
        console.log("Este es un método");
        console.log("this en método:", this); // this será el objeto
        console.log("this.propiedad:", this.propiedad);
    }
};

console.log("Llamando función independiente:");
funcionIndependiente();

console.log("Llamando método:");
objeto.metodo();

console.log("\n");

// ===== 10. EJEMPLOS PRÁCTICOS =====
console.log("10. EJEMPLOS PRÁCTICOS:");

// Sistema de carrito de compras
const carrito = {
    productos: [],
    total: 0,
    
    agregarProducto: function(nombre, precio, cantidad = 1) {
        const producto = {
            nombre,
            precio,
            cantidad,
            subtotal: precio * cantidad
        };
        this.productos.push(producto);
        this.total += producto.subtotal;
        return `Producto ${nombre} agregado`;
    },
    
    eliminarProducto: function(index) {
        if (index >= 0 && index < this.productos.length) {
            const producto = this.productos.splice(index, 1)[0];
            this.total -= producto.subtotal;
            return `Producto ${producto.nombre} eliminado`;
        }
        return "Índice no válido";
    },
    
    obtenerTotal: function() {
        return `Total: $${this.total.toFixed(2)}`;
    },
    
    mostrarProductos: function() {
        if (this.productos.length === 0) {
            return "Carrito vacío";
        }
        return this.productos.map((producto, index) => 
            `${index + 1}. ${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.subtotal}`
        ).join('\n');
    }
};

console.log("Agregando productos al carrito:");
console.log(carrito.agregarProducto("Laptop", 999.99, 1));
console.log(carrito.agregarProducto("Mouse", 25.50, 2));
console.log(carrito.agregarProducto("Teclado", 75.00, 1));

console.log("\nProductos en el carrito:");
console.log(carrito.mostrarProductos());
console.log(carrito.obtenerTotal());

console.log("\nEliminando producto:");
console.log(carrito.eliminarProducto(1));
console.log(carrito.obtenerTotal());

console.log("\n=== FIN DE EJEMPLOS ===");



