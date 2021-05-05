let result = {};

process.on("message", (cant) => {
	for (let i = 0; i < cant.cant; i++) {
		let valor = Math.floor(Math.random() * 1000) + 1;

		if (!result || !result.hasOwnProperty(valor)) {
			result[valor] = 0;
		}
		result[valor]++;
	}
	process.send({ result });
});
