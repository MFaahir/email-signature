import mongoose from "mongoose";

const SignatureSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    templateId: {
      type: String,
      required: true,
    },
    signatureData: {
      name: String,
      title: String,
      company: String,
      website: String,
      email: String,
      phone: String,
      linkedin: String,
      twitter: String,
      github: String,
      logo: String,
      accentColor: String,
    },
    trackingEnabled: {
      type: Boolean,
      default: false,
    },
    trackingId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique tracking ID before saving
SignatureSchema.pre("save", function (next) {
  if (this.trackingEnabled && !this.trackingId) {
    this.trackingId = `sig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

export default mongoose.models.Signature || mongoose.model("Signature", SignatureSchema);
