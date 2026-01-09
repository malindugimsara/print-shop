import mongoose from "mongoose";

const otherCoverSchema = new mongoose.Schema(
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

const OtherCover = mongoose.model("OtherCover", otherCoverSchema);
export default OtherCover;