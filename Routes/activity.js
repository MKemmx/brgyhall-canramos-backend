const Router = require("express").Router();

// Middlewares
const { AdminMiddleware } = require("../Middleware/AdminMiddleware");
const { AuthMiddleware } = require("../Middleware/AuthMiddleware");

// Controllers
const {
  create_activity,
  read_activity,
} = require("../Controllers/activityController");

Router.post("/create-activity", AuthMiddleware, create_activity);
Router.get("/read-activity", AdminMiddleware, read_activity);

module.exports = Router;
