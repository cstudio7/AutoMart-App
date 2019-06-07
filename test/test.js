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
		.get( url: '/api/v1/cars')
		.end( callback: (err, res) => {
			res.should.have.status( code: 200);
			res.body.should.be.a( type: 'object');
			done();
		})
	})
});


describe('POST car without any body', () =>{
	it('should return an error 400', (done) => {
		let newCar = {};

		chai.request(server)
		.post( url: '/api/v1')
	})
})
