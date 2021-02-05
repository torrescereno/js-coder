"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
// Server class
class Server {
    constructor(port, app) {
        this.port = port;
        this.app = app;
    }
    listen() {
        this.app.listen(this.port, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`Escuchando en http://localhost:${this.port}`);
            }
        });
    }
}
exports.Server = Server;
