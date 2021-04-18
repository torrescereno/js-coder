const moment = require("moment");
const formatMessage = require("../public/js/message.js");
const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
} = require("../public/js/user");
const dbMongo = require("../DB/DB_Mongo");

// Nombre del chat
const botName = "Chat Live";

// Normalizr
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema;

module.exports = {
	// Socket io
	connect: (io) => {
		io.on("connection", function (socket) {
			const userId = socket.id;

			// Obtener todos los productos al iniciar una conexion
			dbMongo.findAllProducts().then((data) => {
				io.sockets.emit("get:productos", {
					listaProductos: data,
					existenProductos: data.length,
				});
			});

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

				/// **********************
				// Objeto de prueba

				const objData = {
					_id: userId,
					autor: {
						email: user.username,
						nombre: "prueba",
						apellido: "prueba",
						edad: 27,
						alias: "prueba",
						avatar: "url-avatar",
					},
					text: msg,
					time: moment().format("L LTS"),
				};

				// Guardar mensaje en la base de datos
				dbMongo.insertMessage({ texto: msg });

				/// **********************

				const userSchema = new schema.Entity(
					"user",
					{},
					{ idAttribute: "email" }
				);
				const chatSchema = new schema.Entity(
					"chat",
					{
						autor: userSchema,
					},
					{ idAttribute: "_id" }
				);

				// Normalizar
				const dataNormalizada = normalize(objData, chatSchema);

				// Enviar info al front
				io.to(user.room).emit("message", dataNormalizada);
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

			// Obtener todos los productos
			socket.on("post:producto", () => {
				dbMongo.findAllProducts().then((data) => {
					io.sockets.emit("get:productos", {
						listaProductos: data,
						existenProductos: data.length,
					});
				});
			});
		});
	},
};
