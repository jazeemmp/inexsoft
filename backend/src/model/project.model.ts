import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    description :{
      type:String,
    },
    location: {
      type: String,
      required: true,
    },
    projectImage:{
      type:String
    },
    flats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flat" }],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
