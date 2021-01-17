export function operacion(n1:number, n2:number, tipo: string) {
    if(tipo === 'suma'){
        return n1 + n2;
    }else if(tipo === 'resta'){
        return n1 - n2;
    }else{
        console.log('Operacion no permitida')
    }
}

