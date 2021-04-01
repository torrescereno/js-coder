const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
    email: { type: String, required: true, max: 70},
    texto: { type: String, required: true, max: 200}
});


module.exports = mongoose.model('mensaje', mensajeSchema)
