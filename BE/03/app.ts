function mensaje() {
    console.log("proceso completo");
}

function imprimir(texto: string, cb: Function, tiempo: number = 1000) {

    let index = 0;

    let interval = setInterval(function (palabra) {

        palabra = texto.split(" ")

        console.log(palabra[index++])

        if (index === palabra.length) {

            clearInterval(interval);
            const count: number = palabra.length
            cb(count);

        }

    }, tiempo, texto);

}


imprimir('Primera frase', (count: number) => {
    let contPalabras = count;
    imprimir('Segunda frase', (count: number) => {
        contPalabras += count;
        imprimir('Tercera frase', (count: number) => {
            contPalabras += count;
            console.log(`Total de palabras: ${contPalabras}`)
            mensaje();
        }, 500);
    }, 500);
}, 500);

