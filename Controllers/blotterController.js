const BlotterModel = require("../Models/Blotter");
const asyncHandler = require("express-async-handler");

const create_blotter = asyncHandler(async (req, res) => {
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
});
const read_blotter = asyncHandler(async (req, res) => {
  const blotter = await BlotterModel.find();
  return res.status(200).json({ msg: "Success fetching blotters!", blotter });
});
const update_blotter = asyncHandler(async (req, res) => {
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
});

module.exports = { create_blotter, read_blotter, update_blotter };
