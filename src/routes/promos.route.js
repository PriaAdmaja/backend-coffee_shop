const { Router } = require('express');
const promosRoute = Router();

const promosController = require('../controllers/promos.controller');

promosRoute.get('/', promosController.getPromos);
promosRoute.get('/:id', promosController.getSinglePromo);
promosRoute.post('/', promosController.addPromos);
promosRoute.patch('/', promosController.editPromos);
promosRoute.delete('/:id', promosController.deletePromos);


module.exports = promosRoute;