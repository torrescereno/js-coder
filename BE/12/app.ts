import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import express, { Request, Response } from 'express';
import multer  from 'multer'
import path from 'path'

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

const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
       
       cb(null, path.join(__dirname + "/public/img/"))
    },
    filename: function (req:any, file:any, cb:any) {
               
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
  
const upload = multer({ storage: storage })

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

app.post('/', upload.single('thumbnail'), (req:any, res:any) => {    
    const { title, price } = req.body;    
    const thumbnail = "/img/" + req.file.filename;
    createProduct(title, price, thumbnail);
    res.redirect('/')
})

// Conexion al socket
io.on('connection', (socket: Socket) => {   

    // Mostrar todos los objetos
    socket.emit('get:lista', { listaProductos: productos , existenProductos: listPorducts()})

    socket.on('post:producto', () => {
        io.sockets.emit('get:productos', { listaProductos: productos , existenProductos: listPorducts()});
    })

});

// Levantando el servidor
http.listen(8080, () => {
    console.log('Conexion en puerto http://localhost:8080/');
});