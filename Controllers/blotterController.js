const BlotterModel = require("../Models/Blotter");

const create_blotter = async (req, res) => {
  const {
    complainant,
    complainantPhoneNumber,
    complainantAddress,
    incident,
    incidentDate,
    incidentLocation,
    complainee,
    complaineeDetails,
    schedule,
  } = req.body;

  try {
    const newBlotter = new BlotterModel({
      complainant,
      complainantPhoneNumber,
      complainantAddress,
      incident,
      incidentDate,
      incidentLocation,
      complainee,
      complaineeDetails,
      schedule,
    });
    const savedBlotter = await newBlotter.save();

    return res
      .status(200)
      .json({ msg: "Success creating blotter!", savedBlotter });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const read_blotter = async (req, res) => {
  try {
    const blotter = await BlotterModel.find();
    return res.status(200).json({ msg: "Success fetching blotters!", blotter });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const update_blotter = async (req, res) => {
  const {
    complainant,
    complainantPhoneNumber,
    complainantAddress,
    incident,
    incidentDate,
    incidentLocation,
    complainee,
    complaineeDetails,
    status,
  } = req.body;

  try {
    const updatedBlotter = await BlotterModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          complainant,
          complainantPhoneNumber,
          complainantAddress,
          incident,
          incidentDate,
          incidentLocation,
          complainee,
          complaineeDetails,
          status,
        },
      }
    );
    return res
      .status(200)
      .json({ msg: "Success updating blotter!", updatedBlotter });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { create_blotter, read_blotter, update_blotter };
