// Tuplas
let mitupla: [string,number];


// Enum
// enum Role { ADMIN = 0, READ_ONLY, AUTHOR }
enum Role { ADMIN = '1', READ_ONLY = '2', AUTHOR = '3'}


//Union [Permite elegir entre dos opciones (no une los valores) como un operador logico or ]
function combinar( input1: number | string, input2: number | string) {
    let resultado;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        resultado = input1 + input2;
    } else {
        resultado = input1.toString() + input2.toString()
    }
    return resultado;
}

// Literales [se define un tipo de valor custom] 
 const objLiteral: {
    literal: 'numero' | 'string'
 } = {
    literal: 'numero'
 }


console.log(objLiteral.literal);


