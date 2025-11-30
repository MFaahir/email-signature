import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "premium", "lifetime"],
      default: "free",
    },
    stripeCustomerId: {
      type: String,
      sparse: true,
    },
    stripeSubscriptionId: {
      type: String,
      sparse: true,
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "canceled", "past_due", "lifetime"],
    },
    signatureLimit: {
      type: Number,
      default: 3, // 3 for free, unlimited for premium
    },
    // Legacy field for backward compatibility
    hasPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
