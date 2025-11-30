import mongoose from "mongoose";

const AnalyticsEventSchema = new mongoose.Schema(
  {
    signatureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signature",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    eventType: {
      type: String,
      enum: ["open", "click"],
      required: true,
      index: true,
    },
    linkType: {
      type: String,
      enum: ["email", "phone", "website", "linkedin", "twitter", "github"],
      required: false,
    },
    uniqueId: {
      type: String,
      required: true,
      index: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    device: {
      type: String,
      enum: ["desktop", "mobile", "tablet", "unknown"],
    },
    browser: {
      type: String,
    },
    os: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient queries
AnalyticsEventSchema.index({ signatureId: 1, createdAt: -1 });
AnalyticsEventSchema.index({ userId: 1, createdAt: -1 });
AnalyticsEventSchema.index({ signatureId: 1, eventType: 1, createdAt: -1 });

export default mongoose.models.AnalyticsEvent || mongoose.model("AnalyticsEvent", AnalyticsEventSchema);
