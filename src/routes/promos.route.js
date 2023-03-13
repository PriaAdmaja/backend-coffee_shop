const { Router } = require('express');
const promosRoute = Router();

const promosController = require('../controllers/promos.controller');
const authMiddleware = require('../middlewares/auth')

promosRoute.get('/',  promosController.getPromos);
promosRoute.get('/:id', promosController.getSinglePromo);
promosRoute.post('/', authMiddleware.checkTokenAdmin, promosController.addPromos);
promosRoute.patch('/', authMiddleware.checkTokenAdmin, promosController.editPromos);
promosRoute.delete('/:id', authMiddleware.checkTokenAdmin, promosController.deletePromos);


module.exports = promosRoute;