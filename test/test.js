
const app = require('../index');
const car = require('../models/car.model');
const order = require('../models/order.model');
const user = require('../models/user.model');
const helper = require('../helpers/helper.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect();
const server = require('../index');


chai.use(chaiHttp);





describe('GET all users', () => {
  it('should get all the users', (done) => {
    chai.request(server)
      .get('/api/v1/user')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      })
  })
})


describe('POST car without any body', () => {
  it('should return an error 400', (done) => {
    let newCar = {};
    chai.request(server)
      .post('/api/v1/car')
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();

      })
  })
})
