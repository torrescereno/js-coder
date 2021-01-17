const pathModule = './01.js';

class Calculo {

    private valor1: number;
    private valor2: number;
    private tipo: string;


    constructor(valor1:number, valor2: number, tipo: string) {
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.tipo = tipo;
    }

    public operaciones() {
    
        import(pathModule)
            .then(module => console.log(module.operacion(this.valor1,this.valor2,this.tipo)));
    }
} 

const calculo = new Calculo(1,2,"suma")

calculo.operaciones();