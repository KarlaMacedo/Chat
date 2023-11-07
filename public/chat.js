const socket = io();

//DOM ELEMENTS
let message = document.getElementById('message');
let username = document.getElementById('userName');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

// ENVIAR MESSAGES
btn.addEventListener('click', function () {
    socket.emit('chat:message', { // usuario envia o emite los datos al servidor 
        username: username.value,
        message: message.value
    })
});

socket.on('chat:message', function (data) { // usuario escucha los datos que esté enviando el servidor, despues de que el usuario envío, el servidor recibió y los reenvió; para poderla renderizar en la app
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong class="userNames">${data.username}: </strong> ${data.message}
    </p>`
});

// ESCRIBIR MESSAGES
message.addEventListener('keypress', function (){
    socket.emit('chat:typing', username.value); // usuario envia
});

socket.on('chat:typing', function (data) { // usuario escucha los datos que esté enviando el servidor, despues de que el usuario envío, el servidor recibió y los reenvió; para poderla renderizar en la app
    actions.innerHTML = `<p>
    <em>${data} is typing a message...</em>
    </p>`
});
