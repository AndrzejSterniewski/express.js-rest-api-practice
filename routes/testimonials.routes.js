const express = require('express');
const router = express.Router();
const db = require('../db');

// TESTIMONIALS

// app.get('/testimonials', (req, res) => {
//     res.json(db.testimonials);
// });
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

// app.get('/testimonials/random', (req, res) => {
//     const random = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
//     res.json(random);
// });
router.route('/testimonials/random').get((req, res) => {
    const random = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(random);
});

// app.get('/testimonials/:id', (req, res) => {
//     // const itemId = parseInt(req.params.id);
//     // const item = db.find(item => item.id === itemId);
//     const item = db.testimonials.find(item => item.id === parseInt(req.params.id));
//     if (!item) res.json('item not found');
//     res.json(item);
// });
router.route('/testimonials/:id').get((req, res) => {
    // const itemId = parseInt(req.params.id);
    // const item = db.find(item => item.id === itemId);
    const item = db.testimonials.find(item => item.id === parseInt(req.params.id));
    if (!item) res.json('item not found');
    res.json(item);
});

// app.post('/testimonials', (req, res) => {
//     const item = {
//         id: uuidv4(),
//         author: req.body.author,
//         text: req.body.text
//     }
//     db.testimonials.push(item);
//     res.json({ message: 'OK' });
// });
router.route('/testimonials').post((req, res) => {
    const item = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text
    }
    db.testimonials.push(item);
    res.json({ message: 'OK' });
});

// app.put('/testimonials/:id', (req, res) => {
//     const item = db.testimonials.find(item => item.id === parseInt(req.params.id));

//     if (!item) res.json('item not found');

//     item.author = req.body.author;
//     item.text = req.body.text;

//     res.json({ message: 'OK' });
//     // res.json(item);
// });
router.route('/testimonials/:id').put((req, res) => {
    const item = db.testimonials.find(item => item.id === parseInt(req.params.id));

    if (!item) res.json('item not found');

    item.author = req.body.author;
    item.text = req.body.text;

    res.json({ message: 'OK' });
    // res.json(item);
});

// app.delete('/testimonials/:id', (req, res) => {
//     const item = db.testimonials.find(item => item.id === parseInt(req.params.id));
//     const index = db.testimonials.indexOf(item);
//     db.testimonials.splice(index, 1);
//     res.json({ message: 'OK' });
// });
router.route('/testimonials/:id').delete((req, res) => {
    const item = db.testimonials.find(item => item.id === parseInt(req.params.id));
    if (!item) res.json('item not found');
    const index = db.testimonials.indexOf(item);
    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
});

module.exports = router;