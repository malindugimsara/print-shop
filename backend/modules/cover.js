import mongoose from "mongoose";

const coverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
      // lowercase: true,
    },
  },
  { timestamps: true }
);

const Cover = mongoose.model("Cover", coverSchema);
export default Cover;
