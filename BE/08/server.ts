
import express from 'express'  

// Server class
export class Server {
    
    port: number;
    app: express.Application;

    constructor(port: number, app: express.Application){
        this.port = port;
        this.app = app;
    }

    listen(){
        this.app.listen(this.port, () => {
            try {
                console.log(`Servidor corriendo en http://localhost:${this.port}`)
            } catch (e) {
                console.log(e);
            }
        })
    }
    
}