const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const user = require('../models/user.model');
const m = require('../helpers/middlewares');
const db = require('../db');




/* Create user account * Andela */
router.post('/auth/signup',  async (req, res) => {
  const {email, name, password } = req.body;
  // const hash = bcrypt.hashSync(password);
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    db('login').insert({
      email: email,
      password: hash
    })
    return  res.json({
      status: 201,
      data: req.body
    })
    .catch(err => res.status(500).json({
      status: 500,
      error: {
        message: err.message,
      },
    }));
  });

});
  //       .into('login')
  //       .returnung('email')
  //       .then(loginEmail => {
  //         return trx('users')
  //             .returning('*')
  //             .insert(req.body)
  //             .then(user => {
  //               res.json(user[0]);
  //             })
  //       })



/* Login a user * Andela */
router.post('/auth/signin', m.checkLoginForm, async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  await user.loginUser(email, password)
    .then(user => res.status(200).json({
      status: 200,
      data: user,
    }))
    .catch((err) => {
      res.status(401).json({
        status: 401,
        error: {
          message: 'Invalid id and password',
        },
      });
    });
});


/* Update a user */
router.put('/:id', m.mustBeInteger, m.checkFieldPostUser, async (req, res) => {
  const { id } = req.params;

  await user.updateUser(id, req.body)
    .then(user => res.json({
      message: `User #${id} has been updated`,
      content: user,
    }))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({
          message: err.message,
        });
      }
      res.status(500).json({
        message: err.message,
      });
    });
});


/* Delete a user */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
  const { id } = req.params;

  await user.deleteUser(id)
    .then(user => res.json({
      message: `User #${id} has been deleted`,
      status: 'OK',
    }))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({
          message: err.message,
        });
      }
      res.status(500).json({
        message: err.message,
      });
    });
});

// new
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10, function(err, hash){
    if(err) {
      return res.status(500).json({
        error: err
      });
    }
    else {
      // const user = new User({
      //   _id: new  mongoose.Types.ObjectId(),
      //   email: req.body.email,
      //   password: hash
      // });
      // user.save()
      db('users').insert(req.body)
        .then(function(result) {
        console.log(result);
        res.status(200).json({
          success: 'New user has been created'
        });
      }).catch(error => {
        res.status(500).json({
          error: err
        });
      });
    }
  });
});

// Routes
module.exports = router;
