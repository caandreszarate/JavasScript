/* EJERCICIOS PROMESAS */

// 1.- Crea una promesa que se resuelva con el mensaje "Operación exitosa" después de 2 segundos.

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Operacion realizada con total exito')
    },5000)
})

promise1.then ((mensaje) => {
    console.log(mensaje)
})

//2. - Crea una promesa que falle con el mensaje "Error en la operación".

const promesa2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        reject('Operacion Fallida')
    },5000)
})

promesa2.catch((error) => {
    console.log(error);
});

// 3.- Crea una promesa que se resuelva si numero es mayor a 10, o se rechace si es menor o igual.

let numero = 15;

const promesa3 = new Promise((resolve, reject) => {
    if(numero > 10){
        resolve('Numero Valido')
    }else{
        reject('Numero Invalido')
    }
})

    promesa3.then((mensaje) => {
        console.log(mensaje)
    });
    promesa3.catch((error) => console.log(error));


//4. - Crea una promesa que siempre muestre un mensaje final, independientemente de si se resuelve o rechaza.

const promesa4 = new Promise((resolve, reject) => {
    let exito = true;
    if(exito){
        resolve('Todo salio Bien')
    }else{
        reject('Ocurrio un Error')
    }
});

promesa4.then((mensaje) => console.log(mensaje));
promesa4.catch((error) => console.log(error));
promesa4.finally(() => console.log('Proceso terminado'))

// 5. - Crea una promesa que sume dos números y luego, en otro .then, multiplique el resultado.

const promesa5 = new Promise((resolve) => {
    let suma = 5 + 3;
    resolve(suma);
});

promesa5
    .then((resultado) => {
        console.log(`La Suma es: ${resultado}`);
        return resultado * 2;
    })

    .then((multiplicacion) => {
        console.log(`El Doble es: ${multiplicacion}`)
    })


// 6. - Crea una promesa que se resuelva después de 3 segundos mostrando "Tiempo cumplido".

    const promesa6 = new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Tiempo Cumplido`)
        },2000)
    })

    promesa6
        .then((mensaje) => console.log(mensaje))
    

// 7.- Crea tres promesas que se resuelvan y usa Promise.all para esperar todas.

        const p1 = Promise.resolve(`Primera Promesa`);
        const p2 = Promise.resolve(`Segunda Promesa`);
        const p3 = Promise.resolve(`Tercer Promesa`);

        Promise.all([p1,p2,p3])
            .then((resultado) => console.log(resultado))

//8.- Crea dos promesas con diferente tiempo y usa Promise.race para ver cuál se resuelve primero.

const rapida = new Promise((resolve) => {
    setTimeout(() => {
        resolve(`Promesa Rapida`)
    },1000)
})

const lenta = new Promise((resolve) => {
    setTimeout(() => {
        resolve(`Promesa Lenta`)
    },3000)
})

Promise.race([rapida,lenta])
    .then((resultado) => console.log(resultado))


// 9.- Crea una función que devuelva una promesa basada en setTimeout.

function esperar (ms){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Espere ${ms} milisegundos`)
        })
    })
}

esperar(2000).then((mensaje) => console.log(mensaje))

// 10- Crea una promesa que falle y maneja el error, pero continúa ejecutando el siguiente .then.

