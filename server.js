'use strict';

const net = require('net');
const uuid = require('uuid');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${uuid()}`;
  console.log(id);
  socketPool[id] = socket;
  socket.on('data', dispatchEvent);
  socket.on('close', () => {
    delete socketPool[id];
  });
});

// eslint-disable-next-line no-redeclare
let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  console.log(text);
  for (let socket in socketPool) {
    socketPool[socket].write(`${text}\r\n`);
  }
};
