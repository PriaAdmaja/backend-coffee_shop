const { Router } = require('express')
const productsRoute = Router()

const productsController = require('../controllers/products.controller')


productsRoute.get('/products', productsController.getProduct)
productsRoute.post('/products', productsController.addProduct)
productsRoute.put('/products', productsController.editProduct)
productsRoute.delete('/products', productsController.deleteProduct)

module.exports = productsRoute