const leatters = ['A', 'B', 'C'];
// const arrayNew = [];
// for(let index = 0; index < leatters.length; index++){
//     const element = leatters[index];
//     arrayNew.push(element + "++")
// }
const arrayNew = leatters.map(item => item + '--')
console.log(`Array Original ${leatters}`);
console.log(`Array Nuevo ${arrayNew}`);

