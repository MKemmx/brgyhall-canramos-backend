const Router = require("express").Router();
// Middle Wares
const { AuthMiddleware } = require("../Middleware/AuthMiddleware");
// Controllers
const {
  read_user_transaction,
} = require("../Controllers/transactionControllers");

Router.get("/read-user-transaction", AuthMiddleware, read_user_transaction);

module.exports = Router;
