const Router = require("express").Router();

// Controller
const {
  create_position,
  read_position,
  update_position,
  delete_position,
} = require("../Controllers/positionController");

Router.post("/create-position", create_position);
Router.get("/read-position", read_position);
Router.put("/update-position/:id", update_position);
Router.delete("/delete-position/:id", delete_position);

module.exports = Router;
