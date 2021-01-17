import { Calculo } from "./02";

const pathModule = './02.js';


// Funcion con Async/Await

/* async function operacion(n1:number, n2:number, tipo: string) {

    const modulo = await import(pathModule);
    const Calculo = modulo.Calculo;
    const c = new Calculo(n1,n2,tipo);
    console.log(c.resultado());


} */


function operacion(n1:number, n2:number, tipo: string) {
    
    import(pathModule).then(modulo => {
        const Calculo = modulo.Calculo;
        const c = new Calculo(n1,n2,tipo);
        console.log(c.resultado());
    })

}


operacion(1,2,"suma");