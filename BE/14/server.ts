import express from 'express';
const app = express();

// Server class
class Server {
    
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

const server = new Server(8080, app)

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));
  
// Raiz
app.get('/', (req, res) => {
    res.end('Hola Mundo!')
})

// Listener
server.listen();