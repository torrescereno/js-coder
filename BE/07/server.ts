import express from 'express';
import fs from 'fs';

const app = express();
const port = 8080;
const path: string = __dirname + '/productos.txt'
let data: any;
let contItem: number = 0;
let contRandom: number = 0;

// Lectura del archivo
function leerArchivo(path:string) : Promise<string>{
    return fs.promises.readFile(path, 'utf-8') || [];
};

(async ()=>{
    data = await leerArchivo(path);
    data = JSON.parse(data);
})();

// Muestra el objeto completo
app.get('/', (req, res) => {
    res.send(data);
});

// Retornar la catidad de items y la cantidad de productos
app.get('/items', (req, res) => {

    try {
        const obj = `{ item: ${JSON.stringify(data)}, cantidad: "${data.length}"}`;
        contItem += 1;
        res.send(obj)
    } catch (e) {
        res.status(400).send(e);
    }

});

// Retornar un item random
app.get('/item-random', (req, res) => {

    try {
        const cantProd = data.length;
        // Obtener un numero random
        const numRandom =  Math.round(Math.random() * ((cantProd - 1) - 0) + 0);
        const obj = `{ item: ${JSON.stringify(data[numRandom])}}`;
        contRandom += 1;
        res.send(obj);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/visitas', (req, res) => {
    res.send(`{ visitas : { items: ${contItem}, item: ${contRandom} } }`)
});

app.listen(port, () => {
    try {
        console.log(`Servidor escuchando en el puesto: ${port}`)
    } catch (e) {
        console.log(e);
    }
})