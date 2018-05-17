const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    const recievedMessage = JSON.parse(message);
    console.log("Server side received: ",message);
    const messageObject = {
      // id: getMsgKey(),
      id: uuidv1(),
      content: recievedMessage.content,
      username: recievedMessage.username,
    };
    wss.broadcast(JSON.stringify(messageObject));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// let MsgKey = 1;
// const getMsgKey = () => {
//   const nextMsgKey = MsgKey;
//   MsgKey = MsgKey + 1;
//   return nextMsgKey;
// };

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
  console.log("Server side going to send data: ",data);
    console.log(client.readyState);
    if (client.readyState === SocketServer.OPEN) {
      console.log("Server side sending data: ",data);
      client.send(data);
    }
  });
};

// wss.on('connection', function connection(socket) {
//   // Unlike on the client/browser, ws uses `.on()`
//   // and the function gets a string, not an object
//   socket.on('message', function incoming(message) {
//     console.log("Server side received: ",messageObject);
//     const messageObject = {
//       id: getMsgKey(),
//       text: message,
//     };
//     wss.broadcast(JSON.stringify(messageObject));
//   });
// });

