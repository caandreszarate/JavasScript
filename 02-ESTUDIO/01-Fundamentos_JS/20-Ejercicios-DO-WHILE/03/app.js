/*
    Pedir contraseña hasta que sea correcta
*/

let password;
let contador =0;

do{
    password = prompt(`Digite contraseña (clave 123)`);
    contador ++;
}while( password !== `123`);
console.log(`Contraseña correcta despues de ${contador} intentos`)