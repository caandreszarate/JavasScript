// Ejercicios Platzi

function Persona (nombre,apellido,edad){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
}

// Función para crear múltiples personas al mismo tiempo
function crearVariasPersonas(datosPersonas) {
    const personas = [];
    
    for (let i = 0; i < datosPersonas.length; i++) {
        const datos = datosPersonas[i];
        const nuevaPersona = new Persona(datos.nombre, datos.apellido, datos.edad);
        personas.push(nuevaPersona);
    }
    
    return personas;
}

// Función alternativa usando map (más moderna y funcional)
function crearPersonasConMap(datosPersonas) {
    return datosPersonas.map(datos => new Persona(datos.nombre, datos.apellido, datos.edad));
}

// Ejemplos de uso:

// Método 1: Crear personas una por una (como tenías antes)
const persona_1 = new Persona('Juan', 'Gomez', 30);
console.log('Persona individual:', persona_1);

// Método 2: Crear varias personas usando array de datos
const datosPersonas = [
    { nombre: 'María', apellido: 'García', edad: 25 },
    { nombre: 'Carlos', apellido: 'López', edad: 35 },
    { nombre: 'Ana', apellido: 'Martínez', edad: 28 },
    { nombre: 'Pedro', apellido: 'Rodríguez', edad: 42 },
    { nombre: 'Laura', apellido: 'Fernández', edad: 31 }
];

// Usando la función con for loop
const grupoPersonas1 = crearVariasPersonas(datosPersonas);
console.log('Grupo de personas (con for):', grupoPersonas1);

// Usando la función con map
const grupoPersonas2 = crearPersonasConMap(datosPersonas);
console.log('Grupo de personas (con map):', grupoPersonas2);

// Método 3: Crear personas con datos específicos
const equipoTrabajo = crearVariasPersonas([
    { nombre: 'Roberto', apellido: 'Silva', edad: 29 },
    { nombre: 'Carmen', apellido: 'Torres', edad: 33 },
    { nombre: 'Diego', apellido: 'Morales', edad: 27 }
]);

console.log('Equipo de trabajo:', equipoTrabajo);

// Acceder a una persona específica del grupo
console.log('Primera persona del equipo:', equipoTrabajo[0]);
console.log('Nombre completo:', equipoTrabajo[0].nombre + ' ' + equipoTrabajo[0].apellido);


//======================================
//   Clase Platzi
//=====================================

function Persona(nombre, apellido, edad){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
}

const personaOtra = new Persona('Juan', 'Perez', 30);
console.log(personaOtra); 

Persona.prototype.telefono = '555-555-5555';







