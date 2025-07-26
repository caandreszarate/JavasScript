/*
Convertir valores a mayúsculas si son string
*/


let nvoObjeto = {
    marca:`mercedes`,
    modelo:2025,
    propietario: `Husein`,
    matricula: 123,
    color:`Gris`
}

for(let valor in nvoObjeto){
    if(typeof nvoObjeto[valor] === `string`){
        nvoObjeto[valor] = nvoObjeto[valor].toUpperCase();

    }
}
console.log(nvoObjeto);