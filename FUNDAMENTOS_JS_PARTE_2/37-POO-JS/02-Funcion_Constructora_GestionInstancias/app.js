// =====================================
// FUNCIONES CONSTRUCTORAS Y GESTIÓN DE INSTANCIAS EN JAVASCRIPT
// =====================================

console.log("=== FUNCIONES CONSTRUCTORAS Y GESTIÓN DE INSTANCIAS ===");

/*
¿QUÉ ES UNA FUNCIÓN CONSTRUCTORA?
================================

Una función constructora es una función especial en JavaScript que se utiliza para crear objetos.
Se diferencia de una función normal en que:

1. Se invoca con la palabra clave 'new'
2. Su nombre generalmente comienza con mayúscula (convención)
3. Utiliza 'this' para asignar propiedades al objeto que está creando
4. No necesita return explícito (devuelve automáticamente el objeto creado)
*/

// EJEMPLO 1: Función Constructora Básica
// ======================================

function Persona(nombre, edad, profesion) {
    // 'this' se refiere al nuevo objeto que se está creando
    this.nombre = nombre;
    this.edad = edad;
    this.profesion = profesion;
    
    // Método dentro del constructor
    this.saludar = function() {
        return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
    };
    
    this.trabajar = function() {
        return `${this.nombre} está trabajando como ${this.profesion}`;
    };
}

// Creación de instancias (objetos) usando la función constructora
console.log("\n--- CREANDO INSTANCIAS ---");

const persona1 = new Persona("Carlos", 25, "Desarrollador");
const persona2 = new Persona("María", 30, "Diseñadora");
const persona3 = new Persona("Juan", 28, "Médico");

console.log("Persona 1:", persona1);
console.log("Persona 2:", persona2);
console.log("Persona 3:", persona3);

// Usando los métodos de las instancias
console.log("\n--- USANDO MÉTODOS DE INSTANCIAS ---");
console.log(persona1.saludar());
console.log(persona2.trabajar());
console.log(persona3.saludar());

/*
GESTIÓN DE INSTANCIAS
====================

La gestión de instancias incluye:
1. Verificar si un objeto es instancia de un constructor
2. Acceder y modificar propiedades
3. Agregar métodos dinámicamente
4. Usar prototype para métodos compartidos
*/

// EJEMPLO 2: Verificación de Instancias
// =====================================

console.log("\n--- VERIFICACIÓN DE INSTANCIAS ---");

// instanceof: verifica si un objeto es instancia de un constructor
console.log("¿persona1 es instancia de Persona?", persona1 instanceof Persona);
console.log("¿persona1 es instancia de Object?", persona1 instanceof Object);
console.log("¿persona1 es instancia de Array?", persona1 instanceof Array);

// constructor: propiedad que apunta al constructor que creó el objeto
console.log("Constructor de persona1:", persona1.constructor === Persona);
console.log("Nombre del constructor:", persona1.constructor.name);

// EJEMPLO 3: Modificación Dinámica de Propiedades
// ===============================================

console.log("\n--- MODIFICACIÓN DINÁMICA ---");

// Agregar nuevas propiedades a instancias específicas
persona1.email = "carlos@ejemplo.com";
persona1.telefono = "123-456-7890";

console.log("Persona1 con nuevas propiedades:", persona1);
console.log("Persona2 (sin cambios):", persona2);

// Modificar propiedades existentes
persona2.edad = 31;
persona2.profesion = "Diseñadora Senior";

console.log("Persona2 modificada:", persona2);

// EJEMPLO 4: Usando Prototype para Métodos Compartidos
// ====================================================

console.log("\n--- PROTOTYPE PARA MÉTODOS COMPARTIDOS ---");

// Problema: cada instancia tiene su propia copia de los métodos
console.log("¿persona1.saludar === persona2.saludar?", persona1.saludar === persona2.saludar);

// Solución: usar prototype para métodos compartidos
function Animal(nombre, especie) {
    this.nombre = nombre;
    this.especie = especie;
}

// Métodos en el prototype (compartidos por todas las instancias)
Animal.prototype.hacerSonido = function() {
    return `${this.nombre} hace un sonido`;
};

Animal.prototype.dormir = function() {
    return `${this.nombre} está durmiendo`;
};

Animal.prototype.comer = function(comida) {
    return `${this.nombre} está comiendo ${comida}`;
};

// Crear instancias
const perro = new Animal("Rex", "Perro");
const gato = new Animal("Misu", "Gato");

console.log("Perro:", perro);
console.log("Gato:", gato);

// Los métodos son compartidos
console.log("¿perro.hacerSonido === gato.hacerSonido?", perro.hacerSonido === gato.hacerSonido);

console.log(perro.hacerSonido());
console.log(gato.dormir());
console.log(perro.comer("croquetas"));

// EJEMPLO 5: Constructor Más Complejo con Validaciones
// ====================================================

console.log("\n--- CONSTRUCTOR CON VALIDACIONES ---");

function Producto(nombre, precio, categoria) {
    // Validaciones
    if (!nombre || typeof nombre !== 'string') {
        throw new Error("El nombre es requerido y debe ser un string");
    }
    
    if (!precio || precio <= 0) {
        throw new Error("El precio debe ser un número mayor a 0");
    }
    
    // Propiedades
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria || "General";
    this.fechaCreacion = new Date();
    this.activo = true;
}

// Métodos en prototype
Producto.prototype.aplicarDescuento = function(porcentaje) {
    if (porcentaje > 0 && porcentaje <= 100) {
        this.precio = this.precio * (1 - porcentaje / 100);
        return `Descuento del ${porcentaje}% aplicado. Nuevo precio: $${this.precio.toFixed(2)}`;
    }
    return "Porcentaje de descuento inválido";
};

Producto.prototype.desactivar = function() {
    this.activo = false;
    return `${this.nombre} ha sido desactivado`;
};

Producto.prototype.getInfo = function() {
    return {
        nombre: this.nombre,
        precio: `$${this.precio.toFixed(2)}`,
        categoria: this.categoria,
        activo: this.activo,
        antiguedad: Math.floor((new Date() - this.fechaCreacion) / 1000) + " segundos"
    };
};

// Crear productos
try {
    const laptop = new Producto("Laptop Gaming", 1500, "Tecnología");
    const mouse = new Producto("Mouse Inalámbrico", 25, "Accesorios");
    
    console.log("Laptop creada:", laptop.getInfo());
    console.log("Mouse creado:", mouse.getInfo());
    
    // Aplicar descuentos
    console.log(laptop.aplicarDescuento(10));
    console.log(mouse.aplicarDescuento(20));
    
    console.log("Después de descuentos:");
    console.log("Laptop:", laptop.getInfo());
    console.log("Mouse:", mouse.getInfo());
    
} catch (error) {
    console.error("Error al crear producto:", error.message);
}

// EJEMPLO 6: Gestión de Colección de Instancias
// =============================================

console.log("\n--- GESTIÓN DE COLECCIÓN DE INSTANCIAS ---");

// Clase para gestionar múltiples instancias
function GestorPersonas() {
    this.personas = [];
}

GestorPersonas.prototype.agregar = function(persona) {
    if (persona instanceof Persona) {
        this.personas.push(persona);
        return `${persona.nombre} agregado correctamente`;
    }
    return "Solo se pueden agregar instancias de Persona";
};

GestorPersonas.prototype.buscarPorNombre = function(nombre) {
    return this.personas.find(persona => persona.nombre.toLowerCase() === nombre.toLowerCase());
};

GestorPersonas.prototype.filtrarPorProfesion = function(profesion) {
    return this.personas.filter(persona => 
        persona.profesion.toLowerCase() === profesion.toLowerCase()
    );
};

GestorPersonas.prototype.obtenerEdadPromedio = function() {
    if (this.personas.length === 0) return 0;
    
    const sumaEdades = this.personas.reduce((suma, persona) => suma + persona.edad, 0);
    return (sumaEdades / this.personas.length).toFixed(1);
};

GestorPersonas.prototype.listar = function() {
    return this.personas.map(persona => ({
        nombre: persona.nombre,
        edad: persona.edad,
        profesion: persona.profesion
    }));
};

// Usar el gestor
const gestor = new GestorPersonas();

console.log(gestor.agregar(persona1));
console.log(gestor.agregar(persona2));
console.log(gestor.agregar(persona3));

console.log("Lista completa:", gestor.listar());
console.log("Buscar 'María':", gestor.buscarPorNombre("María"));
console.log("Desarrolladores:", gestor.filtrarPorProfesion("Desarrollador"));
console.log("Edad promedio:", gestor.obtenerEdadPromedio(), "años");

// EJEMPLO 7: Propiedades Estáticas y Contadores
// =============================================

console.log("\n--- PROPIEDADES ESTÁTICAS Y CONTADORES ---");

function Usuario(nombre, email) {
    // Contador de instancias
    Usuario.contador = (Usuario.contador || 0) + 1;
    
    this.id = Usuario.contador;
    this.nombre = nombre;
    this.email = email;
    this.fechaRegistro = new Date();
}

// Método estático (se llama en la función constructora, no en instancias)
Usuario.obtenerTotal = function() {
    return Usuario.contador || 0;
};

Usuario.prototype.getInfo = function() {
    return `Usuario #${this.id}: ${this.nombre} (${this.email})`;
};

// Crear usuarios
const user1 = new Usuario("Ana", "ana@email.com");
const user2 = new Usuario("Luis", "luis@email.com");
const user3 = new Usuario("Sofia", "sofia@email.com");

console.log(user1.getInfo());
console.log(user2.getInfo());
console.log(user3.getInfo());

console.log("Total de usuarios creados:", Usuario.obtenerTotal());

/*
VENTAJAS DE LAS FUNCIONES CONSTRUCTORAS:
=======================================

1. REUTILIZACIÓN: Permiten crear múltiples objetos con la misma estructura
2. ENCAPSULACIÓN: Agrupan datos y métodos relacionados
3. PROTOTYPE: Métodos compartidos para eficiencia de memoria
4. INSTANCEOF: Verificación de tipos
5. FLEXIBILIDAD: Permiten validaciones y lógica personalizada

CUÁNDO USAR FUNCIONES CONSTRUCTORAS:
===================================

- Cuando necesitas crear múltiples objetos similares
- Para implementar programación orientada a objetos
- Cuando quieres agrupar datos y comportamientos
- Para crear "plantillas" de objetos
- Cuando necesitas verificación de tipos con instanceof

MEJORES PRÁCTICAS:
=================

1. Usar PascalCase para nombres de constructores
2. Siempre usar 'new' al llamar constructores
3. Poner métodos en prototype para eficiencia
4. Validar parámetros en el constructor
5. Usar propiedades estáticas para contadores o configuración
*/

console.log("\n=== FIN DE LA DEMOSTRACIÓN ===");


//==================================================
// FUNCION CONSTRUCTORA Y GESTION INSTANCIA PLATZI
//===================================================

// const persona = {
//     nombre: 'Diego',
//     apellido: 'De Granda'
// }

// Funcion constructora objetico construir objetos

function Persona_11(nombre,apellido,edad){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
};

const persona_12 = new Persona_11('Juan', 'Perez', 30 );

console.log(persona_12)






