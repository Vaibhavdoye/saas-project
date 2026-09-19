import mongoose, { Schema, Document } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
role: "user" | "admin" | "guest";
}

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "guest"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;