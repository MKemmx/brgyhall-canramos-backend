const Router = require("express").Router();

// Controllers
const {
  create_admin,
  read_admin,
  update_admin,
  delete_admin,
} = require("../Controllers/adminController.js");

Router.post("/create-admin", create_admin);
Router.get("/read-admin", read_admin);
Router.put("/update-admin/:id", update_admin);
Router.delete("/delete-admin/:id", delete_admin);

module.exports = Router;
