/* 
🧠 Ejercicio 1: Días de la semana
Pide al usuario un número del 1 al 7 y muestra el día de la semana correspondiente.

*/

let diaSemana = parseInt(prompt(`Escribe un numero: `));


switch(diaSemana){
    case 1:
        console.log(`Digitaste ${diaSemana} y ese corresponde al dia LUNES`)
        break;
    case 2:
        console.log(`Digitaste ${diaSemana} y ese corresponde al dia MARTES`)
        break;
    case 3:
        console.log(`Digitaste ${diaSemana} y ese corresponde al dia MIERCOLES`)
        break;
    case 4:
        console.log(`Digitaste ${diaSemana} y ese corresponde al dia JUEVES`)
        break;
    case 5:
        console.log(`Digitaste ${diaSemana} y ese corresponde al dia VIERNES`)
        break;
    case 6:
        console.log(`Digitaste ${diaSemana} y ese corresponde al dia SABADO`)
        break;
    case 7:
        console.log(`Digitaste ${diaSemana} y ese corresponde al dia DOMINGO`)
        break;
    default:{
        console.log(`Digita un numero de dia Valido !GRACIAS!`)
    }
    
}