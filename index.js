// Import/require packages
const express = require("express");
const morgan = require("morgan");
const Promise = require("promise");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');

// App calling
const app = new express();

// App usage
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/index.routes'));
app.use(cors());

// Port listen
app.listen("3000");
