const mongoose = require('mongoose');

let connection;

//Opening the connection to mongoDb on a localhost basis
const getConnection = async () => {
    if (!connection) {
        connection = await mongoose.connect('mongodb://localhost:27017/ReservationSystem', {
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    }
    return connection;
}

//export the connection to app.js
module.exports = {
    getConnection: getConnection
}