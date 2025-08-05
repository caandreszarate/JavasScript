// ===== EJERCICIOS BÁSICOS DE FUNCIONES Y MÉTODOS =====

console.log("=== EJERCICIOS BÁSICOS ===\n");

// ===== EJERCICIO 1: CALCULADORA BÁSICA =====
console.log("EJERCICIO 1: CALCULADORA BÁSICA");
console.log("Crea una función llamada 'calculadora' que reciba dos números y una operación (suma, resta, multiplicación, división) y retorne el resultado.");

// Tu código aquí:
function calculadora(num1, num2, operacion) {
    switch(operacion) {
        case 'suma':
            return num1 + num2;
        case 'resta':
            return num1 - num2;
        case 'multiplicacion':
            return num1 * num2;
        case 'division':
            return num2 !== 0 ? num1 / num2 : 'Error: División por cero';
        default:
            return 'Operación no válida';
    }
}

// Pruebas:
console.log("Suma:", calculadora(10, 5, 'suma')); // Debe mostrar: 15
console.log("Resta:", calculadora(10, 5, 'resta')); // Debe mostrar: 5
console.log("Multiplicación:", calculadora(10, 5, 'multiplicacion')); // Debe mostrar: 50
console.log("División:", calculadora(10, 5, 'division')); // Debe mostrar: 2
console.log("División por cero:", calculadora(10, 0, 'division')); // Debe mostrar error

console.log("\n");

// ===== EJERCICIO 2: VALIDADOR DE CONTRASEÑA =====
console.log("EJERCICIO 2: VALIDADOR DE CONTRASEÑA");
console.log("Crea una función llamada 'validarContraseña' que reciba una contraseña y verifique que tenga al menos 8 caracteres, una letra mayúscula, una minúscula y un número.");

// Tu código aquí:
function validarContraseña(contraseña) {
    if (contraseña.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (!/[A-Z]/.test(contraseña)) {
        return 'La contraseña debe tener al menos una letra mayúscula';
    }
    
    if (!/[a-z]/.test(contraseña)) {
        return 'La contraseña debe tener al menos una letra minúscula';
    }
    
    if (!/\d/.test(contraseña)) {
        return 'La contraseña debe tener al menos un número';
    }
    
    return 'Contraseña válida';
}

// Pruebas:
console.log("Contraseña válida:", validarContraseña("Abc12345")); // Debe mostrar: Contraseña válida
console.log("Contraseña corta:", validarContraseña("Abc1")); // Debe mostrar error
console.log("Sin mayúscula:", validarContraseña("abc12345")); // Debe mostrar error
console.log("Sin minúscula:", validarContraseña("ABC12345")); // Debe mostrar error
console.log("Sin número:", validarContraseña("Abcdefgh")); // Debe mostrar error

console.log("\n");

// ===== EJERCICIO 3: OBJETO LIBRO CON MÉTODOS =====
console.log("EJERCICIO 3: OBJETO LIBRO CON MÉTODOS");
console.log("Crea un objeto 'libro' con propiedades (titulo, autor, año, paginas) y métodos para mostrar información, cambiar título y calcular años desde publicación.");

// Tu código aquí:
const libro = {
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    año: 1954,
    paginas: 1216,
    
    mostrarInfo: function() {
        return `"${this.titulo}" por ${this.autor} (${this.año}) - ${this.paginas} páginas`;
    },
    
    cambiarTitulo: function(nuevoTitulo) {
        this.titulo = nuevoTitulo;
        return `Título cambiado a: "${this.titulo}"`;
    },
    
    añosDesdePublicacion: function() {
        const añoActual = new Date().getFullYear();
        return añoActual - this.año;
    },
    
    esAntiguo: function() {
        return this.añosDesdePublicacion() > 50;
    }
};

// Pruebas:
console.log("Información del libro:", libro.mostrarInfo());
console.log("Cambiar título:", libro.cambiarTitulo("La Comunidad del Anillo"));
console.log("Años desde publicación:", libro.añosDesdePublicacion());
console.log("¿Es antiguo?:", libro.esAntiguo() ? "Sí" : "No");

console.log("\n");

// ===== EJERCICIO 4: FUNCIÓN QUE RETORNA FUNCIÓN =====
console.log("EJERCICIO 4: FUNCIÓN QUE RETORNA FUNCIÓN");
console.log("Crea una función llamada 'crearMultiplicador' que reciba un número y retorne una función que multiplique cualquier número por el factor dado.");

// Tu código aquí:
function crearMultiplicador(factor) {
    return function(numero) {
        return numero * factor;
    };
}

// Pruebas:
const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);
const multiplicarPor10 = crearMultiplicador(10);

console.log("Duplicar 5:", duplicar(5)); // Debe mostrar: 10
console.log("Triplicar 5:", triplicar(5)); // Debe mostrar: 15
console.log("Multiplicar 5 por 10:", multiplicarPor10(5)); // Debe mostrar: 50

console.log("\n");

// ===== EJERCICIO 5: SISTEMA DE ESTUDIANTES =====
console.log("EJERCICIO 5: SISTEMA DE ESTUDIANTES");
console.log("Crea una clase 'Estudiante' con propiedades (nombre, edad, curso, notas) y métodos para agregar notas, calcular promedio y determinar si aprueba (promedio >= 6).");

// Tu código aquí:
class Estudiante {
    constructor(nombre, edad, curso) {
        this.nombre = nombre;
        this.edad = edad;
        this.curso = curso;
        this.notas = [];
    }
    
    agregarNota(nota) {
        if (nota >= 0 && nota <= 10) {
            this.notas.push(nota);
            return `Nota ${nota} agregada a ${this.nombre}`;
        }
        return "Nota no válida (debe estar entre 0 y 10)";
    }
    
    calcularPromedio() {
        if (this.notas.length === 0) {
            return 0;
        }
        const suma = this.notas.reduce((total, nota) => total + nota, 0);
        return (suma / this.notas.length).toFixed(2);
    }
    
    aprobar() {
        const promedio = parseFloat(this.calcularPromedio());
        return promedio >= 6;
    }
    
    obtenerInfo() {
        const promedio = this.calcularPromedio();
        const estado = this.aprobar() ? "APROBADO" : "REPROBADO";
        return `${this.nombre} - ${this.curso} - Promedio: ${promedio} - Estado: ${estado}`;
    }
}

// Pruebas:
const estudiante1 = new Estudiante("Ana", 20, "JavaScript");
console.log("Agregar notas:", estudiante1.agregarNota(8));
console.log("Agregar notas:", estudiante1.agregarNota(7));
console.log("Agregar notas:", estudiante1.agregarNota(9));
console.log("Información:", estudiante1.obtenerInfo());
console.log("¿Aprueba?:", estudiante1.aprobar() ? "Sí" : "No");

const estudiante2 = new Estudiante("Carlos", 22, "Python");
console.log("Agregar notas:", estudiante2.agregarNota(4));
console.log("Agregar notas:", estudiante2.agregarNota(5));
console.log("Información:", estudiante2.obtenerInfo());
console.log("¿Aprueba?:", estudiante2.aprobar() ? "Sí" : "No");

console.log("\n");

// ===== EJERCICIOS EXTRA PARA PRACTICAR =====
console.log("=== EJERCICIOS EXTRA ===");

// Ejercicio Extra 1: Función que cuenta vocales
console.log("EXTRA 1: Contar vocales en una cadena");
function contarVocales(texto) {
    const vocales = texto.match(/[aeiouáéíóúü]/gi);
    return vocales ? vocales.length : 0;
}

console.log("Vocales en 'Hola mundo':", contarVocales("Hola mundo")); // Debe mostrar: 4
console.log("Vocales en 'JavaScript':", contarVocales("JavaScript")); // Debe mostrar: 3

// Ejercicio Extra 2: Método para invertir array
console.log("\nEXTRA 2: Método para invertir array");
const miArray = {
    datos: [1, 2, 3, 4, 5],
    invertir: function() {
        return this.datos.reverse();
    },
    agregar: function(elemento) {
        this.datos.push(elemento);
        return `Elemento ${elemento} agregado`;
    }
};

console.log("Array original:", miArray.datos);
console.log("Agregar elemento:", miArray.agregar(6));
console.log("Array invertido:", miArray.invertir());

console.log("\n=== FIN DE EJERCICIOS ==="); 