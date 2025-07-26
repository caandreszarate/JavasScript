/*

    Mostrar un menú hasta que el usuario escriba "salir"
 */

    let opcion;

    do{
        opcion = prompt(`Elige una opcion: (ejemplo: ver, guardar, salir)`).toLowerCase();
        console.log(`Elegiste ${opcion}`)
    }while(opcion !== `salir`);
    console.log(`Programa Finalizado`);

