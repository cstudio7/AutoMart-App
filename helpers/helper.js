const fs = require('fs');
const Promise = require('promise');


// token generator using hasha
const hasha = require('hasha');

// bcrypt password hashing
const bcrypt = require('bcrypt');

const passwordHash = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

const passwordCompare = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  if (match) {
    return true;
  }
};

// Increment ID automatically
const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }
  return 1;
};

// Create new date automatically
const newDate = () => new Date().toString();

// Check if ID is in data store
const mustBeInArray = (array, id) => new Promise((resolve, reject) => {
  const row = array.find(r => r.id == id);

  if (!row) {
    reject({
      message: `The id ${id} does not exist in the database`,
      status: 404,
    });
  }
  resolve(row);
});


const findAvailableCarsInArray = (array, status, min_price, max_price) => new Promise((resolve, reject) => {
  if (status && !min_price && !max_price) {
    const row = array.filter(r => r.status == status);

    if (row.length === 0) {
      reject({
        message: 'No cars available. All cars have been sold.',
        status: 404,
      });
    }

    resolve(row);
  } else if (status && min_price && max_price) {
    const row = array.filter(r => r.status == status && r.price >= min_price && r.price <= max_price);

    if (row.length === 0) {
      reject({
        message: `No cars available within these price range of ${min_price} and ${max_price}`,
        status: 404,
      });
    }

    resolve(row);
  }
});


const emailExistsInArray = (array, email, password) => new Promise((resolve, reject) => {
  if (email && password) {
    const row = array.filter(r => r.email === email && r.password === password);

    if (row.length === 0) {
      reject({
        message: 'The user does not exist in the database',
        status: 404,
      });
    }

    resolve(row);
  }
});


// Format currency
const currencyFormatter = () => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const tokenGenerator = (text) => {
  const token = hasha(text);
  return token.slice(0, 40);
};

// Export everything for use elsewhere
module.exports = {
  getNewId,
  newDate,
  mustBeInArray,
  currencyFormatter,
  passwordHash,
  passwordCompare,
  tokenGenerator,
  emailExistsInArray,
  findAvailableCarsInArray,
};
