const Donation = require("../models/donation.model");
const Campaign = require("../models/campaign.model");

const createDonation = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started createDonation() in donation.controller.js file");
  try {
    console.log("Destructuring values from req.body");
    const { campaignId, donationAmount, orderId, paymentId } = req.body;

    console.log("Creating new donation record");
    const savedDonation = await Donation.create({
      donorName: req.user.name,
      donorId: req.user._id,
      campaignId: campaignId,
      donationAmount: donationAmount,
      orderId: orderId,
      paymentId: paymentId,
    });

    if (!savedDonation) {
      console.log("Some error occured and the document could not be created");
      return res
        .status(500)
        .json({ serverMsg: "Donation could not be created" });
    }
    console.log("Document created successfully");
    return res.status(201).json({
      serverMsg: "Document created successfully",
      savedDonation,
    });
  } catch (error) {
    console.log("Error in addDonation() in donation.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const getUserDonation = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started getUserDonation() in donation.controller.js file");
  try {
    const userId = req.user._id;

    // Find all donations made by the user
    const userDonations = await Donation.find({ donorId: userId });

    // Extract unique campaign IDs
    const uniqueCampaignIds = [
      ...new Set(userDonations.map((donation) => donation.campaignId)),
    ];

    // Fetch campaign details for the unique IDs
    const campaigns = await Campaign.find({
      _id: { $in: uniqueCampaignIds },
    }).populate("createdBy", "-password");

    if (campaigns.length === 0) {
      console.log("No donations found for this user");
      return res
        .status(404)
        .json({ serverMsg: "No donations found for this user" });
    }
    console.log("Campaigns found, sending response");
    return res.status(200).json({ campaigns: campaigns });
  } catch (error) {
    console.log("Error in getUserDonation() in donation.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

module.exports = { createDonation, getUserDonation };
