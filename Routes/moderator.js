const Router = require("express").Router();

// Controllers
const {
  create_moderator,
  read_moderator,
  update_moderator,
  delete_moderator,
} = require("../Controllers/moderatorController");

Router.post("/create-moderator", create_moderator);
Router.get("/read-moderator", read_moderator);
Router.put("/update-moderator/:id", update_moderator);
Router.delete("/delete-moderator/:id", delete_moderator);

module.exports = Router;
