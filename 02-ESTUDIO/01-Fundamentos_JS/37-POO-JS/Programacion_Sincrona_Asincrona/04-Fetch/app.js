//=======================================
// Ejercicios utilizando async/await y fetch
//=======================================

//Ejercicio 1: Obtener un post de una API
//Enunciado: Crea una función asíncrona que obtenga un post desde la API de JSONPlaceholder.

async function getPost(){
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    let datos = await response.json();
    console.log(datos)
};
getPost();

/* 
Ejercicio 2: Obtener una lista de usuarios
Enunciado: Muestra todos los usuarios de la API.
*/

async function getUser(){
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let datos = await response.json();
    console.log(datos);
};
getUser();

/*
Ejercicio 3: Mostrar solo el nombre de los usuarios
Enunciado: Filtra para mostrar solo los nombres.
*/

async function getUserName(){
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let users = await response.json();
    users.forEach(user => console.log(user.name));
};
getUserName();


/*
Ejercicio 4: Manejo de errores con try/catch
Enunciado: Captura errores si la API falla.
*/

async function getData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/invalid-url');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error al obtener datos:", error);
    }
  }
  getData();

  /*
  Ejercicio 5: Obtener los comentarios de un post
 Enunciado: Trae los comentarios del post con ID = 1.
  */

 async function getComments(){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
    const datos = await response.json();
    console.log(datos);
 }
getComments();




















