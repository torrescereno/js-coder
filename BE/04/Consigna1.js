import { fromEvent } from 'https://dev.jspm.io/rxjs@6/_esm2015';
//import { map, filter, switchMap } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

const inputText = document.querySelector('#texto');
const inputResultado = document.querySelector('#resultado');
const observableText = fromEvent(inputText, 'input');
let textoCompleto = '';

// Listener input

const observer = {

    next: (e) => { 
        e.data != null ? 
            textoCompleto += e.data : textoCompleto = textoCompleto.slice(0,-1);

        textoCompleto == 'error' ? 
            sub.error("error") : textoCompleto == 'complete' ? 
                sub.complete() : inputResultado.textContent = textoCompleto.split('').reverse().join('');
        
        setTimeout(() => {
            sub.unsubscribe();
            limpiar();
        }, 30000)
    },
    error: (error) => { 
            console.log(error);
            sub.unsubscribe();
            limpiar();
        }, 
    complete: () => {
            console.log("complete")
            limpiar();
        }

  };


const sub = observableText.subscribe(observer);

const limpiar = () => {
    inputText.value = '';
    inputText.disabled = true;
    inputResultado.textContent = '';
}