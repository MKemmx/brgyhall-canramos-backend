// House Hold Model
const HouseHoldModel = require("../Models/Household");

const create_household = async (req, res) => {
  const { householdNumber, zone, familyHead } = req.body;

  try {
    const newHousehold = new HouseHoldModel({
      householdNumber,
      zone,
      familyHead,
    });
    const savedHousehold = await newHousehold.save();
    return res
      .status(200)
      .json({ msg: "Success creating household", savedHousehold });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const read_household = async (req, res) => {
  try {
    const household = await HouseHoldModel.find().populate("zone zone");
    return res
      .status(200)
      .json({ msg: "Success fetching households", household });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const read_one_household = async (req, res) => {
  try {
    const household = await HouseHoldModel.findOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ msg: "Success fetching households", household });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  create_household,
  read_household,
  read_one_household,
};
