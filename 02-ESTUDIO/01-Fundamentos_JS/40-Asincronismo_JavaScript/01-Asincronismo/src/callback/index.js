function suma(num1, num2){
    return num1 + num2
}

function calc(num1,num2,callback){
    return callback(num1,num2)
};

console.log(calc(2,3,suma))

setTimeout(function(){
    console.log('Hola JavaScript')
},2000)

function gretting(name){
    console.log(`Hola Como estas ${name}`)
}

setTimeout(gretting, 3000, 'PEDRO')

//==========================================
//  EJERCICIOS DE PLATZI
//===========================================

//01ncrea una funcion que reciba un nombre y un callback, la funcion debe mostrar el csando saludo y despues de 2 segundos deber ejecuetar el callback que muentra "Hola[nombre]


function saludar(nombre){
    console.log(`Hola ${nombre}`)
}

function procesarSaludo(nombre,callback){
    console.log('Procesando Saludo')
    setTimeout(()=>{
        callback(nombre)
    },2000)
}
procesarSaludo('Juan',saludar)

//02. crea una funcion que muesre cuenta regresiva 3,2,1 y al final ejecuta un callb ack que diga despgue

function despegue(){
    console.log(`🚀 Despegue`)
}

function cuentaRegresiva(callback){
    console.log(`....Iniciando Cuenta Regresiva...`)
    setTimeout(()=> console.log('3'),1000)
    setTimeout(()=> console.log('2'),2000)
    setTimeout(()=> console.log('1'),3000)
    setTimeout(callback, 4000)
}

cuentaRegresiva(despegue);

//3. simula el proceso para preprar cafe, despues de 3 segundos ejecuta callb ack que indique el cafe esta listo

function servCafe (){
    console.log('Cafe esta Listo !!')
}

function prepararCafe(callback){
    console.log('Cafe en preparacion....')
    setTimeout(callback, 4000)
}

prepararCafe(servCafe)

//4. simula que estas descargando un archivo, muestra un mensaje al inicio y luego 5 segundos llama a un callback que indique que la descargar termino

function descargaCompleta (){
    console.log(`✅ Descarga Finalizada`)
}
function procesandoDescarga(callback){
    console.log(`Procesando Descarga.....`)
    setTimeout(callback, 6000)
}
procesandoDescarga(descargaCompleta)

//5. Crea una funcion que reciba un nombre y simule resigtrar al usuario con un retardo, al final debe ejecutar unc allback indicando que el registro fue exigtoso


function confirmaRegistro(nombre){
    console.log("✅ Usuiario ", nombre, "Registrado Exitosamente")
}

function procesaRegistro(nombre, callback){
    console.log("Usuario",nombre, "Esta siendo registrado")
    setTimeout(()=>{
        callback(nombre)
    },3000)
}

procesaRegistro("camartinez", confirmaRegistro)


//=================================
//  EJERCICIOS NIVEL INTERMEDIO
//=================================

//1. Crea una funcion que simule cocinar una receta paso a paso, cada pasao tarde un poco y al final callback que dice que la comida esta lista


function comidaLista (){
    console.log(`🍟 La comida ya esta Lista..`)
}

function preparacionComida(callback){
    console.log('...Iniciando la receta')
    setTimeout(()=> console.log('Cortando los ingredientes'), 3000)
    setTimeout(()=> console.log('Cocinando a Fuego lento'), 6000)
    setTimeout(()=> console.log('Agregando condimentos'), 7000)
    setTimeout(callback, 10000)
}
preparacionComida(comidaLista)