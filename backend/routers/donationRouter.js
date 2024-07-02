const express = require("express");
const donationRouter = express.Router();

const { createDonation } = require("../controllers/donation.controller");
const authenticateUser = require("../middlewares/authentication.middleware");

donationRouter.post("/create-donation", authenticateUser, createDonation);

module.exports = donationRouter;
