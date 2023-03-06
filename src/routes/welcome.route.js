const { Router } = require('express');
const welcomeRoute = Router();

const welcomeController = require('../controllers/welcome.controller');

welcomeRoute.get('/', welcomeController);

module.exports = welcomeRoute;