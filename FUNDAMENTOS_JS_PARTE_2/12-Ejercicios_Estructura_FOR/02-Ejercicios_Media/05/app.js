/*
Generar los primeros 10 números de la serie Fibonacci
*/

let a = 0, b = 1;
for (let i = 0; i < 10; i++) {
  console.log(a);
  let temp = a + b;
  a = b;
  b = temp;
}
