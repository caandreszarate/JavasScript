// ===================================================
// CONCEPTOS BÁSICOS DE POO EN JAVASCRIPT
// ===================================================

console.log("=== PROGRAMACIÓN ORIENTADA A OBJETOS EN JAVASCRIPT ===\n");

// ===================================================
// 1. CLASES Y OBJETOS
// ===================================================

console.log("1. CLASES Y OBJETOS");
console.log("==================");

// Definición de una clase básica
class Persona {
    // Constructor: se ejecuta cuando se crea una nueva instancia
    constructor(nombre, edad, profesion) {
        this.nombre = nombre;
        this.edad = edad;
        this.profesion = profesion;
    }
    
    // Método de la clase
    presentarse() {
        return `Hola, soy ${this.nombre}, tengo ${this.edad} años y soy ${this.profesion}`;
    }
    
    // Método para calcular años hasta la jubilación
    añosParaJubilacion() {
        const añosJubilacion = 65;
        const añosRestantes = añosJubilacion - this.edad;
        return añosRestantes > 0 ? añosRestantes : 0;
    }
}

// Crear objetos (instancias) de la clase
const persona1 = new Persona("Carlos", 28, "Desarrollador");
const persona2 = new Persona("Ana", 35, "Diseñadora");
const persona3 = new Persona("Luis", 42, "Profesor");

console.log(persona1.presentarse());
console.log(persona2.presentarse());
console.log(`${persona3.nombre} le quedan ${persona3.añosParaJubilacion()} años para jubilarse\n`);

// ===================================================
// 2. ENCAPSULACIÓN
// ===================================================

console.log("2. ENCAPSULACIÓN");
console.log("================");

class CuentaBancaria {
    // Propiedad privada (usando #)
    #saldo;
    #numeroCuenta;
    
    constructor(titular, saldoInicial = 0) {
        this.titular = titular;
        this.#saldo = saldoInicial;
        this.#numeroCuenta = this.#generarNumeroCuenta();
    }
    
    // Método privado
    #generarNumeroCuenta() {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }
    
    // Getter para acceder al saldo
    get saldo() {
        return this.#saldo;
    }
    
    // Getter para el número de cuenta
    get numeroCuenta() {
        return this.#numeroCuenta;
    }
    
    // Método público para depositar
    depositar(cantidad) {
        if (cantidad > 0) {
            this.#saldo += cantidad;
            console.log(`Depósito exitoso. Nuevo saldo: $${this.#saldo}`);
        } else {
            console.log("La cantidad debe ser positiva");
        }
    }
    
    // Método público para retirar
    retirar(cantidad) {
        if (cantidad > 0 && cantidad <= this.#saldo) {
            this.#saldo -= cantidad;
            console.log(`Retiro exitoso. Nuevo saldo: $${this.#saldo}`);
        } else {
            console.log("Fondos insuficientes o cantidad inválida");
        }
    }
    
    // Método para consultar saldo
    consultarSaldo() {
        return `Titular: ${this.titular} | Cuenta: ${this.#numeroCuenta} | Saldo: $${this.#saldo}`;
    }
}

const cuenta1 = new CuentaBancaria("María García", 1000);
console.log(cuenta1.consultarSaldo());
cuenta1.depositar(500);
cuenta1.retirar(200);
cuenta1.retirar(2000); // Intento de retiro excesivo

// Intentar acceder a propiedades privadas (esto causará error)
// console.log(cuenta1.#saldo); // Error: Private field '#saldo' must be declared in an enclosing class

console.log("");

// ===================================================
// 3. HERENCIA
// ===================================================

console.log("3. HERENCIA");
console.log("===========");

// Clase padre (superclase)
class Animal {
    constructor(nombre, especie) {
        this.nombre = nombre;
        this.especie = especie;
    }
    
    hacerSonido() {
        return `${this.nombre} hace un sonido`;
    }
    
    dormir() {
        return `${this.nombre} está durmiendo`;
    }
    
    informacion() {
        return `${this.nombre} es un ${this.especie}`;
    }
}

// Clase hija que hereda de Animal
class Perro extends Animal {
    constructor(nombre, raza, edad) {
        super(nombre, "perro"); // Llamar al constructor de la clase padre
        this.raza = raza;
        this.edad = edad;
    }
    
    // Sobrescribir método de la clase padre
    hacerSonido() {
        return `${this.nombre} ladra: ¡Guau guau!`;
    }
    
    // Método específico de la clase Perro
    jugar() {
        return `${this.nombre} está jugando con una pelota`;
    }
    
    // Sobrescribir método informacion
    informacion() {
        return `${this.nombre} es un ${this.especie} de raza ${this.raza} y tiene ${this.edad} años`;
    }
}

// Otra clase hija
class Gato extends Animal {
    constructor(nombre, color) {
        super(nombre, "gato");
        this.color = color;
    }
    
    hacerSonido() {
        return `${this.nombre} maúlla: ¡Miau miau!`;
    }
    
    trepar() {
        return `${this.nombre} está trepando un árbol`;
    }
    
    informacion() {
        return `${this.nombre} es un ${this.especie} de color ${this.color}`;
    }
}

const perro1 = new Perro("Max", "Golden Retriever", 3);
const gato1 = new Gato("Luna", "negro");

console.log(perro1.informacion());
console.log(perro1.hacerSonido());
console.log(perro1.jugar());
console.log(perro1.dormir());

console.log("\n" + gato1.informacion());
console.log(gato1.hacerSonido());
console.log(gato1.trepar());

console.log("");

// ===================================================
// 4. POLIMORFISMO
// ===================================================

console.log("4. POLIMORFISMO");
console.log("===============");

// Función que trabaja con cualquier animal (polimorfismo)
function presentarAnimal(animal) {
    console.log(animal.informacion());
    console.log(animal.hacerSonido());
    console.log(animal.dormir());
    console.log("---");
}

// Array de diferentes tipos de animales
const animales = [
    new Perro("Bobby", "Labrador", 2),
    new Gato("Mimi", "blanco"),
    new Animal("Rex", "iguana")
];

// El polimorfismo permite tratar todos los objetos de la misma manera
console.log("Presentando todos los animales:");
animales.forEach(presentarAnimal);

// ===================================================
// 5. MÉTODOS ESTÁTICOS
// ===================================================

console.log("5. MÉTODOS ESTÁTICOS");
console.log("====================");

class Matematicas {
    // Método estático - se llama en la clase, no en instancias
    static sumar(a, b) {
        return a + b;
    }
    
    static restar(a, b) {
        return a - b;
    }
    
    static multiplicar(a, b) {
        return a * b;
    }
    
    static dividir(a, b) {
        if (b === 0) {
            throw new Error("No se puede dividir por cero");
        }
        return a / b;
    }
    
    static calcularAreaCirculo(radio) {
        return Math.PI * Math.pow(radio, 2);
    }
    
    // Propiedad estática
    static PI = 3.14159;
}

// Uso de métodos estáticos (no necesitamos crear una instancia)
console.log("Suma de 5 + 3:", Matematicas.sumar(5, 3));
console.log("Resta de 10 - 4:", Matematicas.restar(10, 4));
console.log("Multiplicación de 6 * 7:", Matematicas.multiplicar(6, 7));
console.log("División de 15 / 3:", Matematicas.dividir(15, 3));
console.log("Área de un círculo con radio 5:", Matematicas.calcularAreaCirculo(5).toFixed(2));
console.log("Valor de PI:", Matematicas.PI);

console.log("");

// ===================================================
// 6. GETTERS Y SETTERS
// ===================================================

console.log("6. GETTERS Y SETTERS");
console.log("====================");

class Producto {
    constructor(nombre, precio) {
        this._nombre = nombre;
        this._precio = precio;
        this._descuento = 0;
    }
    
    // Getter para nombre
    get nombre() {
        return this._nombre;
    }
    
    // Setter para nombre
    set nombre(nuevoNombre) {
        if (nuevoNombre.length > 0) {
            this._nombre = nuevoNombre;
        } else {
            console.log("El nombre no puede estar vacío");
        }
    }
    
    // Getter para precio
    get precio() {
        return this._precio;
    }
    
    // Setter para precio con validación
    set precio(nuevoPrecio) {
        if (nuevoPrecio >= 0) {
            this._precio = nuevoPrecio;
        } else {
            console.log("El precio no puede ser negativo");
        }
    }
    
    // Getter para descuento
    get descuento() {
        return this._descuento;
    }
    
    // Setter para descuento
    set descuento(nuevoDescuento) {
        if (nuevoDescuento >= 0 && nuevoDescuento <= 100) {
            this._descuento = nuevoDescuento;
        } else {
            console.log("El descuento debe estar entre 0 y 100");
        }
    }
    
    // Getter calculado para precio final
    get precioFinal() {
        return this._precio * (1 - this._descuento / 100);
    }
    
    // Método para mostrar información
    mostrarInfo() {
        return `Producto: ${this._nombre} | Precio: $${this._precio} | Descuento: ${this._descuento}% | Precio final: $${this.precioFinal.toFixed(2)}`;
    }
}

const producto1 = new Producto("Laptop", 1000);
console.log(producto1.mostrarInfo());

// Usar setters
producto1.descuento = 15;
producto1.precio = 1200;
console.log(producto1.mostrarInfo());

// Intentar valores inválidos
producto1.precio = -100; // Error
producto1.descuento = 150; // Error

console.log("");

// ===================================================
// 7. EJEMPLO PRÁCTICO COMPLETO
// ===================================================

console.log("7. EJEMPLO PRÁCTICO: SISTEMA DE EMPLEADOS");
console.log("==========================================");

// Clase base Empleado
class Empleado {
    static #contadorId = 1;
    
    constructor(nombre, salarioBase) {
        this.id = Empleado.#contadorId++;
        this.nombre = nombre;
        this.salarioBase = salarioBase;
        this.fechaContratacion = new Date();
    }
    
    calcularSalario() {
        return this.salarioBase;
    }
    
    obtenerInformacion() {
        return `ID: ${this.id} | ${this.nombre} | Salario: $${this.calcularSalario()}`;
    }
    
    get añosServicio() {
        const ahora = new Date();
        return Math.floor((ahora - this.fechaContratacion) / (1000 * 60 * 60 * 24 * 365));
    }
}

// Clase Desarrollador que hereda de Empleado
class Desarrollador extends Empleado {
    constructor(nombre, salarioBase, lenguajes = []) {
        super(nombre, salarioBase);
        this.lenguajes = lenguajes;
        this.proyectosCompletados = 0;
    }
    
    calcularSalario() {
        const bonoLenguajes = this.lenguajes.length * 100;
        const bonoProyectos = this.proyectosCompletados * 50;
        return this.salarioBase + bonoLenguajes + bonoProyectos;
    }
    
    agregarLenguaje(lenguaje) {
        if (!this.lenguajes.includes(lenguaje)) {
            this.lenguajes.push(lenguaje);
            console.log(`${lenguaje} agregado a ${this.nombre}`);
        }
    }
    
    completarProyecto() {
        this.proyectosCompletados++;
        console.log(`${this.nombre} completó un proyecto. Total: ${this.proyectosCompletados}`);
    }
    
    obtenerInformacion() {
        return `${super.obtenerInformacion()} | Tipo: Desarrollador | Lenguajes: ${this.lenguajes.join(', ')} | Proyectos: ${this.proyectosCompletados}`;
    }
}

// Clase Gerente que hereda de Empleado
class Gerente extends Empleado {
    constructor(nombre, salarioBase, equipoACargoSize = 0) {
        super(nombre, salarioBase);
        this.equipoACargoSize = equipoACargoSize;
    }
    
    calcularSalario() {
        const bonoGerencia = this.equipoACargoSize * 200;
        return this.salarioBase + bonoGerencia;
    }
    
    obtenerInformacion() {
        return `${super.obtenerInformacion()} | Tipo: Gerente | Equipo a cargo: ${this.equipoACargoSize} personas`;
    }
}

// Crear empleados
const dev1 = new Desarrollador("Alice Johnson", 3000, ["JavaScript", "Python"]);
const dev2 = new Desarrollador("Bob Smith", 3200, ["Java", "C++", "Go"]);
const gerente1 = new Gerente("Carol Williams", 4000, 5);

// Simular actividad
dev1.agregarLenguaje("TypeScript");
dev1.completarProyecto();
dev1.completarProyecto();

dev2.completarProyecto();

// Mostrar información de todos los empleados
const empleados = [dev1, dev2, gerente1];

console.log("\nInformación de empleados:");
empleados.forEach(empleado => {
    console.log(empleado.obtenerInformacion());
});

// Calcular nómina total
const nominaTotal = empleados.reduce((total, empleado) => total + empleado.calcularSalario(), 0);
console.log(`\nNómina total: $${nominaTotal}`);

// ===================================================
// RESUMEN DE CONCEPTOS
// ===================================================

console.log("\n" + "=".repeat(50));
console.log("RESUMEN DE CONCEPTOS DE POO EN JAVASCRIPT");
console.log("=".repeat(50));
console.log(`
1. CLASES Y OBJETOS:
   - Las clases son plantillas para crear objetos
   - Los objetos son instancias de las clases
   - Uso del constructor para inicializar propiedades

2. ENCAPSULACIÓN:
   - Propiedades y métodos privados usando #
   - Getters y setters para controlar el acceso
   - Ocultación de detalles internos

3. HERENCIA:
   - Uso de 'extends' para crear clases hijas
   - 'super()' para llamar al constructor padre
   - Sobrescritura de métodos

4. POLIMORFISMO:
   - Misma interfaz, diferentes implementaciones
   - Métodos que se comportan diferente según el objeto

5. MÉTODOS ESTÁTICOS:
   - Métodos que pertenecen a la clase, no a instancias
   - Se llaman directamente en la clase

6. GETTERS Y SETTERS:
   - Control de acceso a propiedades
   - Validación de datos
   - Propiedades calculadas

¡Estos son los pilares fundamentales de la POO en JavaScript!
`);



//===============================================
// CALSE PLATZI
//===============================================

/*

objeto {
    propiedad; valor,
    propiedad: valor,
    propiedad: valor

    METODOS => FUNCIONES QUE ESTAN DENTRO DE LOS METODOS QUE NOS AYUDAN A GENERAR INTERACCION


}
*/


const persona = {
    nombre: 'Jhon',
    edad: 30,
    direccion: {
        calle: 'Avenida Insurgentes 187',
        ciudad: 'Mexico'
    },

    saludar(){
        console.log(`Hola, mi nombre es: ${persona.nombre}`)
    }
}
console.log(persona);
persona.saludar();
persona.telefono = '555-555-555' // agregar una nueva propiedad
console.log(persona.telefono);

// Agregar un nuevo metodo
persona.despedir = () => {
    console.log(`Adios`);
};

persona.despedir();

// Borrar propiedades y metodos

delete persona.telefono;
console.log(persona)

delete persona.despedir;
console.log(persona)




//==========================
// EJERCICIOS
//==========================

//1. Crear un objeto simple

const persona_1 = {nombre: 'Santiago', edad: 21};
console.log(persona_1);

//2. acceder a propiedades de un objeto

const perro_2 = {
    raza: 'Labrador',
    color: 'Negro'
};
console.log(`La raza es: ${perro_2.raza}`);
console.log(`De Color: ${perro_2.color}`);

//3. agregar propiedad a un objeto

const agregaPropiedadObjeto = {
    nombre: 'Carlos',
    edad: 49
}
agregaPropiedadObjeto.ciudad = 'Medellin';
agregaPropiedadObjeto.universidad = 'UPJ';

//4. Eliminar propieda a un objeto
delete agregaPropiedadObjeto.universidad // elimina la propuedad delete sin punto despues
delete agregaPropiedadObjeto.ciudad
console.log(agregaPropiedadObjeto);

//5. Metodo dentro de un objeto

const persona_7 = {
    nombre: 'Juan',
    edad: 35,
    direccion: {
        calle: 'Las Palmas 187',
        ciudad: 'CDMX'
    },
    saludar(){
        console.log(`Hola : ${persona_7.nombre} estas ${persona_7.direccion.ciudad}`)
    }
}
persona_7.saludar();
















