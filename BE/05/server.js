const http = require("http");

// Cracion del servidor
const server = http.createServer((req, res) =>{


    const numRandom = Math.round(Math.random() * (10 - 1) + 1);
    const decRandom = parseFloat(Math.random() * (9999.99)).toFixed(2);

    const obj = {
        id: numRandom,
        title: `Producto ${numRandom}`,
        price: decRandom,
        thumbnail: `Foto ${numRandom}`
    };

    res.setHeader("Content-Type", "application/json");

    // Rutas disponibles
    switch (req.url) {
        case "/":
            res.writeHead(200);
            res.end(JSON.stringify(obj));
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"ERROR 404: No se encontro la pagina"}));
    }

});

server.listen(4500, function(){
    console.log(`Escuchando en el puerto: ${this.address().port}`);
});
