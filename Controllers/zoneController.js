// ZONE MODEL
const ZoneModel = require("../Models/Zone");

const create_zone = async (req, res) => {
  const { zoneNumber } = req.body;

  // CHEKC IF ZONE NUMBER EXIST
  const existZone = await ZoneModel.findOne({ zoneNumber });
  if (existZone) {
    return res.status(400).json({ msg: "Zone number already exist!" });
  }

  try {
    const zone = new ZoneModel({ zoneNumber });
    const savedZone = await zone.save();
    return res.status(200).json({ msg: "Success creating zone", savedZone });
  } catch (error) {
    console.log(error.msg);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const read_zone = async (req, res) => {
  try {
    const zone = await ZoneModel.find().sort({ created_at: 1 });
    return res.status(200).json({ msg: "Success fetching zone", zone });
  } catch (error) {
    console.log(error.msg);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const update_zone = async (req, res) => {
  const { zoneNumber } = req.body;

  // CHEKC IF ZONE NUMBER EXIST
  const existZone = await ZoneModel.findOne({ zoneNumber });
  if (existZone) {
    return res.status(400).json({ msg: "Zone number already exist!" });
  }

  try {
    const updatedZone = await ZoneModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          zoneNumber: zoneNumber,
        },
      }
    );
    return res.status(200).json({ msg: "Success updating zone", updatedZone });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  create_zone,
  read_zone,
  update_zone,
};
