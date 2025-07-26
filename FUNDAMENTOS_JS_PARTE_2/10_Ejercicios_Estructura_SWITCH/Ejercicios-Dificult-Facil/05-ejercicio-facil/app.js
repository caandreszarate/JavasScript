/*

🧠 Ejercicio 5: Tipo de animal
Dado un animal, indica si es mamífero, ave o reptil.

*/

let tipoAnimal = prompt(`Escribe cualquier tipo de Animal`);

switch(tipoAnimal.toLowerCase()){
    case `perro`:
    case `gato`:
    case `caballo`:
    case `vaca`:
    case `oso`:
        console.log(`MAMIFERO`)
        break;
    
    case `gorrion`:
    case `paloma`:
    case `colibri`:
    case `aguila`:
        console.log(`Este tipo de animal ${tipoAnimal} es AVE`);
        break;
    
    case `culebra`:
    case `tortuga`:
    case `lagarto`:
    case `cocodrilo`:
        console.log(`Este tipo de animal ${tipoAnimal} es REPTIL`);
        break;

    default:{
        console.log(`Elige un tipo de animal`)
    }
}