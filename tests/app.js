const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../bin/server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("unit test for the http server", () => {

    after(() => server.close());

    it('get /players', (done) => {
        chai.request(app).get('/players').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Array');
            done();
        });
    });

    it("should respond not found", (done) => {
        chai.request(app).get('/notfound').end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('get /players/<id> with existing player', (done) => {
        chai.request(app).get('/players/17').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });

    it('get /players/<id> with unexisting player', (done) => {
        chai.request(app).get('/players/42').end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });


    it('delete /players/<id> with existing player', (done) => {
        chai.request(app).delete('/players/17').end((err, res) => {
            res.should.have.status(201);
            chai.request(app).get('/players/17').end((err, res) => {
                res.should.have.status(404);
            });
            done();
        });
    });

    it('delete /players/<id> with unexisting player', (done) => {
        chai.request(app).delete('/players/42').end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });
});
