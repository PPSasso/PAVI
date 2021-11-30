"use strict";
const express = require('express');
const app = express();
const http = require('http');
let server = http.createServer(app);
var WebSocketServer = require('websocket').server;
const clients = [];
app.use(express.static(__dirname + '/public'));
app.get('/screen', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/controller', (req, res) => {
    res.sendFile(__dirname + '/nipple.html');
});
server.listen(process.env.PORT || 8000, () => {
    console.log('listening on port :8000');
});
const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    clients.push(connection);
    connection.on('message', (message) => {
        console.log(message.utf8Data);
        clients.forEach(client => {
            client.send('Message from server!');
        });
    });
    connection.on('close', () => {
        console.log('close');
    });
});
