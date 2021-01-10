function condicionNum() {
    let num = prompt('Por favor ingresa un número:').trim();

    num = parseInt(num); 
    
    if ( !isNaN(num) && num !== '' && num > 1000 ) {
        alert('El número ingresado es mayor a 1000')
    }else if( !isNaN(num) && num !== '' && num >= 10 || num <= 50 ){
        alert('El número ingresado está entre 10 y 50')
    }else{
        alert('No ingresaste un número!')
    }
}

function condicionStr() {
    
    let texto =  prompt('Ingresa una palabra, por ejemplo Hola').trim();

    if (texto === 'Hola') {
        console.log('Se ingreso la palabra "Hola"');
    }else{
        console.log('No es la palabra que busco :(');
    }
}


condicionNum();
condicionStr();