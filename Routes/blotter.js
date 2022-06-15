const Router = require("express").Router();

// Controllers
const {
  create_blotter,
  read_blotter,
  update_blotter,
} = require("../Controllers/blotterController");

Router.post("/create-blotter", create_blotter);
Router.get("/read-blotter", read_blotter);
Router.put("/update-blotter/:id", update_blotter);

module.exports = Router;
