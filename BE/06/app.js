const fs = require('fs');
const { async } = require('rxjs');

class Archivo {

    constructor(nombre) {
        this.nombre = nombre;
    }

    async leer() {
        try {
            return await fs.promises.readFile(this.nombre, 'utf-8') || [];
        } catch (error) {
            return 'No existe el archivo';
        }
    }

    async guardar(producto) {

        const data = await this.leer();
        
        return data
    }

    async borrar() {
        try {
            await fs.promises.unlink(this.nombre);
            return `Archivo ${miArchivo.nombre} borrado`;
        } catch (error) {
            return 'Error al borrar el archivo';
        }
    }

};

const producto = {
    title: 'Libro',
    price: 999.00,
    thumbnail: 'www.google.com'
}

const archivo = 'productos.txt';

const miArchivo = new Archivo(archivo);

async function leerArchivo() {
    console.log(await miArchivo.leer());
}

async function guardarArhivo() {
    const data = await miArchivo.guardar(producto);
    console.log(data);
}

async function borrarArchivo() {
    console.log(await miArchivo.borrar());
}

//leerArchivo();
guardarArhivo();
// borrarArchivo();