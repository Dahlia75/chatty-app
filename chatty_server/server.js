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
  const userColor = getRandomColor();
  getUsersCount();

  ws.on('message', function incoming(message) {
    const recievedMessage = JSON.parse(message);
    let messageObject={};
    //Check the type of the message from the server
    if(recievedMessage.type === 'postMessage'){
       messageObject = {
        id: uuidv1(),
        type: 'incomingMessage',
        content: recievedMessage.content,
        username: recievedMessage.username,
        userColor: userColor,
      };
    } else {
       messageObject = {
        id: uuidv1(),
        type: 'incomingNotification',
        content: recievedMessage.content,
      }
    };
    wss.broadcast(JSON.stringify(messageObject));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    getUsersCount();
  });
});

//Send messages to all connected users
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

//Create a color to user name
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Get number of connected users
function getUsersCount(){
    const messageObject = {
    type: 'usersCount',
    content: wss.clients.size,
  };
  wss.broadcast(JSON.stringify(messageObject));
}


