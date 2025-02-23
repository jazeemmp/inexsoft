"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user/user.controller");
const project_controller_1 = require("../controller/user/project.controller");
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
//auth routes
router.post('/new/user', user_controller_1.createNewUser);
router.post('/user/login', user_controller_1.loginUser);
//flat routes
router.get('/projects', project_controller_1.getAllProjects);
router.get('/flats/:projectId', project_controller_1.getAllFlatsOfProject);
router.post('/book/flat/:id', jwt_1.verifyToken, project_controller_1.bookFlat);
exports.default = router;
