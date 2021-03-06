// Conexion a la base de datos
const mongoose = require('mongoose');
const mensajeModel = require('../models/mensajes.model');
const productoModel = require('../models/productos.model');

async function conexion(url) {
    try {
        await mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        handleError(error)
    }
}


function insertMessage(data) {
    const seveMesaje = new mensajeModel(data)
    seveMesaje.save()
}

// Agregar producto
function addProduct(data) {

    const saveProduct = new productoModel(data)
    saveProduct.save();
}


// Buscar todos los productos
async function findAllProducts() {
    return productoModel.find({})
}


module.exports = {
    conexion,
    insertMessage,
    addProduct,
    findAllProducts,
}

