// CONDICIONALES EN JAVASCRIPT

/*
📝 Ejercicio 1: If básico

Enunciado: Verifica si un número es mayor que 10.
Explicación: El condicional if ejecuta un bloque de código si la condición es verdadera.
*/

let numero = 15;
if(numero > 10){
    console.log(`El numero es mayor a 10`)
}

/*
📝 Ejercicio 2: If - Else
Enunciado: Verifica si un número es par o impar.
Explicación: Usamos if y else para tomar decisiones entre dos caminos.
*/

let parEimpar = 11;
if(parEimpar % 2 === 0){
    console.log(`Numero PAR`)
}else{
    console.log(`Es IMPAR`)
}

/*
Enunciado: Verifica si la temperatura está fría, templada o caliente.
Explicación: else if permite varias condiciones.
*/

let temperatura = 31;

if(temperatura < 15){
    console.log(`Hace Frio`)
}else if(temperatura < 30){
    console.log(`El clima es Templado`)
}else{
    console.log(`Hace Calor`)
}

/*
📝 Ejercicio 4: If anidado
Enunciado: Verifica si una persona puede entrar a una discoteca (mayor de 18 y con identificación).
Explicación: Se pueden anidar condicionales dentro de otros.
*/

let edad = 10;
let tieneID = true;

if(edad >= 18){
    if(tieneID){
        console.log('Puedes entrar a la discoeteca')
    }else{
        console.log('Necesitas identificacion')
    }
}else{
    console.log('Eres Menor de edad')
};

/*
📝 Ejercicio 5: Operador ternario
Enunciado: Determina si un número es positivo o negativo usando ? :.
Explicación: El operador ternario simplifica condicionales cortos.
*/

let numNegativo = 1;
let resulNegativo = numNegativo >= 0 ? 'Es Positivo' : 'Es Negativo';
console.log(resulNegativo);

/*
📝 Ejercicio 6: Switch - día de la semana
Enunciado: Muestra el día de la semana según un número (1=Lunes, 7=Domingo).
Explicación: switch evalúa un valor y ejecuta el caso correspondiente.
*/

let diaSemana = 3;

switch(diaSemana){
    case 1: console.log('Lunes'); break;
    case 2: console.log('Martes'); break;
    case 3: console.log('Miercoles');break;
    case 4: console.log('Jueves'); break;
    case 5: console.log('Viernes'); break;
    case 6: console.log('Sabado'); break;
    case 7: console.log('Domingo'); break;
};

/*
📝 Ejercicio 7: Switch con strings
Enunciado: Muestra el precio de una fruta según su nombre.
Explicación: También se pueden usar strings en un switch.
*/

let fruta = 'Durazno';

switch(fruta){
    case "Manzana": console.log('La Manzana tiene un costo de $ 2'); break;
    case "Pera": console.log('La Pera tiene un costo de $ 1.5'); break;
    case "Mango": console.log('El Mango tiene un costo de $ 2.5'); break;
    case "Mora": console.log('La Mora tiene un costo de $ 1.8'); break;
    case "Durazno": console.log(`El ${fruta} tiene un costo de $ 3`); break;
    default: console.log('No tenemos esa fruta disponible');
}

/*
📝 Ejercicio 8: If con operadores lógicos
Enunciado: Verifica si una persona puede conducir (edad ≥18 y tiene licencia).
Explicación: Se pueden combinar condiciones con &&.
*/

let edadConducir =  18;
let licenciaConducir = true;

if(edadConducir >= 18 && licenciaConducir){
    console.log(`Puede Conducir`)
}else{
    console.log('No puede Conducir')
}

/*
📝 Ejercicio 9: Comparar cadenas
Enunciado: Verifica si la contraseña ingresada es correcta.
Explicación: Se comparan strings con ===.
*/

let password = '123';

if(password === '123'){
    console.log('Acceso Permitido')
}else{
    console.log('Acceso Denegado')
};

/*

📝 Ejercicio 10: Número positivo, negativo o cero
Enunciado: Determina si un número es positivo, negativo o cero.
Explicación: Se pueden usar varias condiciones con else if.
*/

let positivoNegativoOcero = 0;

if(positivoNegativoOcero > 0){
    console.log(`Numero Positivo`)
}else if(positivoNegativoOcero < 0){
    console.log(`Numero Negativo`)
}else{
    console.log('El Numero es Cero')
};















