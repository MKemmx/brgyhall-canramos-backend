// MODEL
const Position = require("../Models/Position");
const asyncHandler = require("express-async-handler");

const create_position = asyncHandler(async (req, res) => {
  const { position, maximum } = req.body;

  const newPosition = new Position({ position, maximum });
  const savedPostion = await newPosition.save();
  return res
    .status(200)
    .json({ msg: "Success Creating position", savedPostion });
});
const read_position = asyncHandler(async (req, res) => {
  const position = await Position.find()
    .populate("previous_elected.user")
    .sort({ createdAt: -1 });
  return res.status(200).json({ msg: "Success Fetching position", position });
});
const update_position = asyncHandler(async (req, res) => {
  const { position, maximum } = req.body;
  const updatedPosition = await Position.findOne(
    { _id: req.params.id },
    {
      $set: {
        position,
        maximum,
      },
    }
  );
  return res
    .status(200)
    .json({ msg: "Success updating position", updatedPosition });
});
const delete_position = asyncHandler(async (req, res) => {
  const deletedPosition = await Position.deleteOne({ _id: req.params.id });
  return res
    .status(200)
    .json({ msg: "Success deleting position", deletedPosition });
});

module.exports = {
  create_position,
  read_position,
  update_position,
  delete_position,
};
