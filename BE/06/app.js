
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

    leer() {
        return fs.promises.readFile(this.nombre, 'utf-8') || [];
    }

    guardar(pData, producto) {

        const data = JSON.parse(pData);

        // Obtener el largo del arreglo
        const totalArray = data.length;

        // Agregar el objeto con el ID
        producto.id = totalArray + 1;

        // Push al arreglo
        data.push(producto)

        return fs.promises.writeFile(this.nombre, JSON.stringify(data), 'utf-8');

    }

    borrar() {
        return fs.promises.unlink(this.nombre);
    }
};

const miArchivo = new Archivo(archivo);


async function operarArchivo(producto) {

    try {

        const data = await miArchivo.leer();
        console.log(data);

        await miArchivo.guardar(data, producto);
        console.log('Producto guardado');

        await miArchivo.borrar();
        console.log('Archivo borrado');

    } catch (err) {
        console.log('Ocurrio un error', err)
    }

}

operarArchivo(producto);