const db = require('./database.js');
const mongoose = require('mongoose')
const https = require('https');
const seaport = require('seaport');
const path = require('path');
const loadbalancer= seaport.connect('localhost',9090);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//Making app usable with bodyparser
app.use(bodyParser.json());
const fs = require('fs');


//Importing routes for reservation and customer
const reservationRoute = require('./controller/reservations');
const customerRoute = require('./controller/customers');
app.use('/reservations', reservationRoute)
app.use('/customers', customerRoute)

//Opening the reservationSystem
app.get('/', (req, res) => {
    res.send('ReservationSystem open');
});

//Making encrypted communication between client and server
const openSSL = https.createServer({
    key : fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert : fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    secure: false
}, app);


//Using the encrypted file when connecting to server
openSSL.listen(loadbalancer.register('server'), () => {
    db.getConnection().then(function(){
        console.log('Connected')
    })
    console.log('Server ready');
});

