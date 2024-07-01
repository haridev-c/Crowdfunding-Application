const express = require("express");
const campaignRouter = express.Router();

const {
  createCampaign,
  getAllCampaigns,
  getCampaignDetails,
} = require("../controllers/campaign.controller");

campaignRouter.post("/create", createCampaign);
campaignRouter.get("/get-all-campaigns", getAllCampaigns);
campaignRouter.post("/get-campaign-details", getCampaignDetails);

module.exports = campaignRouter;
