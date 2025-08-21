// ========================================
// MÉTODOS FIND Y FINDINDEX EN JAVASCRIPT
// ========================================

console.log("=== MÉTODOS FIND Y FINDINDEX ===");

// ========================================
// 1. MÉTODO FIND()
// ========================================
/* 
El método find() devuelve el PRIMER ELEMENTO del array que cumple 
con la condición especificada en la función de callback.
Si no encuentra ningún elemento, devuelve undefined.

Sintaxis: array.find(callback(element, index, array))
*/

console.log("\n--- 1. MÉTODO FIND() ---");

// Ejemplo básico con números
const numeros = [1, 5, 8, 12, 15, 20];

// Buscar el primer número mayor que 10
const primerMayorA10 = numeros.find(numero => numero > 10);
console.log("Primer número mayor a 10:", primerMayorA10); // 12

// Buscar un número específico
const numeroEncontrado = numeros.find(numero => numero === 8);
console.log("Número 8 encontrado:", numeroEncontrado); // 8

// Buscar algo que no existe
const noExiste = numeros.find(numero => numero > 100);
console.log("Número mayor a 100:", noExiste); // undefined

// ========================================
// 2. FIND CON OBJETOS
// ========================================

console.log("\n--- 2. FIND CON OBJETOS ---");

const estudiantes = [
    { id: 1, nombre: "Ana", edad: 20, curso: "JavaScript" },
    { id: 2, nombre: "Carlos", edad: 22, curso: "Python" },
    { id: 3, nombre: "María", edad: 19, curso: "JavaScript" },
    { id: 4, nombre: "Pedro", edad: 21, curso: "Java" }
];

// Buscar estudiante por nombre
const estudiantePorNombre = estudiantes.find(estudiante => estudiante.nombre === "Carlos");
console.log("Estudiante encontrado por nombre:", estudiantePorNombre);

// Buscar primer estudiante de JavaScript
const estudianteJS = estudiantes.find(estudiante => estudiante.curso === "JavaScript");
console.log("Primer estudiante de JavaScript:", estudianteJS);

// Buscar estudiante por edad
const estudianteMayorEdad = estudiantes.find(estudiante => estudiante.edad >= 21);
console.log("Primer estudiante mayor o igual a 21 años:", estudianteMayorEdad);

// ========================================
// 3. MÉTODO FINDINDEX()
// ========================================
/* 
El método findIndex() devuelve el ÍNDICE del primer elemento 
que cumple con la condición especificada.
Si no encuentra ningún elemento, devuelve -1.

Sintaxis: array.findIndex(callback(element, index, array))
*/

console.log("\n--- 3. MÉTODO FINDINDEX() ---");

// Ejemplo básico con números
const indicePrimerMayorA10 = numeros.findIndex(numero => numero > 10);
console.log("Índice del primer número mayor a 10:", indicePrimerMayorA10); // 3

// Buscar índice de un número específico
const indiceNumero8 = numeros.findIndex(numero => numero === 8);
console.log("Índice del número 8:", indiceNumero8); // 2

// Buscar índice de algo que no existe
const indiceNoExiste = numeros.findIndex(numero => numero > 100);
console.log("Índice de número mayor a 100:", indiceNoExiste); // -1

// ========================================
// 4. FINDINDEX CON OBJETOS
// ========================================

console.log("\n--- 4. FINDINDEX CON OBJETOS ---");

// Buscar índice de estudiante por nombre
const indiceCarlos = estudiantes.findIndex(estudiante => estudiante.nombre === "Carlos");
console.log("Índice de Carlos:", indiceCarlos); // 1

// Buscar índice del primer estudiante de JavaScript
const indiceEstudianteJS = estudiantes.findIndex(estudiante => estudiante.curso === "JavaScript");
console.log("Índice del primer estudiante de JavaScript:", indiceEstudianteJS); // 0

// Buscar índice de estudiante por ID
const indicePorId = estudiantes.findIndex(estudiante => estudiante.id === 4);
console.log("Índice del estudiante con ID 4:", indicePorId); // 3

// ========================================
// 5. DIFERENCIAS ENTRE FIND Y FINDINDEX
// ========================================

console.log("\n--- 5. DIFERENCIAS ENTRE FIND Y FINDINDEX ---");

const productos = [
    { id: 1, nombre: "Laptop", precio: 800, categoria: "Tecnología" },
    { id: 2, nombre: "Mouse", precio: 25, categoria: "Tecnología" },
    { id: 3, nombre: "Teclado", precio: 50, categoria: "Tecnología" },
    { id: 4, nombre: "Monitor", precio: 200, categoria: "Tecnología" }
];

// FIND: Devuelve el OBJETO completo
const productoCaroFind = productos.find(producto => producto.precio > 100);
console.log("FIND - Producto caro (objeto completo):", productoCaroFind);

// FINDINDEX: Devuelve el ÍNDICE
const productoCaroIndex = productos.findIndex(producto => producto.precio > 100);
console.log("FINDINDEX - Índice del producto caro:", productoCaroIndex);
console.log("Producto en ese índice:", productos[productoCaroIndex]);

// ========================================
// 6. CASOS DE USO PRÁCTICOS
// ========================================

console.log("\n--- 6. CASOS DE USO PRÁCTICOS ---");

// Ejemplo 1: Sistema de usuarios
const usuarios = [
    { id: 1, email: "ana@email.com", activo: true },
    { id: 2, email: "carlos@email.com", activo: false },
    { id: 3, email: "maria@email.com", activo: true }
];

// Buscar usuario por email para login
const usuarioLogin = usuarios.find(usuario => usuario.email === "carlos@email.com");
if (usuarioLogin) {
    console.log("Usuario encontrado para login:", usuarioLogin.email);
    console.log("Estado activo:", usuarioLogin.activo);
} else {
    console.log("Usuario no encontrado");
}

// Ejemplo 2: Carrito de compras
const carrito = [
    { id: 1, producto: "Camiseta", cantidad: 2, precio: 20 },
    { id: 2, producto: "Pantalón", cantidad: 1, precio: 40 },
    { id: 3, producto: "Zapatos", cantidad: 1, precio: 60 }
];

// Buscar producto en carrito para actualizar cantidad
const productoEnCarrito = carrito.find(item => item.producto === "Pantalón");
if (productoEnCarrito) {
    console.log("Producto encontrado en carrito:", productoEnCarrito);
    // Aquí podrías actualizar la cantidad
}

// Buscar índice para eliminar producto del carrito
const indiceProductoEliminar = carrito.findIndex(item => item.producto === "Zapatos");
if (indiceProductoEliminar !== -1) {
    console.log("Producto a eliminar está en índice:", indiceProductoEliminar);
    // carrito.splice(indiceProductoEliminar, 1); // Eliminaría el producto
}

// ========================================
// 7. COMPARACIÓN CON OTROS MÉTODOS
// ========================================

console.log("\n--- 7. COMPARACIÓN CON OTROS MÉTODOS ---");

const edades = [16, 18, 20, 22, 17, 19, 25];

// FIND vs FILTER
console.log("FIND - Primera edad >= 20:", edades.find(edad => edad >= 20)); // 20
console.log("FILTER - Todas las edades >= 20:", edades.filter(edad => edad >= 20)); // [20, 22, 19, 25]

// FINDINDEX vs INDEXOF
console.log("FINDINDEX - Índice primera edad >= 20:", edades.findIndex(edad => edad >= 20)); // 2
console.log("INDEXOF - Índice del valor 20:", edades.indexOf(20)); // 2

// ========================================
// 8. FUNCIONES CON PARÁMETROS COMPLETOS
// ========================================

console.log("\n--- 8. USANDO TODOS LOS PARÁMETROS ---");

const colores = ["rojo", "azul", "verde", "amarillo", "rojo"];

// Usando element, index y array
const colorEncontrado = colores.find((color, index, array) => {
    console.log(`Revisando: ${color} en índice ${index} de array con ${array.length} elementos`);
    return color === "verde";
});
console.log("Color encontrado:", colorEncontrado);

// FindIndex con todos los parámetros
const indiceColor = colores.findIndex((color, index, array) => {
    return color === "rojo" && index > 0; // Buscar "rojo" pero no el primero
});
console.log("Índice del segundo 'rojo':", indiceColor);

// ========================================
// 9. CASOS ESPECIALES Y BUENAS PRÁCTICAS
// ========================================

console.log("\n--- 9. CASOS ESPECIALES ---");

// Array vacío
const arrayVacio = [];
console.log("FIND en array vacío:", arrayVacio.find(x => x > 0)); // undefined
console.log("FINDINDEX en array vacío:", arrayVacio.findIndex(x => x > 0)); // -1

// Array con valores null/undefined
const arrayConNulos = [null, undefined, 0, "", "texto"];
const primerValorTruthy = arrayConNulos.find(valor => valor);
console.log("Primer valor truthy:", primerValorTruthy); // "texto"

// Validación antes de usar el resultado
const buscarUsuario = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        return `Usuario encontrado: ${usuario.email}`;
    } else {
        return "Usuario no encontrado";
    }
};

console.log(buscarUsuario(1)); // Usuario encontrado
console.log(buscarUsuario(999)); // Usuario no encontrado

// ========================================
// 10. EJERCICIOS DE PRÁCTICA
// ========================================

console.log("\n--- 10. EJERCICIOS DE PRÁCTICA ---");

const empleados = [
    { id: 1, nombre: "Juan", departamento: "IT", salario: 3000 },
    { id: 2, nombre: "Ana", departamento: "Marketing", salario: 2500 },
    { id: 3, nombre: "Pedro", departamento: "IT", salario: 3500 },
    { id: 4, nombre: "Laura", departamento: "Ventas", salario: 2800 }
];

// Ejercicio 1: Encontrar empleado con mayor salario
const empleadoMayorSalario = empleados.find(emp => 
    emp.salario === Math.max(...empleados.map(e => e.salario))
);
console.log("Empleado con mayor salario:", empleadoMayorSalario);

// Ejercicio 2: Encontrar índice del primer empleado de IT
const indiceIT = empleados.findIndex(emp => emp.departamento === "IT");
console.log("Índice del primer empleado de IT:", indiceIT);

// Ejercicio 3: Buscar empleado por criterios múltiples
const empleadoEspecifico = empleados.find(emp => 
    emp.departamento === "IT" && emp.salario > 3000
);
console.log("Empleado de IT con salario > 3000:", empleadoEspecifico);

console.log("\n=== FIN DE LA EXPLICACIÓN ===");

/* 
RESUMEN CLAVE:
- FIND: Devuelve el PRIMER ELEMENTO que cumple la condición o undefined
- FINDINDEX: Devuelve el ÍNDICE del primer elemento que cumple la condición o -1
- Ambos detienen la búsqueda en cuanto encuentran el primer elemento que cumple la condición
- Son ideales para buscar elementos únicos o el primero que cumple cierta condición
- Muy útiles para trabajar con arrays de objetos
*/

//=========================================
// Clase Platzi
//=========================================

// find y findIndex => No modifican el array

//FIND()

const multiposDe5 = [5,10,15,20];

const primerNumeroMayorA10 = multiposDe5.find(number => number > 10);

console.log(multiposDe5);
console.log(primerNumeroMayorA10)

// findIndex

const randomNumeros = [6,14,27,56,40]
const indexNumero = randomNumeros.findIndex(numero => numero > 50);
console.log(randomNumeros)
console.log(indexNumero)