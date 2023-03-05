const { Router } = require('express')
const productsRoute = Router()

const productsController = require('../controllers/products.controller')


productsRoute.get('/', productsController.getProduct)
productsRoute.get('/', productsController.findProduct)
productsRoute.post('/', productsController.addProduct)
productsRoute.put('/', productsController.editProduct)
productsRoute.delete('/', productsController.deleteProduct)

module.exports = productsRoute