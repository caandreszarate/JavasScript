/*
Enunciado del tema:

El metodo Map(), crea un nuevo array con los resultados de aplicar una funcion a cada elemento del array original

EXPLICACION:

- map() recorre cada elemento del array
- aplicac una funcion de transformacion a cada elemento
- retorna un nuevo array con los elementos transformados
- NO modifica el array original
- siempre retorna un array de la misma logitud

Sinstaxis: array.map((elemento,indice, arrayCompleto) => {return nuevoValor});
*/
console.log('=======================MAP - EJERCICIOS===================\n');
//-- Ejercicios BASICO 1: Duplicar numeros ----
console.log('------ Ejercicio Basico 1: Duplicar Numeros------');
console.log('Enunciado: Dado un array de numeros duplica cada valor');
const numeros = [1,2,3,4,5];
console.log(`Array Original: ${numeros}`);
const duplicados = numeros.map(num => num *2);
console.log(`Procedimiento: numeros.map(num => num *2)`);
console.log(`Explicacion: Multiplicamos cada numero por 2`);
console.log(`El resultado es: ${duplicados}`);
console.log('\n')


//-- Ejercicio BASICO 2: Convertir a Mayusculas --
console.log(`----- Ejercicio Basico # 2 Convertir a Mayusculas -----`);
console.log(`Enunciado: Convierte un array de nombres a Mayusculas`);
const nombres = ['juan', 'pedro', 'camilo', 'roberto'];
console.log(`Array Original es: ${nombres}`);
const nombresMayuscula = nombres.map( nombre => nombre.toUpperCase());
console.log(`Procedimiento: Se creao una constante nombreMayusucula que se igualo con nombres.map(nombre=> nombre.toUpperCase(()))`);
console.log(`Aplicamos toUpperCase() a cada string`);
console.log(`Resultado: ${nombresMayuscula}`);
console.log(`\n`);


//--- Ejercicio INTERMEDIO 1: Extraer Propiedades de los objetos---
console.log(`-----Ejercicio Intermedio 1 - Extraer propiedades de los objetos-----`)
console.log(`Enunciado: Extrae solo los nombres de un array de usuarios`);

const arrayUsuarios = [
    {id:1, nombre: 'Juan', edad: 34},
    {id:2, nombre: 'Pedro', edad: 45},
    {id:3, nombre: 'Camilo', edad:32}
];
console.log("Array Original", arrayUsuarios);
const soloNombres = arrayUsuarios.map(usuario => usuario.nombre);
console.log(`Procedimiento: arrayUSuaurios.map(usuario => usuario.nombre)`);
console.log(`Explicacion: Accedemos a la propidesad 'nombre' de cada objeto`);
console.log(`Respuesta: ${soloNombres}`);
console.log(`\n`);

//---Ejercicio Intermedio 2: Transformar Objetos ---
const usuarios = [
    { id: 1, nombre: "Carlos", edad: 25 },
    { id: 2, nombre: "Laura", edad: 30 },
    { id: 3, nombre: "Miguel", edad: 22 }
  ];
console.log(`--- Ejerecicio Intermedio 2: Transformar Objetos ---`);
console.log(`Enunciado: Agrega una propiedad "mayorDeEdad" a cada usuario`);
const usuariosConEstado = usuarios.map(usuario => ({
    ...usuario,
    mayorDeEdad: usuario.edad >= 18
}));
console.log(`Procedimiento: usuarios.map(usuario => ({...usuario, mayorDeEdad: usuario.edad >= 18}))`);
console.log(`Explicacion: Creamos un nuevo objeto con spread operator y agregamos la nueva propiedad`);
console.log("Resultado", usuariosConEstado)
console.log("\n");

//--- Ejercicio Avanzado 1 Map Anidado con objetos complejos
console.log(`---Ejercicio avanzado 1: Map Anidado con Objetos Avanzados`);
console.log(`Enunciado: Calcula el total de ventas por vendedor y formatea los datos`);
const vendedores =[
    {nombre:'ana', ventas:[100,200,300]},
    {nombre: 'Luis', ventas:[300,250,400]},
    {nombre:'Sofia', ventas:[180,220,190]}
];
console.log("Array Original: ", vendedores);

const reporteVentas = vendedores.map(vendedor => ({
    vendedor:vendedor.nombre,
    totalVentas: vendedor.ventas.reduce((sum,venta)=> sum + venta,0),
    promedioVentas: vendedor.ventas.reduce((sum,venta) => sum + venta , 0) / vendedor.ventas.length,
    numeroTranscciones:vendedor.ventas.length
}))

console.log(`Procedimientos: combinamos map con reduce para calcular totales y promedios`);
console.log(`Explicacion: Transformamos cada vendedor en un objeto de reporte con estadisticas calculadas`);
console.log("Resultados: ", reporteVentas);
console.log("\n");

// ==========================================
// 2. FILTER - Filtrar elementos
// ==========================================

/* 
ENUNCIADO DEL TEMA:
El método filter() crea un nuevo array con todos los elementos que cumplan 
una condición determinada.

EXPLICACIÓN:
- filter() recorre cada elemento del array
- Evalúa una condición para cada elemento
- Si la condición es true, incluye el elemento en el nuevo array
- Si la condición es false, excluye el elemento
- Retorna un NUEVO array (puede ser más corto que el original)
- NO modifica el array original

Sintaxis: array.filter((elemento, indice, arrayCompleto) => { return condicion })
*/

//--- Ejercicio basico de filter ------
console.log(`---Ejercicio basico 1: Filtrar numeros pares`);
console.log(`Enunciado: Filtrar solo los numeros pares de un array`);

const numeros2 = [1,2,3,4,5,6,7,8,9,10];
console.log("Array Original", numeros2);
const pares = numeros2.filter( num => num % 2 === 0);
console.log(`Procedimiento: numeros2.filter(num => num % 2 === 0)`);
console.log(`Explicacion: verificamos si el residuo de dividir por 2 es 0`);
console.log("Resultado", pares);
console.log("\n");

//-- Ejercicio basico filter 2 filtrar por longitud de string ---
console.log(`--- Ejercicio basico 2 : filtrar por longitud de string`);
console.log(`Enunciado: filtrar palabras por mas de 5 letras`);

const palabras = ['mariposa','flor','computadora', 'ave', 'elefante'];
console.log("Array Original:", palabras);
const palabrasLargas = palabras.filter(palabra => palabra.length > 5);
console.log(`Procedimiento: palabras.filter(palabra => palabra.length > 5)`)
console.log(`Explicacion: Comparamos la longitud de cada string que sea mayor a 5 lentras`)
console.log("Resultado: ", palabrasLargas);
console.log("\n");

//--- EJERCICIO INTERMEDIO 1: Filtrar objetos por propiedad ---
console.log(`---Ejercicio intermedio 2: filtrar objetos por propiedad`);
console.log(`Enunciado: Filtrar usuarios mayores a 25 años`);
const personas = [
    {nombre:'Juan', edad: 18},
    {nombre:'Roberto', edad: 28},
    {nombre: 'Camilo', edad:35},
    {nombre: 'Riccardo', edad: 19},
    {nombre:'Fernando', edad:45}
];

console.log("Array Original: ", personas);

const personasMayores25 = personas.filter(persona => persona.edad > 25);
console.log(`Procedimiento: personas.filter(persona => persona.edad > 25)`)
console.log(`Explicacion: Accedemos a la propiedad edad del arreglo personas y comparamos que sea mayor a 25`);
console.log("Respuesta: ", personasMayores25);
console.log("\n");


// --- EJERCICIO INTERMEDIO 2: Filtrar por multiples condiciones ---
console.log(`--- Ejercicio Intermedio 2: Filtrar por multiples condiciones`);
console.log(`Enunciado: Filtra productos disponibles y con precio menor a 100`);

const productos = [
    { nombre: "Teclado mecánico", precio: 120, disponibilidad: true },
  { nombre: "Mouse inalámbrico", precio: 45, disponibilidad: false },
  { nombre: "Monitor LED 24 pulgadas", precio: 250, disponibilidad: true },
  { nombre: "Memoria USB 64GB", precio: 30, disponibilidad: true },
  { nombre: "Disco SSD 500GB", precio: 480, disponibilidad: false },
  { nombre: "Router WiFi 6", precio: 300, disponibilidad: true },
  { nombre: "Auriculares gamer", precio: 75, disponibilidad: false },
  { nombre: "Webcam HD", precio: 95, disponibilidad: true }
];
console.log("Arreglo Original: ", productos);

const productosBaratosDisponibles = productos.filter(item => item.disponibilidad && item.precio <100);
console.log(`Procedimiento: productos.filter(item => item.disponibilidad && item.precio < 100)`);
console.log(`Explicacion: Usamos el operador AND(&&), para verificar ambas condiciones`);
console.log("Resultado: ", productosBaratosDisponibles);
console.log("\n");


// EJERCICIO AVANZADO 1 - Filtrar con busqueda de texto ---
console.log(`--- Ejercicio Avanzado 1: Filtrar con busqueda de texto ---`);
console.log(`Enunciado: Filtrar usuarios cuyo nombre contenga "ar" y tengan email de gmail `)
const usuarios = [
    { nombre: "Carlos Ramirez", email: "carlos@outlook.com", activo: true },
    { nombre: "Lucia Gomez", email: "lucia@gmail.com", activo: false },
    { nombre: "Mario Herrera", email: "mario@yahoo.com", activo: true },
    { nombre: "Andres Lopez", email: "andres@gmail.com", activo: true },
    { nombre: "Mariana Torres", email: "mariana@hotmail.com", activo: false },
    { nombre: "Sofia Perez", email: "sofia@gmail.com", activo: true },
    { nombre: "Oscar Vargas", email: "oscar@protonmail.com", activo: false },
    { nombre: "Daniela Ruiz", email: "daniela@gmail.com", activo: true }
  ];
console.log("Array Original: ", usuarios);


//========================================
//   3. REDUCE- Reducir a un valor Unico
//=======================================

/* 
ENUNCIADO DEL TEMA:
El método reduce() ejecuta una función reductora sobre cada elemento del array,
devolviendo un único valor como resultado.

EXPLICACIÓN:
- reduce() es el más versátil de los tres métodos
- Puede convertir un array en cualquier tipo de dato
- Recibe una función reductora y un valor inicial
- La función reductora recibe: (acumulador, elementoActual, indice, array)
- El acumulador guarda el resultado acumulado
- Retorna UN SOLO valor (número, string, objeto, array, etc.)

Sintaxis: array.reduce((acumulador, elemento) => { return nuevoAcumulador }, valorInicial)
*/

//--- EJERCICIO BASICO 1 -Sumar Numeros ---
console.log(`---Ejercicio Basico 1 - Sumar numeros de un Array`);
console.log(`Enunciado: Calcula la suma de todos los numeros de un array`);
const numeros3 =[10,20,30,40,50];
console.log("Array Original: ", numeros3);
const suma = numeros3.reduce((acumulador,num) => acumulador + num , 0);
console.log(`Procedimiento: numeros3.reduce((acumulador,num)=> acumulador + num , 0)`);
console.log(`Explicacion: Iniciamos en 0 y vamos sumando el acumulador`);
console.log("Resultado: ", suma);
console.log("\n");

//-- Ejercicio Basico 2: Encontrar el maximo--
console.log(`--- Ejercicio Basico 2: Encontrar el maximo`);
console.log(`Enunciado: Encuentra el numero mas grande del array`);
const numeros4 = [45,12,65,87,32,56,26,34,65,48];
console.log("Array Original: ", numeros4);

const numeroMaximo = numeros4.reduce((max, num) => num > max ? num : max, numeros4[0] );
console.log(`Procedimiento: numeros4.reduce((max, num) => num > max ? num : max,numeros4[0])`);
console.log(`Explicacion: comparamos cada numero con el maximo actual usando el operador ternario`);
console.log("Resultado: ", numeroMaximo);
console.log("\n");

// Ejercicio: 3
//Calcula la suma de un array
const sumaArray = [1,2,3,4,5];
const calculaSumaArray = sumaArray.reduce((acc, num) => acc + num,0);
console.log(calculaSumaArray);

// Ejercicio 4
//Encuentra el numero mas grande del array utilizando reduce

const numeroGrandeArray = [10,23,16,43,23,76,34,876,32,12,4]
const encuentraGrande = numeroGrandeArray.reduce((acc,num) => acc > num ? acc : num, numeroGrandeArray[0]);
console.log(encuentraGrande);

// Ejercicio 5
//Cuenta los elementos de un array

const cuentaElementoArray = [10,20,30,40];
const total = cuentaElementoArray.reduce(acc => acc + 1,0);
console.log(total);

// ejercicio 5 
//Multiplicar todos los numeros de un array

const multiplicaArray = [2,4,6,8,9];
const producto = multiplicaArray.reduce((acc, num) => acc * num , 1);
console.log(producto);

//Ejercicio 6
//convertir un array en string, convierte ["Hola","mundo"] en ["Hola Mundo"];

const palabrasConvertir = ["Hola", "Mundo"];
const frase = palabrasConvertir.reduce((acc,palabra) => acc + " " + palabra);
console.log(frase)

// EJercicio 7 Contar Concurrencias
//Cuenta cuantas veces aparece cada fruta de un array

const frutasConteo = [
    "Manzana",
    "Pera",
    "Uva",
    "Banano",
    "Fresa",
    "Mango",
    "Pera",
    "Manzana",
    "Sandía",
    "Fresa",
    "Uva"
  ];

  const conteoFrutasArray = frutasConteo.reduce((acc,fruta) => {
    acc[fruta] = (acc[fruta] || 0) + 1;
    return acc;
  },{});
console.log(conteoFrutasArray)
 

//Crea un array de numeros Pares
//Filtra solo los numeros pares de un array

const arrayNumerosPares = [1,2,3,4,5,6,7,8,9,10];
const arrayParesNumeros = arrayNumerosPares.reduce((acc,numero) =>{
    if(numero % 2 === 0) acc.push(numero);
    return acc;
},[]);
console.log(arrayParesNumeros);


// NIVEL INTERMEDIO
// Ejercicio # 1: conviente un array [[1,2],[3,4],[5,6]] en [1,2,3,4,5,6];

const arrayNew = [[1,2],[3,4],[5,6]];
const arrayPlano = arrayNew.reduce((acc,num) => acc.concat(num), []);
console.log(arrayPlano);

//Ejercicio # 2:  Agrupa Objetos por Propiedad

const arrayPersonas = [
    {nombre:"Ana", edad:20},
    {nombre:"Pedro", edad:20},
    {nombre:"Juan", edad:56},
    {nombre: "Libardo", edad:31}
];

const agrupadoPersonas = arrayPersonas.reduce((acc,persona) => {
    acc[persona.edad] = acc[persona.edad] || [];
    acc[persona.edad].push(persona.nombre);
    return acc;
},{});
console.log(agrupadoPersonas);


//Ejercicio #3 Eliminar duplicados de un array

const eliminaDuplicados = [1,2,2,3,4,5,5,6,7,8,8];
const arrayUnicos = eliminaDuplicados.reduce((acc,num) => {
    if(!acc.includes(num)) acc.push(num);
    return acc;
},{});
console.log(arrayUnicos)














  
  
  


























//--- EJERCICIO INTERMEDIO 1: Contar Ocurrencias ---
console.log(`---Ejercicios Intermedio 1: Contar Ocuerrencia`);
console.log(`Enunciado: Cuenta cuantas veces aparece una fruta`);

const frutas = ['Manzanas', 'Fresa', 'Mora', 'Piña', 'Pera','Pera', 'Uvas', 'Manzanas'];
const conteoFrutas = frutas.reduce((contador,fruta) => {
    contador[fruta] = (contador[fruta] || 0) +1;
    return contador
}, {} );

console.log(`Procedimiento: creamos un objeto vacio y vamos incrementando contadores`);
console.log(`Explicacion: Usamos el nombre de la fruta como clave y contamos ocurrencias`);
console.log("Resultado: ", conteoFrutas);
console.log("\n");





































