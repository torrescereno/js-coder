import express from 'express';
import multer  from 'multer'
import path from 'path'
import { Server } from './server/server'

const router = express.Router()

const app = express();
const server = new Server(8080, app)

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

// *******************************

// EJS

// Establecer el directorio donde se encuentran las platillas
app.set('views', './BE/11/views');

// Establecer el motor de plantilla a utilizar
app.set('view engine', 'ejs');

// *******************************

// Rederizar el index
app.get('/', (req, res) => {
    res.redirect('http://localhost:8080/api/productos/vistas')
});

// Vistas
router.route('/productos/vistas')

// get
.get((req, res) => {
     listPorducts();
     const valProdcutos = listPorducts().length
     res.render('index', { listaProductos: productos , existenProductos: valProdcutos})
})

.post(upload.single('thumbnail'), (req:any, res:any) => {
     const { title, price } = req.body;    
     const thumbnail = "/img/" + req.file.filename;
     createProduct(title, price, thumbnail);
     res.redirect('/')
})

// Public
app.use(express.static(__dirname + '/public'));

// Router
app.use('/api', router);

// Listener
server.listen();