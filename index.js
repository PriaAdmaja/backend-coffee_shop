const express = require('express')
const app = express()
const port = 8080


const masterRouter = require('./src/routes/index')
app.use(masterRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})