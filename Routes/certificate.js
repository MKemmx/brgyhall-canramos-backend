const Router = require("express").Router();

// Controllers
const {
  create_certificate,
  read_certificate,
  read_one_certificate,
  update_certificate,
} = require("../Controllers/certificateController");

Router.post("/create-certificate", create_certificate);
Router.get("/read-certificate", read_certificate);
Router.get("/read-certificate/:id", read_one_certificate);
Router.put("/update-certificate/:id", update_certificate);

module.exports = Router;
