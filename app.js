// const config = require("config");
const dotenv = require('dotenv');
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorhandler');
const employeeRouter = require('./employees/employee.routes');

const app = express();

app.use(cors(), express.json());

app.use('/employees', employeeRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

module.exports = app;
