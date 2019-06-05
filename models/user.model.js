// const filename = "../data/cars.json";
// let cars = require(filename);

const Promise = require("promise");
const helper = require("../helpers/helper.js");


let defaultAddress = "365 Red Keep, Kings Landing, Earth Kingdom";

let users = [
    {
        //dummy values for testing
        "id": 1,
        "email": "johndoe@email.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "12345",
        // "password": helper.passwordHash("p@ssw0rd"),
        "address": defaultAddress,
        "is_admin": true,
        "created_on": helper.newDate(),
        "token": helper.tokenGenerator("johndoe@email.com")
    }
];


const getUsers = () => {
    return new Promise((resolve, reject) => {

        if (users.length === 0) {
            reject({
                message: "No Users Available",
                status: 202
            })
        }
        resolve(users);
    })
};


const getUser = (id) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
            .then(user => resolve(user))
            .catch(err => reject(err))
    })
};


const insertUser = (newUser) => {
    return new Promise((resolve, reject) => {

        const id = {
            id: helper.getNewId(users)  // check latest id in this array and +1 to get new ID
        };

        const date = {
            created_on: helper.newDate()
        };

        // replace password with hashed value
        newUser.password = helper.passwordHash(newUser.password);

        newUser = {
            ...id,
            ...newUser,
            is_admin: true,
            ...date,
        };

        users.push(newUser);

        resolve(newUser);

    })
};

/* Login a User * Andela */
const loginUser = (email, password) => {

    return new Promise((resolve, reject) => {
        helper.emailExistsInArray(users, email, password)
            .then(user => {
                resolve(user);

            })
            .catch(err => reject(err))
    });
};


/* Create user account */
const registerUser = (newUser) => {
    return new Promise((resolve, reject) => {

        const id = {
            id: helper.getNewId(users)  // check latest id in this array and +1 to get new ID
        };

        const date = {
            created_on: helper.newDate()
        };

        const token = {
            token: helper.tokenGenerator(newUser.email)
        };

        // don't dsplay password_confirm box
        if (newUser.password_confirm) {
            delete newUser.password_confirm;
        }

        // use default address until user updates address
        if (!newUser.address) {
            newUser.address = defaultAddress;
        }

        // replace password with hashed value
        // newUser.password = helper.passwordHash(newUser.password);

        newUser = {
            ...id,
            ...newUser,
            is_admin: true,
            ...date,
            ...token
        };

        users.push(newUser);

        resolve(newUser);

    })
};


const updateUser = (id, newUser) => {

    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
            .then(user => {

                const index = users.findIndex(p => p.id === user.id);
                id = {id: user.id};

                const date = {
                    created_on: user.created_on,
                    updated_on: helper.newDate()
                };

                users[index] = {...id, ...date, ...newUser};

                resolve(users[index]);
            })
            .catch(err => reject(err))
    })
};


const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
            .then(() => {

                users = users.filter(p => parseInt(p.id) !== parseInt(id));

                resolve();

            })
            .catch(err => reject(err))
    })
};


module.exports = {
    getUser,
    getUsers,
    insertUser,
    updateUser,
    deleteUser,
    registerUser,
    loginUser
};