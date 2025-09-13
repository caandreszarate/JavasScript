/* TIPO DE DATOS NUMEROS

1. TIPO ENTERO:

const entero = 45;

2. TIPO DECIMAL:
const decimal = 3.14;


*/

const entero = 56;
const decimal = 3.14;
console.log(typeof entero, typeof decimal);


// 2. NOTACION CIENTFICA

const cientifico = 5e3;

// 3. INFINITOS y NAN

const infinitos = Infinity;
const noEsUnNumero = NaN;

// OPERACIONES ARITMETICAS

// 1. SUMA, RESTA, MULTIPLICACION Y DIVICION

//1. SUMA

const suma = 3+4;

//2. RESTA

const resta = 4-5;

//3. MULTIPLICACION

const multiplicacion = 4 * 5;

// 4. division

const division = 8 /2 ;

//2. MODULO Y EXPONENCIACION

const modulo = 15 % 4;

//2.1 EXPONENCIAON O POTENCIA

const exponenciacion = 2 ** 3;

// PRECISION

const resultado = 0.1 + 0.2;
console.log(resultado);
console.log(resultado.toFixed(1));
console.log(resultado === 0.3);

// OPERACIONES AVANZADAS

//RAIZ CUADRADA

const raizCuadrada = Math.sqrt(16);

//VALOR ABSOLUTO

const valorAbsoluto = Math.abs(-7);

//NUMERO RANDOM

const aleatoreo = Math.random();

console.log(raizCuadrada);
console.log(valorAbsoluto);
console.log(aleatoreo);



