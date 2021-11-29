
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



var players = {};
var hasGameStarted = false


//Servidor
const io = new Server(server, { /* options */})

io.on('connection', (socket) => {

  console.log(`User connected with id ${socket.id}`)

  function onNewPlayer(newPl) {
    /**
     * On New PLayer method -> responsible for updating players object and emitting to all sockets that a new player has connected
     * @param {Object} newPl new player object containing initial player information
    */

    try {
      console.log('New player connected:', newPl)

      // if no players connected reset hasGameStarted
      if (Object.keys(players).length == 0) {
        hasGameStarted = false
      }

      if (!hasGameStarted) {
          players[socket.id] = newPl;
          io.emit('update-players-object', players)
      }

    } 
    catch (err) {
      console.error('Error on onNewPlayer method:', err)
    }
  }

  socket.on('new-player', onNewPlayer)


  function onCreatePaddle(paddle) {
    try {
          console.log('Creating Paddle:', paddle)
          io.emit('create-paddle', paddle)
    } catch (err) {
          console.error('Error on onCreatePaddle method:', err)
    }
  }

  socket.on('create-paddle', onCreatePaddle)


  function updatePlayerInfo(pl) {
    try {
        console.log("Updating player info:", pl)
        const id = pl.id
        if (players[id]) {
            players[id] = pl;
        }
        io.emit('update-players-info', players)
    } catch (err) {
        console.log('Error on updatePlayerInfo method:', err)
    }

  }

  
  socket.on('update-players-info', updatePlayerInfo)




  socket.on('message', (data) => {
    io.emit(data)
  })

})