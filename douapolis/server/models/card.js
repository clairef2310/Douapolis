const mongoose = require('mongoose');

const cardSchema = new mongoose.schema({
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Player', playerSchema);
