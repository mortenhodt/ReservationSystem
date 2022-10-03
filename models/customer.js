const mongoose = require('mongoose');

//We set up the structure for customer 
const customerSetup = new mongoose.Schema({

    
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    }
});

//Declaring the model for the structure, which we can export
const model = mongoose.model('Customer', customerSetup);

module.exports = model;