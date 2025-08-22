// ========================================
// EJERCICIOS PRÁCTICOS - FILTER Y REDUCE
// ========================================

console.log("=== EJERCICIOS PRÁCTICOS - FILTER Y REDUCE ===\n");

// ========================================
// DATOS PARA LOS EJERCICIOS
// ========================================

const estudiantes = [
    { nombre: "Ana", edad: 20, calificaciones: [85, 90, 78, 92], curso: "JavaScript" },
    { nombre: "Carlos", edad: 22, calificaciones: [88, 85, 90, 87], curso: "Python" },
    { nombre: "María", edad: 19, calificaciones: [92, 88, 95, 90], curso: "JavaScript" },
    { nombre: "Pedro", edad: 21, calificaciones: [76, 80, 82, 78], curso: "Java" },
    { nombre: "Lucía", edad: 23, calificaciones: [95, 92, 98, 94], curso: "JavaScript" },
    { nombre: "Diego", edad: 20, calificaciones: [70, 75, 73, 72], curso: "Python" },
    { nombre: "Sofia", edad: 24, calificaciones: [89, 91, 87, 90], curso: "Java" }
];

const productos = [
    { id: 1, nombre: "Laptop", categoria: "Electrónicos", precio: 1200, stock: 5, descuento: 0.1 },
    { id: 2, nombre: "Mouse", categoria: "Electrónicos", precio: 25, stock: 50, descuento: 0.05 },
    { id: 3, nombre: "Teclado", categoria: "Electrónicos", precio: 80, stock: 30, descuento: 0.15 },
    { id: 4, nombre: "Camiseta", categoria: "Ropa", precio: 30, stock: 100, descuento: 0.2 },
    { id: 5, nombre: "Pantalón", categoria: "Ropa", precio: 60, stock: 25, descuento: 0.1 },
    { id: 6, nombre: "Zapatos", categoria: "Ropa", precio: 120, stock: 15, descuento: 0.25 },
    { id: 7, nombre: "Mesa", categoria: "Muebles", precio: 300, stock: 8, descuento: 0.05 },
    { id: 8, nombre: "Silla", categoria: "Muebles", precio: 150, stock: 20, descuento: 0.1 }
];

const ventas = [
    { fecha: "2024-01-15", producto: "Laptop", cantidad: 2, precio: 1200 },
    { fecha: "2024-01-16", producto: "Mouse", cantidad: 10, precio: 25 },
    { fecha: "2024-01-17", producto: "Teclado", cantidad: 5, precio: 80 },
    { fecha: "2024-01-18", producto: "Camiseta", cantidad: 15, precio: 30 },
    { fecha: "2024-01-19", producto: "Laptop", cantidad: 1, precio: 1200 },
    { fecha: "2024-01-20", producto: "Zapatos", cantidad: 3, precio: 120 }
];

// ========================================
// EJERCICIOS CON FILTER
// ========================================
console.log("EJERCICIOS CON FILTER");
console.log("=====================\n");

// EJERCICIO 1: Estudiantes destacados
console.log("1. Filtrar estudiantes con promedio >= 85");
const estudiantesDestacados = estudiantes.filter(estudiante => {
    const promedio = estudiante.calificaciones.reduce((sum, cal) => sum + cal, 0) / estudiante.calificaciones.length;
    return promedio >= 85;
});
console.log("Estudiantes destacados:", estudiantesDestacados.map(e => e.nombre));

// EJERCICIO 2: Productos caros con stock bajo
console.log("\n2. Productos con precio > 100 y stock < 20");
const productosCarosStockBajo = productos.filter(producto => 
    producto.precio > 100 && producto.stock < 20
);
console.log("Productos caros con stock bajo:", productosCarosStockBajo);

// EJERCICIO 3: Estudiantes de JavaScript mayores de 20
console.log("\n3. Estudiantes de JavaScript mayores de 20 años");
const estudiantesJS = estudiantes.filter(estudiante => 
    estudiante.curso === "JavaScript" && estudiante.edad > 20
);
console.log("Estudiantes JS mayores de 20:", estudiantesJS.map(e => e.nombre));

// EJERCICIO 4: Productos con descuento significativo
console.log("\n4. Productos con descuento >= 15%");
const productosDescuentoAlto = productos.filter(producto => producto.descuento >= 0.15);
console.log("Productos con descuento alto:", productosDescuentoAlto.map(p => p.nombre));

// EJERCICIO 5: Ventas de productos caros
console.log("\n5. Ventas de productos con precio >= 100");
const ventasProductosCaros = ventas.filter(venta => venta.precio >= 100);
console.log("Ventas de productos caros:", ventasProductosCaros);

// ========================================
// EJERCICIOS CON REDUCE
// ========================================
console.log("\n\nEJERCICIOS CON REDUCE");
console.log("====================\n");

// EJERCICIO 6: Promedio general de todas las calificaciones
console.log("6. Calcular promedio general de todas las calificaciones");
const promedioGeneral = estudiantes.reduce((acum, estudiante) => {
    const sumaCalificaciones = estudiante.calificaciones.reduce((sum, cal) => sum + cal, 0);
    return acum + sumaCalificaciones;
}, 0) / estudiantes.reduce((total, est) => total + est.calificaciones.length, 0);
console.log("Promedio general:", promedioGeneral.toFixed(2));

// EJERCICIO 7: Valor total del inventario
console.log("\n7. Calcular valor total del inventario");
const valorInventario = productos.reduce((total, producto) => {
    return total + (producto.precio * producto.stock);
}, 0);
console.log("Valor total del inventario: $", valorInventario);

// EJERCICIO 8: Ingresos totales por ventas
console.log("\n8. Calcular ingresos totales por ventas");
const ingresosTotales = ventas.reduce((total, venta) => {
    return total + (venta.cantidad * venta.precio);
}, 0);
console.log("Ingresos totales: $", ingresosTotales);

// EJERCICIO 9: Agrupar estudiantes por curso
console.log("\n9. Agrupar estudiantes por curso");
const estudiantesPorCurso = estudiantes.reduce((grupos, estudiante) => {
    const curso = estudiante.curso;
    if (!grupos[curso]) {
        grupos[curso] = [];
    }
    grupos[curso].push(estudiante.nombre);
    return grupos;
}, {});
console.log("Estudiantes por curso:", estudiantesPorCurso);

// EJERCICIO 10: Producto más vendido
console.log("\n10. Encontrar el producto más vendido");
const ventasPorProducto = ventas.reduce((acum, venta) => {
    acum[venta.producto] = (acum[venta.producto] || 0) + venta.cantidad;
    return acum;
}, {});

const productoMasVendido = Object.keys(ventasPorProducto).reduce((masVendido, producto) => {
    return ventasPorProducto[producto] > ventasPorProducto[masVendido] ? producto : masVendido;
});
console.log("Producto más vendido:", productoMasVendido, "con", ventasPorProducto[productoMasVendido], "unidades");

// ========================================
// EJERCICIOS COMBINANDO FILTER Y REDUCE
// ========================================
console.log("\n\nEJERCICIOS COMBINANDO FILTER Y REDUCE");
console.log("====================================\n");

// EJERCICIO 11: Promedio de estudiantes destacados de JavaScript
console.log("11. Promedio de calificaciones de estudiantes de JavaScript con promedio >= 85");
const promedioJSDestacados = estudiantes
    .filter(estudiante => estudiante.curso === "JavaScript")
    .filter(estudiante => {
        const promedio = estudiante.calificaciones.reduce((sum, cal) => sum + cal, 0) / estudiante.calificaciones.length;
        return promedio >= 85;
    })
    .reduce((suma, estudiante, index, array) => {
        const promedioEstudiante = estudiante.calificaciones.reduce((sum, cal) => sum + cal, 0) / estudiante.calificaciones.length;
        suma += promedioEstudiante;
        return index === array.length - 1 ? suma / array.length : suma;
    }, 0);
console.log("Promedio de estudiantes JS destacados:", promedioJSDestacados.toFixed(2));

// EJERCICIO 12: Ingresos por productos electrónicos con descuento
console.log("\n12. Ingresos totales de productos electrónicos con descuento");
const ingresosElectronicosDescuento = productos
    .filter(producto => producto.categoria === "Electrónicos" && producto.descuento > 0)
    .reduce((total, producto) => {
        const precioConDescuento = producto.precio * (1 - producto.descuento);
        return total + (precioConDescuento * producto.stock);
    }, 0);
console.log("Ingresos electrónicos con descuento: $", ingresosElectronicosDescuento.toFixed(2));

// EJERCICIO 13: Análisis de ventas por categoría
console.log("\n13. Análisis de ventas por categoría");
const ventasPorCategoria = ventas
    .map(venta => {
        const producto = productos.find(p => p.nombre === venta.producto);
        return { ...venta, categoria: producto ? producto.categoria : "Sin categoría" };
    })
    .reduce((analisis, venta) => {
        const categoria = venta.categoria;
        if (!analisis[categoria]) {
            analisis[categoria] = { cantidad: 0, ingresos: 0 };
        }
        analisis[categoria].cantidad += venta.cantidad;
        analisis[categoria].ingresos += venta.cantidad * venta.precio;
        return analisis;
    }, {});
console.log("Ventas por categoría:", ventasPorCategoria);

// EJERCICIO 14: Top 3 productos más caros con stock disponible
console.log("\n14. Top 3 productos más caros con stock > 10");
const top3ProductosCaros = productos
    .filter(producto => producto.stock > 10)
    .sort((a, b) => b.precio - a.precio)
    .slice(0, 3)
    .map(producto => ({ nombre: producto.nombre, precio: producto.precio }));
console.log("Top 3 productos más caros con stock:", top3ProductosCaros);

// EJERCICIO 15: Estadísticas completas de estudiantes
console.log("\n15. Estadísticas completas de estudiantes");
const estadisticasEstudiantes = estudiantes.reduce((stats, estudiante) => {
    const promedio = estudiante.calificaciones.reduce((sum, cal) => sum + cal, 0) / estudiante.calificaciones.length;
    
    // Actualizar estadísticas generales
    stats.totalEstudiantes++;
    stats.sumaPromedios += promedio;
    stats.promedioGeneral = stats.sumaPromedios / stats.totalEstudiantes;
    
    // Estadísticas por curso
    if (!stats.porCurso[estudiante.curso]) {
        stats.porCurso[estudiante.curso] = { cantidad: 0, sumaPromedios: 0, promedio: 0 };
    }
    stats.porCurso[estudiante.curso].cantidad++;
    stats.porCurso[estudiante.curso].sumaPromedios += promedio;
    stats.porCurso[estudiante.curso].promedio = stats.porCurso[estudiante.curso].sumaPromedios / stats.porCurso[estudiante.curso].cantidad;
    
    // Mejor y peor promedio
    if (promedio > stats.mejorPromedio) {
        stats.mejorPromedio = promedio;
        stats.mejorEstudiante = estudiante.nombre;
    }
    if (promedio < stats.peorPromedio) {
        stats.peorPromedio = promedio;
        stats.peorEstudiante = estudiante.nombre;
    }
    
    return stats;
}, {
    totalEstudiantes: 0,
    sumaPromedios: 0,
    promedioGeneral: 0,
    porCurso: {},
    mejorPromedio: 0,
    mejorEstudiante: "",
    peorPromedio: 100,
    peorEstudiante: ""
});

console.log("Estadísticas completas:", estadisticasEstudiantes);

// ========================================
// DESAFÍOS AVANZADOS
// ========================================
console.log("\n\nDESAFÍOS AVANZADOS");
console.log("==================\n");

// DESAFÍO 1: Sistema de recomendaciones
console.log("DESAFÍO 1: Sistema de recomendaciones de productos");
const recomendaciones = productos
    .filter(producto => producto.stock > 5)
    .map(producto => ({
        ...producto,
        precioFinal: producto.precio * (1 - producto.descuento),
        puntuacion: (producto.descuento * 50) + ((100 - producto.precio / 20)) + (producto.stock / 10)
    }))
    .sort((a, b) => b.puntuacion - a.puntuacion)
    .slice(0, 3);
console.log("Top 3 productos recomendados:", recomendaciones);

// DESAFÍO 2: Análisis de rendimiento por edad
console.log("\nDESAFÍO 2: Análisis de rendimiento por edad");
const rendimientoPorEdad = estudiantes
    .reduce((analisis, estudiante) => {
        const promedio = estudiante.calificaciones.reduce((sum, cal) => sum + cal, 0) / estudiante.calificaciones.length;
        const rangoEdad = estudiante.edad < 21 ? "18-20" : estudiante.edad < 24 ? "21-23" : "24+";
        
        if (!analisis[rangoEdad]) {
            analisis[rangoEdad] = { estudiantes: 0, sumaPromedios: 0, promedio: 0 };
        }
        
        analisis[rangoEdad].estudiantes++;
        analisis[rangoEdad].sumaPromedios += promedio;
        analisis[rangoEdad].promedio = analisis[rangoEdad].sumaPromedios / analisis[rangoEdad].estudiantes;
        
        return analisis;
    }, {});
console.log("Rendimiento por rango de edad:", rendimientoPorEdad);

console.log("\n=== FIN DE LOS EJERCICIOS ===");



//=======================================
//     METODO FILTER PLATIZI EJERCICIOS
//=======================================

//1. Usa filter para obtener sólo los números pares del arreglo

const numerosarray = [1,2,3,4,5,6,7,8,9,10];
const pares = numerosarray.filter(n => n % 2 === 0);
console.log(numerosarray);
console.log(pares)


// 2. Suma con reduce Enunciado: Emplea reduce para sumar todos los números del arreglo.

const sumaReduce = [1,2,3,4,5];
const suma = sumaReduce.reduce((acc, n) => acc + n, 0)
console.log(suma);

// 3. Encuentra el primer > 10 con find 

const primerNumeroMayor = [1,2,3,4,15,6,7,8,9,10];
const primerNumeroMayor10 = primerNumeroMayor.find( n => n >10)
console.log(primerNumeroMayor)
console.log(primerNumeroMayor10)

// 4. Indice del primero multipo de 3 utilizando findIndex

const indiceMultiplo3 = [1,2,3,4,6,9,12,21,23,25]
const indiceMultiplo = indiceMultiplo3.findIndex( n => n % 3 !==0)
console.log(indiceMultiplo3)
console.log(indiceMultiplo);


// 5. Sub Arreglo del indice de 2 al 5 utilizanco slice

const subArreglo = [1,2,3,4,5,6,7,8,9,10];
const subArreglo2 = subArreglo.slice(2,5);
console.log(subArreglo);
console.log(subArreglo2);

// 6. Ordena el arreglo de forma ascendente utilizando sort

const arregloOrdenado = [1,3,4,2,6,5,7,9,8];
arregloOrdenado.sort((a,b) => a - b);
console.log(arregloOrdenado);

// 7. combinar arreglos con spread 

const arreglo1 = [ 1,2,3];
const arreglo2 = [4,5,6];
const arregloCombinado = [...arreglo1, ...arreglo2];
console.log(arregloCombinado);


//8. filtrar numeros pares con filter

const totalNumeros = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const paresNumeros = totalNumeros.filter( n => n % 2 === 0);
console.log(totalNumeros);
console.log(paresNumeros);

// 9. Suma con reduce

const sumaReduceNumeros = [1,2,3,4,5];
const sumaReduceNum = sumaReduceNumeros.reduce((acc, n) => acc + n, 0);
console.log(sumaReduceNumeros);
console.log(sumaReduceNum);

// 10. Encuentra el primer >10 utilizando find

const primerNumMayor10 = [1,2,3,11,12,15,8,9];
const primerNumeMayor10 = primerNumMayor10.find( n => n > 10);
console.log(primerNumMayor10);
console.log(primerNumeMayor10);

//11. indice del primer multipo de 3 utilizando findIndex

const indiceMult3 = [1,2,4,6,8,12,3,14,15,18,21,24,27,30];
const indiceMulti3 = indiceMult3.findIndex(n => n % 3 === 0);
console.log(indiceMult3);
console.log(indiceMulti3);

//===============================================
// NIVEL INTERMEDIO
//===============================================

//1. Palabras con 5+ letras Aplica filter para quedarte con las palabras cuya longitud sea mayor o igual a 5.

const palabras = ['Juan', 'Martin', 'Santiago', 'Roberto', 'Camilo', 'Pedro', 'Miguel', 'Lorenzo', 'Luca'];
const palabras5 = palabras.filter ( n => n.length >= 5);
console.log(palabras);
console.log(palabras5);

//2. Conteo de ocurrencias Enunciado: Usa reduce para construir un objeto con la cantidad de veces que aparece cada palabra

const palabras2 = ['sol', 'luna', 'tierra', 'mar', 'sol', 'tierra'];
const conteoConcurrencia = palabras2.reduce((acc, p) => {acc[p] = (acc[p] || 0) +1; return acc;}, {});
console.log(conteoConcurrencia);

// 3. Primera palabra que inicia con 'mo' Enunciado: Aplica find para devolver la primera palabra que inicia con 'mo'

const palabras3 = ['moto', 'coche', 'camion', 'moda', 'molino', 'morado'];
const palabraMo = palabras3.find( p => p.startsWith('mo'));
console.log(palabras3);
console.log(palabraMo);

//4. Índice de 'sol' Enunciado: Localiza el índice de la primera aparición exacta de 'sol'.

const palabras4 = ['marte', 'luna' , 'tierra', 'sol', 'algo', 'otra'];
const indiceSol = palabras4.findIndex( p => p === 'sol');
console.log(palabras4);
console.log(indiceSol);

//5. Últimas 3 palabras Enunciado: Con slice(-3) obtén las tres últimas palabras.

const palabras6 = ['marte', 'luna', 'perro', 'gato', 'perro', 'pajaro', 'igual'];
const ultimas3Palabras = palabras6.slice(-3);
console.log(ultimas3Palabras);










