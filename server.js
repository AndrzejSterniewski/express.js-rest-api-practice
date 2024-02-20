const express = require('express');
const app = express();
const path = require('path');
// const db = require('./db');
const cors = require('cors');
const mongoose = require('mongoose');

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
const socket = require('socket.io');
const io = socket(server);

io.on('connection', (socket) => {
    console.log('New socket');
});

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

// mongoose.connect('mongodb+srv://Andrzej:1234@cluster0.mfattfu.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true });
// const db = mongoose.connection;

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

// db connection for different cases e.g. for tests
if (NODE_ENV === 'production') dbUri = 'url to remote db';
else if (NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0/NewWaveDBtest';
else dbUri = 'mongodb+srv://Andrzej:1234@cluster0.mfattfu.mongodb.net/NewWaveDB?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

module.exports = server;