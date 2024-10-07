const Campaign = require("../models/campaign.model");

const createCampaign = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started createCampaign func");

  try {
    const { title, description, targetAmount, deadline, category } = req.body;
    console.log("About to create new campaign");

    const doc = await Campaign.create({
      createdBy: req.user._id,
      category,
      title,
      description,
      targetAmount,
      deadline,
    });

    if (!doc) {
      console.log("Error creating new campaign");
      return res.status(500).json({ serverMsg: "Error creating new campaign" });
    }

    console.log("Created new campiagn: ", doc);
    return res.status(201).json({ serverMsg: "Campaign created successfully" });
  } catch (error) {
    console.log("Error in createCampaign func in campaign.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error " });
  }
};

const getAllCampaigns = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started getAllCampaigns func");
  try {
    console.log("Going to find all campaigns from DB");
    const campaigns = await Campaign.find().populate("createdBy", "-password");

    // check if no campaigns exist in db
    if (!campaigns || campaigns.length === 0) {
      console.log("No campaigns exist in database");
      return res
        .status(404)
        .json({ serverMsg: "No campaigns exist in database" });
    }

    console.log("Campaigns found; sending response");
    return res.status(200).json({ campaigns });
  } catch (error) {
    console.log("Error in getAllCampaigns func in campaign.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error occured" });
  }
};

const getCampaignDetails = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started getCampaignDetails() in campaign.controller.js file");
  try {
    // Get campaign ID from params
    const { campaignId } = req.params;
    console.log("Captured id: ", campaignId);
    console.log("Searching for campaign");
    const campaign = await Campaign.findById(campaignId).populate(
      "createdBy",
      "-password"
    );

    if (!campaign) {
      console.log("No campaign found for the given id");
      return res.status(404).json({ serverMsg: "Campaign does not exist" });
    }
    console.log("Campaign found; sending campaign details via response");
    return res.status(200).json({ campaign });
  } catch (error) {
    console.log("Error in getCampaignDetails func.");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const addDonation = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started addDonation func in campaign.controller.js file");
  try {
    // Get campaign ID and donation ID from request body
    const { campaignId, donationID } = req.body;
    const amount = Number(req.body.amount);

    // Find campaign by ID and update amountRaised and donations array
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { $inc: { amountRaised: amount }, $push: { donations: donationID } },
      { new: true }
    );

    // Check if campaign was found and updated
    if (!updatedCampaign) {
      console.log("Couldnt find campaign from given campaign ID");
      return res.status(500).json({ serverMsg: "Failed to update campaign" });
    }

    return res.status(200).json({ serverMsg: "Campaign updated successfully" });
  } catch (error) {
    console.log("Error in addDonation() in campaign.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const getUserCampaigns = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started getUserCampaigns() in campaign.controller.js file");
  try {
    console.log("Searching for campaigns");

    // Find all campaigns created by the authenticated user
    const userCampaigns = await Campaign.find({
      createdBy: req.user._id,
    }).populate("createdBy", "-password");

    // Check if no campaigns were found
    if (!userCampaigns) {
      console.log("No campaigns found for the query");
      return res.status(404).json({ serverMsg: "No campaigns found" });
    }
    console.log("Campaigns found; sending success response");
    return res
      .status(200)
      .json({ serverMsg: "Campaigns found", userCampaigns });
  } catch (error) {
    console.log("Error in getUserCampaigns() in campaign.controller.js file");
    console.error(error);
    res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const deleteOne = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started deleteOne func in campaign.controller.js file");
  try {
    const { campaignId } = req.params;
    console.log("CampaignID: ", campaignId);
    const result = await Campaign.findByIdAndDelete(campaignId);
    console.log(result);
    if (!result) {
      console.log("Failed to delete document from MongoDB");
      res.json({
        success: false,
        serverMsg: "Failed to delete document from MongoDB",
      });
    } else {
      console.log("Successfully deleted document from MongoDB");
      res.json({
        success: true,
        serverMsg: "Successfully deleted document from MongoDB",
      });
    }
  } catch (error) {
    console.log("Error in deleteOne func in campaign.controller.js file");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const getAllCampaignsInCategory = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log(
    "Started getAllCampaignsInCategory() in campaign.controller.js file"
  );
  try {
    console.log("Getting category from params");
    const category = req.params.category;

    console.log("Searching for: ", category);
    const campaigns = await Campaign.find({ category: category }).populate(
      "createdBy"
    );

    if (!campaigns) {
      console.log("No campaigns found");
      return res.status(404).json({ serverMsg: "No campaigns found" });
    }
    console.log("Campaigns found");
    return res.status(200).json({ campaigns });
  } catch (error) {
    console.log("Error in getAllCampaignsInCategory() in campaign controller");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

const getFeaturedCampaigns = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started getFeaturedCampaigns() in campaign.controller.js file");
  try {
    // Get all unique categories
    const categories = await Campaign.distinct("category");

    // Find one campaign for each category
    const campaigns = await Promise.all(
      categories.map(async (category) => {
        return await Campaign.findOne({ category }).populate(
          "createdBy",
          "-password"
        );
      })
    );

    // Filter out any null results (in case a category has no campaigns)
    const validCampaigns = campaigns.filter((campaign) => campaign !== null);

    if (validCampaigns.length === 0) {
      console.log("No campaigns found");
      return res.status(404).json({ serverMsg: "No campaigns found" });
    }

    console.log("Campaigns found for each category");
    return res.status(200).json({ campaigns: validCampaigns });
  } catch (error) {
    console.log("error in getOneOfEachCategory() in campaign controller");
    console.error(error);
    return res.status(500).json({ serverMsg: "Internal server error" });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignDetails,
  addDonation,
  getUserCampaigns,
  deleteOne,
  getAllCampaignsInCategory,
  getFeaturedCampaigns,
};
