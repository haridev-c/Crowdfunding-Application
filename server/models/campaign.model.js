const mongoose = require("mongoose");

const CampaignSchema = mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  title: String,
  category: String,
  description: String,
  targetAmount: Number,
  deadline: Date,
  amountRaised: { type: Number, default: 0 },
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donations" }],
});

const CampaignModel = mongoose.model("Campaigns", CampaignSchema);

module.exports = CampaignModel;
