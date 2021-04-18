const express = require("express");
const router = express.Router();
const session = require("express-session");

router
	.route("")

	.get((req, res) => {
		if (req.session.nombre) {
			res.render("index", {
				nombre: req.session.nombre,
			});
		} else {
			res.render("partials/login");
		}
	});

module.exports = router;
