export class Calculo {

    private valor1: number;
    private valor2: number;
    private tipo: string;


    constructor(valor1:number, valor2: number, tipo: string) {
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.tipo = tipo;
    }

    public resultado() {

        if(this.tipo === 'suma'){
            return this.valor1 + this.valor2;
        }else if(this.tipo === 'resta'){
            return this.valor1 - this.valor2;
        }else{
            return 'Operacion no permitida';
        }
    
    }
} 