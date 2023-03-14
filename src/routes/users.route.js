const { Router } = require('express');
const usersRoute = Router();

const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth')

usersRoute.get('/', usersController.getUsers);
usersRoute.get('/:id', usersController.findUsers);
usersRoute.post('/', usersController.createUsers);
usersRoute.patch('/', authMiddleware.checkToken, usersController.updateUsers);
usersRoute.delete('/:id', usersController.deleteUsers);

module.exports = usersRoute;