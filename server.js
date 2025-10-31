const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Renderなどのホスティングでは、環境変数 PORT を利用する
const PORT = process.env.PORT || 8080;

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

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
