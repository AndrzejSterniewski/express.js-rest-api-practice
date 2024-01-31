const express = require('express');
const router = express.Router();
const db = require('../db');

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
    db.seats.push(item);
    res.json({ message: 'OK' });
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