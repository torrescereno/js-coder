function mensaje() {
    console.log("proceso completo");
}

function imprimir(texto:string, cb:Function, tiempo:number = 1000) {

    let index = 0;
    let interval = setInterval(function(){
        console.log(texto[index++])
        if (index === texto.length) {
            clearInterval(interval);
            cb();
        }
    }, tiempo);
    
}

imprimir('PalabraUno', () => {
    imprimir('PalabraDos', () => {
        imprimir('PalabraTres',() =>{
            mensaje();
        });
    }, 1000);
}, 1000);

