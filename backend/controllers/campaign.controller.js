const Campaign = require("../models/campaign.model");

const createCampaign = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started createCampaign func");
  try {
    const { title, description, targetAmount, deadline, createdBy } = req.body;
    console.log("About to create new campaign");
    Campaign.create({
      createdBy,
      title,
      description,
      targetAmount,
      deadline,
    }).then((doc) => {
      if (doc) {
        console.log("Created new campaign. Campaign details:");
        console.log(doc);
        res.json({
          success: true,
          serverMsg: "Successfully created a new campaign",
        });
        console.log("Response sent");
      } else {
        console.log("Document creation did not go as planned");
        console.log(doc);
        res.json({
          success: false,
          serverMsg: "Document creation did not go as planned",
        });
      }
    });
  } catch (error) {
    console.log(
      "Something went wrong in createCampaign func in campaign.controller.js file"
    );
    console.log("Error: ", error);
    res.json({
      success: false,
      serverMsg: "Internal server error occured",
      error,
    });
  }
};

const getAllCampaigns = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started getAllCampaigns func");
  try {
    console.log("Going to find all campaigns from DB");
    const campaigns = await Campaign.find().populate("createdBy", "-password");

    if (campaigns) {
      if (campaigns.length === 0) {
        console.log("No campaigns exist in database");
        res.json({
          success: false,
          serverMsg: "No campaigns exist in database",
        });
        console.log("Response sent");
      } else {
        console.log("Campaigns found; going to send them through response");
        res.json({ success: true, serverMsg: "Campaigns found", campaigns });
        console.log("Response sent");
      }
    }
  } catch (error) {
    console.log(
      "Something went wrong in getAllCampaigns func in campaign.controller.js file"
    );
    console.log("Error :", error);
    res.json({ success: false, serverMsg: "Internal server error occured" });
  }
};

module.exports = { createCampaign, getAllCampaigns };
