import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;