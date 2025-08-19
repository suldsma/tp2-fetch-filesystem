// api/tiendaApi.js

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Función auxiliar para dar formato a la salida en la consola.
 * Usamos emojis y un formato consistente para mostrar el estado de las operaciones.
 */
function displayOperation(operation, success, data = null, details = '') {
    const emoji = success ? '✅' : '❌';
    const status = success ? 'ÉXITO' : 'ERROR';

    console.log(`\n${emoji} ${operation} - ${status}`);
    if (details) console.log(`   📝 ${details}`);

    if (success && data) {
        if (Array.isArray(data)) {
            console.log(`   📊 Cantidad: ${data.length} elementos`);
        } else if (typeof data === 'object' && data !== null) {
            console.log(`   🆔 ID: ${data.id || 'N/A'}`);
            if (data.title) console.log(`   📌 Título: ${data.title}`);
            if (data.price) console.log(`   💰 Precio: $${data.price}`);
        }
    }
}

/**
 * Esta es la función principal para las peticiones a la API.
 * La creamos para centralizar el manejo de errores y la lógica de las peticiones.
 * De esta forma, si una solicitud falla por cualquier motivo (por ejemplo, la API no responde o el ID no existe),
 * podemos capturar el error en un solo lugar y mostrarlo de manera clara.
 * Esto nos ayuda a evitar la repetición de código y mantiene nuestra aplicación más organizada.
 */
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}. Detalles: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * ✅ CONSIGNA: "Recuperar la información de todos los productos (GET)".
 * Con esta función, obtenemos todos los productos de la API.
 * Realizamos una operación GET simple y utilizamos la función `makeRequest` para
 * centralizar la llamada y manejar cualquier problema que pueda surgir.
 * Esto asegura que nuestra lógica de peticiones sea consistente y robusta.
 */
export async function traerTodosLosProductos() {
    try {
        console.log('🔄 Obteniendo todos los productos de la API...');
        const products = await makeRequest(`${API_BASE_URL}/products`);
        displayOperation(
            'GET Todos los Productos (API)',
            true,
            products,
            `Se obtuvieron ${products.length} productos de la API`
        );
        return products;
    } catch (error) {
        displayOperation('GET Todos los Productos (API)', false, null, error.message);
        return null;
    }
}

/**
 * ✅ CONSIGNA: "Recuperar la información de un número limitado de productos (GET)".
 * Para cumplir con esta consigna, creamos una función que recupera un número limitado de productos.
 * Decidimos que la cantidad sea un parámetro, lo que hace que la función sea flexible y reutilizable para futuras necesidades del proyecto.
 */
export async function traerProductosLimitados(cantidad = 5) {
    try {
        console.log(`🔄 Obteniendo ${cantidad} productos limitados de la API...`);
        const products = await makeRequest(`${API_BASE_URL}/products?limit=${cantidad}`);
        displayOperation(
            'GET Productos Limitados (API)',
            true,
            products,
            `Se obtuvieron ${products.length} productos con límite de ${cantidad}`
        );
        return products;
    } catch (error) {
        displayOperation('GET Productos Limitados (API)', false, null, error.message);
        return null;
    }
}

/**
 * ✅ CONSIGNA: "Agregar un nuevo producto (POST)".
 * Con esta función cargamos un producto nuevo usando el método POST.
 * Pasamos el objeto del producto en el cuerpo de la petición para que la API lo cree.
 */
export async function cargarProducto(prod) {
    try {
        console.log('🔄 Agregando nuevo producto a la API...');
        const newProduct = await makeRequest(`${API_BASE_URL}/products`, {
            method: 'POST',
            body: JSON.stringify(prod)
        });
        displayOperation(
            'POST Nuevo Producto (API)',
            true,
            newProduct,
            'Producto creado exitosamente en la API'
        );
        return newProduct;
    } catch (error) {
        displayOperation('POST Nuevo Producto (API)', false, null, error.message);
        return null;
    }
}

/**
 * ✅ CONSIGNA: "Buscar la información de un determinado producto, utilizando un 'id' como parámetro (GET)".
 * Esta función es para buscar un producto específico usando su ID.
 * También usa una petición GET, pero con el ID en la URL.
 */
export async function buscarProductoPorId(id) {
    try {
        console.log(`🔄 Buscando producto con ID: ${id} en la API...`);
        const product = await makeRequest(`${API_BASE_URL}/products/${id}`);
        displayOperation(
            'GET Producto por ID (API)',
            true,
            product,
            `Producto encontrado con ID ${id}`
        );
        return product;
    } catch (error) {
        displayOperation('GET Producto por ID (API)', false, null, error.message);
        return null;
    }
}

/**
 * ✅ CONSIGNA: "Eliminar un producto (DELETE)".
 * Aquí usamos el método DELETE para eliminar un producto de la API
 * basándonos en su ID. Es una operación simple y directa.
 */
export async function borrarProducto(id) {
    try {
        console.log(`🔄 Eliminando producto con ID: ${id} de la API...`);
        const result = await makeRequest(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE'
        });
        displayOperation(
            'DELETE Producto (API)',
            true,
            result,
            `Producto con ID ${id} eliminado de la API`
        );
        return result;
    } catch (error) {
        displayOperation('DELETE Producto (API)', false, null, error.message);
        return null;
    }
}

/**
 * ✅ CONSIGNA: "Modificar los datos de un producto (UPDATE)".
 * Esta función nos permite editar un producto.
 * Utilizamos el método PUT y enviamos los cambios en el cuerpo de la petición.
 * Esto nos permite actualizar los datos de un producto existente.
 */
export async function editarProducto(id, cambios) {
    try {
        console.log(`🔄 Modificando producto con ID: ${id} en la API...`);
        const updatedProduct = await makeRequest(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(cambios)
        });
        displayOperation(
            'PUT Actualizar Producto (API)',
            true,
            updatedProduct,
            `Producto con ID ${id} actualizado exitosamente`
        );
        return updatedProduct;
    } catch (error) {
        displayOperation('PUT Actualizar Producto (API)', false, null, error.message);
        return null;
    }
}