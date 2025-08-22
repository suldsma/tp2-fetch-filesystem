//Trabajo práctico Nº 2
import fetch from 'node-fetch';
//import fs from 'fs';
//import * as fs from 'fs/promises';
import * as fs from 'fs';

//Número al azar para productos del 1 al 20
const numero_al_azar = Math.trunc((Math.random()*20)) + 1
//URL API a utilizar
const api = "https://fakestoreapi.com/products";
//Lista vacía para productos a obtener
let lista = [];
//Para obtener un número limitado de productos del 1 al "numero_al_azar" (1 al 20)
const numero_productos = numero_al_azar;
//Para almacenar los productos de un numero limitado
let lista_num_limitado = [];
export let auxiliar_p_filtrar = 0;
//Para almacenar un solo producto elegido al azar (1 al 20) con "numero_al_azar"
let lista_un_producto = [];
//Para agregar un nuevo producto con étodo POST
const nuevo_producto = {
  "title": "TITLE",
  "price": 10000,
  "description": "BUEN PRODUCTO QUE SIRVE PARA TODO",
  "category": "TECNO",
  "image": "https://TP2/title.jpg",
  "rating": {
    "rate": 5,
    "count": 1200
  }
};
//Para actualizar atributos de un producto con método PUT
const actualizar_producto = {
  "title": "PRODUCTO ACTUALIZADO",
  "price": 5000,
};

/*
API Fecth
Utilizando el API https://fakestoreapi.com/ realizar las siguientes tareas:
1. Recuperar la información de todos los productos (GET).
*/
async function traerProductos() {
  const respuesta = await fetch(api);
  lista = await respuesta.json();
  console.log(`1. Recuperar la información de todos los productos (GET). 
  Se descargaron`, lista.length, `items de la api
  `);
  return lista
};

//2. Recuperar la información de un número limitado de productos (GET).
//Se establece número al azar y se aplica "limit="
async function numeroLimitadoProductos() {
  const respuesta = await fetch(api + "?limit=" + numero_productos);
  lista_num_limitado = await respuesta.json();
  console.log(`2. Recuperar la información de un número limitado de productos (GET).
Se descargaron`, lista_num_limitado.length, `items de la api
`);
  return lista_num_limitado
};

//3. Persistir los datos de la consulta anterior en un archivo local JSON.

let myInterval;

function persistirProductos(){
  myInterval = setInterval(() => {
    if (lista_num_limitado.length === 0) {
        console.log(`3. Aún no tenemos la lista a persistir
        `);
    } else {
      const datosJSON = JSON.stringify(lista_num_limitado,null,2);
      const nombreArchivo = 'lista.json';
      fs.writeFile(nombreArchivo, datosJSON, 'utf8', (err) => {
      if (err) {
          console.error('Error al escribir el archivo:', err);
      } else {
          console.log(`3. Persistir los datos de la consulta anterior en un archivo local JSON. 
Archivo JSON creado exitosamente:, ` + nombreArchivo + 
` `);
          return auxiliar_p_filtrar = 1
      }
      });    
        console.log(`3. Ahora si!!! Se creó el archivo JSON!!!
`);
        detener();
  }
  }, 1000);
  };
  
  function detener () {
  clearInterval(myInterval);
  console.log(`3. Y se detuvo función setInterval para persistencia!!
  `);
  };

//4. Agregar un nuevo producto (POST) a la API.
async function crearNuevoProducto(){
  fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevo_producto)
  })
    .then(response => response.json())
    .then(data => console.log(`4. Agregar un nuevo producto (POST) a la API. 
Se agregó: `  + JSON.stringify(nuevo_producto) + `a la API
`)
    )
};

//5. Buscar la información de un determinado producto, utilizando un “id” como parámetro (GET) en la API.
async function buscarUnProducto() {
    const respuesta = await fetch(api + "/" + numero_al_azar);
    lista_un_producto.push(await respuesta.json());
    console.log(`5. Buscar la información de un determinado producto, utilizando un “id” como parámetro (GET) en la API
Se descargó`, lista_un_producto.length, `item de la api con Id: `, numero_al_azar, `precio: `, lista_un_producto[0].price, `
`);
    return lista_un_producto
  };

//6. Eliminar un producto (DELETE) de la API.
async function eliminarProducto(){
  fetch(api + "/" + numero_al_azar, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => (console.log(`6. Eliminar un producto (DELETE) de la API 
    Se eliminó el producto con id: ` + data.id + `, precio: ` + data.price + `
    `)) );
};

//7. Modificar los datos de un producto (UPDATE) de la API.
async function actualizarProducto(){
  fetch(api + "/" + numero_al_azar, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actualizar_producto)
  })
    .then(response => response.json())
    .then(data => console.log(`7. Modificar los datos de un producto (UPDATE) de la API
Se actualizó el producto con id: ${data.id} precio: ${data.price}
`));
};


/*
traerProductos().then(() => {
  console.log("console.log con .then " + lista.length);
  persistirProductos();
});

traerProductos(); 

setTimeout(() => {console.log("console.log 3500 " + lista.length)
},3500);

setTimeout(() => {console.log("console.log 1500 " + lista.length)
},1500);

setTimeout(() => {console.log("console.log 100 " + lista.length)
},100);

console.log("console.log " + lista.length);
*/

export {
  traerProductos, 
  numeroLimitadoProductos, 
  persistirProductos, 
  crearNuevoProducto,
  buscarUnProducto, 
  eliminarProducto,
  actualizarProducto,
}