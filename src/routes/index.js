const { Router } = require('express');

const masterRouter = Router();

const welcomeRoute = require('./welcome.route');
const usersRoute = require('./users.route');
const productsRoute = require('./products.route');
const promosRoute = require('./promos.route');
const historyRoute = require('./history.route');
const authRoute = require('./auth.route');
const transactionRoute = require('./transaction.route')
const errorRoute = require('./error.route')

masterRouter.use('/users', usersRoute);
masterRouter.use('/products', productsRoute);
masterRouter.use('/promos', promosRoute);
masterRouter.use('/history', historyRoute);
masterRouter.use('/auth', authRoute);
masterRouter.use('/transactions', transactionRoute)
masterRouter.use('/error', errorRoute);
masterRouter.use('/', welcomeRoute);

module.exports = masterRouter;