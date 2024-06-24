const express = require("express");
const campaignRouter = express.Router();

const {
  createCampaign,
  getAllCampaigns,
} = require("../controllers/campaign.controller");

campaignRouter.post("/create", createCampaign);
campaignRouter.get("/get-all-campaigns", getAllCampaigns);

module.exports = campaignRouter;
