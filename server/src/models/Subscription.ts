import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  user: mongoose.Types.ObjectId;
plan: "free" | "pro" | "enterprise";
  status: "active" | "inactive";
  startDate: Date;
  endDate: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
enum: ["free", "pro", "enterprise"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);

export default Subscription;