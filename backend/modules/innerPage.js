import mongoose from "mongoose";

const innerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
  },
  { timestamps: true }
);

const Inner = mongoose.model("Inner", innerSchema);
export default Inner;