import express from 'express';

const router = express.Router()

let productos:any[] = [];

const getProduct = (id:any) => productos.find( producto => producto.id == id);
const listPorducts = () => productos.length ? productos : [];
const createProduct = (title, price, thumbnail) => {
 
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

router.route('/productos')

// Obtener todos los productos
.get((req, res) => {
    listPorducts()
    productos.length != 0 ? res.json(productos) : res.json({'error':'no hay productos'}) 
})

// Guardar producto
.post((req, res) => { 
    
    const { title, price, thumbnail } = req.body;

    const producto = createProduct(title, price, thumbnail)
    
    res.end(JSON.stringify(producto))
});

// Vistas
router.route('/productos/vistas')

// get
.get((req, res) => {
    listPorducts();
    const valProdcutos = listPorducts().length
    res.render('main', { listaProductos: productos , existenProductos: valProdcutos})
})

.post((req, res) => {
    const { title, price, thumbnail } = req.body;
    createProduct(title, price, thumbnail);
    res.redirect('back')
})

router.route('/productos/:id')

// Buscar producto por id
.get((req, res) => {

    const producto = getProduct(req.params.id)

    !producto ? res.json({error: 'producto no encontrado'}) : res.json(producto)

})

// Actualizar un producto
.put((req, res) =>{

    const producto = getProduct(req.params.id)

    !producto ?  res.sendStatus(404) : 

    producto.title = req.body.title;
    producto.price = req.body.price;
    producto.thumbnail = req.body.thumbnail;

    res.json(producto)
})

// Borrar un producto
.delete((req, res) => {
    
    const id = req.params.id;
    const producto = getProduct(id)

    !producto ?  res.sendStatus(404) : 
    
    productos = productos.filter( producto => producto.id != id )
    
    res.json(producto);
});

module.exports = router