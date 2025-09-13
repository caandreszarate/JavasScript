//============================
//  Clase Platzi
//============================

class Persona {
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar(){
        console.log(`Hola mi nombre es ${this.nombre} y tengo ${this.edad} años`)
    }
}

const persona_1 =  new Persona('Juan', 37);
persona_1.saludar();

//============================
//  EXPLICACIÓN COMPLETA SOBRE CLASES CON MÉTODOS EN JAVASCRIPT
//============================

/*
INTRODUCCIÓN A LAS CLASES EN JAVASCRIPT:

Las clases en JavaScript (introducidas en ES6) proporcionan una sintaxis más clara
y familiar para crear objetos y manejar la herencia. Son principalmente "azúcar 
sintáctico" sobre el sistema de prototipos existente de JavaScript.

ESTRUCTURA BÁSICA DE UNA CLASE:
- constructor(): Método especial que se ejecuta al crear una nueva instancia
- Métodos de instancia: Funciones que pertenecen a cada objeto creado
- Métodos estáticos: Funciones que pertenecen a la clase, no a las instancias
- Getters y Setters: Métodos para acceder y modificar propiedades
*/

//============================
//  1. CLASE CON MÚLTIPLES MÉTODOS
//============================

class Vehiculo {
    constructor(marca, modelo, año) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.encendido = false;
        this.velocidad = 0;
    }

    // Método para encender el vehículo
    encender() {
        if (!this.encendido) {
            this.encendido = true;
            console.log(`${this.marca} ${this.modelo} ha sido encendido`);
        } else {
            console.log(`${this.marca} ${this.modelo} ya está encendido`);
        }
    }

    // Método para apagar el vehículo
    apagar() {
        if (this.encendido && this.velocidad === 0) {
            this.encendido = false;
            console.log(`${this.marca} ${this.modelo} ha sido apagado`);
        } else if (this.velocidad > 0) {
            console.log('No puedes apagar el vehículo mientras está en movimiento');
        } else {
            console.log('El vehículo ya está apagado');
        }
    }

    // Método para acelerar
    acelerar(incremento = 10) {
        if (this.encendido) {
            this.velocidad += incremento;
            console.log(`Acelerando... Velocidad actual: ${this.velocidad} km/h`);
        } else {
            console.log('Primero debes encender el vehículo');
        }
    }

    // Método para frenar
    frenar(decremento = 10) {
        if (this.velocidad > 0) {
            this.velocidad = Math.max(0, this.velocidad - decremento);
            console.log(`Frenando... Velocidad actual: ${this.velocidad} km/h`);
        } else {
            console.log('El vehículo ya está detenido');
        }
    }

    // Método para obtener información del vehículo
    obtenerInfo() {
        return {
            marca: this.marca,
            modelo: this.modelo,
            año: this.año,
            encendido: this.encendido,
            velocidad: this.velocidad
        };
    }

    // Método para mostrar estado completo
    mostrarEstado() {
        const estado = this.encendido ? 'Encendido' : 'Apagado';
        console.log(`
        === ESTADO DEL VEHÍCULO ===
        Marca: ${this.marca}
        Modelo: ${this.modelo}
        Año: ${this.año}
        Estado: ${estado}
        Velocidad: ${this.velocidad} km/h
        ===========================
        `);
    }
}

// Ejemplo de uso de la clase Vehiculo
console.log('\n=== EJEMPLO CLASE VEHICULO ===');
const miCarro = new Vehiculo('Toyota', 'Corolla', 2023);
miCarro.mostrarEstado();
miCarro.encender();
miCarro.acelerar(30);
miCarro.acelerar(20);
miCarro.frenar(15);
miCarro.mostrarEstado();

//============================
//  2. GETTERS Y SETTERS
//============================

class CuentaBancaria {
    constructor(titular, saldoInicial = 0) {
        this.titular = titular;
        this._saldo = saldoInicial; // Propiedad privada (convención con _)
        this._historial = [];
    }

    // Getter para obtener el saldo (propiedad de solo lectura)
    get saldo() {
        return this._saldo;
    }

    // Getter para obtener el historial
    get historial() {
        return [...this._historial]; // Retorna una copia para evitar modificaciones
    }

    // Setter para validar depósitos
    set deposito(cantidad) {
        if (cantidad > 0) {
            this._saldo += cantidad;
            this._historial.push(`Depósito: +$${cantidad}`);
            console.log(`Depósito realizado: $${cantidad}. Saldo actual: $${this._saldo}`);
        } else {
            console.log('El monto del depósito debe ser positivo');
        }
    }

    // Método para retirar dinero
    retirar(cantidad) {
        if (cantidad > 0 && cantidad <= this._saldo) {
            this._saldo -= cantidad;
            this._historial.push(`Retiro: -$${cantidad}`);
            console.log(`Retiro realizado: $${cantidad}. Saldo actual: $${this._saldo}`);
            return true;
        } else if (cantidad > this._saldo) {
            console.log('Fondos insuficientes');
            return false;
        } else {
            console.log('El monto del retiro debe ser positivo');
            return false;
        }
    }

    // Método para mostrar información de la cuenta
    mostrarInfo() {
        console.log(`
        === INFORMACIÓN DE CUENTA ===
        Titular: ${this.titular}
        Saldo: $${this._saldo}
        Transacciones realizadas: ${this._historial.length}
        =============================
        `);
    }

    // Método para mostrar historial completo
    mostrarHistorial() {
        console.log(`\n=== HISTORIAL DE ${this.titular.toUpperCase()} ===`);
        this._historial.forEach((transaccion, index) => {
            console.log(`${index + 1}. ${transaccion}`);
        });
        console.log(`Saldo final: $${this._saldo}\n`);
    }
}

// Ejemplo de uso con getters y setters
console.log('\n=== EJEMPLO GETTERS Y SETTERS ===');
const miCuenta = new CuentaBancaria('Carlos Martínez', 1000);
miCuenta.mostrarInfo();

// Usando setter
miCuenta.deposito = 500;
miCuenta.deposito = -100; // Esto dará error

// Usando getter
console.log(`Saldo actual: $${miCuenta.saldo}`);

// Usando métodos
miCuenta.retirar(200);
miCuenta.retirar(2000); // Fondos insuficientes

miCuenta.mostrarHistorial();

//============================
//  3. MÉTODOS ESTÁTICOS
//============================

class Matematicas {
    // Los métodos estáticos pertenecen a la clase, no a las instancias
    static PI = 3.14159;

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
        if (b !== 0) {
            return a / b;
        } else {
            throw new Error('No se puede dividir por cero');
        }
    }

    static calcularAreaCirculo(radio) {
        return this.PI * radio * radio;
    }

    static esPar(numero) {
        return numero % 2 === 0;
    }

    static esPositivo(numero) {
        return numero > 0;
    }

    // Método estático para validar si un número es primo
    static esPrimo(numero) {
        if (numero < 2) return false;
        for (let i = 2; i <= Math.sqrt(numero); i++) {
            if (numero % i === 0) return false;
        }
        return true;
    }
}

// Los métodos estáticos se llaman directamente en la clase
console.log('\n=== EJEMPLO MÉTODOS ESTÁTICOS ===');
console.log(`Suma: ${Matematicas.sumar(10, 5)}`);
console.log(`Resta: ${Matematicas.restar(10, 5)}`);
console.log(`Multiplicación: ${Matematicas.multiplicar(10, 5)}`);
console.log(`División: ${Matematicas.dividir(10, 5)}`);
console.log(`Área del círculo (radio 3): ${Matematicas.calcularAreaCirculo(3)}`);
console.log(`¿Es 8 par?: ${Matematicas.esPar(8)}`);
console.log(`¿Es 7 primo?: ${Matematicas.esPrimo(7)}`);

//============================
//  4. CLASE CON MÉTODOS PRIVADOS (JAVASCRIPT MODERNO)
//============================

class Usuario {
    // Propiedades privadas (con #)
    #contraseña;
    #intentosLogin;

    constructor(nombre, email, contraseña) {
        this.nombre = nombre;
        this.email = email;
        this.#contraseña = this.#encriptarContraseña(contraseña);
        this.#intentosLogin = 0;
        this.activo = true;
        this.fechaCreacion = new Date();
    }

    // Método privado para encriptar contraseña
    #encriptarContraseña(contraseña) {
        // Simulación simple de encriptación
        return btoa(contraseña + 'salt123');
    }

    // Método privado para validar contraseña
    #validarContraseña(contraseñaIngresada) {
        return this.#encriptarContraseña(contraseñaIngresada) === this.#contraseña;
    }

    // Método público para login
    login(contraseñaIngresada) {
        if (!this.activo) {
            console.log('Usuario bloqueado. Contacta al administrador.');
            return false;
        }

        if (this.#validarContraseña(contraseñaIngresada)) {
            this.#intentosLogin = 0;
            console.log(`¡Bienvenido ${this.nombre}!`);
            return true;
        } else {
            this.#intentosLogin++;
            console.log(`Contraseña incorrecta. Intentos: ${this.#intentosLogin}/3`);
            
            if (this.#intentosLogin >= 3) {
                this.activo = false;
                console.log('Usuario bloqueado por múltiples intentos fallidos.');
            }
            return false;
        }
    }

    // Método para cambiar contraseña
    cambiarContraseña(contraseñaActual, nuevaContraseña) {
        if (this.#validarContraseña(contraseñaActual)) {
            this.#contraseña = this.#encriptarContraseña(nuevaContraseña);
            console.log('Contraseña cambiada exitosamente');
            return true;
        } else {
            console.log('Contraseña actual incorrecta');
            return false;
        }
    }

    // Método para obtener información pública del usuario
    obtenerInfoPublica() {
        return {
            nombre: this.nombre,
            email: this.email,
            activo: this.activo,
            fechaCreacion: this.fechaCreacion.toLocaleDateString()
        };
    }
}

// Ejemplo de uso con métodos privados
console.log('\n=== EJEMPLO MÉTODOS PRIVADOS ===');
const usuario1 = new Usuario('Ana García', 'ana@email.com', 'miContraseña123');
console.log('Info del usuario:', usuario1.obtenerInfoPublica());

// Intentos de login
usuario1.login('contraseñaIncorrecta'); // Falla
usuario1.login('miContraseña123'); // Éxito

// Cambiar contraseña
usuario1.cambiarContraseña('miContraseña123', 'nuevaContraseña456');

//============================
//  5. HERENCIA CON MÉTODOS
//============================

// Clase padre
class Animal {
    constructor(nombre, especie) {
        this.nombre = nombre;
        this.especie = especie;
        this.energia = 100;
    }

    comer(alimento) {
        this.energia = Math.min(100, this.energia + 20);
        console.log(`${this.nombre} está comiendo ${alimento}. Energía: ${this.energia}`);
    }

    dormir(horas) {
        this.energia = Math.min(100, this.energia + (horas * 10));
        console.log(`${this.nombre} durmió ${horas} horas. Energía: ${this.energia}`);
    }

    // Método que será sobrescrito por las clases hijas
    hacerSonido() {
        console.log(`${this.nombre} hace un sonido`);
    }

    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}, Especie: ${this.especie}, Energía: ${this.energia}`);
    }
}

// Clase hija que hereda de Animal
class Perro extends Animal {
    constructor(nombre, raza) {
        super(nombre, 'Perro'); // Llamar al constructor padre
        this.raza = raza;
        this.felicidad = 50;
    }

    // Sobrescribir método del padre
    hacerSonido() {
        console.log(`${this.nombre} dice: ¡Guau guau!`);
    }

    // Método específico de la clase Perro
    jugar() {
        if (this.energia >= 20) {
            this.energia -= 20;
            this.felicidad = Math.min(100, this.felicidad + 30);
            console.log(`${this.nombre} está jugando. Energía: ${this.energia}, Felicidad: ${this.felicidad}`);
        } else {
            console.log(`${this.nombre} está muy cansado para jugar`);
        }
    }

    // Método específico para traer objetos
    traer(objeto) {
        if (this.energia >= 15) {
            this.energia -= 15;
            console.log(`${this.nombre} trajo ${objeto}`);
        } else {
            console.log(`${this.nombre} está muy cansado para traer ${objeto}`);
        }
    }

    // Sobrescribir método mostrarInfo para incluir información específica
    mostrarInfo() {
        super.mostrarInfo(); // Llamar al método del padre
        console.log(`Raza: ${this.raza}, Felicidad: ${this.felicidad}`);
    }
}

// Clase hija que hereda de Animal
class Gato extends Animal {
    constructor(nombre, color) {
        super(nombre, 'Gato');
        this.color = color;
        this.independencia = 80;
    }

    // Sobrescribir método del padre
    hacerSonido() {
        console.log(`${this.nombre} dice: ¡Miau!`);
    }

    // Método específico de la clase Gato
    ronronear() {
        this.energia += 5;
        console.log(`${this.nombre} está ronroneando. Energía: ${this.energia}`);
    }

    // Método específico para cazar
    cazar() {
        if (this.energia >= 25) {
            this.energia -= 25;
            this.independencia = Math.min(100, this.independencia + 10);
            console.log(`${this.nombre} está cazando. Energía: ${this.energia}, Independencia: ${this.independencia}`);
        } else {
            console.log(`${this.nombre} está muy cansado para cazar`);
        }
    }

    mostrarInfo() {
        super.mostrarInfo();
        console.log(`Color: ${this.color}, Independencia: ${this.independencia}`);
    }
}

// Ejemplo de herencia
console.log('\n=== EJEMPLO HERENCIA ===');
const miPerro = new Perro('Max', 'Golden Retriever');
const miGato = new Gato('Luna', 'Negro');

console.log('\n--- PERRO ---');
miPerro.mostrarInfo();
miPerro.hacerSonido();
miPerro.jugar();
miPerro.traer('pelota');
miPerro.comer('croquetas');

console.log('\n--- GATO ---');
miGato.mostrarInfo();
miGato.hacerSonido();
miGato.ronronear();
miGato.cazar();
miGato.dormir(2);

//============================
//  6. MÉTODOS ENCADENADOS (METHOD CHAINING)
//============================

class ConstructorTexto {
    constructor() {
        this.texto = '';
    }

    agregar(texto) {
        this.texto += texto;
        return this; // Retorna la instancia para permitir encadenamiento
    }

    mayusculas() {
        this.texto = this.texto.toUpperCase();
        return this;
    }

    minusculas() {
        this.texto = this.texto.toLowerCase();
        return this;
    }

    capitalizar() {
        this.texto = this.texto.charAt(0).toUpperCase() + this.texto.slice(1).toLowerCase();
        return this;
    }

    reemplazar(buscar, reemplazar) {
        this.texto = this.texto.replace(new RegExp(buscar, 'g'), reemplazar);
        return this;
    }

    espacios() {
        this.texto = this.texto.trim();
        return this;
    }

    obtener() {
        return this.texto;
    }

    limpiar() {
        this.texto = '';
        return this;
    }
}

// Ejemplo de method chaining
console.log('\n=== EJEMPLO METHOD CHAINING ===');
const constructor = new ConstructorTexto();

const resultado = constructor
    .agregar('  hola mundo  ')
    .espacios()
    .capitalizar()
    .agregar(' - ')
    .agregar('javascript es genial')
    .mayusculas()
    .reemplazar('JAVASCRIPT', 'JS')
    .obtener();

console.log('Resultado:', resultado);

//============================
//  RESUMEN DE CONCEPTOS CLAVE
//============================

/*
1. CONSTRUCTOR: 
   - Método especial que se ejecuta al crear una instancia
   - Se define con la palabra clave 'constructor'
   - Inicializa las propiedades del objeto

2. MÉTODOS DE INSTANCIA:
   - Funciones que pertenecen a cada objeto creado
   - Pueden acceder a 'this' para referenciar la instancia
   - Se pueden llamar en cualquier instancia de la clase

3. MÉTODOS ESTÁTICOS:
   - Pertenecen a la clase, no a las instancias
   - Se definen con la palabra clave 'static'
   - Se llaman directamente en la clase: Clase.metodo()

4. GETTERS Y SETTERS:
   - get: Define una propiedad de solo lectura
   - set: Define validaciones al asignar valores
   - Se acceden como propiedades, no como métodos

5. MÉTODOS PRIVADOS:
   - Se definen con # al inicio del nombre
   - Solo son accesibles dentro de la clase
   - Proporcionan encapsulación real

6. HERENCIA:
   - extends: Palabra clave para heredar de otra clase
   - super(): Llama al constructor de la clase padre
   - super.metodo(): Llama a un método de la clase padre

7. METHOD CHAINING:
   - Retornar 'this' permite encadenar métodos
   - Facilita la escritura de código fluido
   - Común en librerías como jQuery

8. BUENAS PRÁCTICAS:
   - Usar nombres descriptivos para métodos
   - Validar parámetros en los métodos
   - Documentar métodos complejos
   - Mantener métodos pequeños y enfocados
   - Usar métodos privados para lógica interna
*/

console.log('\n=== FIN DE LA EXPLICACIÓN ===');
console.log('¡Ahora ya conoces todos los aspectos importantes de las clases y métodos en JavaScript!');

//============================
// CLASE PLATZI
//============================


class Persona_3 {
    constructor (nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar(){
        console.log(`Hola mi nombre es ${this.nombre} y tengo ${this.edad} años`)
    }
};


const persona_2 = new Persona_3('Juan', 32);

persona_2.saludar();


