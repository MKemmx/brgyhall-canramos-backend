// indigency MODEL
const IndigencyModel = require("../Models/Indigency");
const asyncHandler = require("express-async-handler");

const create_indigency = asyncHandler(async (req, res) => {
  const { residentRequest, requestPurpose } = req.body;
  const newIndigency = new IndigencyModel({
    residentRequest,
    requestPurpose,
  });
  const savedIndigency = await newIndigency.save();
  return res
    .status(200)
    .json({ msg: "Success requesting indigency", savedIndigency });
});
const read_indigency = asyncHandler(async (req, res) => {
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
});
const read_one_indigency = asyncHandler(async (req, res) => {
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
});
const update_indigency_status = asyncHandler(async (req, res) => {
  const { status, id } = req.body;

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
});

module.exports = {
  create_indigency,
  read_indigency,
  read_one_indigency,
  update_indigency_status,
};
