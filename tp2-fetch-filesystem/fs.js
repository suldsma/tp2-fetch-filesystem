import * as fs from 'fs';
import {auxiliar_p_filtrar} from './api.js';

let b

//FileSystem
//Utilizando el archivo creado en el punto anterior:
//8. Agregar producto al archivo local con la consulta limitada al azar.
function agregarProductoLocal(){
    const nombreArchivo = 'lista.json';
    fs.readFile(nombreArchivo, 'utf8', (err, archivo) => {
      if (err) {
          console.error('8. Error al leer el archivo:', err);
      } else {
          console.log('8. Archivo JSON abierto exitosamente:', nombreArchivo);
          let archivo2 = JSON.parse(archivo);
          //archivo2.push(nuevo_producto);
          const datosJSON = JSON.stringify(archivo2,null,2);
          fs.writeFile(nombreArchivo, datosJSON, 'utf8', (err) => {
          if (err) {
              console.error('8. Error al escribir el archivo:', err);
          } else {
              console.log('8. Archivo JSON creado exitosamente:', nombreArchivo);
              return b = archivo2;
          }
      });
      }
      });
        
      };
  
  //Eliminar los productos superiores a un determinado valor.
  /*
  function eliminarPreciosMayoresA(precio){
    const nombreArchivo = 'lista.json';
    fs.readFile(nombreArchivo, 'utf8', (err, archivo) => {
      if (err) {
          console.error('Error al leer el archivo:', err);
      } else {
          console.log('Archivo JSON abierto exitosamente:', nombreArchivo);
          console.log(archivo)
          let archivo2 = JSON.parse(archivo);
          let prod_menores_a = archivo2.filter(producto => producto.price < precio);
          console.log(prod_menores_a);
          const datosJSON = JSON.stringify(prod_menores_a,null,2);
          fs.writeFile(nombreArchivo, datosJSON, 'utf8', (err) => {
          if (err) {
              console.error('Error al escribir el archivo:', err);
          } else {
              console.log('Archivo JSON filtrado exitosamente:', nombreArchivo);
              console.log(prod_menores_a);
          }
      });
      }
      });
        
      };
*/
let myInterval;

function eliminarPreciosMayoresA(precio) {
myInterval = setInterval(() => {
    if (auxiliar_p_filtrar === 0) {
        console.log("9. Aún no persisten los datos a filtrar");
    } else {
    const nombreArchivo = 'lista.json';
    fs.readFile(nombreArchivo, 'utf8', (err, archivo) => {
      if (err) {
          console.error('9. Error al leer el archivo:', err);
      } else {
          console.log('9. Archivo JSON abierto exitosamente para filtrarlo', nombreArchivo, `
`);
          let archivo2 = JSON.parse(archivo);
          let prod_menores_a = archivo2.filter(producto => producto.price < precio);
          const datosJSON = JSON.stringify(prod_menores_a,null,2);
          fs.writeFile(nombreArchivo, datosJSON, 'utf8', (err) => {
          if (err) {
              console.error('9. Error al escribir el archivo:', err);
          } else {
              console.log('9. Archivo JSON filtrado exitosamente:', nombreArchivo);
              console.log(prod_menores_a);
          }
      });
      }
      });
        console.log("9. Ahora si!!! Se realizó el filtro del archivo JSON!!!");
        detener();
    }  
}, 1000);
};

function detener () {
clearInterval(myInterval);
console.log("9. se detuvo función setInterval para el filtro!!");
};

export {
        agregarProductoLocal, 
        eliminarPreciosMayoresA
      }
      
//eliminarPreciosMayoresA(50);

