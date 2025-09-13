/*
Nivel Avanzado – Convertir un array de objetos a solo nombres
Objetivo: Extraer solo los nombres de un array de objetos.

*/

let usuarios = [
    {
        nombre: 'roberto',
        edad: 45,
        profesion: 'ingeniero',
        ciudad:'cali',
        estado: 'activo'
    },
    {
        nombre: 'roberto',
        edad: 67,
        profesion: 'medico',
        ciudad:'medellin',
        estado: 'inactivo'
    },
    {
        nombre: 'juan',
        edad: 33,
        profesion: 'arquitecto',
        ciudad:'cali',
        estado: 'activo'
    },
    {
        nombre: 'alejandro',
        edad: 33,
        profesion: 'psicologo',
        ciudad:'cartagena',
        estado: 'activo'
    },
    {
        nombre: 'luisa',
        edad: 26,
        profesion: 'contadora',
        ciudad:'barranquilla',
        estado: 'inactivo'
    },

]

let infoNecesaria = [];

for(let usuario of usuarios){
    if(usuario.estado == 'activo'){
        infoNecesaria.push(usuario.estado);
        console.log(`${infoNecesaria}`)
    }
}