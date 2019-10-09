'use strict';

const net = require('net');
const client = new net.Socket();

client.connect(3001, 'localhost', () => {
  console.log('Connected to localhost:3001');
});

client.on('save', data => {
  console.log(data.toString().trim());
});

client.on('error', data => {
  console.error(data.toString().trim());
});

client.on('close', () => {
  console.log('Connection closed');
});