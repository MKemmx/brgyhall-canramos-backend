// ZONE MODEL
const ZoneModel = require("../Models/Zone");
const asyncHandler = require("express-async-handler");

const create_zone = asyncHandler(async (req, res) => {
  const { zoneNumber } = req.body;
  // CHEKC IF ZONE NUMBER EXIST
  const existZone = await ZoneModel.findOne({ zoneNumber });
  if (existZone) {
    return res.status(400).json({ msg: "Zone number already exist!" });
  }
  const zone = new ZoneModel({ zoneNumber });
  const savedZone = await zone.save();
  return res.status(200).json({ msg: "Success creating zone", savedZone });
});
const read_zone = asyncHandler(async (req, res) => {
  const zone = await ZoneModel.find().sort({ created_at: 1 });
  return res.status(200).json({ msg: "Success fetching zone", zone });
});
const update_zone = asyncHandler(async (req, res) => {
  const { zoneNumber } = req.body;
  // CHEKC IF ZONE NUMBER EXIST
  const existZone = await ZoneModel.findOne({ zoneNumber });
  if (existZone) {
    return res.status(400).json({ msg: "Zone number already exist!" });
  }
  const updatedZone = await ZoneModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        zoneNumber: zoneNumber,
      },
    }
  );
  return res.status(200).json({ msg: "Success updating zone", updatedZone });
});

module.exports = {
  create_zone,
  read_zone,
  update_zone,
};
