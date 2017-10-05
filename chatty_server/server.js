// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Receive incoming messages and call broadcast
wss.on('connection', (ws) => {
  ws.on('message', function incoming(message) {
    let incomingMSG = JSON.parse(message);
    console.log(incomingMSG);
    ws.send(JSON.stringify(incomingMSG));
    wss.clients.forEach((client) => {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(incomingMSG));
      // }
    });
  })


  console.log('Client connected');

  // Callback for when a client closes the socket/closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});