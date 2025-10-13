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
