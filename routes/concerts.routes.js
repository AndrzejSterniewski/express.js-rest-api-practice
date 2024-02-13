const express = require('express');
const router = express.Router();

const ConcertControler = require('../controllers/concert.controler');

router.get('/concerts', ConcertControler.getAll);

router.get('/concerts/random', ConcertControler.getRandom);

router.get('/concerts/:id', ConcertControler.getById);

router.post('/concerts', ConcertControler.postNew);

router.put('/concerts/:id', ConcertControler.putById);

router.delete('/concerts/:id', ConcertControler.deleteById);

module.exports = router;