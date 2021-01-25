import { fromEvent } from 'rxjs';

const inputText : any = document.querySelector('#texto');
const inputResultado: any = document.querySelector('#resultado');

// Listener input

inputText.addEventListener('keydown', (e: any) => {
    
    // escribir en el span
    inputResultado.textContent += e.key;
    console.log(e);

})