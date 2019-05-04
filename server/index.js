'use strict'
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(6700, function() {
    console.log('Servidor corriendo en http://localhost:6700');
});

io.on('connection', (socket) => {
    console.log('El cliente con IP ' + socket.handshake.address + 'Se ha conectado');
    socket.emit('messages', messages);
    socket.on('add-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

let messages = [{
    id: 1,
    text: 'Bienvenido al chat',
    nickname: 'bot - Nestor Velasquez'
}]

app.use(express.static('client'));