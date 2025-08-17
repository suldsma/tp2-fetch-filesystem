// Manejo de la API con fetch
// Todas las funciones que trabajan con la API (GET, POST, PUT, DELETE)

// api/tiendaApi.js
const URL_BASE = "https://fakestoreapi.com/products";

// Trae todos los productos de la API
export async function traerProductos() {
    const respuesta = await fetch(URL_BASE);
    const lista = await respuesta.json();
    console.log("Productos descargados:", lista.length);
    return lista;
}

// Trae solo una cantidad limitada de productos
export async function traerProductosLimitados(cantidad = 5) {
    const resp = await fetch(`${URL_BASE}?limit=${cantidad}`);
    const lista = await resp.json();
    console.log(`Mostrando ${cantidad} productos:`);
    return lista;
}

// Carga un producto nuevo en la API
export async function cargarProducto(prod) {
    const resp = await fetch(URL_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prod)
    });
    const resultado = await resp.json();
    console.log("Se cargó un producto nuevo:", resultado);
    return resultado;
}

// Busca un producto puntual por ID
export async function buscarPorId(id) {
    const resp = await fetch(`${URL_BASE}/${id}`);
    const item = await resp.json();
    console.log("Producto encontrado:", item);
    return item;
}

// Borra un producto de la API
export async function borrarProducto(id) {
    const resp = await fetch(`${URL_BASE}/${id}`, { method: "DELETE" });
    const borrado = await resp.json();
    console.log("Se eliminó de la API:", borrado);
    return borrado;
}

// Edita los datos de un producto ya existente
export async function editarProducto(id, cambios) {
    const resp = await fetch(`${URL_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cambios)
    });
    const actualizado = await resp.json();
    console.log("Producto actualizado:", actualizado);
    return actualizado;
}
