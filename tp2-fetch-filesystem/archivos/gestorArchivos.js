// archivos/gestorArchivos.js
import fs from "fs/promises";
import path from 'path'; // Para manejar rutas de archivos de forma segura

const PRODUCTS_FILE = 'products.json';
const filePath = path.join(process.cwd(), PRODUCTS_FILE); // process.cwd() para la ruta base del proyecto

/**
 * Esta es una función auxiliar  para hacer que los títulos en la consola
 * y se vean más bonitos y organizados. Me ayuda a separar visualmente las diferentes
 * partes del programa.
 */
function printSeparator(title = '', symbol = '=', length = 60) {
    if (title) {
        const padding = Math.max(0, Math.floor((length - title.length - 2) / 2));
        console.log(symbol.repeat(padding) + ` ${title} ` + symbol.repeat(padding));
    } else {
        console.log(symbol.repeat(length));
    }
}

/**
 * Esta función es parecida a la de la API. La creamos para mostrar los
 * resultados de cada operación de archivo de una manera consistente, con emojis
 * y un formato claro, para saber rápidamente si todo salió bien.
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
 * Esta es una función interna que me ayuda a leer el archivo JSON.
 * Lo más importante es que manejo un posible error: si el archivo no existe,
 * en lugar de fallar, devuelvo un array vacío. Esto evita que el programa se
 * detenga y me permite agregar datos desde cero si es necesario.
 */
async function readProductsFromFile() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('📄 Archivo no existe, retornando array vacío.');
            return [];
        }
        throw error;
    }
}

/**
 * Con esta función guardo los productos en el archivo local.
 * Uso `JSON.stringify` para convertir el array de objetos a texto y le doy un formato
 * legible (`null, 2`) para que sea fácil de leer.
 */
export async function guardarEnArchivo(datos) {
    try {
        console.log('🔄 Guardando productos en archivo local...');
        await fs.writeFile(filePath, JSON.stringify(datos, null, 2), 'utf8');
        displayOperation(
            'Guardar en Archivo JSON',
            true,
            datos,
            `${datos.length} productos guardados en ${PRODUCTS_FILE}`
        );
    } catch (error) {
        displayOperation('Guardar en Archivo JSON', false, null, error.message);
    }
}

/**
 * Esta es la función para agregar un producto al archivo local sin usar la API.
 * Lo primero que hago es leer el archivo existente para no sobreescribirlo.
 * Luego, calculo un nuevo ID para el producto y lo agrego al array.
 * Finalmente, vuelvo a guardar el array completo en el archivo.
 */
export async function sumarAlArchivo(prodNuevo) {
    try {
        console.log('🔄 Agregando producto al archivo local...');
        const existingProducts = await readProductsFromFile();
        
        const maxId = existingProducts.length > 0
            ? Math.max(...existingProducts.map(p => p.id || 0))
            : 0;
        
        const productToAdd = {
            id: maxId + 1,
            ...prodNuevo
        };

        existingProducts.push(productToAdd);
        await guardarEnArchivo(existingProducts);
        
        displayOperation(
            'Agregar Producto Local',
            true,
            productToAdd,
            'Producto agregado al archivo local exitosamente'
        );
        return productToAdd;
    } catch (error) {
        displayOperation('Agregar Producto Local', false, null, error.message);
        return null;
    }
}

/**
 * Aquí implemento la consigna de eliminar productos con precio alto.
 * Primero leo el archivo, luego uso el método `filter()` para crear un nuevo
 * array que solo incluya los productos con un precio menor o igual al tope.
 * Finalmente, guardo ese nuevo array filtrado en el archivo.
 */
export async function limpiarCaros(tope) {
    try {
        console.log(`🔄 Eliminando productos con precio superior a $${tope} del archivo local...`);
        const products = await readProductsFromFile();
        const initialCount = products.length;
        
        const filteredProducts = products.filter(p => {
            const price = parseFloat(p.price);
            return !isNaN(price) && price <= tope;
        });
        
        const removedCount = initialCount - filteredProducts.length;
        await guardarEnArchivo(filteredProducts);
        
        displayOperation(
            'Filtrado por Precio (Local)',
            true,
            filteredProducts,
            `Se eliminaron ${removedCount} productos. Restantes: ${filteredProducts.length}. Precio máximo permitido: $${tope}`
        );
        return {
            removed: removedCount,
            remaining: filteredProducts.length,
            products: filteredProducts
        };
    } catch (error) {
        displayOperation('Filtrado por Precio (Local)', false, null, error.message);
        return null;
    }
}

/**
 * Esta función es una adición que me pareció útil para el TP. Me permite
 * mostrar un resumen de los datos que tengo en el archivo, como el total de productos,
 * precios promedio, máximo y mínimo. Esto me sirve para verificar que las
 * operaciones anteriores funcionaron correctamente.
 */
export async function mostrarEstadisticasArchivoLocal() {
    console.log('\n');
    printSeparator('ESTADÍSTICAS DEL ARCHIVO LOCAL', '█', 60);
    
    try {
        const products = await readProductsFromFile();
        
        if (products.length === 0) {
            console.log('\n📄 El archivo está vacío o no existe.\n');
            return;
        }
        
        const prices = products.map(p => parseFloat(p.price)).filter(p => !isNaN(p));
        
        console.log(`\n📊 RESUMEN GENERAL:`);
        console.log(`   📦 Total de productos: ${products.length}`);
        
        if (prices.length > 0) {
            const average = prices.reduce((a, b) => a + b, 0) / prices.length;
            console.log(`   💰 Precio promedio: $${average.toFixed(2)}`);
            console.log(`   💎 Precio máximo: $${Math.max(...prices).toFixed(2)}`);
            console.log(`   💸 Precio mínimo: $${Math.min(...prices).toFixed(2)}`);
        }
        
        console.log(`\n🛍️ LISTADO DE PRODUCTOS:`);
        console.log('─'.repeat(60));
        
        products.forEach((product, index) => {
            const number = (index + 1).toString().padStart(2, '0');
            const title = product.title && product.title.length > 35
                ? product.title.substring(0, 35) + '...'
                : product.title || 'N/A';
            const price = product.price ? `$${parseFloat(product.price).toFixed(2)}` : 'N/A';
            
            console.log(`${number}. ${title.padEnd(38)} ${price.padStart(8)}`);
        });
        
        console.log('─'.repeat(60));
    } catch (error) {
        displayOperation('Mostrar Estadísticas (Local)', false, null, error.message);
    }
}