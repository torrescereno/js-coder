// Tuplas
var mitupla;
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
    var resultado;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        resultado = input1 + input2;
    }
    else {
        resultado = input1.toString() + input2.toString();
    }
    return resultado;
}
// Literales [se define un tipo de valor custom] 
var objLiteral = {
    literal: 'numero'
};
console.log(objLiteral.literal);
