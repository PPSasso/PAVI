
  const express = require('express');
  const app = express();
  const http = require('http');
  const server = http.createServer(app);
  var clients = [];

  app.use(express.static(__dirname+'/public'))

  app.get('/screen', (req, res) => {  
    res.sendFile(__dirname +'/index.html');
  });

  app.get('/controller',(req, res) => {
    res.sendFile(__dirname + '/nipple.html');
  });

  server.listen(process.env.PORT || 4000, () => {
    console.log('listening on port :4000');
  });

  var WebSocketServer = require('websocket').server;

  const wsServer = new WebSocketServer ({
    httpServer: server
  })

  wsServer.on('request', (request) => {

    const connection = request.accept(null, request.origin);
    clients.push(connection);
  
    connection.on('message', (message) => {

      // console.log(message.utf8Data)
  
      clients.forEach(client => {
        client.send(message.utf8Data)
      })
    })
  
    connection.on('close', () => {
      console.log('close');
    })

  })


