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

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New client connected');

  // WebSocket message handler
  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the received message to all connected clients except the sender
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // WebSocket close handler
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server running at port ' + port);
});
