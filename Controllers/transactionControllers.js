// Resident Model
const ResidentModel = require("../Models/Resident");
const ObjectId = require("mongodb").ObjectID;

const read_user_transaction = async (req, res) => {
  try {
    const transactionData = await ResidentModel.aggregate([
      { $match: { _id: ObjectId(req.user.id) } },
      {
        $lookup: {
          from: "certificates",
          localField: "_id",
          foreignField: "residentRequest",
          as: "certificate",
        },
      },
      {
        $project: {
          __v: 0,
          "certificate.__v": 0,
        },
      },
      {
        $lookup: {
          from: "indigencies",
          localField: "_id",
          foreignField: "residentRequest",
          as: "indigency",
        },
      },
      {
        $project: {
          __v: 0,
          "certificate.__v": 0,
        },
      },
    ]);

    return res.status(200).json(transactionData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  read_user_transaction,
};
