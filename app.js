const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require("morgan");
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

const masterRouter = require('./src/routes/index');
app.use(masterRouter);

module.exports = app;