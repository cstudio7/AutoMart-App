const express = require("express");
const router = express.Router();
const user = require("../models/user.model");
const m = require("../helpers/middlewares");


/* All users */
router.get("/", async (req, res) => {
    await user.getUsers()
        .then(users => res.json(users))
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


/* A user by id */
router.get("/:id", m.mustBeInteger, async(req, res) => {

    const id = req.params.id;

    await user.getUser(id)
        .then(user => res.json(user))
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


/* Insert a new user */
router.post("/", m.checkFieldPostUser, async(req, res) => {
    await user.insertUser(req.body)
        .then(user => res.status(201).json({
            status: 201,
            data: user
        }))
        .catch(err => res.status(500).json({
            message: err.message
        }))
});


/* Create user account * Andela */
router.post("/auth/signup", m.checkRegistrationForm, async(req, res) => {
    await user.registerUser(req.body)
        .then(user => res.status(201).json({
            status: 201,
            data: {
                token: user.token,
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                address: user.address,
                is_admin: user.is_admin,
                created_on: user.created_on
            }
        }))
        .catch(err => res.status(500).json({
            status: 500,
            error: {
                message: err.message
            }
        }))
});


/* Login a user * Andela */
router.post('/auth/signin', m.checkLoginForm, async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    await user.loginUser(email, password)
        .then(user => res.status(200).json({
            status: 200,
            data: user
        }))
        .catch(err => {
            res.status(401).json({
                status: 401,
                error: {
                    message: "Invalid id and password"
                }
            })
        })
});




/* Update a user */
router.put('/:id', m.mustBeInteger, m.checkFieldPostUser, async (req, res) => {

    const id = req.params.id;

    await user.updateUser(id, req.body)
        .then(user => res.json({
            message: `User #${id} has been updated`,
            content: user
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


/* Delete a user */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id;

    await user.deleteUser(id)
        .then(user => res.json({
            message: `User #${id} has been deleted`,
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


// Routes
module.exports = router;