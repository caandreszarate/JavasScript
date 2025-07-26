/*
Calcular el factorial de un número dado (por ejemplo, 6)
*/


let numero = parseInt(prompt(`Digita cualquier numero para hallar el factorial: `));
let factorial = 1;
for (let i = 1; i <= numero; i++) {
  factorial *= i;
}
console.log(`El factorial de ${numero} es ${factorial}`);
