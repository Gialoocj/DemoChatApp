const authController = require("../controllers/auth.controller");
const express = require("express");
const authRouter = express.Router();
const middlewareController = require("../controllers/middleware.controller");

authRouter.route("/register").post(authController.registerAuth);
authRouter.route("/login").post(authController.loginAuth);
authRouter.route("/refresh").post(authController.requestRefreshToken);
authRouter
  .route("/logout")
  .post(middlewareController.verifyToken, authController.logOut);

module.exports = authRouter;
