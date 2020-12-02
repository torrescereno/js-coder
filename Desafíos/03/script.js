/* Variables */

const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

let cont = 1;

/* ------------------- FOR ------------------ */

function fun() {

    for (let i = 0; i < dias.length; i++) {

        let dia = dias[i];

        if (i % 2 === 1) {
            console.log(`El día ${dia}, es par ${i + 1}`);
        } else if (i === 6) {
            alert(`Es ${dia}!! tomate un descanso :)`)
        }
    };

}

fun();

/* ------------------- SWITCH ------------------ */

/* function funSwitch(params) {

    for (let i = 0; i < dias.length; i++) {

        let dia = dias[i];
        let flag = false;

        switch (cont) {
            case 2:
                flag = true;
                break;
            case 4:
                flag = true;
                break;
            case 6:
                flag = true;
                break;
            case 7:
                alert(`Es ${dia}!! tomate un descanso :)`)
        }

        if (flag) {
            console.log(`El día ${dia}, es par ${cont}`);
        }

        cont ++;
    };
}

funSwitch(); */


/* ------------------- WHILE ------------------ */

/* function funWhile() {

    let dia;

    while (cont < dias.length + 1) {

        dia = dias[cont - 1];

        if (cont % 2 === 0) {
            console.log(`El día ${dia}, es par ${cont}`);
        }else if (cont === 7) {
            alert(`Es ${dia}!! tomate un descanso :)`)
        }

        cont ++;
    }

}

funWhile(); */