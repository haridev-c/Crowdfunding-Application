const express = require("express");
const donationRouter = express.Router();

const {
  createDonation,
  getUserDonation,
} = require("../controllers/donation.controller");
const { authenticate } = require("../controllers/auth.controller");

donationRouter.post("/create", authenticate, createDonation);
donationRouter.get("/user-donations", authenticate, getUserDonation);

module.exports = donationRouter;
