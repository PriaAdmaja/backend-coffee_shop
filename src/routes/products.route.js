const { Router } = require('express');
const productsRoute = Router();

const productsController = require('../controllers/products.controller');
const cloudMiddleware = require('../middlewares/cloud')
const authMiddleware = require('../middlewares/auth')
const memoryUpload = require('../middlewares/memoryUpload')


productsRoute.get('/', productsController.getProduct);
productsRoute.get('/:id', productsController.getSingleProduct);
productsRoute.post('/', authMiddleware.checkTokenAdmin, memoryUpload.single("image"), cloudMiddleware.cloudUpload, productsController.addProduct);
productsRoute.patch('/:id', authMiddleware.checkTokenAdmin, memoryUpload.single("image"), cloudMiddleware.cloudUpload, productsController.editProduct);
productsRoute.delete('/:id', authMiddleware.checkTokenAdmin, productsController.deleteProduct);

module.exports = productsRoute;