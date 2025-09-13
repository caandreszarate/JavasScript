/*
Nivel Avanzado – Filtrar y transformar elementos de un arreglo
Objetivo: De un arreglo de números, quedarte con los pares y elevarlos al cuadrado.
*/
const numeros = [1, 2, 3, 4, 5, 6];
const paresCuadrados = [];

for (const numero of numeros) {
  if (numero % 2 === 0) {
    paresCuadrados.push(numero ** 2);
  }
}

console.log("Pares al cuadrado:", paresCuadrados);
