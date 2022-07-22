// CERTIFICATE MODEL
const CertificateModel = require("../Models/Certificate");
const asyncHandler = require("express-async-handler");

const create_certificate = asyncHandler(async (req, res) => {
  const { residentRequest, requestPurpose } = req.body;
  const newCertificate = new CertificateModel({
    residentRequest,
    requestPurpose,
  });
  const savedCertificate = await newCertificate.save();
  return res
    .status(200)
    .json({ msg: "Success requesting certificate", savedCertificate });
});
const read_certificate = asyncHandler(async (req, res) => {
  const certificate = await CertificateModel.find().populate({
    path: "residentRequest",
    populate: {
      path: "zone",
      model: "zone",
    },
  });

  return res
    .status(200)
    .json({ msg: "Success fetching requested certificates", certificate });
});
const read_one_certificate = asyncHandler(async (req, res) => {
  try {
    const certificate = await CertificateModel.findOne({
      _id: req.params.id,
    }).populate({
      path: "residentRequest",
      populate: {
        path: "zone",
        model: "zone",
      },
    });

    return res
      .status(200)
      .json({ msg: "Success fetching requested certificates", certificate });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
});
const update_certificate_status = asyncHandler(async (req, res) => {
  const { status, id } = req.body;
  const updatedCertificate = await CertificateModel.updateOne(
    { _id: id },
    {
      $set: {
        status,
      },
    }
  );
  return res.status(200).json({
    msg: "Success updating requested certificates",
    updatedCertificate,
  });
});

module.exports = {
  create_certificate,
  read_certificate,
  read_one_certificate,
  update_certificate_status,
};
