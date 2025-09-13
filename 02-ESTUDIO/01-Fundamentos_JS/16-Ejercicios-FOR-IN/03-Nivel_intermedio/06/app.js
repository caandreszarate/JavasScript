/*
Elimina del objeto las propiedades que tengan valor null.

*/

const datos = {
    dato1:`Miguel`,
    dato2:123,
    dato3: null,
    dato4:`juan`,
    dato5: null,
    dato6:456,
    dato7:`Camilo`,
    dato8:null
};
for(let valores in datos){
    if(datos[valores] === null){
        delete datos[valores]

    }
}
console.log(datos);

