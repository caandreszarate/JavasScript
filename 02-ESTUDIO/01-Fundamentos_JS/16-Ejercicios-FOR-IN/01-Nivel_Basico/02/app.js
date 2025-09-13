/*
    Ejercicio 2: Mostrar claves y valores de un objeto
*/


const vehiculo = {
    marca: `Mercedes Benz`,
    modelo: 2025,
    matricula: `FB6789`,
    propietatio: `Daniel Gomez`,
    color: `Gris`,
    kilometraje: `0 KM`,
    valor: 123.000
}

for(let infoVehiculo in vehiculo){
    console.log(`${infoVehiculo} : ${vehiculo[infoVehiculo]}`)
}