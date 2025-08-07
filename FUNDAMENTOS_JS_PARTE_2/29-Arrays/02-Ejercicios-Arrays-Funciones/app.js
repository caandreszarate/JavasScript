// Ejercicios basicos para practicar metodos .push() y .pop(), utilizandofunciones,cada ejercicio incluye el enunciado, la funcion con la solucion, la llamada a la funcion y la salida esperada en consola

// 1. Crea una función que reciba un arreglo y un número, y agregue ese número al final del arreglo usando push().

//1.1 Con array Function

const agregaNumero = (arr,num) =>{
    arr.push(num);
    return arr;
}
console.log(agregaNumero([1,2,3],4)) // [1,2,3,4]

//1.2 con Funcion basica

function nvoAgregaNum (arra,nume){
    arra.push(nume);
    return arra
}

console.log(nvoAgregaNum([5,6],7))

//2. Crea una función que elimine el último elemento de un arreglo utilizando pop()

//2.1 Funcion arrow

const eliminaElemento = arr => {
    arr.pop();
    return arr;
};
console.log(eliminaElemento([1,2,3,4]));

//2.2 Funcion Normal

function elimnElemento(arr){
    arr.pop();
    return arr
};
console.log(eliminaElemento([5,6,7,8,9]));

//3. Crea una función que reciba un valor y lo inserte en un arreglo vacío.
//3.1 Funcion Basica

function nvoValor (arg){
    let nvoArray = [];
    nvoArray.push(arg);
    return nvoArray;
}
console.log(nvoValor(7));

// 3.2 Arrow Function

const arrowNvoValor = argu =>{
    let nuevoArray = [];
    nuevoArray.push(argu);
    return nuevoArray;
}
console.log(arrowNvoValor(9));

//4. Crea una función que elimine el último valor de un arreglo y retorne ese valor eliminado.

//4.1 Funcion Basica
function eliminaUltimo (arr){
    return arr.pop();
};
console.log(eliminaUltimo([1,2,3,4]));

// 4.2 Arrow Function

const elimUltimo = arr => arr.pop();
console.log(elimUltimo([7,8,9]));


//5. Crea una función que reciba un arreglo y dos elementos, y los agregue ambos al final del arreglo.

//5.1 Funcion Basica

function agregaDosValores (arr, arg1, arg2){
    arr.push(arg1, arg2);
    return arr;
}
console.log(agregaDosValores([1,2],3,4));


//5.2 Arrow Function

const agregaValoresNvos = (arr, arg3, arg4) =>{
    arr.push(arg3, arg4);
    return arr;
}
console.log(agregaValoresNvos([4,5],6,7))

//6. Crea una función que agregue los números del 1 al 5 a un arreglo vacío usando un bucle y push().

//6.1 Funcion Basica

function agrVlrCiclo(){
    let nvoArryCiclo = [];
    for(let i =1; i <= 15 ; i++){
        nvoArryCiclo.push(i)
    };
    return nvoArryCiclo;
}
console.log(agrVlrCiclo());


//6.2 Arrow Function

const arrowCiclo = ()=>{
    let nvoArrwCiclo = [];
    for(let i =1; i <= 12; i++){
        nvoArrwCiclo.push(i)
    };
    return nvoArrwCiclo;
}
console.log(arrowCiclo());

// 7. Crea una función que intente usar pop() en un arreglo vacío y retorne el valor obtenido.

// 7.1 Funcion Basica

function eliminarDeVacio() {
    let vacio = [];
    return vacio.pop();
}
console.log(eliminarDeVacio());

// 7.2 Array Function

const arrayEliminarVacio = ()=>{
    let arrowEmpty = [];
    return arrowEmpty.pop()
};
console.log(arrayEliminarVacio());

// 8. Crea una función que reciba un arreglo de frutas y agregue una nueva fruta al final.

//8.1 Funcion Basica

function basicArrayFrutas(arrFrutas, nvaFruta){
    arrFrutas.push(nvaFruta);
    return arrFrutas;
};
console.log(basicArrayFrutas(['Pera','Mango'], 'Mora'))


// 8.2 Arrow Function

const arrowBasicFrutas = (arrFrutas,nvaFruta) => {
    arrFrutas.push(nvaFruta);
    return arrFrutas
};

console.log(arrowBasicFrutas(['Manzana', 'Pera'], 'Granadilla'));

// 9. Crea una función que elimine el último valor de un arreglo, lo imprima y luego devuelva el arreglo actualizado.

//9.1 Funcion Basica

function eliminaUltimo (arr){
    let eliminaElemento = arr.pop();
    console.log('Elemento Eliminado' , eliminaElemento);
    return arr;
};

console.log(eliminaUltimo([10,20,30]));

// 9.2 Arrow Function

const arrowEliminaUltimo = arr => {
    let arrowEliminaElemento = arr.pop();
    return arr;

};
console.log(arrowEliminaUltimo([1,2,3]));

//10. Crea una función que reciba un arreglo, agregue un número con push() y luego elimine el último con pop(), devolviendo el arreglo final.

//10.1 Funcion Basica
function agregarYQuitar (arr,numer){
    arr.push(numer);
    arr.pop();
    return arr;
}
console.log(agregarYQuitar([9,8,7], 6));

// 10.2 Arrow Function
const agregarYquitar = (arr, numer) => {
    arr.push(numer);
    arr.pop();
    return arr;
};

console.log(agregarYquitar([7,6,5],4))
