// 1. Crea una clase Persona que tenga un constructor con nombre y edad. Agrega un método presentarse que muestre un saludo con esos datos.


class Persona {
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
    }

    presentarse(){
        console.log(`Hola. soy ${this.nombre} y tengo ${this.edad} años`)
    }
}

let persona1 = new Persona('Juan', 34)
persona1.presentarse();
let persona2 = new Persona('Pedro', 67);
persona2.presentarse();

// 2. Crea una clase Rectangulo con propiedades ancho y alto. Incluye un método area que calcule el área.

class Rectangulo {
    constructor(ancho,alto){
        this.ancho = ancho;
        this.alto = alto;
    }
    area(){
        return this.ancho * this.alto
    }
}

let r1 = new Rectangulo(10,4);
console.log(`El area es: ${r1.area()}`);

// 3. Crea una clase CuentaBancaria que tenga un saldo. Agrega métodos depositar y retirar.


class cuentaBancaria {
    constructor(saldoInicial){
        this.saldo = saldoInicial
    }
    depositar(monto){
        this.saldo += monto;
        console.log(`Has despositado ${monto}. Y tu nuevo saldo es: ${this.saldo}`)
    }

    retirar(monto){
        if(monto > this.saldo){
            console.log(`Tu retiro de ${monto}, supera los Fondos de tu Cuenta`)
        }else{
            this.saldo -= monto;
            console.log(`Estas retirando ${monto}. Ahora tu nuevo saldo es: ${this.saldo}`)
        }
    }
}
let cuenta = new cuentaBancaria(1000);
cuenta.depositar(500);
cuenta.retirar(300);
cuenta.retirar(1500);

//4. Crea una clase Producto con nombre, precio y un método aplicarDescuento(porcentaje).

class Producto {
    constructor(nombre,precio){
        this.nombre = nombre;
        this.precio = precio;
    }
    aplicarDescuento(porcentaje){
        this.precio -= (this.precio * porcentaje) /100;
        console.log(`El precio del ${this.nombre}, con descuento del ${porcentaje}%, tiene un valor final de ${this.precio}`)
    }
}

let p1 = new Producto('Televisor', 2500000);
p1.aplicarDescuento(15);

//5. Crea una clase Libro con titulo, autor y paginas. Agrega un método descripcion.

class Libro {
    constructor(titulo,autor,paginas){
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
    }
    descripcion(){
        console.log(`El libro ${this.titulo}, de ${this.autor}, tiene ${this.paginas} paginas`)
    }
}

let libro1 = new Libro('Cien Años de Soledad', 'Gabriel Garcia Marquez', 354)
libro1.descripcion();

//6. Crea una clase Estudiante con nombre y notas. Agrega un método promedio.

class Estudiante{
    constructor(nombre,notas){
        this.nombre = nombre;
        this.notas = notas;
    }

    promedio(){
        let suma = this.notas.reduce((a,b) => a + b ,0);
        let promedio = suma / this.notas.length;
        console.log(`${this.nombre}, tiene un promedio de ${promedio}`)
    }
}

let e1 = new Estudiante('Martin Elias Diaz', [1.5,3.8,4.3,1.2]);
e1.promedio();

// 7. Crea una clase Coche con marca, modelo y velocidad. Agrega un método acelerar.

class Coche {
    constructor(marca,modelo,velocidad){
        this.marca = marca;
        this.modelo = modelo;
        this.velocidad = velocidad;
    }

    acelerar(incremento){
        this.velocidad += incremento;
        console.log(`${this.marca} ${this.modelo} va a una velocidad de ${this.velocidad} km/h`)
    }
}

let c1 = new Coche('Mazda', 'Touring',0)
c1.acelerar(20);
c1.acelerar(30);
c1.acelerar(50);

//8. Crea una clase Empleado con nombre, salario y un método calcularBono(porcentaje).

class Empleado{
    constructor(nombre,salario){
        this.nombre = nombre;
        this.salario = salario;
    }

    calcularBono(procenteje){
        let bono = (this.salario * procenteje)/ 100;
        console.log(`${this.nombre} tiene un bono de ${bono}`)
    }
}

let empleado1 = new Empleado('Juan Perez', 1320000)
empleado1.calcularBono(10);

//9. Crea una clase Pelicula con titulo, director y anio. Agrega un método info

class Pelicula{
    constructor(titulo,director, anio){
        this.titulo = titulo;
        this.director = director;
        this.anio = anio;
    }
    info(){
        console.log(`La pelicula ${this.titulo}, fue dirigida por ${this.director} en el año ${this.anio}`)
    }
}

let pelicula1 = new Pelicula('Duro de Matar II', 'Steven Spilberg', 1992);
pelicula1.info();

//10. Crea una clase CarritoCompra que guarde productos en un array. Agrega un método agregarProducto y mostrarProductos.

class CarritoCompra{
    constructor(){
        this.productos = []
    }
    agregarProducto(producto){
        this.productos.push(producto);
        console.log(`${producto} agregado al carrito`)
    }
    mostrarProductos(){
        console.log(`Productos en el carrito:  ${this.productos}`)
    }
}

let carrito = new CarritoCompra();
carrito.agregarProducto('Celular');
carrito.agregarProducto('Televisor');
carrito.agregarProducto('Teclado');
carrito.mostrarProductos();



















