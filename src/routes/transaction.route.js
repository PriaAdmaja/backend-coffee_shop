const { Router } = require('express');
const { checkToken } = require('../middlewares/auth');

const transactionController = require('../controllers/transaction.controller');

const transactionRoute = Router()

transactionRoute.post('/', checkToken, transactionController.createTransaction);

module.exports = transactionRoute