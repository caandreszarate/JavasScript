//1. Reduce no retorna un array

const comida = ['Papa','Arroz','Carne','Lentejas','Mazorca'];
const totals = [1,2,3,4];
let  suma = 0;
const rta = totals.reduce((suma, item) => suma + item, 0);
console.log(rta)

const arrayReduce = [1,3,2,3];
const rta1 =arrayReduce.reduce((obj,item) => {
    if(!obj[item]){
        obj[item] = 1;
    }else{
        obj[item] = obj[item] + 1
    }
    return obj;
},{})

console.log(rta1)






