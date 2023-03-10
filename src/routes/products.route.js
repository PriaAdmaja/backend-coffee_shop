const { Router } = require('express');
const productsRoute = Router();

const productsController = require('../controllers/products.controller');


productsRoute.get('/', productsController.getProduct);
productsRoute.get('/:id', productsController.getSingleProduct);
productsRoute.post('/', productsController.addProduct);
productsRoute.patch('/', productsController.editProduct);
productsRoute.delete('/:id', productsController.deleteProduct);

module.exports = productsRoute;