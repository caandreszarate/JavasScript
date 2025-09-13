/*
javascript Engine

Memory Heap => se guarda = Variables, Funciones , Objetos de forma ramdon
Call stack => pila donde se van a llamar cada una de las funciones, llamarea la primer funcion y luego ejecuta la segunda funcion
a esto se llama programacion sincrona, que se ejecuta una tarea a la vez

stack overFlow => cuando supera las tareas exceden el numero o memoria para poder ejecutar las tareas, el navegador crachea, 

programacion asincrona: se puede hacer que js trabaje de forma asincrona
web Api: lo que hace que js se comprote de forma asincrona
queue = sala de espera

*/

//Promesas en javascript asincronia y manejo de estados

/*
Las promesas son lo que nos ayudan a que nuestra programa trabaje de manera sincrona a asincrono, es lo que vamos hacer para que una funcion trabaje de forma separada y luego se incluya en el flujo del programa.

estados: Pending => cuando la promesa se va a crear
promise()

fullfilled => cuando la promesa se resuelve
reject => cuando la promesa no se resolvio

manejan dos tipos callbacks

1. resolve => se resuelve de forma satisfactoria
2. reject => cuando la promesa no se resulve

then() => se ejecuta cuando la promesa se resuelve entonces entra a ejecutarse el then
catch => lo que sucede cuando la promesa no se resuleve y es donde optenemos el error para poder imprimirlo



*/

const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
        let operationSuccessful = true;
        if(operationSuccessful){
            resolve('La Operacion fue exitosa')
        }else{
            reject('Fallo la Operacion')
        }
    }, 2000)
});

promise
.then((succesMessage) => {
    console.log(succesMessage);
})
.catch((errorMesssage ) => {
    console.log(errorMesssage)
});




