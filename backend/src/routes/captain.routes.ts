import { Router } from "express";
import { registerCaptain } from "../controllers/captain.controller";
import { body } from "express-validator";

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

export default router;
