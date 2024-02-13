const express = require('express');
const router = express.Router();

const TestimonialControler = require('../controllers/testimonial.controler');

router.get('/testimonials', TestimonialControler.getAll);

router.get('/testimonials/random', TestimonialControler.getRandom);

router.get('/testimonials/:id', TestimonialControler.getById);

router.post('/testimonials', TestimonialControler.postNew);

router.put('/testimonials/:id', TestimonialControler.putById);

router.delete('/testimonials/:id', TestimonialControler.deleteById);

module.exports = router;