const btnListar = document.querySelector("#listar");
const btnAgregar = document.querySelector("#agregar");

btnListar.addEventListener("click", () =>{
    document.querySelector(".agregar").style.display = "none";
    document.querySelector(".lista").style.display = "flex";
})

btnAgregar.addEventListener("click", () =>{
    document.querySelector(".lista").style.display = "none";
    document.querySelector(".agregar").style.display = "flex";
})