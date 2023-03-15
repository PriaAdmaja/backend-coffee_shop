const { Router } = require('express')

const authRouter = Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth')

authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);
authRouter.get("/forgotpassword", authController.forgotPassword);
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.patch("/verifyOtp", authController.verifyOtp)
authRouter.patch("/", authMiddleware.checkToken, authController.editPassword);

module.exports = authRouter