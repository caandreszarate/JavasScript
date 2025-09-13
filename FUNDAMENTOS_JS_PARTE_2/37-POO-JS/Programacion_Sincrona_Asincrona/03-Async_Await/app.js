// Async Await

// function fetchData(){
//     fetch('https://rickandmortyapi.com/api/character')
//         .then((respuesta) => respuesta.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.log(error))
// }

// async function fetchData(){
//     try {
//         let response = await fetch("https://rickandmortyapi.com/api/character")
//         let data = await response.json();
//         console.log(data);
//     }catch(error){
//         console.log(error)
//     }
// }

const urls = [
    "https://rickandmortyapi.com/api/character",
  "https://rickandmortyapi.com/api/location",
  "https://rickandmortyapi.com/api/episode",
];

async function fetchNewData() {
    try{
        for await (let url of urls){
            let response = await fetch(url);
            let data = await response.json();
            console.log(data)
        };
    }catch(error){
        console.log(error)
    }
    
}

//===========================================
//  Ejercicios Async Await
//===========================================

// 1. Crea una función async que devuelva "Hola desde async" y muéstralo en consola.

async function saludo(){
    return 'Hola desde async'
}

saludo()
    .then((mensaje) => {
        console.log(mensaje)
    })

// 2. - Crea una función que espere 2 segundos y luego muestre "Listo después de 2 segundos".

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function ejecutar() {
    console.log("Esperando...");
    await esperar(2000);
    console.log("Listo después de 2 segundos");
  }
  
  ejecutar();
  
//3. Haz una función async que reciba dos números y devuelva la suma después de 1 segundo.

function sumaAsync (a,b){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        },5000)
    })
}

async function resultadoAsync(){
    let suma = await sumaAsync(8,6);
    console.log(`El rsultado de la suma es: ${suma}`)
}

resultadoAsync();

// 4. Crea una función async que simule un login exitoso después de 1.5 segundos.

function login(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Login Exitoso')
        ;},7000)
    })
}

async function ejecutaLogin(){
    console.log('Validando Login......');
    let mensaje = await login();
    console.log(mensaje)
}

ejecutaLogin();

// 5. Haz una función que simule una operación que a veces falla. Si el número es menor a 5, debe lanzar un error.

function validaNumero(num){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(num >= 5){
                resolve('Numero Valido')
            }else{
                reject('Numero muy bajo')
            }
        },5000)
    })
}


async function ejecutaNumero(){
    try{
        let resultado = await validaNumero(3);
        console.log(resultado)
    }catch(error){
        console.log(`Error ${error}`)
    }
}

ejecutaNumero();

// 6. Crea una función que primero espere 1 segundo para mostrar "Paso 1", luego otro segundo para mostrar "Paso 2".

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function pasos() {
    await esperar(1000);
    console.log("Paso 1");
    await esperar(1000);
    console.log("Paso 2");
  }
  
  pasos();

  //7. Haz una función async que multiplique dos números después de 2 segundos.

  function multiplicar(a,b){
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve(a * b)
        },5000)
    })
  }

  async function resultadoMulti(){
    let resultado = await multiplicar(5,5);
    console.log(resultado);
  }

  resultadoMulti();

  // 8. Simula que estás descargando datos de un servidor en 3 segundos

  function descarga(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Datos Descargados Exitosamente')
        },5000)
    })
  }

async function ejecutaDescarga(){
    console.log('Descargando Datos del Servidor......');
    let datos = await descarga();
    console.log(datos)
}

ejecutaDescarga();


//9. Haz una función async que determine si un número es par o impar después de 1 segundo.

function numeroPar(num){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            if(num % 2 === 0){
                resolve('Es Par')
            }else{
                reject('Es Impar')
            }
        },6000)
    })
}

async function ejecutarPar(){
    let resultado = await numeroPar(3);
    console.log(resultado)
}

ejecutarPar();

// 10.  Haz una función async que reciba un nombre y, después de 1 segundo, muestre "Hola <nombre>".

function nombreUser(arg){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Hola... ${arg}`)
        },6000)
    })
}

async function ejecutaNombre(){
    let nombre = await nombreUser('Juan')
    console.log(nombre)
}

ejecutaNombre();



