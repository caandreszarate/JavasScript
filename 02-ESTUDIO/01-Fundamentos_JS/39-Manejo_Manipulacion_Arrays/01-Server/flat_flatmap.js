/*
Metodos para manipular arrays que tienen arrays dentro
*/

const matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18,[19,20,21,[22,23,24,[25,26,27]]]]
  ];


  
  console.log(matriz);
  const rta = matriz.flat(5)
  console.log('Array: ', rta);

  /*
  Flat Map: Metodo que tiene la funcion de un flat y un map de irlo transformando a medida que lo va aplanando
  */

  
  