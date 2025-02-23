import { Router } from "express";
import { createNewUser, loginUser,} from "../controller/user/user.controller";
import { bookFlat, getAllFlatsOfProject, getAllProjects } from "../controller/user/project.controller";
import { verifyToken } from "../utils/jwt";



const router = Router();
//auth routes
router.post('/new/user',createNewUser)
router.post('/user/login',loginUser)

//flat routes
router.get('/projects',getAllProjects)
router.get('/flats/:projectId',getAllFlatsOfProject)
router.post('/book/flat/:id',verifyToken,bookFlat)

export default router;