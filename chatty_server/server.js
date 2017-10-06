// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('uuid/v4');

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
// Receive incoming messages and call broadcast/count number of users
var count = 0;
wss.on('connection', (ws) => {
  count++;
  var clientCount = {
    key: uuid(),
    type: 'connected',
    count: count
  }
  wss.clients.forEach((client) => {
    // if (client !== ws && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(clientCount));
  });
  wss.broadcast
  ws.on('message', function incoming(message) {
    const incomingMSG = JSON.parse(message);
    let msgObj = {};
    if (incomingMSG.type === 'postMessage') {
      msgObj = {
        type: 'incomingMessage',
        key: uuid(),
        username: incomingMSG.username,
        content: incomingMSG.content,
        count: count
      };
    }
    if (incomingMSG.type === 'postNotification') {
      msgObj = {
        type: 'incomingNotification',
        key: uuid(),
        oldUsername: incomingMSG.oldUsername,
        newUsername: incomingMSG.newUsername,
        count: count
      };
    }
    wss.clients.forEach((client) => {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(msgObj));
    });
  })


  console.log('Client connected');

  // Callback for when a client closes the socket/closed their browser.
  ws.on('close', function() {
    count--;
    var clientCount = {
      key: uuid(),
      type: 'disconnected',
      count: count
    }

    wss.clients.forEach((client) => {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(clientCount));
    });
  })
});