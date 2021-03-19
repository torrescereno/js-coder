const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '123456',
    database : 'db_coder'
  }
});

async function addTableProducts() {

    try {

        await knex.schema.createTable('products', table => {
            table.increments();
            table.string('title');
            table.string('price');
            table.string('thumbnail');
        });

        await knex.destroy();

        console.log('tabla Producto creada');
        
    } catch (error) {
        console.log(error);
    }
}

/* addTableProducts(); */

// Agregar producto

async function addProduct(data) {
    try {
        await knex('products').insert(data)
  } catch (error) {
        console.log(error);
  }
}

// Actualizar producto

async function updateProduct(id,data) {
    try {
        await knex('products')
            .where('id', '=', id)
            .update({
                title: data.title,
                price: data.price,
                thumbnail: data.thumbnail
            })
    } catch (error) {
        console.log(error);
    }
}

// Buscar todos los productos
async function findAllProducts() {
    try {
        return await knex.select().from('products')
    } catch (error) {
        console.log(error);
    }
}

// Buscar producto por ID
async function findProductId(id) {
    try {
        return await knex('products').where('id', '=', id)
    } catch (error) {
        console.log(error);
    }
}

// Eliminar un procto
async function deleteProductId(id) {
    try {
        await knex('accounts')
        .where('id' ,'=', id)
        .del()
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    addProduct,
    updateProduct,
    findAllProducts,
    findProductId,
    deleteProductId
}