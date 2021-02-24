const socket = io();

const input = document.querySelector(".chat-input");
const button = document.querySelector(".btn-input");
const panelChat = document.querySelector(".chat-panel");
const formChat = document.querySelector("#formChat");


formChat.addEventListener("submit", (e)=>{
    e.preventDefault();

})

button.addEventListener("click", (e)=>{
    
    // enviar el mesanje al server
    socket.emit("get:message", input.value);
})

// Recibir el mensaje desde el server para emitirlo al usuario
socket.on("get:message-user", (data) => {
    
    input.value = "";

    const chatDiv = document.createElement("p");
    chatDiv.textContent = data.message;
    panelChat.appendChild(chatDiv);

})
