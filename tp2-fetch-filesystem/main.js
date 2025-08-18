// main.js
import {
    traerTodosLosProductos,
    traerProductosLimitados,
    cargarProducto,
    buscarProductoPorId,
    borrarProducto,
    editarProducto
} from "./api/tiendaApi.js";

import {
    guardarEnArchivo,
    sumarAlArchivo,
    limpiarCaros,
    mostrarEstadisticasArchivoLocal
} from "./archivos/gestorArchivos.js";

/**
 * Con esta función, creo un separador para la consola, lo que hace que la salida
 * sea más organizada y fácil de seguir.
 */
function printSeparator(title = '', symbol = '=', length = 70) {
    if (title) {
        const padding = Math.max(0, Math.floor((length - title.length - 2) / 2));
        console.log(symbol.repeat(padding) + ` ${title} ` + symbol.repeat(padding));
    } else {
        console.log(symbol.repeat(length));
    }
}

async function ejecutar() {
    // Header principal del programa
    console.log('\n');
    console.log('█'.repeat(70));
    console.log('█'.repeat(20) + '   TP 2 - FETCH Y FILESYSTEM   ' + '█'.repeat(20));
    console.log('█'.repeat(70));
    console.log('📚 Programación III - UNER');
    console.log('🎯 Trabajo Práctico de APIs y Manejo de Archivos');
    console.log('█'.repeat(70));

    try {
        // =================================================================
        // PARTE 1: OPERACIONES CON LA API
        // =================================================================
        console.log('\n');
        printSeparator('PARTE 1: OPERACIONES API', '▓', 70);

        // 1. Obtener todos los productos
        const allProducts = await traerTodosLosProductos();
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        // 2. Obtener productos limitados (5)
        const limitedProducts = await traerProductosLimitados(5);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 3. Guardar productos limitados en archivo JSON (primera persistencia)
        if (limitedProducts) {
            await guardarEnArchivo(limitedProducts);
        }
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 4. Crear nuevo producto en la API
        const newProductData = {
            title: 'Producto de Prueba TP2 (API)',
            price: 25.99,
            description: 'Producto creado para el TP2 de Programación III',
            image: 'https://fakestoreapi.com/img/placeholder.jpg',
            category: 'test'
        };
        await cargarProducto(newProductData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 5. Buscar producto por ID en la API
        await buscarProductoPorId(1);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 6. Eliminar producto de la API
        await borrarProducto(1);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 7. Actualizar producto en la API
        const updateData = {
            title: 'Producto Modificado TP2 (API)',
            price: 15.99,
            description: 'Producto modificado en el TP2'
        };
        await editarProducto(2, updateData);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // =================================================================
        // PARTE 2: OPERACIONES CON FILESYSTEM
        // =================================================================
        console.log('\n');
        printSeparator('PARTE 2: OPERACIONES FILESYSTEM', '▓', 70);
        
        // 8. Agregar producto directamente al archivo local
        const localProduct = {
            title: 'Producto Local TP2',
            price: 45.00,
            description: 'Producto agregado directamente al archivo local',
            category: 'local'
        };
        await sumarAlArchivo(localProduct);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 9. Mostrar estadísticas del archivo local
        await mostrarEstadisticasArchivoLocal();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 10. Eliminar productos caros (precio > $30) del archivo local
        await limpiarCaros(30);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 11. Mostrar estadísticas finales del archivo local
        await mostrarEstadisticasArchivoLocal();
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Footer final
        console.log('\n');
        console.log('█'.repeat(70));
        console.log('█'.repeat(25) + '   ✅ COMPLETADO   ' + '█'.repeat(25));
        console.log('█'.repeat(70));
        console.log('🎉 TP2 ejecutado exitosamente');
        console.log('📄 Archivo products.json generado/modificado correctamente');
        console.log('✨ Todas las funcionalidades implementadas');
        console.log('█'.repeat(70));
        
    } catch (error) {
        // Manejo de errores globales
        console.error('\n💥 Error general en la ejecución:', error.message);
        console.log('█'.repeat(70));
    }
}

ejecutar();