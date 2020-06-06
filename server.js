'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  let mes;
  ws.on('message', message => {
    mes = message

    let obj = {
      name: "Iliyas",
      age: 22,
      username: "Ileke"
    }

    console.log(`Received message => ${message}`)
    wss.clients.forEach((client) => {
      // client.send('Hello! '+ JSON.stringify(obj))
      client.send(message)
    });
  });
  ws.send('Server works stable!!')
});



