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
// })



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

describe('GET all order', () => {
  it('should get all the orders', (done) => {
    chai.request(server)
      .get('/api/v1/order')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
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

describe('POST order without any body', () => {
  it('should return an error 400', (done) => {
    let newOrder = {};
    chai.request(server)
      .post('/api/v1/order')
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();

      })
  })
})

describe('POST user without any body', () => {
  it('should return an error 400', (done) => {
    let newUser = {};
    chai.request(server)
      .post('/api/v1/user')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();

      })
  })
})



describe('GET a specific car', () => {
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


describe('POST an order with body', () => {
  it('it should POST a new order successfully', (done) => {
    let newOrder = {
        //dummy values for testing
        "id": 1,
        "buyer": 14,
        "car_id": 245,
        "amount": 3456789,
        "status": "pending",
        "date": helper.newDate()
    };
    chai.request(server)
      .post('/api/v1/order')
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('buyer');
        res.body.data.should.have.property('status');
        res.body.data.should.have.property('status')
        done();
      })
  })
})



describe('POST a user with body', () => {
  it('it should POST a new user successfully', (done) => {
    let newUser = {
        //dummy values for testing
        "id": 1,
        "email": "johndoe@email.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "12345",
        "address": "365 Red Keep, Kings Landing, Earth Kingdom",
        "is_admin": true,
        "created_on": helper.newDate(),
        "token": helper.tokenGenerator("johndoe@email.com")
    };
    chai.request(server)
      .post('/api/v1/user')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('password');
        res.body.data.should.have.property('address');
        done();
      })
  })
})

describe('patch', () => {
  it('it should update a car given an id', (done) => {
    let car =  {
        //dummy values for testing
        "id": 1,
        "owner": 23,
        "created_on": helper.newDate(),
        "state": "new",
        "status": "available",
        "price": 8982.85,
        "manufacturer": "Mercedes Benz",
        "model": "C300",
        "body_type": "car"
    }
      chai.request(server)
       .patch('/api/v1/car/1/status')
       .send( car = {
        "id" : 1,
        "status": "sold"
       })
       .end((err, res) => {
        res.should.have.status(202);
        res.body.should.be.a('object');
        done();
       })
    })
  })

//Update the car price
describe('patch', () => {
  it('it should update a car given an id', (done) => {
    let car =  {
        //dummy values for testing
        "id": 1,
        "owner": 23,
        "created_on": helper.newDate(),
        "state": "new",
        "status": "available",
        "price": 8982.85,
        "manufacturer": "Mercedes Benz",
        "model": "C300",
        "body_type": "car"
    }
      chai.request(server)
       .patch('/api/v1/car/1/price')
       .send( car = {
        "price" : 10.45
       })
       .end((err, res) => {
        res.should.have.status(202);
        res.body.should.be.a('object');
        done();
       })
    })
  })

//Update user
describe('put', () => {
  it('it should update a user given an id', (done) => {
     let User = {
        //dummy values for testing
        "id": 1,
        "email": "johndoe@email.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "12345",
        "address": "365 Red Keep, Kings Landing, Earth Kingdom",
        "is_admin": true,
        "created_on": helper.newDate(),
        "token": helper.tokenGenerator("johndoe@email.com")
    };
      chai.request(server)
       .put('/api/v1/user/1')
       .send( User = {
        //dummy values for testing
        "id": 1,
        "email": "johndoe@email.com",
        "first_name": "Jon",
        "last_name": "Doe",
        "password": "12345",
        "address": "365 Red Keep, Kings Landing, Earth Kingdom",
        "is_admin": true,
        "created_on": helper.newDate(),
        "token": helper.tokenGenerator("johndoe@email.com")
    })
       .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
       })
    })
  })


describe('/Post user', () => {
  it('it should update a user given an id', (done) => {  
    let user =  {
         "id": 1,
        "owner": 24,
        "created_on": helper.newDate(),
        "state": "new",
        "status": "sold",
        "price": helper.currencyFormatter().format(8982.85),
        "manufacturer": "Mercedes Benz",
        "model": "C300",
        "body_type": "car"
    }
    chai.request(server)
    .post('/api/v1/user')
    .send(user)
    .end((err, res) => {
      
      res.body.should.be.a('object');
      done();
    })
  })
})

describe('delete user', () => {
  it('it should update a user given an id', (done) => {
    let user = {
        //dummy values for testing
        "id": 1,
        "email": "johndoe@email.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "12345",
        // "password": helper.passwordHash("p@ssw0rd"),
        "address": "365 Red Keep, Kings Landing, Earth Kingdom",
        "is_admin": true,
        "created_on": helper.newDate(),
        "token": helper.tokenGenerator("johndoe@email.com")
    }
   
     chai.request(server)
.delete('/api/v1/user/1')
 .send(user)
       .end((err, res) => {
        res.should.have.status(200);
        done();
       })
    })
  })
 })
  

describe('Login API', () => {
  it('it should sucsess if credential is valid', (done) => {
    let user = {
      email: "johndoe@email.com",
      password:"12345"
    }
   chai.request(server)
   .post('/api/v1/user/auth/signin')
   .send('user')
   .end((err, res) => {
       
        done();
       })
  });
 });

// "test": "nyc --reporter=html --reporter=text ./node_modules/.bin/mocha",


