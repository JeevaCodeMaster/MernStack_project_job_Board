import express from "express";
import { getUserController, updateUserController } from "../controllers/userController.js";
import { userAuth } from "../middlewares/authMiddleware.js";


//router object for access
const router = express.Router();

//routes
// GET USER DATA || post
router.post("/getUser", userAuth, getUserController);

// UPDATE USER || put
router.put("/update-user", userAuth, updateUserController);

export default router;
