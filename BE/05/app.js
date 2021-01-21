const http = require("http");

// Cracion del servidor
const server = http.createServer((req, res) =>{
    
    // Permite generar un mensaje con etiquetas HMTL 
    res.end('<b>Hola Mundo</b>');

});

server.listen(4500, function(){
    console.log(`listener ${this.address}`)
});