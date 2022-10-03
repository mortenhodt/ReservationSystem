const Customer = require('../models/customer');
const express = require('express');
const router = express.Router();


//Initiating CRUD endpoints

//CREATE
router.post('/', async (req, res) => {
    //Creating a profile for the new customer with the instances
    const bookingProfile = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        streetAddress: req.body.streetAddress,
        city: req.body.city
    });

    //creating a profile-body in JSON format
    const newCustomer = await Customer.create(bookingProfile);
    res.json(newCustomer);
});


//READ; 
router.get('/', async (req, res) => {
    try {
        //Using global functions to find customers
        let customers = await Customer.find().exec();
        //store in JSON format
        res.json(customers)
    //Catching error
    } catch (err) {
        console.log({message: err})
    };
});



// READ - if we want to find one specific ID
router.get('/:id', async (req, res) => {
    let bookingProfile = await Customer.findById(req.params.id);
    try {
        res.json(bookingProfile);
    } catch (err) {
        console.log({message: err})
    };
});

//UPDATE
router.put('/:id', async (req, res) => {
    let customerUpdate = req.body

    //asyncron function to update the body
        let newCustomer = await Customer.findByIdAndUpdate(req.params.id,{$set: customerUpdate},{new:true});

        //store in JSON format
        res.json(newCustomer);
});

//DELETE
router.delete('/:id', async (req, res) => {
    let deleteCustomer = await Customer.findByIdAndDelete(req.params.id);
    //store in JSON format
    res.json(deleteCustomer);
});

//Export so we can gather it in app.js
module.exports = router;