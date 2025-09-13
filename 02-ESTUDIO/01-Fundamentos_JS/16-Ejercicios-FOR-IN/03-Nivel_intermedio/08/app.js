/*

Crea una copia exacta de un objeto.
 */

const vehiculo = {
    marca:`Mercedes Benz`,
    modelo: 2025,
    color:`Gris`,
    propietario:`Martin Elias`,
    matricula: `FPO123`
};

let copiaVehiculo = {};

for(let valor in vehiculo){
    copiaVehiculo [valor] = vehiculo[valor];
}

console.log(copiaVehiculo);

