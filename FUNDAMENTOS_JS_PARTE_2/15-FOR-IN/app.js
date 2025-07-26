/*

for in ------> objetos

consta de 2 cosas

propiedades = valor
array , string

item

for(variable in objeto){
codigo
}
*/

const listaDeCompras = {
    manzana: 5,
    pera: 3,
    naranaja: 2,
    uva: 1
}

for(let fruta in listaDeCompras){
    console.log(fruta);
}

for(fruta in listaDeCompras){
    console.log(`${fruta} : ${listaDeCompras[fruta]}`)
}


// ========================================
// EJEMPLOS DEL CICLO FOR...IN EN JAVASCRIPT
// ========================================

console.log("=== EJEMPLOS DEL CICLO FOR...IN ===\n");

// Ejemplo 1: Recorrer las propiedades de un objeto
const persona = {
    nombre: "Juan",
    edad: 30,
    profesion: "Ingeniero"
};
for (let clave in persona) {
    console.log(`Ejemplo 1 - ${clave}: ${persona[clave]}`);
}
// Explicación: El ciclo recorre cada propiedad del objeto 'persona'.
// En cada vuelta, 'clave' toma el valor de cada propiedad y se imprime su valor.

console.log("------------------------------");

// Ejemplo 2: Recorrer los índices de un arreglo
const colores = ["rojo", "verde", "azul"];
for (let indice in colores) {
    console.log(`Ejemplo 2 - Índice: ${indice}, Valor: ${colores[indice]}`);
}
// Explicación: 'for...in' recorre los índices del arreglo.
// En cada iteración, 'indice' es el índice del elemento y se imprime junto a su valor.

console.log("------------------------------");

// Ejemplo 3: Contar propiedades de un objeto
const auto = {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2020
};
let contador = 0;
for (let clave in auto) {
    contador++;
}
console.log(`Ejemplo 3 - El objeto auto tiene ${contador} propiedades.`);
// Explicación: Se recorre cada propiedad del objeto y se incrementa un contador.
// Al final, se muestra cuántas propiedades tiene el objeto.

console.log("------------------------------");

// Ejemplo 4: Filtrar solo propiedades propias (no heredadas)
function Animal(nombre) {
    this.nombre = nombre;
}
Animal.prototype.tipo = "mamífero";
const perro = new Animal("Fido");
for (let clave in perro) {
    if (perro.hasOwnProperty(clave)) {
        console.log(`Ejemplo 4 - Propiedad propia: ${clave} = ${perro[clave]}`);
    }
}
// Explicación: 'for...in' recorre todas las propiedades, incluidas las heredadas del prototipo.
// Usando 'hasOwnProperty', solo se muestran las propiedades propias del objeto.

console.log("------------------------------");

// Ejemplo 5: Modificar valores de un objeto
const usuario = {
    nombre: "Ana",
    puntos: 10,
    activo: true
};
for (let clave in usuario) {
    if (typeof usuario[clave] === "number") {
        usuario[clave] *= 2; // Duplicar los valores numéricos
    }
}
console.log("Ejemplo 5 - Usuario modificado:", usuario);
// Explicación: Se recorre cada propiedad del objeto 'usuario'.
// Si el valor es numérico, se multiplica por 2.
// Al final, se muestra el objeto modificado.

console.log("\n=== FIN DE EJEMPLOS DE FOR...IN ==="); 