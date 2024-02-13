const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find({}));
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Seat.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const se = await Seat.findById(req.params.id);
        if (!se) res.status(404).json({ message: 'Not found' })
        else res.json(se);
    }
    catch (err) {
        res.json({ message: err })
    }
};

exports.postNew = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const seatTaken = await Seat.findOne({ day: day, seat: seat });
        if (seatTaken) {
            return res.status(400).json({ message: 'The slot is already taken...' });
        }
        const newSeat = new Seat({
            day: day,
            seat: seat,
            client: client,
            email: email,
        });
        await newSeat.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
        const se = await Seat.findById(req.params.id)
        if (se) {
            se.day = day;
            se.seat = seat;
            se.client = client;
            se.email = email;
            await se.save();
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
        const se = await Seat.findById(req.params.id);
        if (se) {
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
};