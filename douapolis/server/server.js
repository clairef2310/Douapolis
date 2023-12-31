// Set up socket.io
const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(require("./routes/users"));
app.use(require("./routes/game"));
app.use(require("./routes/stats"));
app.use(require("./routes/amis"));
app.use(require("./routes/play"));

// get driver connection
const dbo = require("./db/conn");

// Store rooms and players in memory
const rooms = {};
const players = {};
const diceValue = null;
const newPosition = '';

io.on('connection', (socket) => {
  console.log('a user connected');

  // Join a room
  socket.on('join-room', ({ roomId, username }) => {
    console.log(`User ${username} joined room ${roomId}`);

    // Store the player in memory
    players[socket.id] = {
      username,
      roomId,
    };
    // Create the room if it doesn't exist
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: [],
      };
    }
    console.log(players);

    // Check if the player has already joined the room
    const alreadyJoined = rooms[roomId].players.some(playerId => playerId === socket.id);
    if (alreadyJoined) {
      console.log(`User ${username} has already joined room ${roomId}`);
      return;
    }

    // Add the player to the room
    rooms[roomId].players.push(socket.id);

    // Notify other players in the room of the new player
    socket.broadcast.to(roomId).emit('new-player', { username });

    // Join the room
    socket.join(roomId);

    // Send the room information to the client
    socket.emit('room-info', { players: rooms[roomId].players.map((playerId) => players[playerId].username) });

    socket.on("start-game", ({ roomId }) => {
      console.log(`Starting game in room ${roomId}`);
      io.to(roomId).emit("redirect-to-game", `/Jeu?${roomId}`); // émettre l'événement "redirect-to-game" à tous les clients connectés à la salle
    });

    // Send the updated list of players to all players in the room
    io.in(roomId).emit('update-players', { players: rooms[roomId].players.map((playerId) => players[playerId].username) });

    io.in(roomId).emit('nb-players-co', { nb: rooms[roomId].players.length});
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  
    // Remove the player from the room and memory
    const player = players[socket.id];
    
    if (player) {
      const roomId = player.roomId;
      rooms[roomId].players = rooms[roomId].players.filter((p) => p !== socket.id);
      delete players[socket.id];
      socket.broadcast.to(roomId).emit('player-left', { username: player.username });
  
      // Send the updated list of players to all players in the room
      io.in(roomId).emit('update-players', { players: rooms[roomId].players.map((playerId) => players[playerId].username) });
    }
  });  

});

// Connect to database and start the server
dbo.connectToServer(function (err) {
  if (err) console.error(err);
  else {
    http.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
});