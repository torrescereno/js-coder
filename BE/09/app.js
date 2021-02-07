"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
const app = express_1.default();
const server = new server_1.Server(8080, app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
// Raiz
app.get('/', (req, res) => {
    res.end('Hola Mundo!');
});
// Render index
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
// Router
app.use('/api', require('./routes/router'));
// Listener
server.listen();
