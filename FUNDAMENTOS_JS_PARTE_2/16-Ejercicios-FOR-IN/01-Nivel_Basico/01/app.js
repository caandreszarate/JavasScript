/*
Ejercicio 1: Imprimir claves de un objeto
*/

let vehiculo = {
    marca: 'Mercedes',
    modelo: 2025,
    color:'Gris',
    propietario: 'Guillermo Perez',
    kilometraje: 34.000
}

for(let infoVehiculo in vehiculo){
    console.log(infoVehiculo)
}