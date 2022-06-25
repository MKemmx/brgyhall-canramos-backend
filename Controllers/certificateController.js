// CERTIFICATE MODEL
const CertificateModel = require("../Models/Certificate");

const create_certificate = async (req, res) => {
  const { residentRequest, requestPurpose } = req.body;
  try {
    const newCertificate = new CertificateModel({
      residentRequest,
      requestPurpose,
    });
    const savedCertificate = await newCertificate.save();
    return res
      .status(200)
      .json({ msg: "Success requesting certificate", savedCertificate });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const read_certificate = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const read_one_certificate = async (req, res) => {
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
};
const update_certificate_status = async (req, res) => {
  const { status, id } = req.body;

  try {
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
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  create_certificate,
  read_certificate,
  read_one_certificate,
  update_certificate_status,
};
