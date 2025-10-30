const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('sensor', (data) => {
    socket.to('game').emit('sensor', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});
