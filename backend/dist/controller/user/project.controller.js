"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookFlat = exports.getAllFlatsOfProject = exports.getAllProjects = void 0;
const project_model_1 = __importDefault(require("../../model/project.model"));
const flat_model_1 = __importDefault(require("../../model/flat.model"));
const booking_model_1 = __importDefault(require("../../model/booking.model"));
//@desc get all projects
//@route GET /api/projects
//@access Public
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aLLProjects = yield project_model_1.default.find();
        res.status(200).json(aLLProjects);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getAllProjects = getAllProjects;
//@desc get all flats of a project
//@route GET /api/flats/:projectId
//@access Public
const getAllFlatsOfProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const allFlats = yield project_model_1.default.findById(projectId).populate("flats");
        res.status(200).json(allFlats);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getAllFlatsOfProject = getAllFlatsOfProject;
//@desc Book a flat
//@route GET /api/book/flat/:id
//@access Private
const bookFlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized - User not found" });
            return;
        }
        const flat = yield flat_model_1.default.findById(id);
        if (!flat) {
            res.status(404).json({ message: "Flat not found" });
            return;
        }
        if (flat.isBooked) {
            res.status(400).json({ message: "Flat is already booked" });
            return;
        }
        flat.isBooked = true;
        flat.bookedBy = userId;
        yield flat.save();
        const newBooking = new booking_model_1.default({
            user: userId,
            flat: flat._id,
            project: flat.projectId,
            totalAmount: flat.flatPrice,
            status: "confirmed",
            paymentStatus: "pending",
        });
        yield newBooking.save();
        res.status(201).json({
            message: "Flat booked successfully",
            booking: newBooking,
        });
    }
    catch (error) {
        console.error("Booking failed:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.bookFlat = bookFlat;
