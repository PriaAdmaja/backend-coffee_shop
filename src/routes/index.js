const { Router } = require('express')

const masterRouter = Router()

const welcomeRoute = require('./welcome.route')
const usersRoute = require('./users.route')

masterRouter.use(welcomeRoute)
masterRouter.use(usersRoute)

module.exports = masterRouter