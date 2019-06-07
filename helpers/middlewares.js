const mustBeInteger = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(parseInt(id))) {
    res.status(400).json({
      message: 'ID must be an integer',
    });
  } else {
    next();
  }
};

const checkFieldPostCar = (req, res, next) => {
  const {
    owner, _, state, status, price, manufacturer, model, body_type,
  } = req.body;

  if (owner && state && status && price && manufacturer && model && body_type) {
    next();
  } else {
    res.status(400).json({
      message: 'Some fields are missing',
    });
  }
};


const checkFieldPostOrder = (req, res, next) => {
    const { buyer, car_id, amount, status } = req.body;
    if (buyer && car_id && amount && status ) {
        next()
    } else {
        res.status(400).json({
            message: "Some fields are missing"
        })
    }
};

const checkFieldPostUser = (req, res, next) => {
  const {
    email, first_name, last_name, password, address,
  } = req.body;

  if (email && first_name && last_name && password && address) {
    next();
  } else {
    res.status(400).json({
      message: 'Some fields are missing',
    });
  }
};

const checkLoginForm = (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      error: {
        message: 'Fields cannot be empty',
      },
    });
  }
};

const checkRegistrationForm = (req, res, next) => {
  const {
    email, first_name, last_name, password, password_confirm,
  } = req.body;

  if (email && first_name && last_name && email && password && password_confirm) {
    if (password === password_confirm) {
      next();
    } else {
      res.status(400).json({
        status: 400,
        error: {
          message: 'Passwords do not match',
        },
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      error: {
        message: 'Some fields are missing',
      },
    });
  }
};


module.exports = {
  mustBeInteger,
  checkFieldPostCar,
  checkFieldPostUser,
  checkRegistrationForm,
  checkLoginForm,
  checkFieldPostOrder
};
