
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: __dirname + "/mensajes.sqlite"
  },
  useNullAsDefault: true
});

// Creacion de la tabla mensanjes
async function createTableMensajes() {
  try {
    await knex.schema.createTable('mensajes', table => {
      table.increments()
      table.string('email')
      table.string('texto')
    })

    await knex.destroy()
    console.log('Tabla creada con  exito');
  
  } catch (error) {
      console.log(error);
  }
}

/* createTableMensajes(); */

async function insertMensje(mail, mensaje) {
  try {
    // Normalizes for empty keys on multi-row insert:
    await knex('mensajes').insert([{email: mail , texto: mensaje}])
    console.log('insert ok');
  
  } catch (error) {
    console.log(error);
  }
}

/* insertMensje({email: "test", texto: "texto"});*/

/* knex.schema.createTable('mensajes', table => {
  table.increments()
  table.string('email')
  table.string('texto')
  table.timestamps()
})
  .then(() => console.log('Tabla mensajes creada'))
  .catch((err) => console.log(err))
  .finally(() => knex.destroy()) */

/* knex('mensajes').insert(mensaje)
  .then(() => console.log("mensaje guardado"))
  .catch((err) => console.log(err))
  .finally(() => knex.destroy()) */

/* knex.from('mensajes').select('*')
  .then(data => console.log(data))
  .catch((err) => console.log(err))
  .finally(() => knex.destroy()) */


module.exports = {
  insertMensje,
}