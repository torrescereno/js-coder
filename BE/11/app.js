"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const server_1 = require("./server/server");
const router = express_1.default.Router();
const app = express_1.default();
const server = new server_1.Server(8080, app);
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
// *******************************
// EJS
// Establecer el directorio donde se encuentran las platillas
app.set('views', './BE/11/views');
// Establecer el motor de plantilla a utilizar
app.set('view engine', 'ejs');
// *******************************
// Rederizar el index
app.get('/', (req, res) => {
    res.redirect('http://localhost:8080/api/productos/vistas');
});
// Vistas
router.route('/productos/vistas')
    // get
    .get((req, res) => {
    listPorducts();
    const valProdcutos = listPorducts().length;
    res.render('index', { listaProductos: productos, existenProductos: valProdcutos });
})
    .post(upload.single('thumbnail'), (req, res) => {
    const { title, price } = req.body;
    const thumbnail = "/img/" + req.file.filename;
    createProduct(title, price, thumbnail);
    res.redirect('/');
});
// Public
app.use(express_1.default.static(__dirname + '/public'));
// Router
app.use('/api', router);
// Listener
server.listen();
