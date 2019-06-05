const express = require("express");
const router = express.Router();
const car = require("../models/car.model");
const m = require("../helpers/middlewares");
const path = require('path');


/* All cars */
router.get("/", async(req, res) => {

    const status = req.query.status;
    const min_price = req.query.min_price;
    const max_price = req.query.max_price;

    if (status === "available") {

        /* View all unsold cars within a price range * Andela */

        if (min_price && max_price) {

            await car.viewAllUnsoldWithinAPriceRange(status, min_price, max_price)
                .then(car => res.status(200).json({
                    status: 200,
                    data: car
                }))
                .catch(err => res.status(500).json({
                    message: err.message
                }))

        } else {

            /* View all unsold cars * Andela */

            await car.viewAllUnsold(status)
                .then(car => res.status(200).json({
                    status: 200,
                    data: car
                }))
                .catch(err => res.status(500).json({
                    message: err.message
                }))
        }

    } else {

        await car.getCars()
            .then(cars => res.json(cars))
            .catch(err => {
                if (err.status) {
                    res.status(err.status).json({
                        message: err.message
                    })
                } else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
    }
});


/* Mark a posted car Ad as sold * Andela */
router.patch("/:id/status", m.mustBeInteger, async(req, res) => {
    const id = req.params.id;
    const status = req.body.status;

    await car.updateStatus(id, status)
        .then(car => res.status(202).json({
            status: 202,
            data: car
        }))
        .catch()
});


/* Update the price of a car * Andela */
router.patch("/:id/price", m.mustBeInteger, async(req, res) => {
    const id = req.params.id;
    const price = req.body.price;

    await car.updatePrice(id, price)
        .then(car => res.status(202).json({
            status: 202,
            data: car
        }))
        .catch()
});


/* Insert a new car */
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

/* Delete a car */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id;

    await car.deleteCar(id)
        .then(car => res.json({
            message: `The car #${id} has been deleted`,
            status: "OK"
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({
                    message: err.message
                })
            }
            res.status(500).json({
                message: err.message
            })
        })
});

/* Update a car */
router.put('/:id', m.mustBeInteger, m.checkFieldPostCar, async (req, res) => {

    const id = req.params.id;

    await car.updateCar(id, req.body)
        .then(car => res.json({
            message: `Car #${id} has been updated`,
            content: car
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({
                    message: err.message
                })
            }
            res.status(500).json({
                message: err.message
            })
        })
});

/* View a specific car * Andela */
router.get("/:id", m.mustBeInteger, async(req, res) => {

    const id = req.params.id;

    await car.getCar(id)
        .then(car => res.json(car))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({
                    message: err.message
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
});


// Routes
module.exports = router;