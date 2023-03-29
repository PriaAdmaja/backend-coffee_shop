require('dotenv').config();

const port = 8080;

const app = require('./app')

const mongoose = require('mongoose'); 
const mongoUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl)
.then(() => {
    console.log("Mongo DB Connected");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => console.log(err))

