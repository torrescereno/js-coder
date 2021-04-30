const express = require("express");
const router = express.Router();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const FACEBOOK_CLIENT_ID = "167405678511941";
const FACEBOOK_CLIENT_SECRET = "70edff5a8dcbb04710bc59d784a79278";

passport.use(
	new FacebookStrategy(
		{
			clientID: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_CLIENT_SECRET,
			callbackURL: "/auth/facebook/callback",
			profileFields: ["id", "displayName", "photos", "emails"],
			scope: ["email"],
		},
		function (accessToken, refreshToken, profile, done) {
			let userProfile = profile;
			return done(null, userProfile);
		}
	)
);

router.route("").get((req, res) => {
	if (req.isAuthenticated()) {
		res.render("index", {
			nombre: req.user.displayName,
		});
	} else {
		res.render("partials/login-error");
	}
});

module.exports = router;
