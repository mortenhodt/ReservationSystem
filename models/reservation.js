const mongoose = require('mongoose');

// We set up the structure for reservations 
const reservationSetup = new mongoose.Schema({

    client_id: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    hotelName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
});

//Declare the model for the structure, so we can export it
const model = mongoose.model('Reservation', reservationSetup);

module.exports = model;