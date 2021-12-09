// create websocket using socket.io
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

io.on('connection', (socket) => {
    console.log(`User '${socket.id}' connected`);

    socket.on('join_room', (data) => {
        console.log(`Room data = ${data}`);
        socket.join(data);
    });

    socket.on('send_message', (data) => {
        console.log(`Message data = ${data}`);
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
});

module.exports = server;
