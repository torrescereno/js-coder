import { fromEvent } from 'https://dev.jspm.io/rxjs@6/_esm2015';
import { timeout, map } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

const inputText = document.querySelector('#texto');
const inputResultado = document.querySelector('#resultado');
const observableText = fromEvent(inputText, 'input');
let textoCompleto = '';

// Listener input

const observer = {

    next: (data) => { 

            data != null ? 
                textoCompleto += data : textoCompleto = textoCompleto.slice(0,-1);

            textoCompleto == 'error' ? 
                sub.error("error") : textoCompleto == 'complete' ? 
                    sub.complete() : inputResultado.textContent = textoCompleto.split('').reverse().join('');
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


const sub = observableText.pipe(
    
        timeout(30000),
        map( e => { return e.data })
    
    ).subscribe(observer);

const limpiar = () => {
    inputText.value = '';
    inputText.disabled = true;
    inputResultado.textContent = '';
}