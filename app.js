'use strict';

const fs = require('fs');
const net = require('net');
const {promisify} = require('util');

const client = new net.Socket();

client.connect(3001, 'localhost', () => {
  console.log('Connected to localhost:3001');
});

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const alterFile = (file) => {
  readFileAsync(file, {encoding: 'utf-8'})
    .then(data => {
      let text = data.toString().toUpperCase();
      writeFileAsync(file, Buffer.from(text));
      client.write(`${file} saved`);
    })
    .catch(e => {
      client.write(e);
    });
};

let file = process.argv.slice(2).shift();
alterFile(file);
