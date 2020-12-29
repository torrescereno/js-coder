// Array
const arr: string[] = ['1', '2'];

// Tuplas
let mitupla: [string, number];

// Enum
// enum Role { ADMIN = 0, READ_ONLY, AUTHOR }
enum Role { ADMIN = '1', READ_ONLY = '2', AUTHOR = '3' }


//Union [Permite elegir entre dos opciones (no une los valores) como un operador logico or ]
function combinar(input1: number | string, input2: number | string) {
    let resultado;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        resultado = input1 + input2;
    } else {
        resultado = input1.toString() + input2.toString()
    }
    return resultado;
}

// Literales 
const objLiteral: {
    literal: 'numero' | 'string'
} = {
    literal: 'numero'
}

// Custom
type customType = number | string;
type custosLitral = 'as-numero' | 'as-string';
type custosObject = {name: string, age: number};

// Retornos
function suma(num1: number, num2: number) {
    return num1 + num2;
}

function mostrarResultado(num:number): void {
    console.log(suma(1,2));
}

// Functions
// let combinarValores: Function;
let combinarValores: (a:number, b:number) => number;

combinarValores = suma;

// Callbacks
function addAndHandle(n1:number, n2:number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10, 20, (result) => {
    console.log(result)
});

// 

console.log();




