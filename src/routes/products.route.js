const { Router } = require('express');
const productsRoute = Router();

const productsController = require('../controllers/products.controller');
const authMiddleware = require('../middlewares/auth')


productsRoute.get('/', productsController.getProduct);
productsRoute.get('/:id', productsController.getSingleProduct);
productsRoute.post('/', authMiddleware.checkTokenAdmin, productsController.addProduct);
productsRoute.patch('/', authMiddleware.checkTokenAdmin, productsController.editProduct);
productsRoute.delete('/:id', authMiddleware.checkTokenAdmin, productsController.deleteProduct);

module.exports = productsRoute;