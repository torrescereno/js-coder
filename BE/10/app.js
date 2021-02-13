"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const server_1 = require("./server/server");
const app = express_1.default();
const server = new server_1.Server(8080, app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
// Establecer la configuracion
const config = {
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
};
app.engine('hbs', express_handlebars_1.default(config));
// Establecer el motor de plantilla a utilizar
app.set('view engine', 'hbs');
// Establecer el directorio donde se encuentran las platillas
app.set('views', './BE/10/views');
// Rederizar el index
app.get('/', (req, res) => {
    res.render('main');
});
// Router
app.use('/api', require('./route/router'));
// Listener
server.listen();
