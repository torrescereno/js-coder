const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.querySelector("#room-name");
const userList = document.querySelector("#users");
const chatContainer = document.querySelector(".chat-messages-container");

const socket = io.connect();

const { username, room } = getParams();

socket.emit("joinRoom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
	outputRoomName(room);
	outputUsers(users);
});

socket.on("message", (message) => {
	// *****************************
	// CORREGIR
	// *** Desnormalizar mensaje **

	const autor = new normalizr.schema.Entity("user");
	const mensaje = new normalizr.schema.Entity("message", {
		autor: autor,
	});

	const data = normalizr.denormalize(
		message,
		mensaje,
		message.text.entities.message
	);

	// *****************************

	outputMessage(message);
	chatContainer.scrollTop = chatContainer.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let msg = e.target.elements.msg.value;

	msg = msg.trim();

	if (!msg) {
		return false;
	}

	socket.emit("chatMessage", msg);

	e.target.elements.msg.value = "";
	e.target.elements.msg.focus();
});

function outputMessage(message) {
	const divContainer = document.createElement("div");
	const divMessage = document.createElement("div");
	const divUser = document.createElement("div");
	const divText = document.createElement("div");
	const divTime = document.createElement("div");

	if (socket.id == message.id) {
		divContainer.classList.add("chat-messages");
	} else {
		divContainer.classList.add("chat-messages-others");
	}

	divMessage.classList.add("message");
	divUser.classList.add("message-user");
	divText.classList.add("message-content");
	divTime.classList.add("message-time");

	divUser.innerHTML = `<span>${message.username}</span>`;
	divText.innerHTML = `<span>${message.text}</span>`;
	divTime.innerHTML = `<span>${message.time}</span>`;

	divContainer.appendChild(divMessage);
	divMessage.appendChild(divUser);
	divMessage.appendChild(divText);
	divMessage.appendChild(divTime);

	document.querySelector(".chat-messages-container").appendChild(divContainer);
}

function outputRoomName(room) {
	roomName.innerText = room;
}

function outputUsers(users) {
	userList.innerHTML = "";
	users.forEach((user) => {
		const li = document.createElement("li");
		li.innerText = user.username;
		userList.appendChild(li);
	});
}

document.getElementById("leave-btn").addEventListener("click", () => {
	const leaveRoom = confirm("Estas segur@ que quieres salir ?");
	if (leaveRoom) {
		window.location = "/";
	} else {
	}
});

function getParams() {
	const data = [];
	const valores = window.location.search;
	const urlParams = new URLSearchParams(valores);
	const values = urlParams.values();

	for (const value of values) data.push(value);

	return {
		username: data[0],
		room: data[1],
	};
}
