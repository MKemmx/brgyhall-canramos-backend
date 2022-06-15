// MODELS
const OfficialModel = require("../Models/Official");
const CertificateModel = require("../Models/Certificate");
const IndigencyModel = require("../Models/Indigency");
const HouseholdModel = require("../Models/Household");
const ResidentModel = require("../Models/Resident");
const ZoneModel = require("../Models/Zone");

const fetch_dashboard_data = async (req, res) => {
  try {
    const officialData = await OfficialModel.find();
    const certificateData = await CertificateModel.find();
    const IndigencyData = await IndigencyModel.find();
    const householdData = await HouseholdModel.find();
    const residentData = await ResidentModel.find();
    const zoneData = await ZoneModel.find();

    const dashboardData = {
      officialData,
      certificateData,
      IndigencyData,
      householdData,
      residentData,
      zoneData,
    };

    return res.status(200).send(dashboardData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error!" });
  }
};

module.exports = {
  fetch_dashboard_data,
};
