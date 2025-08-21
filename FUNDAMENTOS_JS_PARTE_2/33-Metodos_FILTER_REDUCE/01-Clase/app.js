// ========================================
// MÉTODOS FILTER Y REDUCE EN JAVASCRIPT
// ========================================

console.log("=== MÉTODOS FILTER Y REDUCE ===\n");

// ========================================
// 1. MÉTODO FILTER()
// ========================================
console.log("1. MÉTODO FILTER()");
console.log("==================");

/* 
El método filter() crea un nuevo array con todos los elementos que pasan 
una prueba (función de callback). No modifica el array original.

Sintaxis: array.filter(callback(elemento, índice, array))
- callback: función que se ejecuta para cada elemento
- elemento: elemento actual del array
- índice: índice del elemento actual (opcional)
- array: array sobre el que se llama filter (opcional)

Retorna: Un nuevo array con los elementos que pasan la prueba
*/

// Ejemplo 1: Filtrar números pares
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("\nArray original:", numeros);

const numerosPares = numeros.filter(function(numero) {
    return numero % 2 === 0;
});
console.log("Números pares:", numerosPares);

// Con arrow function (más moderno)
const numerosImpares = numeros.filter(numero => numero % 2 !== 0);
console.log("Números impares:", numerosImpares);

// Ejemplo 2: Filtrar por longitud de strings
const palabras = ["casa", "automóvil", "sol", "computadora", "luz", "programación"];
console.log("\nPalabras originales:", palabras);

const palabrasCortas = palabras.filter(palabra => palabra.length <= 4);
console.log("Palabras de 4 letras o menos:", palabrasCortas);

const palabrasLargas = palabras.filter(palabra => palabra.length > 6);
console.log("Palabras de más de 6 letras:", palabrasLargas);

// Ejemplo 3: Filtrar objetos por propiedades
const estudiantes = [
    { nombre: "Ana", edad: 20, calificacion: 85 },
    { nombre: "Carlos", edad: 22, calificacion: 92 },
    { nombre: "María", edad: 19, calificacion: 78 },
    { nombre: "Pedro", edad: 21, calificacion: 88 },
    { nombre: "Lucía", edad: 23, calificacion: 95 }
];

console.log("\nEstudiantes originales:", estudiantes);

// Filtrar estudiantes aprobados (calificación >= 80)
const estudiantesAprobados = estudiantes.filter(estudiante => estudiante.calificacion >= 80);
console.log("Estudiantes aprobados:", estudiantesAprobados);

// Filtrar estudiantes mayores de 20 años
const estudiantesMayores = estudiantes.filter(estudiante => estudiante.edad > 20);
console.log("Estudiantes mayores de 20:", estudiantesMayores);

// Ejemplo 4: Filtrar con múltiples condiciones
const productosExcelentes = estudiantes.filter(estudiante => 
    estudiante.edad >= 21 && estudiante.calificacion >= 90
);
console.log("Estudiantes de 21+ años con calificación 90+:", productosExcelentes);

// ========================================
// 2. MÉTODO REDUCE()
// ========================================
console.log("\n\n2. MÉTODO REDUCE()");
console.log("==================");

/*
El método reduce() ejecuta una función reductora sobre cada elemento del array,
devolviendo como resultado un único valor.

Sintaxis: array.reduce(callback(acumulador, elemento, índice, array), valorInicial)
- callback: función que se ejecuta para cada elemento
- acumulador: valor que acumula el resultado de las iteraciones
- elemento: elemento actual del array
- índice: índice del elemento actual (opcional)
- array: array sobre el que se llama reduce (opcional)
- valorInicial: valor inicial del acumulador (opcional)

Retorna: Un único valor resultado de la reducción
*/

// Ejemplo 1: Sumar todos los números de un array
const numerosParaSumar = [1, 2, 3, 4, 5];
console.log("\nNúmeros para sumar:", numerosParaSumar);

const suma = numerosParaSumar.reduce(function(acumulador, numero) {
    console.log(`Acumulador: ${acumulador}, Número actual: ${numero}, Suma: ${acumulador + numero}`);
    return acumulador + numero;
}, 0);
console.log("Suma total:", suma);

// Con arrow function
const sumaArrow = numerosParaSumar.reduce((acc, num) => acc + num, 0);
console.log("Suma con arrow function:", sumaArrow);

// Ejemplo 2: Encontrar el número mayor
const numerosVariados = [45, 23, 78, 12, 89, 34, 67];
console.log("\nNúmeros variados:", numerosVariados);

const numeroMayor = numerosVariados.reduce((mayor, actual) => {
    return actual > mayor ? actual : mayor;
});
console.log("Número mayor:", numeroMayor);

// Ejemplo 3: Contar ocurrencias de elementos
const frutas = ["manzana", "banana", "manzana", "naranja", "banana", "manzana"];
console.log("\nFrutas:", frutas);

const conteoFrutas = frutas.reduce((contador, fruta) => {
    contador[fruta] = (contador[fruta] || 0) + 1;
    return contador;
}, {});
console.log("Conteo de frutas:", conteoFrutas);

// Ejemplo 4: Agrupar objetos por propiedad
const empleados = [
    { nombre: "Juan", departamento: "IT", salario: 50000 },
    { nombre: "Ana", departamento: "HR", salario: 45000 },
    { nombre: "Carlos", departamento: "IT", salario: 55000 },
    { nombre: "María", departamento: "Finance", salario: 60000 },
    { nombre: "Pedro", departamento: "HR", salario: 48000 }
];

console.log("\nEmpleados:", empleados);

const empleadosPorDepartamento = empleados.reduce((grupos, empleado) => {
    const depto = empleado.departamento;
    if (!grupos[depto]) {
        grupos[depto] = [];
    }
    grupos[depto].push(empleado);
    return grupos;
}, {});
console.log("Empleados agrupados por departamento:", empleadosPorDepartamento);

// Ejemplo 5: Calcular salario promedio por departamento
const salarioPromedioPorDepto = empleados.reduce((resultado, empleado) => {
    const depto = empleado.departamento;
    
    if (!resultado[depto]) {
        resultado[depto] = { total: 0, cantidad: 0 };
    }
    
    resultado[depto].total += empleado.salario;
    resultado[depto].cantidad += 1;
    resultado[depto].promedio = resultado[depto].total / resultado[depto].cantidad;
    
    return resultado;
}, {});
console.log("Salario promedio por departamento:", salarioPromedioPorDepto);

// ========================================
// 3. COMBINANDO FILTER Y REDUCE
// ========================================
console.log("\n\n3. COMBINANDO FILTER Y REDUCE");
console.log("==============================");

// Ejemplo: Calcular el promedio de calificaciones de estudiantes aprobados
console.log("\nEstudiantes:", estudiantes);

const promedioAprobados = estudiantes
    .filter(estudiante => estudiante.calificacion >= 80)
    .reduce((suma, estudiante, index, array) => {
        suma += estudiante.calificacion;
        // En el último elemento, dividir por la cantidad
        return index === array.length - 1 ? suma / array.length : suma;
    }, 0);

console.log("Promedio de estudiantes aprobados:", promedioAprobados);

// Ejemplo más complejo: Productos más caros por categoría
const productos = [
    { nombre: "Laptop", categoria: "Electrónicos", precio: 1200 },
    { nombre: "Mouse", categoria: "Electrónicos", precio: 25 },
    { nombre: "Teclado", categoria: "Electrónicos", precio: 80 },
    { nombre: "Camiseta", categoria: "Ropa", precio: 30 },
    { nombre: "Pantalón", categoria: "Ropa", precio: 60 },
    { nombre: "Zapatos", categoria: "Ropa", precio: 120 },
    { nombre: "Mesa", categoria: "Muebles", precio: 300 },
    { nombre: "Silla", categoria: "Muebles", precio: 150 }
];

console.log("\nProductos:", productos);

// Filtrar productos caros (>50) y encontrar el más caro por categoría
const productosMasCarosPorCategoria = productos
    .filter(producto => producto.precio > 50)
    .reduce((resultado, producto) => {
        const categoria = producto.categoria;
        
        if (!resultado[categoria] || producto.precio > resultado[categoria].precio) {
            resultado[categoria] = producto;
        }
        
        return resultado;
    }, {});

console.log("Productos más caros por categoría (precio > 50):", productosMasCarosPorCategoria);

// ========================================
// 4. CASOS DE USO COMUNES
// ========================================
console.log("\n\n4. CASOS DE USO COMUNES");
console.log("=======================");

// Array de transacciones para ejemplos
const transacciones = [
    { id: 1, tipo: "ingreso", monto: 1000, fecha: "2024-01-15" },
    { id: 2, tipo: "gasto", monto: 250, fecha: "2024-01-16" },
    { id: 3, tipo: "ingreso", monto: 500, fecha: "2024-01-17" },
    { id: 4, tipo: "gasto", monto: 100, fecha: "2024-01-18" },
    { id: 5, tipo: "gasto", monto: 75, fecha: "2024-01-19" }
];

console.log("\nTransacciones:", transacciones);

// Caso 1: Calcular balance total
const balanceTotal = transacciones.reduce((balance, transaccion) => {
    return transaccion.tipo === "ingreso" 
        ? balance + transaccion.monto 
        : balance - transaccion.monto;
}, 0);
console.log("Balance total:", balanceTotal);

// Caso 2: Total de gastos
const totalGastos = transacciones
    .filter(t => t.tipo === "gasto")
    .reduce((total, t) => total + t.monto, 0);
console.log("Total de gastos:", totalGastos);

// Caso 3: Total de ingresos
const totalIngresos = transacciones
    .filter(t => t.tipo === "ingreso")
    .reduce((total, t) => total + t.monto, 0);
console.log("Total de ingresos:", totalIngresos);

// ========================================
// 5. CONSEJOS Y BUENAS PRÁCTICAS
// ========================================
console.log("\n\n5. CONSEJOS Y BUENAS PRÁCTICAS");
console.log("===============================");

console.log(`
FILTER():
- ✅ Úsalo para crear un nuevo array con elementos que cumplan una condición
- ✅ Siempre retorna true o false en la función callback
- ✅ No modifica el array original
- ✅ Ideal para filtrar datos antes de procesarlos

REDUCE():
- ✅ Úsalo para transformar un array en un único valor
- ✅ Siempre proporciona un valor inicial cuando sea posible
- ✅ El acumulador puede ser de cualquier tipo (número, string, objeto, array)
- ✅ Ideal para cálculos, agrupaciones y transformaciones complejas

COMBINADOS:
- ✅ Filter primero, reduce después para mejor rendimiento
- ✅ Usa métodos encadenados para código más legible
- ✅ Considera el rendimiento en arrays muy grandes
`);

console.log("\n=== FIN DE LA EXPLICACIÓN ===");

//========================================
// CLASE PLATZI
//========================================

// FILTER, NO MODIFICA EL ARRAY ORIGINAL
// filter()

const numbersFiter = [1,2,3,4,5,6,7,8,9,10];
const evenNumbers = numbersFiter.filter(numero => numero % 2 === 0)
console.log(numbersFiter);
console.log(evenNumbers)

// reduce() => reduce un array a 1 solo valor

const numberReduce = [1,2,3,4,5,6,7];
const sumaReduce = numberReduce.reduce((acomulador,valor) => acomulador + valor ,0)
console.log(numberReduce);
console.log(sumaReduce);

// reduce caso # 2

const palabrasReduce =['Apple', 'Banana', 'Hello', 'Bye', 'Banana', 'Bye', 'Bye']
const repiteReduce = palabrasReduce.reduce((acomulador,valor)=> {
    if(acomulador[valor]){
        acomulador[valor] ++
    }else{
        acomulador[valor] = 1
    }
    return acomulador
}, {})

console.log(palabrasReduce)
console.log(repiteReduce)



