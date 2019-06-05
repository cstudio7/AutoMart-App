const express = require("express");
const router = express.Router();
const order = require("../models/order.model");
const m = require("../helpers/middlewares");

router.get("/", async(req, res) => {
    await order.getOrders()
        .then(order => {
            res.status(200).json({
                status: 200,
                data: order
            })
        })
        .catch(err => {
            res.status(202).json({
                status: 202,
                error: {
                    message: err.message
                }
            })
        })
});



/* Insert a new order */
router.post("/", m.checkFieldPostCar, async(req, res) => {
    await car.insertCar(req.body)
        .then(car => res.status(201).json({
            message: `Car #${car.id} has been created`,
            content: car
        }))
        .catch(err => res.status(500).json({
            message: err.message
        }))
});








// Routes
module.exports = router;