"use strict";
function mensaje() {
    console.log("proceso completo");
}
function imprimir(texto, cb, tiempo = 1000) {
    let index = 0;
    let interval = setInterval(function (palabra) {
        palabra = texto.split(" ");
        console.log(palabra[index++]);
        if (index === palabra.length) {
            clearInterval(interval);
            const count = palabra.length;
            cb(count);
        }
    }, tiempo, texto);
}
imprimir('Primera frase', (count) => {
    let contPalabras = count;
    imprimir('Segunda frase', (count) => {
        contPalabras += count;
        imprimir('Tercera frase', (count) => {
            contPalabras += count;
            console.log(`Total de palabras: ${contPalabras}`);
            mensaje();
        }, 500);
    }, 500);
}, 500);
