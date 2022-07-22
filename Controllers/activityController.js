// ACTIVITY MODEL
const ActivityModel = require("../Models/Activity");
const asyncHandler = require("express-async-handler");

const create_activity = asyncHandler(async (req, res) => {
  const { user, activityDescription } = req.body;
  const newActivity = new ActivityModel({
    user,
    activityDescription,
  });
  const savedActivity = await newActivity.save();
  return res
    .status(200)
    .json({ msg: "Success creating activity", savedActivity });
});
const read_activity = asyncHandler(async (req, res) => {
  const activity = await ActivityModel.find();
  return res.status(200).json({ msg: "Success fetching activities", activity });
});

module.exports = {
  create_activity,
  read_activity,
};
