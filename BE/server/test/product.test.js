// Generar los productos de prueba con faker.js
const faker = require("faker");

faker.locale = "es";

// Funcion para crear prodctos
const get = () => ({
	title: faker.commerce.productName(),
	price: faker.commerce.price(),
	thumbnail: faker.image.cats(),
});

const generarProductos = (req, res) => {
	// por defecto se generan 10
	const cant = req.params.cant || 10;

	const productos = [];

	for (let i = 0; i < cant; i++) {
		let usuario = get();
		usuario.id = i + 1;
		productos.push(usuario);
	}

	res.send(productos);
};

module.exports = {
	generarProductos,
};
