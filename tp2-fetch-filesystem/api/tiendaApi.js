// api/tiendaApi.js

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Esta es una función para darle un formato claro y consistente
 * a todos los mensajes que se muestran en la consola. Así me aseguro de
 * que la salida sea legible y fácil de entender.
 * uso emogis (Windows + .) para darle un toque visual.
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
 * Esta la función "cerebro" para las peticiones a la API.
 * Decidí crearla para centralizar todo el manejo de errores. Así,
 * si una petición falla por cualquier motivo (ej. la API no responde,
 * el ID no existe), puedo capturar el error en un solo lugar y
 * luego mostrarlo de forma clara. Esto me evita repetir código.
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
 * Con esta función obtenemos todos los productos de la API.
 * Es una operación GET simple, y uso la función makeRequest para
 * hacer la llamada y manejar cualquier problema que pueda surgir.
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
 * Aquí traemos una cantidad limitada de productos, según lo pide
 * la consigna del TP. La cantidad es un parámetro, lo que hace que
 * la función sea flexible y reutilizable.
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
 * Con esta función cargo un producto nuevo usando el método POST.
 * Le paso el objeto del producto en el cuerpo de la petición.
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
 * Aquí usamos el método DELETE para eliminar un producto de la API
 * basándome en su ID. Es una operación simple y directa.
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
 * Finalmente, esta función nos permite editar un producto.
 * Utilizo el método PUT y le envío los cambios en el cuerpo de la petición.
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