import { Request, Response } from "express";
import projectModel from "../../model/project.model";
import flatModel from "../../model/flat.model";
import bookingModel from "../../model/booking.model";
import { AuthRequest } from "../../utils/jwt";

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

//@desc get all flats of a project
//@route GET /api/flats/:projectId
//@access Public
export const getAllFlatsOfProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const allFlats = await projectModel.findById(projectId).populate("flats");
    res.status(200).json(allFlats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


//@desc Book a flat
//@route GET /api/book/flat/:id
//@access Private

export const bookFlat = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized - User not found" });
      return;
    }

    const flat = await flatModel.findById(id);
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
    await flat.save();

    const newBooking = new bookingModel({
      user: userId,
      flat: flat._id,
      project: flat.projectId,
      totalAmount: flat.flatPrice,
      status: "confirmed",
      paymentStatus: "pending",
    });

    await newBooking.save();

    res.status(201).json(flat);
  } catch (error) {
    console.error("Booking failed:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
