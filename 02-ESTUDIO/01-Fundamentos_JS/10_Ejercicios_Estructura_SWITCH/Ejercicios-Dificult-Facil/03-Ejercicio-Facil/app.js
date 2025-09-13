/*

🧠 Ejercicio 3: Semáforo
Imprime una acción dependiendo del color del semáforo.

*/

let colorSemaforo = 'wwerer';

switch(colorSemaforo.toLowerCase()){
    case 'rojo':
        console.log('Detente')
        break;

    case 'amarillo':
        console.log('Precaucion');
        break;

    case 'verde':
        console.log('Avanza');
        break;
    
    default:{
        console.log('Color no valido')
    }
}