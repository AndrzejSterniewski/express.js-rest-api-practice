const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);
app.use('/', seatsRoutes);

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});