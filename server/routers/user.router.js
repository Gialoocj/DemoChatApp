const express = require("express");
const UserController = require("../controllers/user.controller");
const UserRouter = express.Router();
const middlewareToken = require("../controllers/middleware.controller");

UserRouter.route("/").get(
  middlewareToken.verifyToken,
  UserController.getAllUsers
);
UserRouter.route("/:userid").delete(UserController.deleteUser);

module.exports = UserRouter;
