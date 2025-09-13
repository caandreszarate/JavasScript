//================================
//    Clase Platzi
//================================


// PROTOTIPOS Y HERENCIA
// Clases y Funciones contructoras son las unicas que peuden generar un prototipo

// Metodos
// Propiedades
//prototype
// - => metodos
// - => propiedades

class Animal {
    constructor (nombre, tipo){
        this.nombre = nombre;
        this.tipo = tipo;
    }
    emitorSonido(){
        console.log('El animal emite un sonido')
    }
}

class Perro extends Animal {
    constructor(nombre,tipo,raza){
        super(nombre,tipo);
        this.raza = raza;
    }
    emitorSonido(){
        console.log('El Perro Ladra')
    }
    correr(){
        console.log(`${this.nombre} Corre alegremente`);
    }
}

const perro_1 = new Perro('Bobby', 'Perro' , 'Pug');
console.log(perro_1);
perro_1.correr()
perro_1.emitorSonido();


//=================================
// EJERCICIO PLATZI
//=================================

/* 
Requerimientos del reto:

1. El usuario debe poder ingresar su usuario y contraseÃ±a
2. El sistema debe ser capaz de validar si el usuario y contraseÃ±a ingresados por el usuario existen en la base de datos
3. Si el usuario y contraseÃ±a son correctos, el sistema debe mostrar un mensaje de bienvenida y mostrar el timeline del usuario.
4. Si el usuario y contraseÃ±a son incorrectos, el sistema debe mostrar un mensaje de error y no mostrar ningun timeline.

*/

const usersDatabase = [
    {
      username: "andres",
      password: "123",
    },
    {
      username: "caro",
      password: "456",
    },
    {
      username: "mariana",
      password: "789",
    },
  ];
  
  const usersTimeline = [
    {
      username: "Estefany",
      timeline: "Me encata Javascript!",
    },
    {
      username: "Oscar",
      timeline: "Bebeloper es lo mejor!",
    },
    {
      username: "Mariana",
      timeline: "A mi me gusta mÃ¡s el cafÃ© que el tÃ©",
    },
    {
      username: "Andres",
      timeline: "Yo hoy no quiero trabajar",
    },
  ];


  const username = prompt('Ingresa tu Usuario: ');
  const password = prompt('Digita tu Contraseña: ');

  function usuarioExistente (username,password){
    for(let i =0; i < usersDatabase.length; i++ ){
        if(usersDatabase[i].username === username && usersDatabase[i].password === password){
            return true;
        }
    }
    return false;
  }


  function singIn(username, password){
    if(usuarioExistente (username,password)){
        alert(`Bienvenido a tu cuenta ${username}`)
        console.log(usersTimeline)
    }else{
        alert('Uuuuupss, Usuario o Contraseña incorrectos')
    }
  }

  singIn(username, password)


