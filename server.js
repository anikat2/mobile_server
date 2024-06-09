const express = require('express');
const dotEnv = require('dotenv');
const http = require('http');
const WebSocket = require('ws');

dotEnv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', function (req, res) {
  res.send('Server is running...');
});

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('server running at ' + port + '...');
});
