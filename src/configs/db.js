const { Pool } = require('pg')

const db = new Pool ({
    host: "localhost",
    database: "coffee_shop",
    user: "priaadmaja",
    password: "123456"
})

module.export = db;