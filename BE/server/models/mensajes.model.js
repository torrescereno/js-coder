const mongoose = require("mongoose");

const autorSchema = new mongoose.Schema({
	email: { type: String, require: true, max: 100 },
	nombre: { type: String, require: true, max: 50 },
	apellido: { type: String, require: true, max: 70 },
	edad: { type: Number },
	alias: { type: String, max: 50 },
	avatar: { type: String, require: true, max: 100 },
});

const mensajeSchema = new mongoose.Schema({
	autor: autorSchema,
	texto: { type: String, required: true, max: 200 },
});

module.exports = mongoose.model("mensaje", mensajeSchema);
