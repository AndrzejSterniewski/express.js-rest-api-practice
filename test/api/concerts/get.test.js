const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    before(async () => {
        const testConOne = new Concert({ _id: '65cbbf6df52bf0467057c518', performer: "Amanda Doe", genre: "Disco", price: 25, day: 2, image: "/img/uploads/1fsd324fsdg.jpg", tickets: 7 });
        await testConOne.save();

        const testConTwo = new Concert({ _id: '65cbbf6df52bf0467057c519', performer: "John Doe", genre: "Rock", price: 30, day: 3, image: "/img/uploads/1fsd324fsdg.jpg", tickets: 11 });
        await testConTwo.save();

        const testConThree = new Concert({ _id: '65cbbf6df52bf0467057c520', performer: "Thomas Jefferson", genre: "Pop", price: 10, day: 1, image: "/img/uploads/1fsd324fsdg.jpg", tickets: 23 });
        await testConThree.save();

        const testConFour = new Concert({ _id: '65cbbf6df52bf0467057c521', performer: "Amanda Doe", genre: "Techno", price: 13, day: 1, image: "/img/uploads/1fsd324fsdg.jpg", tickets: 44 });
        await testConFour.save();

        const testConFive = new Concert({ _id: '65cbbf6df52bf0467057c522', performer: "John Doe", genre: "Rock", price: 27, day: 2, image: "/img/uploads/1fsd324fsdg.jpg", tickets: 6 });
        await testConFive.save();
    });

    it('/performer/:performer should return concerts filtered by performer', async () => {
        const res = await request(server).get('/api/concerts/performer/Amanda Doe');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/genre/:genre should return concerts filtered by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });

    it('/price/:price_min/:price_max should return concerts filtered by given min and max price', async () => {
        const res = await request(server).get('/api/concerts/price/11/29');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
    });

    it('/day/:day should return concerts filtered by day', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    after(async () => {
        await Concert.deleteMany();
    });

});