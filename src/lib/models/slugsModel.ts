import mongoose from "mongoose";
import { SlugType } from "@/types/modelsTypes";

const slugSchema = new mongoose.Schema({
type: { type: String, required: true, default: "words" },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Slug = mongoose.models.Slug || mongoose.model("Slug", slugSchema);

export default Slug as mongoose.Model<SlugType>;

