import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  clerkId: string;
  stripePaymentId?: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    clerkId: {
      type: String,
      required: true,
      index: true,
    },
    stripePaymentId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
    },
    amount: {
      type: Number,
      default: 500, // $5.00 in cents
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Prevent model recompilation in development
const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
