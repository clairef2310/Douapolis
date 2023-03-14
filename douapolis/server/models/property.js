const mongoose = require('mongoose');

const propertySchema = new mongoose.schema({
    adress: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    buildingPrice: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Property', propertySchema);
