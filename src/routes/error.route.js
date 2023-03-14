const { Router } = require("express");

const errorRouter = Router();
const errorController = require("../controllers/error.controller");

errorRouter.get("/", errorController.getError);
errorRouter.post("/", errorController.createError);

module.exports = errorRouter;