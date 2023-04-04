const { Router } = require('express');
const usersRoute = Router();

const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth');
const memoryUpload = require('../middlewares/memoryUpload');
const cloudMiddleware = require('../middlewares/cloud')

usersRoute.get('/', usersController.getUsers);
usersRoute.get('/:id', usersController.findUsers);
usersRoute.patch('/:id', authMiddleware.checkToken, memoryUpload.single("image"), cloudMiddleware.cloudUploadUser, usersController.updateUsers);
usersRoute.delete('/:id', usersController.deleteUsers);

module.exports = usersRoute;