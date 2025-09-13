const numeroSecreto = Math.floor(Math.random() * 10 + 1);
const numeroJuegador = parseInt(prompt(`Adivina el numero secreto entre ell 1 al 10`));
console.log(`Este es el numero con el que jugas ${numeroJuegador}`);

if(numeroJuegador === numeroSecreto){
    console.log(`!Felicidades, Adivinaste el numero secreto`)
    console.log(numeroSecreto)
}else if(numeroJuegador < numeroSecreto){
    console.log(`El numero es menor al numero secreto intenta nuevamente`)
}else {
    console.log(`El numero es muy Alto `)
}