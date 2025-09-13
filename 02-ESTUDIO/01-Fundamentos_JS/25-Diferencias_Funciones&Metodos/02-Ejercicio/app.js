// ===== EJERCICIO 2: VALIDADOR DE CONTRASEÑA =====
console.log("EJERCICIO 2: VALIDADOR DE CONTRASEÑA");
console.log("Crea una función llamada 'validarContraseña' que reciba una contraseña y verifique que tenga al menos 8 caracteres, una letra mayúscula, una minúscula y un número.");

// Tu código aquí:
function validarContraseña(contraseña) {
    if (contraseña.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (!/[A-Z]/.test(contraseña)) {
        return 'La contraseña debe tener al menos una letra mayúscula';
    }
    
    if (!/[a-z]/.test(contraseña)) {
        return 'La contraseña debe tener al menos una letra minúscula';
    }
    
    if (!/\d/.test(contraseña)) {
        return 'La contraseña debe tener al menos un número';
    }
    
    return 'Contraseña válida';
}