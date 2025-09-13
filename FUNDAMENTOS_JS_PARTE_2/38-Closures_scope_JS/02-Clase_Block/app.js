/*
    Block Scope
*/

function frutas(){
    if(true){
        var fruit1 = "Apple"; //Function Scope
        let fruit2 = 'Piña'; //Block Scope
        const fruit3 = 'Mora'; //Block Scope

        console.log(fruit2);
        console.log(fruit3);
    }
    console.log(fruit1);
    
};

frutas();

