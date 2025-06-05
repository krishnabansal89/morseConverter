import mongoose from "mongoose";
import { PageDataType } from "@/types/modelsTypes";

const pageDataSchema = new mongoose.Schema({
    type: { type: String, required: true },
    incrementalSize: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },
    currentPosition: { type: Number, required: true },
    totalPages: { type: Number, required: true }
}, {
    timestamps: true
});

const PageData = mongoose.models.PageData || mongoose.model("PageData", pageDataSchema);
export default PageData as mongoose.Model<PageDataType>;

