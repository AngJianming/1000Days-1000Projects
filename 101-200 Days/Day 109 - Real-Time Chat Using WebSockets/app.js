const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('message', 'A user has joined the chat');

    socket.on('chat message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.broadcast.emit('message', 'A user has left the chat');
    });
});

http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
