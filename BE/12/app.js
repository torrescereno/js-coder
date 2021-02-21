"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const http = http_1.createServer(app);
const io = new socket_io_1.Server(http);
let productos = [];
const listPorducts = () => productos.length ? productos : [];
const createProduct = (title, price, thumbnail) => {
    const nProductos = productos.length + 1;
    const producto = {
        id: nProductos,
        title,
        price,
        thumbnail
    };
    productos.push(producto);
    return producto;
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
// Establecer el directorio donde se encuentran las platillas
app.set('views', __dirname + '/views');
// Public
app.use(express_1.default.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + "/views" });
});
// Conexion al socket
io.on('connection', (socket) => {
    socket.on('post:producto', (data) => {
        createProduct(data.title, data.price, data.thumbnail);
        io.sockets.emit('get:productos', { listaProductos: productos, existenProductos: listPorducts() });
    });
});
// Levantando el servidor
http.listen(3000, () => {
    console.log('Conexion en puerto :3000');
});
