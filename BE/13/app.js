"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const app = express_1.default();
const http = http_1.createServer(app);
const io = new socket_io_1.Server(http);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
// Establecer la configuracion
const config = {
    extname: '.hbs',
    defaultLayout: 'home.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
};
app.engine('hbs', express_handlebars_1.default(config));
// Establecer el motor de plantilla a utilizar
app.set('view engine', 'hbs');
// Establecer el directorio donde se encuentran las platillas
app.set('views', './BE/13/views');
// Public
app.use(express_1.default.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('main', {});
});
// Conexion al socket
io.on('connection', (socket) => {
});
// Levantando el servidor
http.listen(8080, () => {
    console.log('Conexion en puerto http://localhost:8080/');
});
