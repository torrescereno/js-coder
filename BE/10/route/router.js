"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// Interface de producto
// interface Producto{
//     id?: number,
//     title: string,
//     price: string,
//     thumbnail: string
// }
let productos = [];
const getProduct = (id) => productos.find(producto => producto.id == id);
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
        cb(null, path_1.default.join(__dirname, "..", "/public/img/"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});
const upload = multer_1.default({ storage: storage });
router.route('/productos')
    // Obtener todos los productos
    .get((req, res) => {
    listPorducts();
    productos.length != 0 ? res.json(productos) : res.json({ 'error': 'no hay productos' });
})
    // Guardar producto
    .post((req, res) => {
    const { title, price, thumbnail } = req.body;
    const producto = createProduct(title, price, thumbnail);
    res.end(JSON.stringify(producto));
});
// Vistas
router.route('/productos/vistas')
    // get
    .get((req, res) => {
    listPorducts();
    const valProdcutos = listPorducts().length;
    res.render('main', { listaProductos: productos, existenProductos: valProdcutos });
})
    .post(upload.single('thumbnail'), (req, res) => {
    const { title, price } = req.body;
    const thumbnail = "/img/" + req.file.filename;
    createProduct(title, price, thumbnail);
    res.redirect('/');
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
