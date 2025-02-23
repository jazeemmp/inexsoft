"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controller/admin/project.controller");
const upload_1 = __importDefault(require("../utils/upload"));
const router = (0, express_1.Router)();
router.post("/new/project", upload_1.default.single("projectImage"), project_controller_1.createNewproject);
router.post("/add/flat", upload_1.default.single("image"), project_controller_1.addNewFlat);
router.get("/flat/:id/user", project_controller_1.getBookedUser);
router.get("/projects", project_controller_1.getAllProjects);
router.get('/all/bookings', project_controller_1.getAllBookings);
exports.default = router;
