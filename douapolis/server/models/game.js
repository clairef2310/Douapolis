const mongoose = require('mongoose');

let Player = require('player').schema;

const gameSchema = new mongoose.schema({
    host : {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    maxPlayer: {
        type: Number,
        default: 4
    }
    players: [Player],
    gameStarted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Game', gameSchema);
