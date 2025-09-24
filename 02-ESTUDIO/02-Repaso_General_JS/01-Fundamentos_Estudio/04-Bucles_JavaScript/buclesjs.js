/*
📝 Ejercicio 1: For básico
Enunciado: Muestra los números del 1 al 5 usando un for.
Explicación: El ciclo for repite un bloque de código mientras se cumpla una condición.
*/

for(let i =1; i <= 5; i++){
    console.log(i);
};

/*
📝 Ejercicio 2: For con suma acumulada
Enunciado: Suma los números del 1 al 5 usando un for.
Explicación: Se puede usar una variable acumuladora.
*/

let suma =0;
for(let i =0; i <= 5; i++){
    suma += i;
};

console.log(`La suma es: ${suma}`);


/*
📝 Ejercicio 3: For recorriendo un array
Enunciado: Muestra los elementos de un array de frutas.
Explicación: Los arrays se recorren con for usando el índice.
*/

let arrayFrutas = ['Uvas', 'Naranjas', 'Moras','Peras','Mangos'];

for(let i = 0; i < arrayFrutas.length; i++){
  console.log(arrayFrutas[i])
};


/*
📝 Ejercicio 4: While básico
Enunciado: Muestra los números del 1 al 3 usando while.
Explicación: while ejecuta mientras la condición sea verdadera.
*/

let i =1;
while ( i <= 3){
  console.log(i);
  i++
}

/*
📝 Ejercicio 5: While con condición
Enunciado: Resta números de 10 en 10 hasta que el número sea menor o igual a 0.
Explicación: Se reduce el valor en cada iteración.
*/

let numero = 50;

while (numero > 0) {
  console.log(numero);
  numero -= 10;
}

/*
Enunciado: Muestra los números del 1 al 10 pero detente cuando llegues a 5.
Explicación: break interrumpe el ciclo.
*/


for(let i=0; i <= 10; i++){
  if(i === 5)break;
  console.log(i);
};

/*
📝 Ejercicio 8: Continue en un bucle
Enunciado: Muestra los números del 1 al 5, pero salta el 3.
Explicación: continue salta una iteración del ciclo.
*/

for(let i = 0; i <= 5; i++){
  if(i === 3)continue;
  console.log(i)
};

/*
📝 Ejercicio 9: For anidado
Enunciado: Muestra un cuadrado de * de 3x3.
Explicación: Se usan bucles anidados.
*/

for (let i = 1; i <= 3; i++) {
  let fila = "";
  for (let j = 1; j <= 3; j++) {
    fila += "* ";
  }
  console.log(fila);
}

/*
📝 Ejercicio 10: Recorrer array con for...of
Enunciado: Muestra los nombres de un array con for...of.
Explicación: for...of recorre directamente los valores de un array.
*/

let arrayNombres = ['Juan', 'Pedro', 'Marcos', 'Roberto'];

for (let nombre of arrayNombres){
  console.log(nombre)
}

//=======================================================
//  EJERCICIOS DE OPERADORES TERNARIOS
//=======================================================

/*
1. Verificar si un número es positivo o negativo
Enunciado: Crea un programa que determine si un número es positivo o negativo.
*/

let defineNumero = -5;
let resultadoNumero = defineNumero >= 0 ? `Numero Positivo` : `Numero Negativo`;
console.log(resultadoNumero);



/*
2. Determinar si alguien es mayor de edad
Enunciado: Verifica si una persona con cierta edad es mayor de edad.
*/

let esMayorEdad = 15;
let mensajeMayorEdad = esMayorEdad >= 18 ? `Es Mayor Edad` : `Eres Menor Edad`;
console.log(mensajeMayorEdad);

/*
3. Revisar si un número es par o impar
Enunciado: Dado un número, identifica si es par o impar.
*/

let numeroParoImpar = 3;
let tipoNumero = numeroParoImpar % 2 === 0 ? `NUMERO PAR` : `NUMERO IMPAR`;
console.log(tipoNumero);

/*
4. Calcular el precio con descuento
Enunciado: Si un cliente compra más de 5 productos, recibe un descuento.
*/

let cantidadProductos = 6;
let precioProducto = cantidadProductos > 5 ? `RECIBE DESCUENTO` : `NO RECIBE DESCUENTO`;
console.log(precioProducto);

/*
5. Mostrar saludo según la hora
Enunciado: Dependiendo de la hora (en formato 24h), saluda con “Buenos días” o “Buenas noches”.
*/

let hora = 17;

let saludoHora = hora >= 18 ? `Buenas Noches` : `Buenas Tardes`;
console.log(saludoHora);


/*
6. Validar contraseña
Enunciado: Verifica si una contraseña ingresada coincide con la correcta.
*/

let claveUser = `1234`;
let accesoUser = claveUser === `123` ? `Acceso Permitido` : `Acceso Denegado`;
console.log(accesoUser);

/*
7. Determinar si un año es bisiesto
Enunciado: Identifica si un año es bisiesto o no.
*/

let anio = 2024;
let esBisiesto = (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0) 
                 ? "Bisiesto" : "No bisiesto";
console.log(esBisiesto);

/*
8. Calcular nota aprobatoria
Enunciado: Si la nota es mayor o igual a 70, es aprobado; de lo contrario, reprobado.
*/

let notaEstudiante = 69;
let resutaldosEstudiante =  notaEstudiante >= 70 ? `Aprobo Curso` : `Curso Reprobado`;
console.log(resutaldosEstudiante);

/*
9. Identificar número mayor
Enunciado: Dado dos números, muestra cuál es el mayor.
*/

let numeroA = 4;
let numeroB = 2;

let comparaNumeros = numeroA > numeroB ? `El numero ${numeroA} es mayor que ${numeroB}` : `El numero ${numeroB} es Mayor que el Numero ${numeroA}`;
console.log(comparaNumeros);


/*
10. Clasificar temperatura
Enunciado: Si la temperatura es menor a 15, muestra “Frío”; si no, muestra “Calor”.
*/

let temperatura = 14;
let clima = temperatura < 15 ? `Hace Frio` : `Hace Calor`;
console.log(clima);

































