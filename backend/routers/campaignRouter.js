const express = require("express");
const campaignRouter = express.Router();

const authenticate = require("../middlewares/authentication.middleware");
const {
  createCampaign,
  getAllCampaigns,
  getCampaignDetails,
  addDonation,
  getLoggedInUserCampaigns,
  deleteOne,
} = require("../controllers/campaign.controller");

campaignRouter.post("/create", authenticate, createCampaign);
campaignRouter.get("/get-all-campaigns", getAllCampaigns);
campaignRouter.post("/get-campaign-details", getCampaignDetails);
campaignRouter.post("/add-donation", authenticate, addDonation);
campaignRouter.get("/get-my-campaigns", authenticate, getLoggedInUserCampaigns);
campaignRouter.delete("/delete-one", authenticate, deleteOne);

module.exports = campaignRouter;
