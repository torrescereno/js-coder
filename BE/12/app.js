"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
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
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname + "/public/img/"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});
const upload = multer_1.default({ storage: storage });
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
app.post('/', upload.single('thumbnail'), (req, res) => {
    const { title, price } = req.body;
    const thumbnail = "/img/" + req.file.filename;
    createProduct(title, price, thumbnail);
    res.redirect('/');
});
// Conexion al socket
io.on('connection', (socket) => {
    // Mostrar todos los objetos
    socket.emit('get:lista', { listaProductos: productos, existenProductos: listPorducts() });
    socket.on('post:producto', () => {
        io.sockets.emit('get:productos', { listaProductos: productos, existenProductos: listPorducts() });
    });
});
// Levantando el servidor
http.listen(8080, () => {
    console.log('Conexion en puerto http://localhost:8080/');
});
