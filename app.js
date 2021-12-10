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

app.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send('Hello world');
});

io.on('connection', (socket) => {
    console.log(`User '${socket.id}' connected`);

    // connect new user to room and send back username to notify room
    socket.on('join_room', (data) => {
        console.log(`Room data = ${data}`);
        socket.join(data.room);
        socket.to(data.room).emit('joined_room', data.user);
    });

    // Send message to room
    socket.on('send_message', (data) => {
        console.log(`Message data = ${data}`);
        socket.to(data.room).emit('receive_message', data);
    });

    // Disconnect user from room
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
});

module.exports = server;
