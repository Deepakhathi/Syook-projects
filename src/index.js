// src/index.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { encryptData, decryptData } = require('./encryptionUtils');
const TimeSeriesDB = require('./timeseriesDB');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const encryptionKey = 'yourEncryptionKey';
const iv = 'yourInitializationVector';

const timeSeriesDB = new TimeSeriesDB();

let dataCounter = 0;

io.on('connection', (socket) => {
  console.log('Client connected');

  setInterval(() => {
    const rawData = { value: Math.random() * 100, timestamp: Date.now() };
    const encryptedData = encryptData(JSON.stringify(rawData), encryptionKey, iv);
    socket.emit('encryptedData', encryptedData);
  }, 1000);

  socket.on('encryptedData', (encryptedData) => {
    const decryptedData = decryptData(encryptedData, encryptionKey, iv);
    const parsedData = JSON.parse(decryptedData);

    timeSeriesDB.saveData(parsedData);

    console.log('Received and saved data:', parsedData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
