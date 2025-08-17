// main.js
import {
    traerProductos,
    traerProductosLimitados,
    cargarProducto,
    buscarPorId,
    borrarProducto,
    editarProducto
} from "./api/tiendaApi.js";

import {
    guardarEnArchivo,
    sumarAlArchivo,
    limpiarCaros
} from "./archivos/gestorArchivos.js";

async function ejecutar() {
    // Descargo todos los productos y los guardo en un archivo
    const todos = await traerProductos();
    await guardarEnArchivo(todos);

    // Muestro solo 3 productos
    await traerProductosLimitados(3);

    // Agrego un producto ficticio en la API
    await cargarProducto({
        title: "Zapatillas de prueba",
        price: 150,
        category: "calzado",
        description: "Unas zapas cualquiera",
        image: "https://i.pravatar.cc"
    });

    // Busco un producto por ID
    await buscarPorId(1);

    // Modifico un producto
    await editarProducto(1, { title: "Producto editado", price: 222 });

    // Elimino un producto
    await borrarProducto(1);

    // --- Trabajo con archivo local ---
    await sumarAlArchivo({ id: 9999, title: "Guardado local", price: 50 });
    await limpiarCaros(100);
}

ejecutar();
