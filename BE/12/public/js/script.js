
const socket = io();

// Formulario
const formulario = document.querySelector("#formAdd");
const divLista = document.querySelector(".lista-container");


formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const url = "http://localhost:3000/"

    //Input
    const pTitulo = document.querySelector("#titulo")
    const pPrecio = document.querySelector("#precio")
    const pArchivo = document.querySelector("#archivo")

    const formData = new FormData();

    formData.append("title", pTitulo.value);
    formData.append("price", pPrecio.value);
    formData.append("thumbnail", pArchivo.files[0])

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .catch(err => console.error(err))
    .then(response => {
        socket.emit('post:producto', response)
    })
    

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

