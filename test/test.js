'use strict';

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


