const express = require("express");
const router = express.Router();

router
	.route("")

	.get((req, res) => {
		if (req.isAuthenticated()) {
			res.render("index", {
				nombre: req.user.displayName,
			});
		} else {
			res.render("partials/login");
		}
	});

module.exports = router;
