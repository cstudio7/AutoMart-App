// const filename = "../data/cars.json";
// let cars = require(filename);

const Promise = require("promise");
const helper = require("../helpers/helper.js");

let cars = [
    {
        //dummy values for testing
        "id": 1,
        "owner": 23,
        "created_on": helper.newDate(),
        "state": "new",
        "status": "available",
        "price": helper.currencyFormatter().format(8982.85),
        "manufacturer": "Mercedes Benz",
        "model": "C300",
        "body_type": "car"
    }
];


const getCars = () => {
    return new Promise((resolve, reject) => {

        if (cars.length === 0) {
            reject({
                message: "No Cars Available",
                status: 202
            })
        }

        resolve(cars);
    })
};


const updateStatus = (id, status) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
            .then(car => {

                const index = cars.findIndex(p => p.id === car.id);

                const id = {
                    id: car.id
                };

                const owner = {
                    owner: car.owner
                };

                const date = {
                    created_on: car.created_on,
                    updated_on: helper.newDate()
                };

                car.status = status;

                cars[index] = {
                    ...id,
                    ...owner,
                    ...date,
                    ...car
                };

                resolve(cars[index]);
            })
            .catch(err => reject(err))
    })
};


const viewAllUnsold = (status) => {
    return new Promise((resolve, reject) => {
        helper.findAvailableCarsInArray(cars, status)
            .then(car => {
                resolve(car);
            })
            .catch(err => reject(err))
    });
};

const viewAllUnsoldWithinAPriceRange = (status, min_price, max_price) => {
    return new Promise((resolve, reject) => {
        helper.findAvailableCarsInArray(cars, status, min_price, max_price)
            .then(car => {
                resolve(car);
            })
            .catch(err => reject(err))
    });
};


const updatePrice = (id, price) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
            .then(car => {

                const index = cars.findIndex(p => p.id === car.id);

                const id = {
                    id: car.id
                };

                const owner = {
                    owner: car.owner
                };

                const date = {
                    created_on: car.created_on,
                    updated_on: helper.newDate()
                };

                car.price = helper.currencyFormatter().format(price);

                cars[index] = {
                    ...id,
                    ...owner,
                    ...date,
                    ...car
                };

                resolve(cars[index]);
            })
            .catch(err => reject(err))
    })
};


const getCar = (id) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
            .then(car => resolve(car))
            .catch(err => reject(err))
    })
};


const insertCar = (newCar) => {
    return new Promise((resolve, reject) => {

        const id = {
            id: helper.getNewId(cars)  // check latest id in this array and +1 to get new ID
        };

        const date = {
            created_on: helper.newDate()
        };

        newCar = { ...id, ...date, ...newCar };

        cars.push(newCar);

        resolve(newCar);
    })
};


const updateCar = (id, newCar) => {

    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
            .then(car => {

                const index = cars.findIndex(p => p.id === car.id);
                id = { id: car.id };

                const date = {
                    created_on: car.created_on,
                    updated_on: helper.newDate()
                };

                cars[index] = { ...id, ...date, ...newCar };

                // helper.writeJSONFile(filename, cars);

                resolve(cars[index]);
            })
            .catch(err => reject(err))
    })
};


const deleteCar = (id) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
            .then(() => {

                cars = cars.filter(p => parseInt(p.id) !== parseInt(id));

                resolve();

            })
            .catch(err => reject(err))
    })
};



module.exports = {
    getCar,
    getCars,
    insertCar,
    updateCar,
    updateStatus,
    updatePrice,
    viewAllUnsold,
    viewAllUnsoldWithinAPriceRange,
    deleteCar
};