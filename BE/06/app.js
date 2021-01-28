
const fs = require('fs');

const producto = {
    title: 'Libro',
    price: 999.00,
    thumbnail: 'www.google.com'
}

const archivo = 'productos.txt';

class Archivo {

    constructor(nombre) {
        this.nombre = nombre;
    }

    async leer() {
        try {
            const data = await fs.promises.readFile(this.nombre, 'utf-8') || [];
            console.log(data)
        } catch (err) {
            console.log('No existe el archivo', err);
        }
    }

    async guardar(producto) {

        try {

            // Obtener el contenido del archivo
            let data = await fs.promises.readFile(this.nombre, 'utf-8') || [];
            data = JSON.parse(data);

            // Obtener el largo del arreglo
            const totalArray = data.length;

            // Agregar el objeto con el ID
            producto.id = totalArray + 1;

            // Push al arreglo
            data.push(producto)

            await fs.promises.writeFile(this.nombre, JSON.stringify(data), 'utf-8');
            console.log(`Archivo actuializado`);

        } catch (err) {
            console.log('no se pudo actualizar', err)
        }

    }

    async borrar() {
        try {
            await fs.promises.unlink(this.nombre);
            console.log(`Archivo ${miArchivo.nombre} borrado`);
        } catch (err) {
            console.log('Error al borrar el archivo', err);
        }
    }
};

const miArchivo = new Archivo(archivo);


async function operarArchivo(producto) {

   await miArchivo.leer();
   await miArchivo.guardar(producto);
   await miArchivo.borrar();
        
}

operarArchivo(producto);