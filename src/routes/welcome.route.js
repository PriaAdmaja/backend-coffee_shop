const { Router } = require('express');
const welcomeRoute = Router();

const welcomeController = require('../controllers/welcome.controller');
const memoryUpload = require('../middlewares/memoryUpload')

welcomeRoute.get('/', welcomeController.welcomePage);

module.exports = welcomeRoute;