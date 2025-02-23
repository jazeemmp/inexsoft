"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    projectName: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    projectImage: {
        type: String
    },
    flats: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Flat" }],
}, { timestamps: true });
exports.default = mongoose_1.default.model("Project", projectSchema);
