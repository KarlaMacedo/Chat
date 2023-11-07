const { log } = require('console');
const express = require('express');
const path = require('path');
const SocketIO = require('socket.io');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start server
const server = app.listen(app.get('port'), () => {
    console.log('Serving on port ' + app.get('port'));
});

//Comunication socket.io
const io = SocketIO(server);

//Websockets
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    // ENVIO DE MENSSAGES
    socket.on('chat:message', (data) =>{ //servidor escucha la data que emite el usuario
        console.log(data, 'chat message dataaaaa en index.js');
        io.sockets.emit('chat:message', data); // despues de que el usuario emite y el servidor recibe, el servidor emite de nuevo la información a todos los sockets (usuarios conectados)
    });

    // ESCRIBIR MESSAGES
    socket.on('chat:typing', (data) => {
        console.log(data, 'this user is typing');
        socket.broadcast.emit('chat:typing', data); // emitir a todos excepto a mi
    });
})