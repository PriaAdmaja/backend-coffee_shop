const { Router } = require('express')

const masterRouter = Router()

const welcomeRoute = require('./welcome.route')
const usersRoute = require('./users.route')
const productsRoute = require('./products.route')

masterRouter.use(welcomeRoute)
masterRouter.use(usersRoute)
masterRouter.use(productsRoute)

module.exports = masterRouter