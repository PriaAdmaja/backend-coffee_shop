const { Router } = require('express')
const usersRoute = Router()

const usersController = require('../controllers/users.controller')

usersRoute.get('/users', usersController.getUsers)
usersRoute.get('/users/:id', usersController.findUsers)
usersRoute.post('/users', usersController.createUsers)
usersRoute.put('/users', usersController.updateUsers)
usersRoute.delete('/users', usersController.deleteUsers)

module.exports = usersRoute