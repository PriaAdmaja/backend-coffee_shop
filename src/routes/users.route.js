const { Router } = require('express')
const usersRoute = Router()

const usersController = require('../controllers/users.controller')

usersRoute.get('/users', usersController.getUsers)

module.exports = usersRoute