import { Router } from "express";
import { body } from "express-validator";
import {
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller";
import { authUser } from "../middlewares/auth.middleware";

const router = Router();

//* register route
router.post(
    "/register",
    [
        body("fullName").isLength({ min: 3 }).withMessage("Invalid name"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("password must be at least 6 characters"),
    ],
    registerUser
);

//* login route
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email address"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("please enter a valid password"),
    ],
    loginUser
);

//* get user profile
router.get("/profile", authUser, getUserProfile);

//* logout route
router.get("/logout", authUser, logoutUser);

export default router;
