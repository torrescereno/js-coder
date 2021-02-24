const socket = io();

const input = document.querySelector(".chat-input");
const button = document.querySelector(".btn-input");
const panelChat = document.querySelector(".chat-panel");
const formChat = document.querySelector("#formChat");
const chatMessage = document.querySelector(".chat-message")

let userId;
chatMessage.textContent = "\n";


formChat.addEventListener("submit", (e)=>{

    e.preventDefault();
    // enviar el mesanje al server
    socket.emit("get:message", {'message': input.value, 'userId': userId});

})

socket.on("connect", () => {

    userId = socket.id;
    console.log("Usuario conectado " + socket.id);
})

// Recibir el mensaje desde el server para emitirlo al usuario
socket.on("get:message-user", (data) => {
    
    input.value = "";
    chatMessage.textContent += `\n${data.userId} : ${data.message}`;
    panelChat.appendChild(chatMessage);

})
