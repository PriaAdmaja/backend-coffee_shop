const express = require('express');
require('dotenv').config();
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const masterRouter = require('./src/routes/index');
app.use(masterRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});