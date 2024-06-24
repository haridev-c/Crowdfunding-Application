const mongoose = require("mongoose");

const CampaignSchema = mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  title: String,
  description: String,
  targetAmount: Number,
  deadline: Date,
  amountRaised: Number,
  donors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

const CampaignModel = mongoose.model("Campaigns", CampaignSchema);

module.exports = CampaignModel;
