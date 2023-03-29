const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require("morgan");
require('dotenv').config();

const port = 8080;
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

const masterRouter = require('./src/routes/index');
app.use(masterRouter);

const mongoose = require('mongoose'); 
const mongoUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl)
.then(() => {
    console.log("Mongo DB Connected");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => console.log(err))

