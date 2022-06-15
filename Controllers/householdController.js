// House Hold Model
const HouseHoldModel = require("../Models/Household");

const create_household = async (req, res) => {
  const { householdNumber, familyHead } = req.body;

  // CHECK IF ID EXIST
  const householdExist = await HouseHoldModel.findOne({ householdNumber });
  if (householdExist) {
    return res.status(400).json({ msg: "Error Household ID already exist!" });
  }

  try {
    const newHousehold = new HouseHoldModel({
      householdNumber,
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
    const household = await HouseHoldModel.find()
      .populate({
        path: "familyHead",
        populate: {
          path: "zone",
          model: "zone",
        },
      })
      .sort({ status: 1, created_at: -1 });

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

const update_household = async (req, res) => {
  const { householdNumber, familyHead } = req.body;
  try {
    const updatedHousehold = await HouseHoldModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          householdNumber,
          familyHead,
        },
      }
    );
    return res
      .status(200)
      .json({ msg: "Success household updated!", updatedHousehold });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const deactive_household = async (req, res) => {
  try {
    const deactivateHousehold = await HouseHoldModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
        },
      }
    );
    return res
      .status(200)
      .json({ msg: "Deactivated household!", deactivateHousehold });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  create_household,
  read_household,
  read_one_household,
  update_household,
  deactive_household,
};
