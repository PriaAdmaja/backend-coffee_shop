const { Router } = require('express')
const usersRoute = Router()

const usersController = require('../controllers/users.controller')

usersRoute.get('/', usersController.getUsers)
usersRoute.get('/:id', usersController.findUsers)
usersRoute.post('/', usersController.createUsers)
usersRoute.put('/', usersController.updateUsers)
usersRoute.delete('/', usersController.deleteUsers)

module.exports = usersRoute