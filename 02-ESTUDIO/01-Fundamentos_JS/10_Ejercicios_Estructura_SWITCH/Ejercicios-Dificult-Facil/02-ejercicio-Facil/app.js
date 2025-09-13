/*
🧠 Ejercicio 2: Calificaciones
Convierte una letra (A, B, C, D, F) en su descripción textual.

*/

let calificacion = prompt(`Ingresa una Calificacion A,B,C, D, F: `)

switch(calificacion.toUpperCase()){
    case `A`:
        console.log(`EXCELENTE`);
        break;
    case `B`:
        console.log(`BUENO`);
        break;
    case `C`:
        console.log(`REGULAR`);
        break;
    case `D`:
        console.log(`DEFICIENTE`);
        break;
    case `F`:
        console.log(`REPROBADO`);
        break;
    default:
        console.log(`Ingresa una ${calificacion} Valida`)

}