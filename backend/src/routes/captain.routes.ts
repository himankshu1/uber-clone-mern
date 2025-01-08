import { Router } from "express";
import {
    getCaptainProfile,
    loginCaptain,
    logoutCaptain,
    registerCaptain,
} from "../controllers/captain.controller";
import { body } from "express-validator";
import { authCaptain } from "../middlewares/auth.middleware";

const router = Router();

// captain signup
router.post(
    "/register",
    [
        body("fullName")
            .isLength({ min: 3 })
            .withMessage("Fullname must be atleast 3 characters"),

        body("email").isEmail().withMessage("Invalid email address"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("password must be atleast 6 characters"),

        body("vehicle.plate")
            .isLength({ min: 4 })
            .withMessage("Number on plate must be atleast 4 characters long"),

        body("vehicle.capacity")
            .isInt()
            .withMessage("Atleast 1 vacant seat should be available"),

        body("vehicle.vehicleType")
            .isIn(["car", "motorCycle", "auto"])
            .withMessage("Vehicle type can only be a car, motorcycle, or auto"),
    ],
    registerCaptain
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password can't be less than 6 characters"),
    ],
    loginCaptain
);

router.get("/profile", authCaptain, getCaptainProfile);

router.get("/logout", authCaptain, logoutCaptain);

export default router;
