// House Hold Model
const HouseHoldModel = require("../Models/Household");
const asyncHandler = require("express-async-handler");

const create_household = asyncHandler(async (req, res) => {
  const { householdNumber, familyHead } = req.body;
  // CHECK IF ID EXIST
  const householdExist = await HouseHoldModel.findOne({ householdNumber });
  if (householdExist) {
    return res.status(400).json({ msg: "Error Household ID already exist!" });
  }
  const newHousehold = new HouseHoldModel({
    householdNumber,
    familyHead,
  });
  const savedHousehold = await newHousehold.save();
  return res
    .status(200)
    .json({ msg: "Success creating household", savedHousehold });
});
const read_household = asyncHandler(async (req, res) => {
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
});
const read_one_household = asyncHandler(async (req, res) => {
  const household = await HouseHoldModel.findOne({ _id: req.params.id });
  return res
    .status(200)
    .json({ msg: "Success fetching households", household });
});
const update_household = asyncHandler(async (req, res) => {
  const { householdNumber, familyHead } = req.body;
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
});
const deactive_household = asyncHandler(async (req, res) => {
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
});

module.exports = {
  create_household,
  read_household,
  read_one_household,
  update_household,
  deactive_household,
};
