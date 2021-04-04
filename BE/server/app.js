const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8080;
const dbMongo = require("./DB/DB_Mongo");
const formatMessage = require("./public/js/message.js");
const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
} = require("./public/js/user");
const handlebars = require("express-handlebars");

// Config Handlebars
const config = {
	extname: ".hbs",
	defaultLayout: "",
	layoutsDir: __dirname + "/views/layouts",
	partialsDir: __dirname + "/views/partials",
};

// Nombre del chat
const botName = "Chat Live";

// Socket io
io.on("connection", function (socket) {
	const userId = socket.id;

	// Ingresar a la sala
	socket.on("joinRoom", ({ username, room }) => {
		const user = userJoin(socket.id, username, room);

		socket.join(user.room);
		socket.emit("messages", formatMessage(userId, botName, "Bienvenid@"));
		socket.broadcast
			.to(user.room)
			.emit(
				"message",
				formatMessage(userId, botName, `${user.username} ingresó al grupo`)
			);

		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});

	// Recibir y escribir mensaje
	socket.on("chatMessage", (msg) => {
		const user = getCurrentUser(userId);

		dbMongo.insertMessage({ email: user.username, texto: msg });

		io.to(user.room).emit("message", formatMessage(userId, user.username, msg));
	});

	// Desconexion de usuario
	socket.on("disconnect", () => {
		const user = userLeave(socket.id);

		if (user) {
			io.to(user.room).emit(
				"message",
				formatMessage(userId, botName, `${user.username} se fue del grupo`)
			);

			io.to(user.room).emit("roomUsers", {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		}
	});

	// Ontener todos los productos
	dbMongo.findAllProducts().then((data) => {
		socket.emit("get:lista", {
			listaProductos: data,
			existenProductos: data.length,
		});
	});

	socket.on("post:producto", () => {
		dbMongo.findAllProducts().then((data) => {
			io.sockets.emit("get:productos", {
				listaProductos: data,
				existenProductos: data.length,
			});
		});
	});
});

// middleware
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Conifg view
app.engine("hbs", handlebars(config));
app.set("view engine", "hbs");
app.set("views", "./BE/server/views");

// Route
app.use("/", require("./route/raiz.route"));
app.use("/producto", require("./route/productos.route"));
app.use("/chat", require("./route/mensajes.route"));

// Levantar el server
server.listen(PORT, function () {
	dbMongo.conexion("mongodb://localhost:27017/ecommerce");
	console.log(`http://localhost:${PORT}/`);
});
