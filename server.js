
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

//Inicializa servidor
server.listen(process.env.PORT || 3000, () => {
  console.log('listening on port :3000');
});

//Rotas
app.use(express.static(__dirname+'/public'))

app.get('/screen', (req, res) => {  
  res.sendFile(__dirname +'/index.html');
});

app.get('/controller',(req, res) => {
  res.sendFile(__dirname + '/nipple.html');
});


var clients = [];
var controllers = []
var controller = {
  new: function (idC) {
    return {
      id: idC,
      resp: true
    }
  }
}




//Servidor
const io = new Server(server, { /* options */})

io.on('connection', (socket) => {

  socket.on('message', (data) => {
    io.emit(data)
  })

  socket.emit('new player')
  
})