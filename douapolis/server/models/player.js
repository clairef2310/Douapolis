const mongoose = require('mongoose');

const playerSchema = new mongoose.schema({
    name: {
        type: String,
        required: true
    },
    isInGame: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Player', playerSchema);
