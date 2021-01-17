"use strict";
const pathModule = './01.js';
class Calculo {
    constructor(valor1, valor2, tipo) {
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.tipo = tipo;
    }
    operaciones() {
        import(pathModule)
            .then(module => console.log(module.operacion(this.valor1, this.valor2, this.tipo)));
    }
}
const calculo = new Calculo(1, 2, "suma");
calculo.operaciones();
