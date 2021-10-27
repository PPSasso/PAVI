
  const express = require('express');
  const app = express();
  const http = require('http');
  const server = http.createServer(app);
  var clients = [];
  const { Server } = require("socket.io");

  var WebSocketServer = require('websocket').server;

  //Inicializa servidor
  server.listen(process.env.PORT || 3000, () => {
    console.log('listening on port :3000');
  });

  app.use(express.static(__dirname+'/public'))


//Rotas
  app.get('/screen', (req, res) => {  
    res.sendFile(__dirname +'/index.html');
  });

  app.get('/controller',(req, res) => {
    res.sendFile(__dirname + '/nipple.html');
  });


//Servidor
  const io = new Server(server, { /* options */})

  io.on("connection", (socket) => {
      socket.on("message", (data) => {
        console.log(data)
        io.emit(data)
      })
  })



  // const wsServer = new WebSocketServer ({
  //   httpServer: server
  // })

  // wsServer.on('request', (request) => {

  //   const connection = request.accept(null, request.origin);

  //   clients.push(connection);

  //   connection.on('message', (message) => {
  //     console.log(message.utf8Data)
  //     clients.forEach(client => {
  //       client.send(message.utf8Data)
  //     })
  //   })
  
  //   connection.on('close', () => {
  //     console.log('close')
  //   })

  // })


  