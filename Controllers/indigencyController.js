// indigency MODEL
const IndigencyModel = require("../Models/Indigency");

const create_indigency = async (req, res) => {
  const { residentRequest, requestPurpose } = req.body;
  try {
    const newIndigency = new IndigencyModel({
      residentRequest,
      requestPurpose,
    });
    const savedIndigency = await newIndigency.save();
    return res
      .status(200)
      .json({ msg: "Success requesting indigency", savedIndigency });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const read_indigency = async (req, res) => {
  try {
    const indigency = await IndigencyModel.find().populate({
      path: "residentRequest",
      populate: {
        path: "zone",
        model: "zone",
      },
    });

    return res
      .status(200)
      .json({ msg: "Success fetching requested indigencys", indigency });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const read_one_indigency = async (req, res) => {
  try {
    const indigency = await IndigencyModel.findOne({
      _id: req.params.id,
    }).populate({
      path: "residentRequest",
      populate: {
        path: "zone",
        model: "zone",
      },
    });

    return res
      .status(200)
      .json({ msg: "Success fetching requested indigencys", indigency });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const update_indigency_status = async (req, res) => {
  const { status, id } = req.body;

  try {
    const updatedIndigency = await IndigencyModel.updateOne(
      { _id: id },
      {
        $set: {
          status,
        },
      }
    );

    return res.status(200).json({
      msg: "Success updated indigency requested",
      updatedIndigency,
    });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  create_indigency,
  read_indigency,
  read_one_indigency,
  update_indigency_status,
};
