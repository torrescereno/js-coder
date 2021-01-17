"use strict";
// Array
const arr = ['1', '2'];
// Tuplas
let mitupla;
// Enum
// enum Role { ADMIN = 0, READ_ONLY, AUTHOR }
var Role;
(function (Role) {
    Role["ADMIN"] = "1";
    Role["READ_ONLY"] = "2";
    Role["AUTHOR"] = "3";
})(Role || (Role = {}));
//Union [Permite elegir entre dos opciones (no une los valores) como un operador logico or ]
function combinar(input1, input2) {
    let resultado;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        resultado = input1 + input2;
    }
    else {
        resultado = input1.toString() + input2.toString();
    }
    return resultado;
}
// Literales 
const objLiteral = {
    literal: 'numero'
};
// Retornos
function suma(num1, num2) {
    return num1 + num2;
}
function mostrarResultado(num) {
    console.log(suma(1, 2));
}
// Functions
// let combinarValores: Function;
let combinarValores;
combinarValores = suma;
// Callbacks
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
addAndHandle(10, 20, (result) => {
    console.log(result);
});
// 
console.log();
