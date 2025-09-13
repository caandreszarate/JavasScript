//=================================
// Ejercicios 
//=================================

//Ejercicio 1 - Crea una clase Animal con un método hacerSonido que muestre en consola "Sonido genérico".

class Animal {
    hacerSonido(){
        console.log('Genera Sonido Generico')
    }
}

let animal = new Animal();
animal.hacerSonido();

// Ejercicio 2 - Crea una clase Perro que herede de Animal y sobrescriba el método hacerSonido mostrando "Guau guau". - USO DE EXTENDS

class AnimalPerro {
    hacerSonido(){
        console.log('Sonido Gnerico Perro')
    }
}

class Perro extends AnimalPerro{
    hacerSonido(){
        console.log('Sonido De un Verdadero Perro')
    }
}

let miPerro = new Perro();
miPerro.hacerSonido();




// Ejercicio 3 - En la clase Gato, usa super.hacerSonido() para llamar también al método de Animal. - uso de SUPER

class AnimalGato {
    hacerSonido(){
        console.log('Sonido Generico de Gato')
    }
}


class Gato extends AnimalGato {
    hacerSonido(){
        super.hacerSonido()
        console.log('Michucuuuu Michicuuuu')
    }
}

let miGato = new Gato();
miGato.hacerSonido();;






// ejercicio 4- Crea un método en Perro llamado correr que imprima "El perro corre feliz".

class PerroFeliz {
    hacerSonido(){
        console.log('Sonido Generico Perro')
    }
}

class FelizPerro extends PerroFeliz{
    correr(){
        console.log('El perro corre Feliz')
    }
}

let miPerroFeliz = new FelizPerro();
miPerroFeliz.correr();


//Ejercicio 5 - Agrega un constructor a Animal para recibir nombre y crea un método presentar.

class AnimalPresentar {
    constructor(nombre){
        this.nombre = nombre;
    }

    presentar(){
        console.log(`Hola, Soy ${this.nombre}`)
    }
}

let leon = new AnimalPresentar('Simba');
leon.presentar();
let perro = new AnimalPresentar('Trosqui');
perro.presentar();

// Ejercicio 6 - Haz que Perro reciba nombre y raza en su constructor y use super(nombre).

class SaludarPerro {
    constructor(nombre){
        this.nombre = nombre
    }
}

class Perrito extends SaludarPerro{
    constructor(nombre,raza){
        super(nombre);
        this.raza = raza;
    }
    presentar(){
        console.log(`Hola soy ${this.nombre} y mi raza es ${this.raza}`)
    }
}

let trosqui = new Perrito('Trosqui', "Criollo")
trosqui.presentar();

//Ejercicio 7 - Haz que Perro reciba nombre y raza en su constructor y use super(nombre).

class Animal_1 {
    constructor(nombre){
        this.nombre = nombre
    }
    presentar(){
        console.log(`Hola.. soy ${this.nombre}`)
    }
}

class Perro_2 extends Animal_1 {
    presentar(){
        super.presentar();
        console.log(`Y tambien soy un Perro!..`)
    }
}

let perro_3 = new Perro_2('Firulais')
perro_3.presentar();

// Ejercicio 8 - Crea una clase Ave que herede de Animal y tenga un método volar.

class AnimalAve {
    constructor(nombre){
        this.nombre = nombre;
    }
}

class Ave extends AnimalAve {
    volar(){
        console.log(`El ${this.nombre} esta Volando`)
    }
}
let miAve = new Ave(`Aguila`);
miAve.volar();

//9 - Crea una clase Aguila que herede de Ave y tenga un método cazar.

class AnimalAve_2{
    constructor(nombre){
        this.nombre = nombre;
    }
}

class Aguila extends AnimalAve_2 {
    cazar (){
        console.log(`El ${this.nombre} Esta buscando cazar`)
    }
}

let miAguila = new Aguila ('Alcon')
miAguila.cazar();

//10 - Crea una lista de Animal, Perro y Gato, y llama a hacerSonido en cada uno.

class sonidoAnimal {
    hacerSonido(){
        console.log('Sonido Generico')
    }
}

class sonidoPerro extends sonidoAnimal {
    hacerSonido(){
        console.log('Guaaauuuu... Guauuuuuuu..')
    }
}

class sonidoGato extends sonidoAnimal {
    hacerSonido(){
        console.log('Miauuuu Miauuuuuu')
    }
}

let animales = [new sonidoAnimal(), new sonidoPerro(), new sonidoGato];
animales.forEach(animal => animal.hacerSonido());
















