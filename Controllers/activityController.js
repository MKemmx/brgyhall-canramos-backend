// ACTIVITY MODEL
const ActivityModel = require("../Models/Activity");

const create_activity = async (req, res) => {
  const { user, activityDescription } = req.body;
  try {
    const newActivity = new ActivityModel({
      user,
      activityDescription,
    });
    const savedActivity = await newActivity.save();

    return res
      .status(200)
      .json({ msg: "Success creating activity", savedActivity });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const read_activity = async (req, res) => {
  try {
    const activity = await ActivityModel.find();
    return res
      .status(200)
      .json({ msg: "Success fetching activities", activity });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  create_activity,
  read_activity,
};
