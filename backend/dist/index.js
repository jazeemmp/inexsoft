"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoConnnect_js_1 = __importDefault(require("./config/mongoConnnect.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const adminRoutes_js_1 = __importDefault(require("./routes/adminRoutes.js"));
dotenv_1.default.config();
(0, mongoConnnect_js_1.default)();
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://your-frontend.vercel.app", // ✅ Add frontend URL deployed on Vercel
    ],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", userRoutes_js_1.default);
app.use("/api/admin", adminRoutes_js_1.default);
exports.default = app; // ✅ Just export the Express app
