/*
Ejercicios Metodo Push y Pop
*/

// 1. Crea una función que reciba un arreglo y un número. Agrega el número solo si es mayor que 10.

function numeroMayor(arr, num){
    if(num > 5){
        arr.push(num)
    }
    return arr
}

console.log(numeroMayor([1,2,3,4],7))

const arrowNumeroMayor = (arr, num) => {
    if(num > 5){
        arr.push(num)
    }
    return arr;
}

console.log(arrowNumeroMayor([1,2],3))

// 2. Eliminar el último elemento si es menor que 5

function eliminaUltimoNumero (arr){
    if(arr[arr.length -1] < 5){
        arr.pop();
    }

    return arr;
}
console.log(eliminaUltimoNumero([1,2,3]))

const arrowEliminaUltimoNumero = arr => {
    if(arr[arr.length -1] < 5){
        arr.pop();
    }
    return arr;
}

console.log(arrowEliminaUltimoNumero([7,8,3]))

// 3. Agregar un elemento solo si el arreglo tiene menos de 5 elementos

function agregaElemento (arg, num){
    if(arg.length < 5){
        arg.push(num);
    }
    return arg;
}
console.log(agregaElemento([1,2,3,4,5],6))

// 4.Agregar un valor si es par y mayor que 20
function agregaValor(arr, num){
    if(num % 2 === 0 && num > 20){
        arr.push(num);
    }
    return arr
}
console.log(agregaValor([1,4,5,6,7],21))

// 5️⃣ Eliminar el último elemento si es igual a "X" o "Z"

function eliminaUltimoCaracter (arr){
    let ultimo = arr[arr.length-1];
    if(ultimo === 'Z' || ultimo === 'X'){
        arr.pop();
    }
    return arr;
}

console.log(eliminaUltimoCaracter(['a','b','X']));


// 6️⃣ Agregar un valor si el arreglo está vacío

function agregaValorVacio (arr,num){
    if(arr.length === 0){
        arr.push(num);
    }
    return arr;
}
console.log(agregaValorVacio([],32))

// 7️⃣ Eliminar el último elemento si no es un número

function eliminaSiNoNumero(arr){
    if(typeof arr[arr.length -1] !== 'number'){
        arr.pop();
    }
    return arr;
}

console.log(eliminaSiNoNumero([1,2,3,4,'q']));

// 8️⃣ Agregar valor si es múltiplo de 3 y no es negativo
function agregaValorMultipoTres(arr,num){
    if(num % 3 === 0 && num >= 0){
        arr.push(num)
    }
    return arr;
}

console.log(agregaValorMultipoTres([2,4,6,8],12))


// 9️⃣ Eliminar último elemento si es null o undefined

function eliminaUltimoNullUndefined(arr){
    let ultimo = arr[arr.length -1];
    if(ultimo === null || ultimo === undefined){
        arr.pop();
    }
    return arr;
}
console.log(eliminaUltimoNullUndefined([1,2,3, undefined]))

// 🔟 Agregar valor si no existe ya en el arreglo

function siNoEstaPresente (arr,valor){
    if(!arr.includes(valor)){
        arr.push(valor);

    }
    return arr;
}

console.log(siNoEstaPresente([1,2,3,4],5))