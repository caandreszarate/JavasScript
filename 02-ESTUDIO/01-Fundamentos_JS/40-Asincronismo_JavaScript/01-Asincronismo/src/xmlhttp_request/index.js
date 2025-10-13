const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlApi, callback){
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlApi, true);
    xhttp.onreadystatechange = function(evento){
        if(xhttp.readyState === 4){  // ✅ Corregido: readyState en lugar de onreadystatechange
            if(xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText))
            } else {
                const error = new Error('Error ' + urlApi)
                return callback(error, null)
            }
        }
    }
    xhttp.send();
}

fetchData(`${API}/products`, function(error1, data1){
    if(error1) return console.error(error1);
    fetchData(`${API}/products/${data1[0].id}`, function (error2, data2){
        if(error2) return console.error(error2)
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3){
            if(error3) return console.error(error3)
            console.log(data1[0])
            console.log(data2.title)
            console.log(data3.name)
        })
    })
})
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);

xhr.onload = function() {
  if (xhr.status === 200) {
    try {
      const data = JSON.parse(xhr.responseText);
      console.log("✅ Datos cargados:", data);
    } catch (error) {
      console.log("❌ Error al parsear JSON:", error.message);
    }
  } else {
    console.log("❌ Error al cargar los datos. Status:", xhr.status);
  }
};

xhr.onerror = function() {
  console.log("❌ Error de red o conexión");
};

xhr.send();



//==================================
//      Ejercicios 
//===================================

// 1. Haz una solicitud GET para obtener la lista de usuarios de https://jsonplaceholder.typicode.com/users y muestra los nombres en consola.

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');

xhr.onload = function(){
    if(xhr.status === 200){
        const users = JSON.parse(xhr.responseText)
        users.forEach(user => console.log(user.name))
    }else{
        console.error(`Imposible traer los datos`)
    }
};
xhr.send()

//2. haz una solicitud GET a https://jsonplaceholder.typicode.com/posts/1 y muestra el titulo del post

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();
xhr.open('GET','https://jsonplaceholder.typicode.com/posts/1');
xhr.onload = function(){
    if(xhr.status === 200){
        const posts = JSON.parse(xhr.responseText)
        console.log(`El titulo de la obra es: `, posts.title)
    }
}
xhr.send();

//3. Envia un nuevo post con titulo y cuerpo al endpoint https://jsonplaceholder.typicode.com/posts
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

xhr.onload = function() {
  if (xhr.status === 201) {
    const newPost = JSON.parse(xhr.responseText);
    console.log("Post creado:", newPost);
  } else {
    console.error("Error al crear el post");
  }
};

const data = JSON.stringify({
  title: "Nuevo post de prueba",
  body: "Este es el contenido del post",
  userId: 543
});

xhr.send(data);

















