// IMPORT MODEL
const OfficialModel = require("../Models/Official");
const PositionModel = require("../Models/Position");

const create_official = async (req, res) => {
  const { user, position, term } = req.body;

  const newElected = {
    user,
    term,
  };

  const barangayPositions = await PositionModel.findOne({ _id: position });
  if (barangayPositions.elected >= barangayPositions.maximum) {
    return res.status(500).json({
      msg: "Barangay position is maxed out! or Someone is still Elected!",
    });
  }

  // CHECK IF THE TERM IS SAME
  const termExist = await OfficialModel.findOne({ term: term });
  if (termExist) {
    return res
      .status(500)
      .json({ msg: "Barangay Position Term is already done!" });
  }

  await PositionModel.updateOne(
    { _id: position },
    {
      $push: {
        previous_elected: newElected,
      },
      $inc: { elected: 1 },
    }
  );
  try {
    const newOfficial = new OfficialModel({
      user,
      position,
      term,
    });
    const savedOfficial = await newOfficial.save();
    return res
      .status(200)
      .json({ msg: "Success new official created!", savedOfficial });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const read_official = async (req, res) => {
  try {
    const official = await OfficialModel.find()
      .populate("position position")
      .populate({
        path: "user",
        populate: {
          path: "zone",
          model: "zone",
        },
      })
      .sort({ status: 1, created_at: -1 });

    return res
      .status(200)
      .json({ msg: "Success fetching officials", official });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const read_active_official = async (req, res) => {
  try {
    const official = await OfficialModel.find({ status: "active" })
      .populate("position position")
      .populate({
        path: "user",
        populate: {
          path: "zone",
          model: "zone",
        },
      })
      .sort({ status: 1, created_at: -1 });

    return res
      .status(200)
      .json({ msg: "Success fetching officials", official });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const deactive_official = async (req, res) => {
  const { position } = req.body;
  await PositionModel.updateOne({ _id: position }, { $inc: { elected: -1 } });

  try {
    const deactiveOfficial = await OfficialModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          status: "deactive",
        },
      }
    );
    return res
      .status(200)
      .json({ msg: "Official Deactivated!", deactiveOfficial });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const delete_official = async (req, res) => {
  try {
    const deletedOfficial = await OfficialModel.deleteOne({
      _id: req.params._id,
    });
    return res.status(200).json({ msg: "Deleted Official", deletedOfficial });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const update_official = async (req, res) => {
  const { user, position, term } = req.body;
  try {
    const updatedOfficial = await OfficialModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          user,
          position,
          term,
        },
      }
    );
    return res.status(200).json({ msg: "Updated Official", updatedOfficial });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  create_official,
  read_official,
  read_active_official,
  deactive_official,
  update_official,
  delete_official,
};
