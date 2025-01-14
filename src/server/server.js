const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('canvas-update', (data) => {
    socket.to(data.roomId).emit('canvas-update', data);
  });

  socket.on('cursor-move', (data) => {
    socket.to(data.roomId).emit('cursor-move', data);
  });
});

server.listen(3001);
