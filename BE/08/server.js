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
exports.Server = Server;
