// Desarrollo de una red Social
/* 
Requerimientos del reto:

1. El usuario debe poder ingresar su usuario y contraseña
2. El sistema debe ser capaz de validar si el usuario y contraseña ingresados por el usuario existen en la base de datos
3. Si el usuario y contraseña son correctos, el sistema debe mostrar un mensaje de bienvenida y mostrar el timeline del usuario.
4. Si el usuario y contraseña son incorrectos, el sistema debe mostrar un mensaje de error y no mostrar ningun timeline.

*/

// Importar readline para entrada de datos en Node.j

const usersDatabase = [
    {
      username: "andres",
      password: "123",
    },
    {
      username: "caro",
      password: "456",
    },
    {
      username: "mariana",
      password: "789",
    },
  ];
  
  const usersTimeline = [
    {
      username: "Estefany",
      timeline: "Me encanta Javascript!",
    },
    {
      username: "Oscar",
      timeline: "Bebeloper es lo mejor!",
    },
    {
      username: "Mariana",
      timeline: "A mi me gusta más el café que el té",
    },
    {
      username: "Andres",
      timeline: "Yo hoy no quiero trabajar",
    },
  ];

  const username = prompt(`Usuario: `);
  const password = prompt(`Contraseña: `);

  function usuarioExistente(username,password){
    for(let i =0; i < usersDatabase.length; i++){
        if(usersDatabase[i].username === username && usersDatabase[i].password === password){
            return true;
            break;

        }
    }
    return false;
  }

  function singIn(username,password){
    if(usuarioExistente(username,password)){
        alert(`Bienvenido a tu cuenta ${username}`)
        console.log(usersTimeline)
    }else{
        alert(`Uuuuupsss, Usuario o Contraseña Incorrectos`)
    }
  }
  singIn(username,password)

function timeLine(username,timeline){
for(let y = 0; y < usersTimeline.length; y++){
    if(usersTimeline[y].username && usersTimeline[y].timeline){
        console.log(`usuario ${username} y su time line ${timeLine}`)
    }else{
        console.log(`No tiene timeline`)
    }
}
}

timeLine(username,timeline);









  




