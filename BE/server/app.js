require("dotenv").config({ path: process.cwd() + "/BE/server/.env" });

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
const passport = require("passport");
const { fork } = require("child_process");

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
			mongoUrl: process.env.DB_HOST,
			ttl: 600,
		}),
		secret: process.env.DB_SECRET,
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 600000,
		},
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine("hbs", handlebars(config));
app.set("view engine", "hbs");
app.set("views", "./BE/server/views");

// Rutas
app.use("/", require("./route/raiz.route"));
app.use("/producto", require("./route/productos.route"));
app.use("/chat", require("./route/mensajes.route"));
app.use("/login", require("./route/login.route"));
app.use("/logout", require("./route/logout.route"));
app.use("/faillogin", require("./route/faillogin.route"));

// FACEBOOK

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: "/",
		failureRedirect: "/faillogin",
	})
);

// PASSPORT

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

// PROCESS

app.get("/info", (req, res) => {
	res.render("partials/info", {
		arg: process.argv,
		SO: process.platform,
		node: process.version,
		memory: JSON.stringify(process.memoryUsage()),
		path: process.execPath,
		id: process.pid,
		pathCorriente: process.cwd(),
	});
});

app.get("/randoms", (req, res) => {
	let cant = req.query.cant || 500000000;

	const forked = fork("BE/server/randoms.js");

	forked.on("message", (result) => {
		return res.status(200).json(result);
	});

	forked.send({ cant });
});

process.on("exit", function (codigo) {
	console.log("saliendo del proceso con código de salida", codigo);
});

// Server
server.listen(PORT, function () {
	dbMongo.conexion(process.env.DB_HOST);
	console.log(`http://localhost:${PORT}/`);
});
