const express = require("express");
const router = express.Router();
const car = require("../models/car.model");
const m = require("../helpers/middlewares");
const helper = require("../helpers/helper");
const path = require('path');
const db = require('../db');


const joi = require('@hapi/joi');

/* Mark a posted car Ad as sold * Andela */
router.patch("/:id/status", m.mustBeInteger, async(req, res) => {
     const id = req.params.id;
     const status = req.body;
    // postgres db
    db('cars')
    .where({
        'id' : id
    })
    .update(status)
    .returning('*')
    //    then()
    .then(car => res.status(202).json({
        status: 202,
        data: car
    }))
    // .catch()
    .catch(err => res.status(500).json({
        message: err.message
    }))
});


/* Update the price of a car * Andela */
router.patch("/:id/price", m.mustBeInteger, async(req, res) => {
    const id = req.params.id;
    const price = req.body;

    // postgres db
    db('cars')
        .where({
            'id' : id
        })
        .update(price)
        .returning('*')
        //    then function
        .then(car => res.status(202).json({
            status: 202,
            data: car
        }))
        // .catch()
        .catch(err => res.status(500).json({
            message: err.message
        }))
});

// /* Insert a new car */
router.post('/', m.checkFieldPostCar, async(req, res) => {
        db('cars')
        .insert(req.body)
        .returning('*')
        .then(cars => res.status(201).json({
             message: `car  has been created`,
             content: cars
         }))
        .catch(err => res.status(500).json({
            message: err.message
        }))
});


/* Delete a car */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id;
        db('cars')
        .where('id',id)
        .del()
        .then(car => res.json({
            message: `The car #${id} has been deleted`,
            status: "Car Ad successfully deleted"
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
    db.select('*')
        .from('cars')
        .where({
            id:id,
         })
        .select('id')
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

/* All cars */
router.get("/", async(req, res) => {

    const status = req.query.status;
    const min_price = req.query.min_price;
    const max_price = req.query.max_price;


        /* View all unsold cars within a price range * Andela */

        if ( status === "available" && min_price && max_price) {
            const subquery = db('cars').where('price', '>', 10)
                .andWhere('price', '<','100').select('id');

            await db('cars').where('id', 'in', subquery)
                .andWhere('status', 'available')
                .then(subquery => res.status(200).json({
                    status: 200,
                    data: subquery
                }))
                .catch(err => res.status(500).json({
                    message: err.message
                }))

        } else {

            /* View all unsold cars * Andela */

           await db('cars').where('status', 'available')
                .then(car => res.status(200).json({
                    status: 200,
                    data: car
                }))
                .catch(err => res.status(500).json({
                    message: err.message
                }))
        }



});




/* All cars */
router.get("/", async(req, res) => {
    db.select('*').from('cars')
        .then(car => res.status(200).json({
            status: 200,
            data: car
        }))
        .catch(err => res.status(500).json({
            message: err.message
        }))
});


// Routes
module.exports = router;
