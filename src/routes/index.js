const { Router } = require('express')

const masterRouter = Router()

const welcomeRoute = require('./welcome.route')
const usersRoute = require('./users.route')
const productsRoute = require('./products.route')
const promosRoute = require('./promos.route')

masterRouter.use('/', welcomeRoute)
masterRouter.use('/users', usersRoute)
masterRouter.use('/products', productsRoute)
masterRouter.use('/promos', promosRoute)

module.exports = masterRouter