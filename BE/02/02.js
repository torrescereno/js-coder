"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculo = void 0;
class Calculo {
    constructor(valor1, valor2, tipo) {
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.tipo = tipo;
    }
    resultado() {
        if (this.tipo === 'suma') {
            return this.valor1 + this.valor2;
        }
        else if (this.tipo === 'resta') {
            return this.valor1 - this.valor2;
        }
        else {
            return 'Operacion no permitida';
        }
    }
}
exports.Calculo = Calculo;
