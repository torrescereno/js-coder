import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import express, { Request, Response } from 'express';
import handlebars from 'express-handlebars'

const app = express();

const http = createServer(app);
const io = new Server(http);

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Establecer la configuracion
const config = {
    extname: '.hbs',
    defaultLayout: 'home.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
};

app.engine('hbs', handlebars(config));

// Establecer el motor de plantilla a utilizar
app.set('view engine', 'hbs');

// Establecer el directorio donde se encuentran las platillas
app.set('views', './BE/13/views');

// Public
app.use(express.static(__dirname + '/public'));

app.get('/', (req:Request, res:Response) => {
    res.render('main', { })
});

// Conexion al socket
io.on('connection', (socket: Socket) => {   

    socket.on('get:message', (data)=>{
        io.sockets.emit('get:message-user', {'message': data})
    })

});

// Levantando el servidor
http.listen(8080, () => {
    console.log('Conexion en puerto http://localhost:8080/');
});