const request = require('supertest');
const app = require('../index');
const car = require('../models/car.model');
const helper = require('../helpers/helper.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../index');

chai.use(chaiHttp);

describe('GET all cars', () => {
  it('should get all the cars', (done) => {
    chai.request(server)
      .get('/api/v1/car')
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


describe('GET just one car', () => {
  it('should get just one car with ID 1', (done) => {
    chai.request(server)
      .get(`/api/v1/car/1`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
  })
});


describe('POST car with body', () => {
  it('it should POST a new car successfully', (done) => {
    let newCar = {
      id: 1,
      owner: 23,
      created_on: helper.newDate(),
      state: "new",
      status: "available",
      price: helper.currencyFormatter().format(567.98),
      manufacturer: "Toyota",
      model: "corolla",
      body_type: "saloon"
    };
    chai.request(server)
      .post('/api/v1/car')
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('content');
        res.body.content.should.have.property('model');
        res.body.content.should.have.property('state').eql('new');
        done();
      });
  });
});
