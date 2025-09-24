let letters = ['a','b','c'];
for(let index = 0; index < letters.length; index ++){
    const elemento = letters[index];
    console.log('desde for', elemento);
};

letters.forEach(item => console.log('Desde forEach', item))\


//========================================
//  Ejercicios de practica para FOREACH
//  Nivel Basico del 1 al 7
//========================================

/*
1. Imprimir cada número de un arreglo
Enunciado: Recorre un arreglo de números y muestra cada uno en consola.
Procedimiento: Usamos forEach para recorrer cada número y lo imprimimos.
*/

let arrayNumeros = [1,2,3];
arrayNumeros.forEach(numero => console.log(numero));

/*
2. Mostrar palabras en mayúscula
Enunciado: Dado un arreglo de palabras, imprímelas en mayúscula.
Procedimiento: Usamos toUpperCase() dentro del forEach.
*/

let arrayPalabras = ['juan', 'pedro','ramiro'];
arrayPalabras.forEach(palabra => console.log(palabra.toUpperCase()));

/*
3. Mostrar índices y valores
Enunciado: Recorre un arreglo y muestra el índice y el valor.
Procedimiento: El forEach recibe un segundo parámetro: índice.
*/

let arrayValorIndice = ['Mora', 'Pera', 'Uva'];
arrayValorIndice.forEach((fruta,index) => console.log(index,fruta));


/*
4. Sumar todos los números
Enunciado: Calcula la suma de los números de un arreglo.
Procedimiento: Declaramos una variable acumuladora y la actualizamos en el forEach.
*/


let arraySuma = [2,3,4,5];
let suma = 0;
arraySuma.forEach(numero => suma += numero);
console.log(suma);

/*
5. Contar elementos
Enunciado: Muestra cuántos elementos tiene un arreglo usando forEach.
Procedimiento: Usamos un contador que se incrementa en cada iteración.
*/

let elementosArray = [1,2,3,4,5];
let contador = 0;

elementosArray.forEach(() => contador++);
console.log(contador)


/*
6. Multiplicar cada número por 2
Enunciado: Multiplica por 2 todos los números y muéstralos en consola.
Procedimiento: Recorremos y mostramos el doble de cada número.
*/

let arrayMultiplica = [1,2,3,4,5,6];
arrayMultiplica.forEach(numero => console.log((numero * 2)));

/*
7. Mostrar longitud de cada palabra
Enunciado: Muestra la cantidad de letras de cada palabra en un arreglo.
Procedimiento: Usamos length dentro del forEach.
*/

let arrayLongitud = ['Hola','rut','santiago','martinez'];
arrayLongitud.forEach(letras => console.log(letras.length));


//==========================================
// NIVEL INTERMEDIO FOREACH 8-14
//==========================================


/*
8. Mostrar solo números pares
Enunciado: Recorre un arreglo y muestra solo los pares.
Procedimiento: Usamos un if dentro del forEach.
*/

let arrayDeNumeros = [1,2,3,4,5,6,7,8,9,10];
arrayDeNumeros.forEach(pares => {
    if(pares % 2 === 0){
        console.log(`Los numeros pares del array son: ${pares}`)
    }
});

/*
9. Concatenar todas las palabras
Enunciado: Une todas las palabras en una sola cadena.
Procedimiento: Usamos un acumulador en el forEach.
*/

let arrayConcatenar = ['Hola', 'Soy', 'Yeremaya', 'DENG'];
let frase = " ";
arrayConcatenar.forEach(palabra => frase += palabra + " ");
console.log(frase.trim());

/*
10. Convertir números a texto
Enunciado: Muestra los números de un arreglo con la palabra "número".
Procedimiento: Concatenamos texto dentro del forEach.
*/

let arrayNumero = [1,2,3,4,5];
arrayNumero.forEach(numero => console.log(`Numero: ${numero}`));


/*
11. Crear un nuevo arreglo (simulación de map)
Enunciado: Genera un nuevo arreglo con los números al cuadrado.
Procedimiento: Empujamos en un arreglo vacío dentro del forEach.
*/

let base = [1,2,3,4,5,6,7,8,9];
let cuadrado = [];
base.forEach(numero => cuadrado.push(numero * numero));
console.log(cuadrado);

/*
12. Filtrar números mayores a 10
Enunciado: Obtén un arreglo con los números mayores a 10.
Procedimiento: Usamos if y push dentro del forEach.
*/

let arrayNumMayor = [1,2,10,11,13,23,8,32];
let mayor = [];
arrayNumMayor.forEach(n => {
    if(n > 10)mayor.push(n)
});
console.log(mayor);


/*
13. Contar cuántas veces aparece una letra
Enunciado: Cuenta cuántas veces aparece la letra "a".
Procedimiento: Usamos un contador dentro del forEach.
*/

let arrayLetras = ['a','b','c','a','b','d','a'];
let contadorLetras = 0;

arrayLetras.forEach(l => {
    if(l === 'a')contadorLetras++
});
console.log(contadorLetras);

/*
14. Crear un objeto con las longitudes de palabras
Enunciado: Genera un objeto que guarde palabra → longitud.
Procedimiento: Creamos un objeto y lo llenamos dentro del forEach.
*/

let arrayPais = ['Colombia', 'Mexico', 'Peru', 'Brasil','Canada'];
let longitudPais = {};
arrayPais.forEach(pais => longitudPais[pais] = pais.length);
console.log(longitudPais);


//=================================================
// NIVEL AVANZADO DEL 15 AL 20
//=================================================


/*
15. Sumar propiedades de objetos
Enunciado: Suma los precios de una lista de productos.
Procedimiento: Usamos forEach para acumular la propiedad precio.
*/


let arrayProductos = [
    {nombre: 'Televisor', precio: 120},
    {nombre: 'Celular', precio: 230},
    {nombre: 'Computador', precio:430},
    {nombre: 'Nevera', precio: 350}
];
let contadorProductos = 0;

arrayProductos.forEach(producto => contadorProductos += producto.precio);
console.log(contadorProductos);

















































