// main.js

// Este es el archivo principal de nuestro proyecto. Actúa como el orquestador que une
// las funcionalidades de la API (fetch) y del manejo de archivos (FileSystem).
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
 * Con esta función, creamos un separador para la consola, lo que hace que la salida
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
    // Encabezado principal del programa
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

        // ✅ CONSIGNA: "Recuperar la información de todos los productos (GET)".
        const allProducts = await traerTodosLosProductos();
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ CONSIGNA: "Recuperar la información de un número limitado de productos (GET)".
        const limitedProducts = await traerProductosLimitados(5);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ CONSIGNA: "Persistir los datos de la consulta anterior en un archivo local JSON".
        if (limitedProducts) {
            await guardarEnArchivo(limitedProducts);
        }
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ CONSIGNA: "Agregar un nuevo producto (POST)".
        const newProductData = {
            title: 'Producto de Prueba TP2 (API)',
            price: 25.99,
            description: 'Producto creado para el TP2 de Programación III',
            image: 'https://fakestoreapi.com/img/placeholder.jpg',
            category: 'test'
        };
        await cargarProducto(newProductData);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ CONSIGNA: "Buscar la información de un determinado producto, utilizando un "id" como parámetro (GET)".
        await buscarProductoPorId(1);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ CONSIGNA: "Eliminar un producto (DELETE)".
        await borrarProducto(1);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ CONSIGNA: "Modificar los datos de un producto (UPDATE)".
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

        // ✅ CONSIGNA: "Agregar producto al archivo local".
        const localProduct = {
            title: 'Producto Local TP2',
            price: 45.00,
            description: 'Producto agregado directamente al archivo local',
            category: 'local'
        };
        await sumarAlArchivo(localProduct);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ CONSIGNA: "Imprimir en consola para verificar las operaciones realizadas".
        // Mostramos las estadísticas iniciales del archivo local.
        await mostrarEstadisticasArchivoLocal();
        await new Promise(resolve => setTimeout(resolve, 2000));

        // ✅ CONSIGNA: "Eliminar los productos superiores a un determinado valor".
        await limpiarCaros(30);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ CONSIGNA: "Imprimir en consola para verificar las operaciones realizadas".
        // Mostramos las estadísticas finales para confirmar que los productos fueron eliminados.
        await mostrarEstadisticasArchivoLocal();
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Pie de página final
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
    // =================================================================
    // PARTE 3: FUNCIONES EXTRA Y CIERRE
    // =================================================================
    console.log('\n');
    printSeparator('PARTE 3: FUNCIONES EXTRA', '★', 70);

    try {
        // 📊 Estadísticas avanzadas
        await estadisticasAvanzadas();
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 🔎 Buscar productos por categoría
        const ropa = await buscarPorCategoria("clothing");
        console.log("\n👕 Productos en categoría 'clothing':");
        console.table(ropa);

        // 🔎 Buscar productos por título
        const camisas = await buscarPorTitulo("shirt");
        console.log("\n👔 Productos que contienen 'shirt' en el título:");
        console.table(camisas);

        // 🔎 Filtrar por rating
        const topRated = await filtrarPorRating(4);
        console.log("\n🌟 Productos con rating mayor o igual a 4:");
        console.table(topRated);

        // 📂 Exportar CSV
        await exportarACSV("productos_exportados.csv");

        // =================================================================
        // PIE DE CIERRE FINAL
        // =================================================================
        console.log('\n');
        console.log('█'.repeat(70));
        console.log('█'.repeat(20) + '   🎉 TP2 FINALIZADO CON ÉXITO   ' + '█'.repeat(20));
        console.log('█'.repeat(70));
        console.log('✨ Todas las consignas + extras implementadas');
        console.log('📄 Archivo products.json y productos_exportados.csv generados');
        console.log('🙌 Felicitaciones, trabajo práctico completo!');
        console.log('█'.repeat(70));

    } catch (error) {
        console.error('\n💥 Error en las funciones extra:', error.message);
    }
}

ejecutar();

console.log("Probando commit y push");
