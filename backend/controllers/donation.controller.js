const Donation = require("../models/donation.model");

const createDonation = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started createDonation() in donation.controller.js file");
  try {
    console.log("Destructuring values from req.body");
    const { campaignId, donationAmount, orderId, paymentId } = req.body;

    console.log("Creating a new instance of Donation model");
    const newDonation = new Donation({
      donorName: req.authenticatedUser.name,
      donorId: req.authenticatedUser._id,
      campaignId: campaignId,
      donationAmount: donationAmount,
      orderId: orderId,
      paymentId: paymentId,
    });

    console.log("Saving the created instance");
    const savedDonation = await newDonation.save();

    if (!savedDonation) {
      console.log("Some error occured and the document could not be created");
      res.json({
        success: false,
        serverMsg: "Some error occured and the document could not be created",
      });
    } else {
      console.log("Document created successfully");
      res.json({
        success: true,
        serverMsg: "Document created successfully",
        savedDonation,
      });
    }
  } catch (error) {
    console.log(
      "Some error occured in addDonation() in donation.controller.js file"
    );
    console.error(error);
    res.json({ success: false, serverMsg: "Internal server error" });
  }
};

module.exports = { createDonation };
