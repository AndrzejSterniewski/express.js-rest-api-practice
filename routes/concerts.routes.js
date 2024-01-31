const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    const item = db.concerts.find(item => item.id === parseInt(req.params.id));
    res.json(item);
});

router.route('/concerts').post((req, res) => {
    const item = {
        id: uuidv4(),
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image
    }
    db.concerts.push(item);
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
    const item = db.concerts.find(item => item.id === parseInt(req.params.id));

    if (!item) res.json('item not found');

    item.performer = req.body.performer;
    item.genre = req.body.text;
    item.price = req.body.price;
    item.day = req.body.day;
    item.image = req.body.image;

    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
    const item = db.concerts.find(item => item.id === parseInt(req.params.id));
    if (!item) res.json('item not found');
    const index = db.concerts.indexOf(item);
    db.concerts.splice(index, 1);
    res.json({ message: 'OK' });
});

module.exports = router;