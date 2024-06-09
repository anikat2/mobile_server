const express = require('express');
const dotEnv = require('dotenv');

dotEnv.config();
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.send('Server is running...');
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('message', (data) => {
    console.log('Received message:', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('server running at ' + port + '...');
});
