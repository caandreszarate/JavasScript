/*

🧠 Ejercicio 8: Clasificación de edad
Según una edad, clasifícalo en grupo.

*/

let clasificaEdad = parseInt(prompt(`Digita tu edad: `));

switch(true){
    case clasificaEdad > 0 && clasificaEdad <= 12:
        console.log(`Segun tu edad de ${clasificaEdad} años tu eres un Niño `);
        break;
    
    case clasificaEdad >= 13 && clasificaEdad <= 17:
        console.log(`Segun tu edad de ${clasificaEdad} años tu eres un Adolecente`);
        break;

    case clasificaEdad >= 18 && clasificaEdad <=59:
        console.log(`Segun tu edad de ${clasificaEdad} años tu eres un Adulto`);
        break;

    case clasificaEdad >= 60:
        console.log(`Segun tu edad de ${clasificaEdad} años tu eres un adulto Mayor`):
        break;

    default:
        console.log(`Digita una edad ${clasificaEdad} Valida`)
}