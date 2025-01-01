import { Router } from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controller";

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

export default router;
