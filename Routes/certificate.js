const Router = require("express").Router();

// Controllers
const {
  create_certificate,
  read_certificate,
  read_one_certificate,
  update_certificate_status,
} = require("../Controllers/certificateController");

Router.post("/create-certificate", create_certificate);
Router.get("/read-certificate", read_certificate);
Router.get("/read-certificate/:id", read_one_certificate);
Router.put("/update-certificate-status", update_certificate_status);

module.exports = Router;
