/*
Crear nuevo objeto con claves en mayúsculas
*/

let vehiculo ={
    marca:`Mercedes Benz`,
    modelo: 2025,
    matricula: `FPO765`,
    color:`Gris`,
    propietario: `Daniel Gomez`
}

let nvoObjeto ={};

for(let claves in vehiculo){
    nvoObjeto[claves.toUpperCase()] = vehiculo[claves]
}

console.log(nvoObjeto)