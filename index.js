const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const port = 8080;


app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const morgan = require("morgan");
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));


const masterRouter = require('./src/routes/index');
app.use(masterRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});