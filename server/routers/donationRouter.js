const express = require("express");
const donationRouter = express.Router();

const {
  createDonation,
  getUserDonation,
} = require("../controllers/donation.controller");
const authenticateUser = require("../middlewares/authentication.middleware");

donationRouter.post("/create", authenticateUser, createDonation);
donationRouter.get("/user-donations", authenticateUser, getUserDonation);

module.exports = donationRouter;
