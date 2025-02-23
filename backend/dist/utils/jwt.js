"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET_KEY;
// Function to generate a JWT token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, secretKey, {
        expiresIn: "10d",
    });
};
exports.generateToken = generateToken;
// ✅ Fix return type to `void`
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return; // 🚀 Ensure function stops execution
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Forbidden: Invalid token" });
        return; // 🚀 Stop execution here too
    }
};
exports.verifyToken = verifyToken;
