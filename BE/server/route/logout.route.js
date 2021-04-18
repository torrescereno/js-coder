// ------------------------------- Sesiones
const express = require("express");
const router = express.Router();

const getNombreSession = (req) =>
	req.session.nombre ? req.session.nombre : "";

router.route("").get((req, res) => {
	let nombre = getNombreSession(req);
	if (nombre) {
		req.session.destroy((err) => {
			if (!err) res.render("partials/logout", { nombre });
			else res.redirect("/");
		});
	} else {
		res.redirect("/");
	}
});

module.exports = router;
