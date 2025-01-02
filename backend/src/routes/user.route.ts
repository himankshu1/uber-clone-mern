import { Router } from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/user.controller";

const router = Router();

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

export default router;
