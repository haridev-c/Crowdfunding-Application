const express = require("express");
const donationRouter = express.Router();

const {
  createDonation,
  getUserDonation,
} = require("../controllers/donation.controller");
const authenticateUser = require("../middlewares/authentication.middleware");

donationRouter.post("/create-donation", authenticateUser, createDonation);
donationRouter.get("/get-my-donations", authenticateUser, getUserDonation);

module.exports = donationRouter;
