import { Request, Response } from "express";
import projectModel from "../../model/project.model";
import flatModel from "../../model/flat.model";
import userModel from "../../model/user.model";
import bookingModel from "../../model/booking.model";

//@desc create a new project
//@route GET /api/admin/new/project
//@access Private
export const createNewproject = async (req: Request, res: Response) => {
  const { projectName, contact, description, location } = req.body;
  console.log(
    projectName,contact,description, location
  );
  try {
    const newProject = new projectModel({
      projectName,
      contact,
      description,
      location,
      projectImage: req.file?.path,
    });
    await newProject.save();
    res.status(200).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//@desc add new flat
//@route GET /api/admin/add/flat
//@access Private
export const addNewFlat = async (req: Request, res: Response) => {
  try {
    const {
      flatType,
      flatPrice,
      projectId,
      flatNumber,
      carpetArea,
      furnishingStatus,
      floorNumber,
    } = req.body;
    const project = await projectModel.findById(projectId);
    if (!project) {
      res.status(400).json({ message: "Project not found" });
      return;
    }
    const newFlat = new flatModel({
      projectId,
      flatType,
      flatPrice,
      flatNumber,
      carpetArea,
      furnishingStatus,
      floorNumber,
      flatImage: req.file?.path,
    });
    await newFlat.save();
    project.flats.push(newFlat._id);
    await project.save();
    res.status(201).json(newFlat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//@desc get details of a user who booked a flat
//@route GET /api/flat/:id/user
//@access Private
export const getBookedUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const flat = await flatModel.findById(id);
    if (!flat) {
      res.status(400).json({ message: "Flat not found" });
      return;
    }
    const user = await userModel.findById(flat.bookedBy);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//@desc get all projects
//@route GET /api/projects
//@access Public
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const aLLProjects = await projectModel.find();
    res.status(200).json(aLLProjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


export const getAllBookings = async(req:Request,res:Response) =>{
  try {
    const allBookings = await bookingModel
      .find({})
      .populate("user")
      .populate("flat")
      .populate("project");
      res.status(200).json(allBookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}