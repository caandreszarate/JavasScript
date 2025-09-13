/*
Extrae todas las claves del objeto en un arreglo.
*/

const vehiculo = {
    marca:`Mercedes`,
    color:`Gris`,
    matricula:`FPO123`,
    propietario: `Juan Gomez`
};

const nvoArreglo = [];

for(let claves in vehiculo){
    nvoArreglo.push(claves);
}
console.log(nvoArreglo)