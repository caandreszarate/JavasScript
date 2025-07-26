/*
Muestra todas las claves y sus valores en formato clave: valor.
*/

let vehiculo = {
    marca: `Mercedes`,
    color:`Gris`,
    modelo: 2025,
    propietario: `Camilo Gomez`,
    matricula:`FPO321`
};

for(let clave in vehiculo){
    console.log(`${clave} : ${vehiculo[clave]}`);
}