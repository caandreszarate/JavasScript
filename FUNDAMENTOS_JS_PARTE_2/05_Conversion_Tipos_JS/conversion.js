/* TYPE CASTING Y COERCION CONVERSION DE TIPOS */
/* COMPILADOS O INTERPRETADOS

1. COMPILADOS: C, C++ , Rust ,  Go , Swift => Chequeo estatico de tipos
2. INTERPRETADOS: JAVASCRIPT, PYTHON, RUBY, PHP => Chequeo dinamico de tipos




*/

// TYPE CASTING EXPLICIT

const string = '42';
const integer = parseInt(string);
console.log(integer);
console.log(typeof integer);

const numero1 = "56";
const numero2 = parseInt(numero1);
console.log(numero2);
console.log(typeof numero2);


//CONVERTIR A FLOTANTE
const stringDecimal = "3.14";
const float = parseFloat(stringDecimal);
console.log(float);
console.log(typeof float);

//CONVERTIR A BINARIO

const binary = '1010';
const decimal = parseInt(binary, 2);
console.log(decimal);
console.log(typeof decimal);

// TYPE CASTING IMPLICIT

const sum = '5' + 3;
console.log(sum);

const sumWithBooLean = '3' + true;
console.log(sumWithBooLean);


const sumWithNumber = 2 + true;
console.log(sumWithNumber);

const stringValue = '10';
const numberValue = 10;
const booleanValue = true;
console.log('-----------------')

console.log(stringValue + stringValue ); //Concatena
console.log(stringValue + numberValue );
console.log(stringValue + booleanValue );
console.log(numberValue + numberValue);
console.log(numberValue + stringValue);
console.log(numberValue + numberValue);
console.log(booleanValue + stringValue)
console.log(booleanValue + numberValue)
console.log(booleanValue + booleanValue)










