const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

let app = express();
app.use(cors());

let server = app.listen(3000);

app.use(express.static('public'));

console.log('My socket server is running!');

let socket = require('socket.io');
let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log(`New connection: ${socket.id}`);

  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    console.log(data);
  }
}

// Export the Express application
module.exports = app;
module.exports.handler = serverless(app);
