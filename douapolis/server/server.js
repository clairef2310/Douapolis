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

// get driver connection
const dbo = require("./db/conn");

// Store rooms and players in memory
const rooms = {};
const players = {};

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
    console.log(players);
    // Create the room if it doesn't exist
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: [],
      };
    }

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

    // Send the updated list of players to all players in the room
    io.in(roomId).emit('update-players', { players: rooms[roomId].players.map((playerId) => players[playerId].username) });
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
  
  // Join game event
  socket.on('join-game', ({ roomId, username }) => {
    console.log(`User ${username} wants to join the game in room ${roomId}`);

    // Check if the player has already joined the room
    const alreadyJoined = rooms[roomId].players.some(playerId => playerId === socket.id);
    if (alreadyJoined) {
      console.log(`User ${username} has already joined room ${roomId}`);
      return;
    }

    // Notify other players in the room of the player joining the game
    socket.broadcast.to(roomId).emit('player-joined-game', { username });

    // Add the player to the room
    rooms[roomId].players.push(socket.id);

    // Notify other players in the room of the new player
    socket.broadcast.to(roomId).emit('new-player', { username });

    // Join the room
    socket.join(roomId);

    // Send the room information to the client
    socket.emit('room-info', { players: rooms[roomId].players.map((playerId) => players[playerId].username) });

    // Send the updated list of players to all players in the room
    io.in(roomId).emit('update-players', { players: rooms[roomId].players.map((playerId) => players[playerId].username) });

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
