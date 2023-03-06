const { Router } = require('express')

const masterRouter = Router()

const welcomeRoute = require('./welcome.route')
const usersRoute = require('./users.route')
const productsRoute = require('./products.route')
const promosRoute = require('./promos.route')
const historyRoute = require('./history.route')

masterRouter.use('/', welcomeRoute)
masterRouter.use('/users', usersRoute)
masterRouter.use('/products', productsRoute)
masterRouter.use('/promos', promosRoute)
masterRouter.use('/history', historyRoute)

module.exports = masterRouter