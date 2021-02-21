const socket = io();

// Formulario
const formulario = document.querySelector("#formAdd");
//Input
const pTitulo = document.querySelector("#titulo")
const pPrecio = document.querySelector("#precio")
const pArchivo = document.querySelector("#archivo")
const divLista = document.querySelector(".lista-container");

formulario.addEventListener("submit", (e) => {

    e.preventDefault();
    
    // Emitir el objeto que se quiere crear
    socket.emit('post:producto', {
        'title': pTitulo.value,
        'price': pPrecio.value,
        'thumbnail': pArchivo.value,
    });

    // Limpiar inputs
    pTitulo.value = "";
    pPrecio.value = "";
    pArchivo.value = "";

});

// Recibir el objeto que se agrego
socket.on('get:productos', (data) => {

    const numLista = data.listaProductos.length - 1
    const element = data.listaProductos[numLista];

    divLista.innerHTML += `
    <div class="card lista-card" style="width: 18rem;">
        <img src="${element.thumbnail}" class="card-img-top lista-imagen">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">Precio: ${element.price}</p>
        </div>
    </div>
    `
})

socket.on("connect", () => {
    console.log("user conectado " + socket.id);
})

