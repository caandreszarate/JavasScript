/*
    Permite acceder al ambito de una funcion exterior desde una funcion interior, en javascript, las clausuras se crean cada vez que una funcion es creada
*/

//Ejemplos

const myGlobal = 0;

function myFunction(){
    const myNumber = 1;
    console.log(myGlobal);

    function parent(){  //Funcion interna
        const inner = 2;
        console.log(myNumber,myGlobal)
        
        function child(){
            console.log(inner,myNumber,myGlobal)
        }

        return child();
    }
    return parent();

}
myFunction();

function sumWithClosure(a) {
    return function (b) {
      if (b === undefined) {
        return a;
      }
      return a + b
    }
  }
  
console.log((sumWithClosure(3)(4)));

