"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const flatSchema = new mongoose_1.default.Schema({
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Flat", flatSchema);
