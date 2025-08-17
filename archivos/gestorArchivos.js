// Todas las funciones que trabajan con el archivo JSON
// archivos/gestorArchivos.js
import fs from "fs/promises";

// Guarda un array de productos en un archivo local
export async function guardarEnArchivo(datos, archivo = "productos.json") {
    await fs.writeFile(archivo, JSON.stringify(datos, null, 2));
    console.log("Archivo guardado:", archivo);
}

// Agrega un producto al archivo JSON local
export async function sumarAlArchivo(prodNuevo, archivo = "productos.json") {
    let contenido = await fs.readFile(archivo, "utf-8");
    let productos = JSON.parse(contenido);

    productos.push(prodNuevo);

    await fs.writeFile(archivo, JSON.stringify(productos, null, 2));
    console.log("Producto agregado al archivo local");
}

// Elimina todos los productos con precio mayor al que se indique
export async function limpiarCaros(tope, archivo = "productos.json") {
    let contenido = await fs.readFile(archivo, "utf-8");
    let productos = JSON.parse(contenido);

    let filtrados = productos.filter(p => p.price <= tope);

    await fs.writeFile(archivo, JSON.stringify(filtrados, null, 2));
    console.log(`Se eliminaron los que valen más de ${tope}`);
}

