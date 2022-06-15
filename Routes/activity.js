const Router = require("express").Router();

// Controllers
const {
  create_activity,
  read_activity,
} = require("../Controllers/activityController");

Router.post("/create-activity", create_activity);
Router.get("/read-activity", read_activity);

module.exports = Router;
