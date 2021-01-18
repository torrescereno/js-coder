function mensaje() {
    console.log("proceso completo");
}
function imprimir(texto, cb, tiempo) {
    if (tiempo === void 0) { tiempo = 1000; }
    var index = 0;
    var interval = setInterval(function () {
        console.log(texto[index++]);
        if (index === texto.length) {
            clearInterval(interval);
            cb();
        }
    }, tiempo);
}
imprimir('PalabraUno', function () {
    imprimir('PalabraDos', function () {
        imprimir('PalabraTres', function () {
            mensaje();
        });
    }, 1000);
}, 1000);
