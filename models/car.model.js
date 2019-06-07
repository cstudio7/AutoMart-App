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



const getCar = (id) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
            .then(car => resolve(car))
            .catch(err => reject(err))
    })
};



module.exports = {
    getCar,
};