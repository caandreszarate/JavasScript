/*
Anatomia de las funciones:

Las funciones en JavaScript son bloques de código reutilizables que permiten realizar tareas específicas una y otra vez. Imagina que son como piezas de Lego: puedes utilizarlas para crear múltiples objetos con las mismas piezas. Son una herramienta poderosa que, una vez definida, puede utilizarse repetidamente con distintos conjuntos de datos, al igual que usarías un cálculo una y otra vez durante un evento de Black Friday para aplicar descuentos automáticamente a los precios de ropa. Gracias a las funciones, evitamos duplicar código, ahorramos tiempo y minimizamos errores.

*/

function calculateDiscountedPrice (price, discountPercentege){
    const discount = (price * discountPercentege) /100;
    const priceWithDiscount = price - discount;
    return priceWithDiscount;
}

const originalPrice = 100;
const discountPercentege = 20;

const finalPrice = calculateDiscountedPrice(originalPrice, discountPercentege)

console.log(`Original Price ${originalPrice}`);
console.log(`Discount: ${discountPercentege} % `);
console.log(`Price With Discount: ${finalPrice}`);

