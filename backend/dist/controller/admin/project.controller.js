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
exports.getAllBookings = exports.getAllProjects = exports.getBookedUser = exports.addNewFlat = exports.createNewproject = void 0;
const project_model_1 = __importDefault(require("../../model/project.model"));
const flat_model_1 = __importDefault(require("../../model/flat.model"));
const user_model_1 = __importDefault(require("../../model/user.model"));
const booking_model_1 = __importDefault(require("../../model/booking.model"));
//@desc create a new project
//@route GET /api/admin/new/project
//@access Private
const createNewproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { projectName, contact, description, location } = req.body;
    console.log(projectName, contact, description, location);
    try {
        const newProject = new project_model_1.default({
            projectName,
            contact,
            description,
            location,
            projectImage: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path,
        });
        yield newProject.save();
        res.status(200).json(newProject);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.createNewproject = createNewproject;
//@desc add new flat
//@route GET /api/admin/add/flat
//@access Private
const addNewFlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { flatType, flatPrice, projectId, flatNumber, carpetArea, furnishingStatus, floorNumber, } = req.body;
        const project = yield project_model_1.default.findById(projectId);
        if (!project) {
            res.status(400).json({ message: "Project not found" });
            return;
        }
        const newFlat = new flat_model_1.default({
            projectId,
            flatType,
            flatPrice,
            flatNumber,
            carpetArea,
            furnishingStatus,
            floorNumber,
            flatImage: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path,
        });
        yield newFlat.save();
        project.flats.push(newFlat._id);
        yield project.save();
        res.status(201).json(newFlat);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.addNewFlat = addNewFlat;
//@desc get details of a user who booked a flat
//@route GET /api/flat/:id/user
//@access Private
const getBookedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const flat = yield flat_model_1.default.findById(id);
        if (!flat) {
            res.status(400).json({ message: "Flat not found" });
            return;
        }
        const user = yield user_model_1.default.findById(flat.bookedBy);
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getBookedUser = getBookedUser;
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
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield booking_model_1.default
            .find({})
            .populate("user")
            .populate("flat")
            .populate("project");
        res.status(200).json(allBookings);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getAllBookings = getAllBookings;
