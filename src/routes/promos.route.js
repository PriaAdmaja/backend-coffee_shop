const { Router } = require('express')
const promosRoute = Router()

const promosController = require('../controllers/promos.controller')

promosRoute.get('/', promosController.getPromos)
promosRoute.post('/', promosController.addPromos)
promosRoute.put('/', promosController.editPromos)
promosRoute.delete('/', promosController.deletePromos)


module.exports = promosRoute