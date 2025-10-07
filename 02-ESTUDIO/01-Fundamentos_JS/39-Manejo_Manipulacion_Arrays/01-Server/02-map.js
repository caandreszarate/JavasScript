const leatters = ['A', 'B', 'C'];
// const arrayNew = [];
// for(let index = 0; index < leatters.length; index++){
//     const element = leatters[index];
//     arrayNew.push(element + "++")
// }
const arrayNew = leatters.map(item => item + '--')
console.log(`Array Original ${leatters}`);
console.log(`Array Nuevo ${arrayNew}`);

//========================================
//      CLASE PLATZI
//========================================


// 1. 

function multiplyElements(array){
    const arrayNew = array.map(numero => numero * 2);
    return arrayNew;
}

console.log(multiplyElements([1,2,3]))


//2. Map Reloaded

