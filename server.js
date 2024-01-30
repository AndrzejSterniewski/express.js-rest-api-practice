const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

// DONE
app.get('/testimonials', (req, res) => {
    res.json(db);
});

// DONE
app.get('/testimonials/:id', (req, res) => {
    // const itemId = parseInt(req.params.id);
    // const item = db.find(item => item.id === itemId);
    const item = db.find(item => item.id === parseInt(req.params.id));
    if (!item) res.json('item not found');
    res.json(item);
});

// NOT WORKING
app.get('/testimonials/random', (req, res) => {
    const random = db[Math.floor(Math.random() * db.length)];
    res.json(random);
});

// DONE
app.post('/testimonials', (req, res) => {
    const item = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text
    }
    db.push(item);
    res.json({ message: 'OK' });
});

// DONE - is it correct?
app.put('/testimonials/:id', (req, res) => {
    const item = db.find(item => item.id === parseInt(req.params.id));

    item.author = req.body.author;
    item.text = req.body.text;

    // verification not working:
    if (!item) res.json('item not found');

    res.json({ message: 'OK' });
    // res.json(item);
});

// DONE
app.delete('/testimonials/:id', (req, res) => {
    const item = db.find(item => item.id === parseInt(req.params.id));
    const index = db.indexOf(item);
    db.splice(index, 1);
    res.json({ message: 'OK' });
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});