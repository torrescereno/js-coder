const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8080;
const dbMongo = require("./DB/DB_Mongo");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// ===================================================================
// Passport

const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../server/models/user.model");

passport.use(
	"login",
	new LocalStrategy(
		{
			passReqToCallback: true,
		},
		function (req, username, password, done) {
			User.findOne({ username: username }, function (err, user) {
				if (err) return done(err);

				if (!user) {
					return done(null, false);
				}

				if (!isValidPassword(user, password)) {
					return done(null, false);
				}

				return done(null, user);
			});
		}
	)
);

var isValidPassword = function (user, password) {
	return bcrypt.compareSync(password, user.password);
};

passport.use(
	"register",
	new LocalStrategy(
		{
			passReqToCallback: true,
		},
		function (req, username, password, done) {
			const findOrCreateUser = function () {
				User.findOne({ username: username }, function (err, user) {
					if (err) {
						return done(err);
					}

					if (user) {
						return done(null, false);
					} else {
						var newUser = new User();

						newUser.username = username;
						newUser.password = createHash(password);

						newUser.save(function (err) {
							if (err) {
								console.log("Error al intentar guardar al usuario: " + err);
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			};

			process.nextTick(findOrCreateUser);
		}
	)
);

var createHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

// ===================================================================

const config = {
	extname: ".hbs",
	defaultLayout: "",
	layoutsDir: __dirname + "/views/layouts",
	partialsDir: __dirname + "/views/partials",
};

// Socket
const socketIo = require("./socket/socket.io");
socketIo.connect(io);

// Middleware
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(cookieParser());
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: "mongodb://localhost:27017/ecommerce",
			ttl: 600,
		}),
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 600000,
		},
	})
);

// Handlebars
app.engine("hbs", handlebars(config));
app.set("view engine", "hbs");
app.set("views", "./BE/server/views");

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("index", {
			nombre: req.user.username,
		});
	} else {
		res.render("partials/login");
	}
});

app.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/faillogin" }),
	(req, res) => {
		res.render("index", {
			nombre: req.user.username,
		});
	}
);

app.get("/faillogin", (req, res) => {
	res.render("partials/login-error", {});
});

app.get("/register", (req, res) => {
	res.render("partials/register");
});

app.post(
	"/register",
	passport.authenticate("register", { failureRedirect: "/failregister" }),
	(req, res) => {
		res.redirect("/");
	}
);

app.get("/failregister", (req, res) => {
	res.render("partials/register-error", {});
});

app.get("/logout", (req, res) => {
	let nombre = req.user.username;
	req.logout();
	res.render("partials/logout", { nombre });
});

// Rutas
app.use("/", require("./route/raiz.route"));
app.use("/producto", require("./route/productos.route"));
app.use("/chat", require("./route/mensajes.route"));
//app.use("/login", require("./route/login.route"));
//app.use("/logout", require("./route/logout.route"));

// Server
server.listen(PORT, function () {
	dbMongo.conexion("mongodb://localhost:27017/ecommerce");
	console.log(`http://localhost:${PORT}/`);
});
