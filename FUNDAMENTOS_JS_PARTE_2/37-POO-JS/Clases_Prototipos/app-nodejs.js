//================================
//    Clase Platzi - Versión Node.js
//================================

// Importamos readline para input del usuario en Node.js
const readline = require('readline');

// PROTOTIPOS Y HERENCIA
// Clases y Funciones contructoras son las unicas que peuden generar un prototipo

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
// EJERCICIO PLATZI - Versión Node.js
//=================================

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
      timeline: "A mi me gusta más el café que el té",
    },
    {
      username: "Andres",
      timeline: "Yo hoy no quiero trabajar",
    },
  ];

// Configuración de readline para Node.js
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function usuarioExistente(username, password) {
    let usuarioValido = false;
    let timelineUsuario = null;
    
    for(let i = 0; i < usersDatabase.length; i++) {
        if(usersDatabase[i].username === username && usersDatabase[i].password === password) {
            usuarioValido = true;
            // Buscar timeline del usuario
            timelineUsuario = usersTimeline.find(user => 
                user.username.toLowerCase() === username.toLowerCase()
            );
            break;
        }
    }
    
    if(usuarioValido) {
        console.log('✅ ¡Bienvenido! Login exitoso');
        if(timelineUsuario) {
            console.log(`📝 Timeline de ${timelineUsuario.username}: ${timelineUsuario.timeline}`);
        } else {
            console.log('📝 No se encontró timeline para este usuario');
        }
    } else {
        console.log('❌ Usuario o contraseña incorrectos');
    }
    
    return usuarioValido;
}

// Función para obtener input del usuario
function obtenerCredenciales() {
    rl.question('Ingresa tu Usuario: ', (username) => {
        rl.question('Digita tu Contraseña: ', (password) => {
            usuarioExistente(username, password);
            rl.close();
        });
    });
}

// Mostrar usuarios disponibles
console.log('\n=== Sistema de Login ===');
console.log('Usuarios disponibles para prueba:');
console.log('- Usuario: andres, Contraseña: 123');
console.log('- Usuario: caro, Contraseña: 456');
console.log('- Usuario: mariana, Contraseña: 789');
console.log('========================\n');

// Iniciar el proceso de login
obtenerCredenciales();

