import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoConnect from "./config/mongoConnnect.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
mongoConnect();

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

export default app; // ✅ Just export the Express app
