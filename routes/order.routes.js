const express = require('express');

const router = express.Router();
const path = require('path');
const order = require('../models/order.model');
const m = require('../helpers/middlewares');

/** ***All Orders**** */
router.get('/', async (req, res) => {
  await order.getOrders()
    .then((order) => {
      res.status(200).json({
        status: 200,
        data: order,
      });
    })
    .catch((err) => {
      res.status(202).json({
        status: 202,
        error: {
          message: err.message,
        },
      });
    });
});

/* Create a car order */
router.post("/", m.checkFieldPostOrder, async(req, res) => {
    await order.createOrder(req.body)
        .then(order => res.status(201).json({
            status: 201,
            data: order
        }))
        .catch(err => res.status(500).json({
            message: err.message
        }))
});



// update the price of a purchase order
router.patch('/:id/price', m.mustBeInteger, async (req, res) => {
  const { id } = req.params;

  const { price } = req.body;

  await order.updatePrice(id, price)
    .then(order => res.json({
      price: 202,
      data: order,
    }))
    .catch();
});



// Routes
module.exports = router;
