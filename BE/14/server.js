"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
// Server class
class Server {
    constructor(port, app) {
        this.port = port;
        this.app = app;
    }
    listen() {
        this.app.listen(this.port, () => {
            try {
                console.log(`Servidor corriendo en http://localhost:${this.port}`);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
const server = new Server(8080, app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
// Raiz
app.get('/', (req, res) => {
    res.end('Hola Mundo!');
});
// Listener
server.listen();
