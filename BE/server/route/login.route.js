const express = require("express");
const router = express.Router();

router
	.route("")
	.get((req, res) => {
		if (req.session.nombre) {
			res.render("index", {
				nombre: req.session.nombre,
			});
		} else {
			res.render("login");
		}
	})
	.post((req, res) => {
		let { nombre } = req.body;
		req.session.nombre = nombre;
		res.redirect("/");
	});

module.exports = router;
