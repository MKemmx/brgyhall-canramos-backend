const Router = require("express").Router();

// Controllers
const {
  create_official,
  read_official,
  read_active_official,
  deactive_official,
  update_official,
  delete_official,
} = require("../Controllers/officialController");

Router.post("/create-official", create_official);
Router.get("/read-official", read_official);
Router.get("/read-active-official", read_active_official);
Router.put("/update-official/:id", update_official);
Router.put("/deactive-official/:id", deactive_official);
Router.delete("/delete-official/:id", delete_official);

module.exports = Router;
