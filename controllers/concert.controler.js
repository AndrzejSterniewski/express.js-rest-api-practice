const Concert = require('../models/concert.model');
const sanitize = require('mongo-sanitize');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
        const concerts = await Concert.find().lean();
        const seats = await Seat.find();
        for (let concert of concerts) {
            concert.tickets = seats.filter(seat => seat.day === concert.day).length;
        }
        res.json(concerts);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const con = await Concert.findOne().skip(rand);
        if (!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if (!con) res.status(404).json({ message: 'Not found' })
        else res.json(con);
    }
    catch (err) {
        res.json({ message: err })
    }
};

exports.getByPerformer = async (req, res) => {
    try {
        const con = await Concert.find({ performer: req.params.performer });
        if (!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch (err) {
        res.json({ message: err })
    }
};
exports.getByGenre = async (req, res) => {
    try {
        const con = await Concert.find({ genre: req.params.genre });
        if (!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch (err) {
        res.json({ message: err })
    }
};
exports.getByPrice = async (req, res) => {
    try {
        const con = await Concert.find({ price: { $gt: req.params.price_min, $lt: req.params.price_max } });
        if (!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch (err) {
        res.json({ message: err })
    }
};
exports.getByDay = async (req, res) => {
    try {
        const con = await Concert.find({ day: req.params.day });
        if (!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch (err) {
        res.json({ message: err })
    }
};

exports.postNew = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;

        const newConcert = new Concert({
            performer: sanitaize(performer),
            genre: sanitaize(genre),
            price: sanitize(price),
            day: sanitize(day),
            image: sanitize(image)
        });
        await newConcert.save();
        res.json({ message: 'OK' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { performer, genre, price, day, image, tickets } = req.body;
    try {
        const con = await Concert.findById(req.params.id)
        if (con) {
            con.performer = performer;
            con.genre = genre;
            con.price = price;
            con.day = day;
            con.image = image;
            con.tickets = tickets;
            await con.save();
            res.json({ message: 'OK' })
        }
        else res.status(404).json({ message: 'Not found...' })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.deleteById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if (con) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
};