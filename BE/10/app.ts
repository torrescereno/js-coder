import express from 'express';
import handlebars from 'express-handlebars'
import { Server } from './server/server'

const app = express();
const server = new Server(8080, app)

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Establecer la configuracion
const config = {
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
};

app.engine('hbs', handlebars(config));

// Establecer el motor de plantilla a utilizar
app.set('view engine', 'hbs');

// Establecer el directorio donde se encuentran las platillas
app.set('views', './BE/10/views');

// Rederizar el index
app.get('/', (req, res) => {
    res.redirect('http://localhost:8080/api/productos/vistas')
});

// Public
app.use(express.static(__dirname + '/public'));


// Router
app.use('/api', require('./route/router'));

// Listener
server.listen();