
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



var players = []
var hasGameStarted = false


//Servidor
const io = new Server(server, { /* options */})

io.on('connection', (socket) => {

  console.log(`User connected with id ${socket.id}`)
  
  if (!hasGameStarted) {
    
    if (players.length === 1) {
      players.push({
        id: socket.id,
        nippleId: players[0].id,
        ballOwner: true
      })
    }
  
    else if (players.length === 3) {
      hasGameStarted = true
      players.push({
        id: socket.id,
        nippleId: players[2].id,
        ballOwner: false
      })
    } 
    else {
      players.push({
        id: socket.id,
        nippleId: ""
      })
      
    } 

  }
  


  
  io.emit('new_player_connected', [
    players,
    hasGameStarted
  ])
  
  function onNewPlayer(newPlayer) {
   try {
      console.log('New player connected:', newPlayer)
      
      // if no players connected reset hasGameStarted
      

    } 
    catch (err) {
      console.error('Error on onNewPlayer method:', err)
    }
  }

  socket.on('new-player', onNewPlayer)

  socket.on("paddleMoved", (positionX) => {
    io.emit("playerHasMoved", [positionX[0], positionX[1]])
  })

  socket.on("ball_moved", ([x, y, id]) => {
    io.emit("ball_has_moved", [x, y, id])
  })

  socket.on('disconnect', (reason) => {
    hasGameStarted = false
    console.log("Players before: ", players)
    players = players.filter(({id}) => {
      return id !== socket.id
    })
    console.log("User: ", socket.id, "With reason: ", reason)
    console.log("Players after: ", players)
  })
  

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

    console.log(Object.values(data))

    io.emit(data)
  })

  socket.on('Nipple', (data) => {
    io.emit(data[0], data[1])
  })

})
