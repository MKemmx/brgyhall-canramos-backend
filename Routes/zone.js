const Router = require("express").Router();

// Controllers
const {
  create_zone,
  read_zone,
  update_zone,
} = require("../Controllers/zoneController");

Router.post("/create-zone", create_zone);
Router.get("/read-zone", read_zone);
Router.put("/update-zone/:id", update_zone);

module.exports = Router;
