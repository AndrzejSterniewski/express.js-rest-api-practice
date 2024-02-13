const express = require('express');
const router = express.Router();

const SeatControler = require('../controllers/seat.controler');

router.get('/seats', SeatControler.getAll);

router.get('/seats/random', SeatControler.getRandom);

router.get('/seats/:id', SeatControler.getById);

router.post('/seats', SeatControler.postNew);

router.put('/seats/:id', SeatControler.putById);

router.delete('/seats/:id', SeatControler.deleteById);

module.exports = router;