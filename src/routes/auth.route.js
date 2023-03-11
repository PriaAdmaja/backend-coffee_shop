const { Router } = require('express')

const authRouter = Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth')

authRouter.post("/", authController.login);
authRouter.patch("/", authMiddleware.checkToken, authController.editPassword);
authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);

module.exports = authRouter