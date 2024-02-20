const express = require('express');
const router = express.Router();

const ConcertControler = require('../controllers/concert.controler');

router.get('/concerts', ConcertControler.getAll);

router.get('/concerts/random', ConcertControler.getRandom);

router.get('/concerts/:id', ConcertControler.getById);

// NEW ROUTES

router.get('/concerts/performer/:performer', ConcertControler.getByPerformer);

router.get('/concerts/genre/:genre', ConcertControler.getByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertControler.getByPrice);

router.get('/concerts/day/:day', ConcertControler.getByDay);

/////////////

router.post('/concerts', ConcertControler.postNew);

router.put('/concerts/:id', ConcertControler.putById);

router.delete('/concerts/:id', ConcertControler.deleteById);

module.exports = router;