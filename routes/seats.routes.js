const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    const item = db.seats.find(item => item.id === parseInt(req.params.id));
    if (!item) res.json('item not found');
    res.json(item);
});

router.route('/seats').post((req, res) => {
    const item = {
        id: uuidv4(),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email
    };
    if (db.seats.some((seat) => {
        return seat.day === item.day && seat.seat === item.seat
    })) { res.status(409).json({ message: "The slot is already taken..." }) } else {
        db.seats.push(item);
        req.io.emit('seatsUpdated', db.seats);
        res.json({ message: 'OK' });
    };
});

router.route('/seats/:id').put((req, res) => {
    const item = db.seats.find(item => item.id === parseInt(req.params.id));

    if (!item) res.json('item not found');

    item.day = req.body.day;
    item.seat = req.body.seat;
    item.client = req.body.client;
    item.email = req.body.email;

    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
    const item = db.seats.find(item => item.id === parseInt(req.params.id));
    if (!item) res.json('item not found');
    const index = db.seats.indexOf(item);
    db.seats.splice(index, 1);
    res.json({ message: 'OK' });
});

module.exports = router;