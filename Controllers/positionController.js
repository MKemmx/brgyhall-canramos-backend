// MODEL
const Position = require("../Models/Position");

const create_position = async (req, res) => {
  const { position, maximum } = req.body;
  try {
    const newPosition = new Position({ position, maximum });
    const savedPostion = await newPosition.save();
    return res
      .status(200)
      .json({ msg: "Success Creating position", savedPostion });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error!" });
  }
};
const read_position = async (req, res) => {
  try {
    const position = await Position.find()
      .populate("previous_elected.user")
      .sort({ createdAt: -1 });
    return res.status(200).json({ msg: "Success Fetching position", position });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error!" });
  }
};

const update_position = async (req, res) => {
  const { position, maximum } = req.body;

  try {
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
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error!" });
  }
};

const delete_position = async (req, res) => {
  try {
    const deletedPosition = await Position.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ msg: "Success deleting position", deletedPosition });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error!" });
  }
};

module.exports = {
  create_position,
  read_position,
  update_position,
  delete_position,
};
