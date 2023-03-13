const { Router } = require('express');
const welcomeRoute = Router();

const welcomeController = require('../controllers/welcome.controller');
const memoryUpload = require('../middlewares/memoryUpload')

welcomeRoute.get('/', welcomeController.welcomePage);
welcomeRoute.post('/', memoryUpload.single("image"), welcomeController.cloudUpload)

module.exports = welcomeRoute;