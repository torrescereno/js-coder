import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import express, { Request, Response } from 'express';

const app = express();

const http = createServer(app);
const io = new Server(http);

let productos:any[] = [];

const listPorducts = () => productos.length ? productos : [];
const createProduct = (title:any, price:any, thumbnail:any) => {
 
    const nProductos = productos.length + 1;
    const producto = {
        id : nProductos,
        title,
        price,
        thumbnail
    }
    productos.push(producto);
    return producto;
}

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Establecer el directorio donde se encuentran las platillas
app.set('views', __dirname + '/views');

// Public
app.use(express.static(__dirname + '/public'));

app.get('/', (req:Request, res:Response) => {
    res.sendFile('index.html', {root: __dirname + "/views"})
});

// Conexion al socket
io.on('connection', (socket: Socket) => {    
    socket.on('post:producto', (data) => {
        createProduct(data.title, data.price, data.thumbnail);
        io.sockets.emit('get:productos', { listaProductos: productos , existenProductos: listPorducts()});
    })
});

// Levantando el servidor
http.listen(3000, () => {
    console.log('Conexion en puerto :3000');
});