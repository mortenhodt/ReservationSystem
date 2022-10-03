const Reservations = require('../models/reservation');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//Initating CRUD endpoints

//CREATE
router.post('/', async (req, res) => {
    //Creating a bookingprofile for new reservations
    const bookingProfile = new Reservations({
        client_id: req.body.client_id,
        date: req.body.date,
        hotelName: req.body.hotelName,
        price: req.body.price,
        balance: req.body.balance

    });
    //creating a profile-body in JSON format
    const newReservation = await Reservations.create(bookingProfile);
    res.json(newReservation);
});

//DELETE
router.delete('/:id', async (req, res) => {
    let deletereservation = await Reservations.findByIdAndDelete(req.params.id);
    res.json(deletereservation);
});

//READ - all
router.get('/', async (req, res) => {
    //Using global functions to find customers
    let reservations = await Reservations.find().exec();
    try {
        //Response in readable JSON format
        res.json(reservations)
        //Error handling
    } catch (err) {
        console.log({message: err})
    };
});



//READ - if we want to find a specific reservation by ID
router.get('/:id', async (req, res) => {
    let bookingProfile = await Reservations.findById(req.params.id);
    try {
        res.json(bookingProfile);
    //Error handling
    } catch (err) {
        console.log({message: err})
    };
});

//UPDATE
router.put('/booking', async (req, res) => {

//Pulling out the reservation by ID
    const bookings = await Reservations.findById(req.body.bookings);
    

    //Adding the price into the balance
    bookings.balance += bookings.price;
        
        //Updating the balance containing the correct ID

        await Reservations.findByIdAndUpdate(bookings.id,{"balance":bookings.balance})
    
        res.json(bookings.balance);
    });

//UPDATE - if we want to update a reservation
router.put('/:id', async (req, res) => {
    let reservationUpdate = req.body
        let newReservation = await Reservations.findByIdAndUpdate(req.params.id,{$set: reservationUpdate},{new:true});
        res.json(newReservation);
});

//export it to gather it in app.js
module.exports = router;

