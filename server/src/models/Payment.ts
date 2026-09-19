import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  subscription: mongoose.Types.ObjectId;
  amount: number;
  status: "pending" | "success" | "failed";
  paymentMethod: "simulated";
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["simulated"],
      default: "simulated",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;