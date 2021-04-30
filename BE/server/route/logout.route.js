// ------------------------------- Sesiones
const express = require("express");
const router = express.Router();

router.route("").get((req, res) => {
	let nombre = req.user.displayName;
	req.logout();
	res.render("partials/logout", { nombre });
});

module.exports = router;
