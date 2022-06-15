// RESIDENT MODEL
const ResidentModel = require("../Models/Resident");

const create_resident = async (req, res) => {
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
    const newResidet = new ResidentModel({
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
    });
    const savedResident = await newResidet.save();

    return res
      .status(200)
      .json({ msg: "Success creating resident!", savedResident });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error!" });
  }
};

const read_resident = async (req, res) => {
  try {
    const resident = await ResidentModel.find()
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
