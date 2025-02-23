import e, { Request, Response } from "express";
import userModel from "../../model/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";

//@desc Create a new user
//@route GET /api/user/new
//@access Public
export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    const isExisting = await userModel.findOne({ $or: [{ email }, { phone }] });

    if (isExisting) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//@desc login a user
//@route GET /api/user/login
//@access Public
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }
    const token = await generateToken(user._id);
    res.status(200).json({ message: "Login Success", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
