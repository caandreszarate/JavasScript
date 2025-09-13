/*
    Ejercicio 3: Contar propiedades de un objeto
*/

let vehiculo = {
    marca:`Renault`,
    modelo:`Logan`,
    anio: 2025,
    color:`Verde Militar`,
    propietario: `Juan Garcia`,
    placa:`FPO799`,
    kilometraje:123
}

let contador = 0;

for(let infoVehiculo in vehiculo){
    contador ++
}

console.log(`La cantidad de propiedades del objeto es: ${contador}`);

