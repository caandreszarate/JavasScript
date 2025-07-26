/*

Operadores Logicos

1. AND => &&
2. OR => ||
3. NOT => !



*/

const a = 10;
const b =20;
const c = '10';

a == b && a === c; // FALSE
a != b || a === c; // TRUE
!( a === c) // True

// ========================================
// 8. OPERADORES LÓGICOS BÁSICOS
// ========================================
console.log("8. OPERADORES LÓGICOS BÁSICOS:");
console.log("------------------------------");

// Operador AND (&&): ambas condiciones deben ser verdaderas
let esMayorDeEdad = true;
let tieneIdentificacion = false;

if (esMayorDeEdad && tieneIdentificacion) {
    console.log("Puede entrar al evento (AND: ambas condiciones verdaderas)");
} else {
    console.log("No puede entrar al evento porque alguna condición no se cumple (AND)");
}
// Explicación: Solo entra si es mayor de edad Y tiene identificación.

// Operador OR (||): al menos una condición debe ser verdadera
let tieneInvitacion = false;
let esVIP = true;

if (tieneInvitacion || esVIP) {
    console.log("Puede entrar al área VIP (OR: al menos una condición verdadera)");
} else {
    console.log("No puede entrar al área VIP (OR)");
}
// Explicación: Puede entrar si tiene invitación O si es VIP.

// Operador NOT (!): invierte el valor lógico
let estaLloviendo = false;

if (!estaLloviendo) {
    console.log("Puedes salir sin paraguas (NOT: no está lloviendo)");
} else {
    console.log("Lleva un paraguas, está lloviendo (NOT)");
}
// Explicación: El operador ! invierte el valor de la variable.

// Ejemplo combinado
let tieneDinero = true;
let hayTransporte = false;

if ((tieneDinero && hayTransporte) || esVIP) {
    console.log("Puedes ir a la fiesta (combinando AND y OR)");
} else {
    console.log("No puedes ir a la fiesta");
}
// Explicación: Puede ir si tiene dinero Y hay transporte, o si es VIP.

console.log("\n=== FIN DE EJEMPLOS DE OPERADORES LÓGICOS ==="); 


