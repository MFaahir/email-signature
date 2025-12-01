import mongoose from "mongoose";

const TrackingCampaignSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for efficient queries
TrackingCampaignSchema.index({ userId: 1, createdAt: -1 });

const TrackingCampaign =
  mongoose.models.TrackingCampaign ||
  mongoose.model("TrackingCampaign", TrackingCampaignSchema);

export default TrackingCampaign;
