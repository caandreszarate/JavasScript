/*
    Scope y Contextos de ejecucion en javascript    

    Scope:
    - Es el alcance de una variable
    - Es el contexto en el que una variable puede ser accedida
    
    Keywords:
    - var
    - let
    - const

    Scope:
    -funcion
    -bloque
    -bloque

    Hoisting:
    -si 
    -no
    -no

    Puede reasignarse?
    -si
    -si
    -no

    Puede ser redeclarada?
    -si
    -si
    -no 

    */

    // Ejemplo 1

    const productName = "smartphone";
    const price = 499;
    const brand = 'TechCo';

    function getProductDetails(){
        const productName = "Laptop";
        const price = 899;
        return `The ${productName} costs ${price} an is from the brand ${brand}`;
    }

    console.log(getProductDetails());

    //Ejemplo 2

    const nombreProducto = 'smartphone';
    const precio = 500;
    const marca = 'Dell'

    function detalleProducto(){
        const nombreProducto = 'Laptop';
        const precio = 750;
        return `El ${nombreProducto} cuesta ${precio} y es de la marca ${marca}`;
    }

    console.log(`El producto es ${nombreProducto} y cuesta ${precio}, y esta en la seccion ${marca}`);


    //Ejemplo 3

    