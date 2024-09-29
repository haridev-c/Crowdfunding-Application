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
  getAllCampaignsInCategory,
  getFeaturedCampaigns,
} = require("../controllers/campaign.controller");

campaignRouter.post("/create", authenticate, createCampaign);
campaignRouter.get("/get-all-campaigns", getAllCampaigns);
campaignRouter.get("/featured-campaigns", getFeaturedCampaigns);
campaignRouter.post("/get-campaign-details", getCampaignDetails);
campaignRouter.post("/add-donation", authenticate, addDonation);
campaignRouter.get("/get-my-campaigns", authenticate, getLoggedInUserCampaigns);
campaignRouter.delete("/delete-one", authenticate, deleteOne);
campaignRouter.get("/category/:category", getAllCampaignsInCategory);

module.exports = campaignRouter;
