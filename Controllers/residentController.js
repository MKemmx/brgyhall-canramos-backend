// RESIDENT MODEL
const ResidentModel = require("../Models/Resident");
const asyncHandler = require("express-async-handler");
// Bcrypt
const bcrypt = require("bcrypt");

const create_resident = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    phoneNumber,
    birthPlace,
    birthDay,
    civilStatus,
    gender,
    voter,
    zone,
    citizenship,
    voterStatus,
  } = req.body;

  // * Success No Errors
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT)
  );

  const residentExist = await ResidentModel.findOne({
    firstName,
    middleName,
    lastName,
    email,
  });
  //? Check if Resident Account Already Exist!
  if (residentExist) {
    return res.status(400).json({ msg: "Resident already exist!" });
  }

  const newResidet = new ResidentModel({
    firstName,
    middleName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    birthPlace,
    birthDay,
    civilStatus,
    gender,
    voter,
    zone,
    citizenship,
    voterStatus,
  });
  const savedResident = await newResidet.save();

  return res
    .status(200)
    .json({ msg: "Success creating resident!", savedResident });
});
const read_resident = asyncHandler(async (req, res) => {
  const resident = await ResidentModel.find()
    .sort({ created_at: -1, status: -1 })
    .populate("zone");

  return res.status(200).json({ msg: "Success Fetching residents", resident });
});

const read_active_resident = async (req, res) => {
  try {
    const resident = await ResidentModel.find({ status: "active" })
      .sort({ created_at: -1, status: -1 })
      .populate("zone");
    return res
      .status(200)
      .json({ msg: "Success Fetching residents", resident });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error!" });
  }
};

const read_user_resident = async (req, res) => {
  try {
    const resident = await ResidentModel.findOne({
      _id: req.params.id,
    }).populate("zone zone");

    return res
      .status(200)
      .json({ msg: "Success Fetching residents", resident });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error!" });
  }
};

const activate_resident = async (req, res) => {
  try {
    const activatedResident = await ResidentModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      }
    );
    return res
      .status(200)
      .json({ msg: "Resident Activated success!", activatedResident });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error!" });
  }
};

const update_resident = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    birthPlace,
    birthDay,
    civilStatus,
    gender,
    voter,
    zone,
    citizenship,
    voterStatus,
  } = req.body;

  try {
    const updatedResident = await ResidentModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstName,
          middleName,
          lastName,
          email,
          phoneNumber,
          birthPlace,
          birthDay,
          civilStatus,
          gender,
          voter,
          zone,
          citizenship,
          voterStatus,
        },
      }
    );
    return res
      .status(200)
      .json({ updatedResident, msg: "Success updating resident" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const delete_resident = async (req, res) => {};

module.exports = {
  create_resident,
  read_resident,
  read_user_resident,
  activate_resident,
  update_resident,
  delete_resident,
  read_active_resident,
};
