const { Router } = require('express');
const historyRoute = Router();

const historyController = require('../controllers/history.controller');


historyRoute.get('/', historyController.getAllHistory);
historyRoute.get('/:userId', historyController.getHistory);
historyRoute.post('/', historyController.addHistory);
historyRoute.patch('/', historyController.editHistory);
historyRoute.delete('/', historyController.deleteHistory);

module.exports = historyRoute;