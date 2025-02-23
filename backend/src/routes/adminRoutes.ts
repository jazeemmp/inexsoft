import { Router } from "express";
import {
  addNewFlat,
  createNewproject,
  getAllBookings,
  getAllProjects,
  getBookedUser,
} from "../controller/admin/project.controller";
import upload from "../utils/upload";


const router = Router();

router.post("/new/project",upload.single("projectImage"), createNewproject);
router.post("/add/flat",upload.single("image"), addNewFlat);
router.get("/flat/:id/user", getBookedUser);
router.get("/projects", getAllProjects);
router.get('/all/bookings',getAllBookings)

export default router;
