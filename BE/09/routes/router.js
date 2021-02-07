"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let productos = [];
const getProduct = (id) => productos.find(producto => producto.id == id);
router.route('/productos')
    // Obtener todos los productos
    .get((req, res) => {
    productos.length ? res.json(productos) : res.json({ error: 'no hay productos cargados' });
})
    // Guardar producto
    .post((req, res) => {
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
router.route('/productos/:id')
    // Buscar producto por id
    .get((req, res) => {
    const producto = getProduct(req.params.id);
    !producto ? res.json({ error: 'producto no encontrado' }) : res.json(producto);
})
    // Actualizar un producto
    .put((req, res) => {
    const producto = getProduct(req.params.id);
    !producto ? res.sendStatus(404) :
        producto.title = req.body.title;
    producto.price = req.body.price;
    producto.thumbnail = req.body.thumbnail;
    res.json(producto);
})
    // Borrar un producto
    .delete((req, res) => {
    const id = req.params.id;
    const producto = getProduct(id);
    !producto ? res.sendStatus(404) :
        productos = productos.filter(producto => producto.id != id);
    res.json(producto);
});
module.exports = router;
