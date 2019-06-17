
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
 
  

// Login a user
describe('login a new user', () => {
  it('should login a user successfully', (done) => {
    const user = {
      id: 1,
      email: 'kingsconsult@gmail.com',
      password: helper.passwordHash("p@ssw0rd"),
    };
    chai.request(server)
    .post('/api/v1/user/auth/signin')
    .send(user)
    .end((err, res) => {
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
  });
});
