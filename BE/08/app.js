"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
const app = express_1.default();
const productos = [];
const server = new server_1.Server(8080, app);
app.use(express_1.default.json());
// Raiz
app.get('/', (req, res) => {
    res.end('Hola Mundo!');
});
// Obtener todos los productos
app.get('/api/productos', (req, res) => {
    productos.length ? res.json(productos) : res.json({ error: 'no hay productos cargados' });
});
// Buscar producto por id
app.get('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const producto = productos.find(producto => producto.id == id);
    !producto ? res.json({ error: 'producto no encontrado' }) : res.json(producto);
});
// Guardar producto
app.post('/api/productos', (req, res) => {
    const { title, price, thumbnail } = req.body;
    // Obtener total de registros
    const nProductos = productos.length + 1;
    const producto = {
        id: nProductos,
        title,
        price,
        thumbnail
    };
    productos.push(producto);
    res.end(JSON.stringify(producto));
});
server.listen();
