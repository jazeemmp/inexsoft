import mongoose from "mongoose";

const flatSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    flatType: {
      type: String,
      required: true,
    },
    flatNumber: {
      type: String,
      required: true,
      trim: true,
    },
    floorNumber: {
      type: Number,
      required: true,
      min: 0,
    },
    carpetArea: {
      type: Number, // in sq. ft.
      required: true,
      min: 0,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    flatPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    furnishingStatus: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
      required: true,
    },
    flatImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Flat", flatSchema);
