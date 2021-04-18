const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8080;
const dbMongo = require("./DB/DB_Mongo");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser());
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 60000,
		},
	})
);

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

// Server
server.listen(PORT, function () {
	dbMongo.conexion("mongodb://localhost:27017/ecommerce");
	console.log(`http://localhost:${PORT}/`);
});
