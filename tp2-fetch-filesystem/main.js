//const fs = require('fs');
import * as fs from 'fs';
import {traerProductos, 
    numeroLimitadoProductos, 
    persistirProductos, 
    crearNuevoProducto,
    buscarUnProducto, 
    eliminarProducto,
    actualizarProducto } from "./api.js";

import {agregarProductoLocal, 
    eliminarPreciosMayoresA } from "./fs.js";

traerProductos(); 

numeroLimitadoProductos();

persistirProductos();

crearNuevoProducto();

buscarUnProducto();

eliminarProducto();

actualizarProducto();

agregarProductoLocal();

eliminarPreciosMayoresA(50);





