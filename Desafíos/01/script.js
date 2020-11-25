function saludo() {
    let nombre = prompt('Ingresa tu nombre :)');
    let saludo = "Hola " + nombre + " !"; 

    console.log(saludo);
}

function suma(){

    let num = 10;
    let valor =  prompt('Ingresa un número por favor').trim();

    while(true) {

        if( isNaN(valor) || valor == '') {
            valor = prompt('No ingresaste un número :( por favor intenta denuevo!').trim();
        }else{
            valor = parseInt(valor);
            break;
        }
    };

    let suma = valor + num;

    console.log( `La suma del primer número ${num} con el segundo número ${valor} es: ${suma}` );
}

function alerta(){
    let text1 = prompt('Ingresa el primer texto:');
    let text2 = prompt('Ingresa el segundo texto:');

    alert(text1.trim() + ' ' + text2.trim());
}

saludo();
suma();
alerta();

