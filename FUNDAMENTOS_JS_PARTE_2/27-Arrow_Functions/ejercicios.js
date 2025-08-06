// ====================================================================
// EJERCICIOS PRÁCTICOS - ARROW FUNCTIONS
// ====================================================================

console.log("🎯 EJERCICIOS PRÁCTICOS DE ARROW FUNCTIONS 🎯");
console.log("===============================================\n");

// ====================================================================
// EJERCICIO 1: TRANSFORMACIONES BÁSICAS
// ====================================================================

console.log("EJERCICIO 1: TRANSFORMACIONES BÁSICAS");
console.log("--------------------------------------");

// Convierte estas funciones tradicionales a arrow functions
console.log("✏️ Conversión de funciones tradicionales:");

// Función tradicional
function doblar(numero) {
    return numero * 2;
}

// ✅ SOLUCIÓN: Arrow function
const doblarArrow = numero => numero * 2;

console.log("Función tradicional - doblar(5):", doblar(5));
console.log("Arrow function - doblarArrow(5):", doblarArrow(5));

// Más ejemplos para convertir:
function saludar(nombre) {
    return `¡Hola, ${nombre}!`;
}

function esMayor(a, b) {
    return a > b;
}

function calcularArea(radio) {
    return Math.PI * radio * radio;
}

// ✅ SOLUCIONES:
const saludarArrow = nombre => `¡Hola, ${nombre}!`;
const esMayorArrow = (a, b) => a > b;
const calcularAreaArrow = radio => Math.PI * radio * radio;

console.log("Conversiones completadas:");
console.log("saludarArrow('Ana'):", saludarArrow('Ana'));
console.log("esMayorArrow(10, 5):", esMayorArrow(10, 5));
console.log("calcularAreaArrow(3):", calcularAreaArrow(3).toFixed(2));
console.log("");

// ====================================================================
// EJERCICIO 2: PROCESAMIENTO DE ARRAYS
// ====================================================================

console.log("EJERCICIO 2: PROCESAMIENTO DE ARRAYS");
console.log("-------------------------------------");

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const palabras = ["javascript", "python", "java", "c++", "go", "rust"];
const precios = [19.99, 25.50, 12.75, 8.99, 45.00, 33.25];

// Ejercicios con map()
console.log("🔄 Ejercicios con map():");
const numerosAlCubo = numeros.map(n => n ** 3);
const palabrasEnMayusculas = palabras.map(palabra => palabra.toUpperCase());
const preciosConImpuesto = precios.map(precio => precio * 1.21); // 21% de impuesto

console.log("Números al cubo:", numerosAlCubo);
console.log("Palabras en mayúsculas:", palabrasEnMayusculas);
console.log("Precios con impuesto:", preciosConImpuesto.map(p => p.toFixed(2)));

// Ejercicios con filter()
console.log("\n🔍 Ejercicios con filter():");
const numerosMayoresA5 = numeros.filter(n => n > 5);
const palabrasLargas = palabras.filter(palabra => palabra.length > 4);
const preciosBaratos = precios.filter(precio => precio < 20);

console.log("Números mayores a 5:", numerosMayoresA5);
console.log("Palabras largas (>4 letras):", palabrasLargas);
console.log("Precios baratos (<$20):", preciosBaratos);

// Ejercicios con reduce()
console.log("\n🔗 Ejercicios con reduce():");
const sumaTotal = numeros.reduce((acc, n) => acc + n, 0);
const palabraMasLarga = palabras.reduce((acc, palabra) => 
    palabra.length > acc.length ? palabra : acc, "");
const precioPromedio = precios.reduce((acc, precio) => acc + precio, 0) / precios.length;

console.log("Suma total:", sumaTotal);
console.log("Palabra más larga:", palabraMasLarga);
console.log("Precio promedio:", precioPromedio.toFixed(2));
console.log("");

// ====================================================================
// EJERCICIO 3: OBJETOS Y ARROW FUNCTIONS
// ====================================================================

console.log("EJERCICIO 3: OBJETOS Y ARROW FUNCTIONS");
console.log("---------------------------------------");

const empleados = [
    { nombre: "Ana", departamento: "IT", salario: 50000, experiencia: 3 },
    { nombre: "Carlos", departamento: "Marketing", salario: 45000, experiencia: 5 },
    { nombre: "María", departamento: "IT", salario: 60000, experiencia: 7 },
    { nombre: "Luis", departamento: "Ventas", salario: 40000, experiencia: 2 },
    { nombre: "Elena", departamento: "IT", salario: 55000, experiencia: 4 }
];

console.log("👥 Procesamiento de empleados:");

// Filtrar empleados de IT
const empleadosIT = empleados.filter(emp => emp.departamento === "IT");
console.log("Empleados de IT:", empleadosIT.map(emp => emp.nombre));

// Calcular salario anual (con bonificación por experiencia)
const empleadosConBonificacion = empleados.map(emp => ({
    ...emp,
    salarioAnual: emp.salario + (emp.experiencia * 1000) // $1000 por año de experiencia
}));

console.log("Salarios con bonificación:");
empleadosConBonificacion.forEach(emp => 
    console.log(`${emp.nombre}: $${emp.salarioAnual.toLocaleString()}`)
);

// Encontrar el empleado con más experiencia
const masExperimentado = empleados.reduce((acc, emp) => 
    emp.experiencia > acc.experiencia ? emp : acc
);

console.log("Empleado más experimentado:", masExperimentado.nombre, 
    `(${masExperimentado.experiencia} años)`);

// Calcular salario promedio por departamento
const departamentos = [...new Set(empleados.map(emp => emp.departamento))];
const salariosPorDepartamento = departamentos.map(dept => {
    const empleadosDept = empleados.filter(emp => emp.departamento === dept);
    const salarioPromedio = empleadosDept.reduce((acc, emp) => acc + emp.salario, 0) / empleadosDept.length;
    return { departamento: dept, salarioPromedio: salarioPromedio.toFixed(2) };
});

console.log("Salarios promedio por departamento:");
salariosPorDepartamento.forEach(dept => 
    console.log(`${dept.departamento}: $${dept.salarioPromedio}`)
);
console.log("");

// ====================================================================
// EJERCICIO 4: FUNCIONES DE UTILIDAD
// ====================================================================

console.log("EJERCICIO 4: FUNCIONES DE UTILIDAD");
console.log("-----------------------------------");

// Crear funciones de utilidad usando arrow functions
const utilidades = {
    // Matemáticas
    esPrimo: n => {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    },
    
    factorial: n => n <= 1 ? 1 : n * utilidades.factorial(n - 1),
    
    fibonacci: n => n <= 1 ? n : utilidades.fibonacci(n - 1) + utilidades.fibonacci(n - 2),
    
    // Strings
    contarVocales: str => (str.match(/[aeiouáéíóú]/gi) || []).length,
    
    esPalindromo: str => {
        const limpio = str.toLowerCase().replace(/[^a-z]/g, '');
        return limpio === limpio.split('').reverse().join('');
    },
    
    generarSlug: str => str.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim(),
    
    // Arrays
    encontrarDuplicados: arr => arr.filter((item, index) => arr.indexOf(item) !== index),
    
    eliminarDuplicados: arr => [...new Set(arr)],
    
    mezclarArray: arr => {
        const nuevo = [...arr];
        for (let i = nuevo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]];
        }
        return nuevo;
    }
};

console.log("🔧 Probando funciones de utilidad:");
console.log("¿Es 17 primo?:", utilidades.esPrimo(17));
console.log("Factorial de 5:", utilidades.factorial(5));
console.log("Fibonacci de 7:", utilidades.fibonacci(7));
console.log("Vocales en 'JavaScript':", utilidades.contarVocales('JavaScript'));
console.log("¿Es 'anilina' palíndromo?:", utilidades.esPalindromo('anilina'));
console.log("Slug de 'Mi Título Especial!':", utilidades.generarSlug('Mi Título Especial!'));

const arrayConDuplicados = [1, 2, 3, 2, 4, 3, 5, 1];
console.log("Array original:", arrayConDuplicados);
console.log("Duplicados encontrados:", utilidades.encontrarDuplicados(arrayConDuplicados));
console.log("Sin duplicados:", utilidades.eliminarDuplicados(arrayConDuplicados));
console.log("Array mezclado:", utilidades.mezclarArray(arrayConDuplicados));
console.log("");

// ====================================================================
// EJERCICIO 5: MANEJO DE EVENTOS Y CALLBACKS
// ====================================================================

console.log("EJERCICIO 5: CALLBACKS Y PROGRAMACIÓN ASÍNCRONA");
console.log("------------------------------------------------");

// Simulador de eventos
const simuladorEventos = {
    eventos: [],
    
    addEventListener: (evento, callback) => {
        simuladorEventos.eventos.push({ evento, callback });
    },
    
    emit: (evento, datos) => {
        simuladorEventos.eventos
            .filter(e => e.evento === evento)
            .forEach(e => e.callback(datos));
    }
};

// Registrar event listeners con arrow functions
simuladorEventos.addEventListener('usuario-creado', usuario => 
    console.log(`✅ Usuario creado: ${usuario.nombre}`)
);

simuladorEventos.addEventListener('compra-realizada', compra => 
    console.log(`💰 Compra: ${compra.producto} por $${compra.precio}`)
);

simuladorEventos.addEventListener('error-sistema', error => 
    console.log(`❌ Error: ${error.mensaje}`)
);

// Simular eventos
console.log("🎭 Simulando eventos:");
simuladorEventos.emit('usuario-creado', { nombre: "Juan Pérez", email: "juan@email.com" });
simuladorEventos.emit('compra-realizada', { producto: "Laptop", precio: 1200 });
simuladorEventos.emit('error-sistema', { mensaje: "Conexión perdida", codigo: 500 });

// Promesas con arrow functions
const operacionesAsincronas = {
    simularCarga: tiempo => new Promise(resolve => 
        setTimeout(() => resolve(`Operación completada en ${tiempo}ms`), tiempo)
    ),
    
    simularError: () => new Promise((resolve, reject) => 
        setTimeout(() => reject(new Error("Operación falló")), 500)
    ),
    
    procesarDatos: datos => Promise.resolve(
        datos.map(item => item.toUpperCase())
    )
};

console.log("\n⏰ Operaciones asíncronas:");
operacionesAsincronas.simularCarga(100)
    .then(resultado => console.log("✅", resultado))
    .catch(error => console.log("❌", error.message));

operacionesAsincronas.procesarDatos(['javascript', 'python', 'java'])
    .then(datos => console.log("📊 Datos procesados:", datos));
console.log("");

// ====================================================================
// EJERCICIO 6: COMPOSICIÓN DE FUNCIONES
// ====================================================================

console.log("EJERCICIO 6: COMPOSICIÓN DE FUNCIONES");
console.log("--------------------------------------");

// Funciones simples que se pueden componer
const operaciones = {
    sumar: n => x => x + n,
    multiplicar: n => x => x * n,
    elevar: n => x => Math.pow(x, n),
    aplicarDescuento: porcentaje => precio => precio * (1 - porcentaje / 100),
    aplicarImpuesto: porcentaje => precio => precio * (1 + porcentaje / 100)
};

// Función para componer múltiples funciones
const componer = (...funciones) => valor => 
    funciones.reduceRight((acc, fn) => fn(acc), valor);

// Ejemplos de composición
console.log("🔗 Composición de funciones:");

// Operación matemática: (x + 5) * 2 ^ 3
const operacionMatematica = componer(
    operaciones.elevar(3),
    operaciones.multiplicar(2),
    operaciones.sumar(5)
);

console.log("Operación (x+5)*2^3 con x=3:", operacionMatematica(3));

// Cálculo de precio final: precio -> descuento -> impuesto
const calcularPrecioFinal = componer(
    operaciones.aplicarImpuesto(21), // 21% de impuesto
    operaciones.aplicarDescuento(15) // 15% de descuento
);

const precioOriginal = 100;
const precioFinal = calcularPrecioFinal(precioOriginal);
console.log(`Precio: $${precioOriginal} -> Descuento 15% -> Impuesto 21% = $${precioFinal.toFixed(2)}`);

// Pipeline de procesamiento de texto
const procesarTexto = componer(
    texto => texto.trim(),
    texto => texto.toLowerCase(),
    texto => texto.replace(/[^a-z0-9\s]/g, ''),
    texto => texto.split(' ').filter(palabra => palabra.length > 0),
    palabras => palabras.join('-')
);

console.log("Procesamiento de texto:");
console.log("'  ¡Hola Mundo! 123  ' ->", procesarTexto('  ¡Hola Mundo! 123  '));
console.log("");

// ====================================================================
// EJERCICIO 7: RETO FINAL - SISTEMA DE GESTIÓN
// ====================================================================

console.log("EJERCICIO 7: RETO FINAL - SISTEMA DE GESTIÓN");
console.log("----------------------------------------------");

// Sistema complejo usando solo arrow functions
const sistemaGestion = {
    usuarios: [
        { id: 1, nombre: "Ana", rol: "admin", activo: true, puntos: 150 },
        { id: 2, nombre: "Carlos", rol: "user", activo: true, puntos: 89 },
        { id: 3, nombre: "María", rol: "moderator", activo: false, puntos: 200 },
        { id: 4, nombre: "Luis", rol: "user", activo: true, puntos: 45 }
    ],
    
    // Filtros
    usuariosActivos: () => sistemaGestion.usuarios.filter(u => u.activo),
    usuariosPorRol: rol => sistemaGestion.usuarios.filter(u => u.rol === rol),
    usuariosConPuntosMayoresA: puntos => sistemaGestion.usuarios.filter(u => u.puntos > puntos),
    
    // Transformaciones
    agregarBonus: bonus => sistemaGestion.usuarios.map(u => ({
        ...u,
        puntos: u.puntos + bonus,
        puntosOriginales: u.puntos
    })),
    
    promoverUsuarios: puntosMinimos => sistemaGestion.usuarios.map(u => ({
        ...u,
        rol: u.puntos >= puntosMinimos && u.rol === 'user' ? 'premium' : u.rol
    })),
    
    // Análisis
    estadisticas: () => {
        const activos = sistemaGestion.usuariosActivos();
        const totalPuntos = sistemaGestion.usuarios.reduce((acc, u) => acc + u.puntos, 0);
        const promedioPuntos = totalPuntos / sistemaGestion.usuarios.length;
        
        return {
            totalUsuarios: sistemaGestion.usuarios.length,
            usuariosActivos: activos.length,
            usuariosInactivos: sistemaGestion.usuarios.length - activos.length,
            totalPuntos,
            promedioPuntos: promedioPuntos.toFixed(2),
            usuarioTopPuntos: sistemaGestion.usuarios.reduce((acc, u) => 
                u.puntos > acc.puntos ? u : acc
            )
        };
    },
    
    // Reportes
    generarReporte: () => {
        const stats = sistemaGestion.estadisticas();
        const usuariosPorRol = sistemaGestion.usuarios.reduce((acc, u) => {
            acc[u.rol] = (acc[u.rol] || 0) + 1;
            return acc;
        }, {});
        
        return {
            ...stats,
            distribucionRoles: usuariosPorRol,
            usuariosVIP: sistemaGestion.usuariosConPuntosMayoresA(100).map(u => u.nombre)
        };
    }
};

console.log("📊 Sistema de Gestión en funcionamiento:");
console.log("Usuarios activos:", sistemaGestion.usuariosActivos().map(u => u.nombre));
console.log("Admins:", sistemaGestion.usuariosPorRol('admin').map(u => u.nombre));
console.log("Usuarios VIP (>100 puntos):", sistemaGestion.usuariosConPuntosMayoresA(100).map(u => u.nombre));

console.log("\n📈 Estadísticas:");
const stats = sistemaGestion.estadisticas();
Object.entries(stats).forEach(([key, value]) => {
    if (typeof value === 'object') {
        console.log(`${key}:`, value.nombre, `(${value.puntos} puntos)`);
    } else {
        console.log(`${key}:`, value);
    }
});

console.log("\n📋 Reporte completo:");
const reporte = sistemaGestion.generarReporte();
console.log("Distribución de roles:", reporte.distribucionRoles);
console.log("Usuarios VIP:", reporte.usuariosVIP);

console.log("\n🎉 ¡Todos los ejercicios completados!");
console.log("Ahora dominas las Arrow Functions en JavaScript! 🚀");
console.log("==================================================");