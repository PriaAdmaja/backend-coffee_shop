const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')
const redis = require('redis')

const app = express();
const port = 8080;


app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const morgan = require("morgan");
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));


(async () => {
const redisClient = redis.createClient();
redisClient.on('error', err => console.log('Redis client error', err));
redisClient.on('connect', () => console.log('Redis connected!'))
await redisClient.connect();
});

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

