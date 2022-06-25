const Router = require("express").Router();

// Controllers
const {
  create_indigency,
  read_indigency,
  read_one_indigency,
  update_indigency_status,
} = require("../Controllers/indigencyController");

Router.post("/create-indigency", create_indigency);
Router.get("/read-indigency", read_indigency);
Router.get("/read-indigency/:id", read_one_indigency);
Router.put("/update-indigency-status/", update_indigency_status);

module.exports = Router;
