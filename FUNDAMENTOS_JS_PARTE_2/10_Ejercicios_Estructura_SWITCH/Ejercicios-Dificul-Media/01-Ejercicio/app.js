/* 
🔷 1. Validación de login avanzado
*/

let usuario = prompt(`Digita un usuario de acceso: `);
let password = prompt(`Digita un password: `);
let intentos = 1;
let usuarioAcceso = usuario;
let passwordAcceso = password;

switch(true){
    case usuario == usuarioAcceso && password == passwordAcceso && intentos < 3:
        console.log(`Acceso Concedido`);
        break;

    case intentos > 3:
        console.log(`Cuenta Bloqueada por acceso de intentos`);
        break;

    default:
        console.log(`Datos Incorrectos`)
}


