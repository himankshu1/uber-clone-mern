import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { createUser, signInUser } from "../services/user.service";
import { validationResult } from "express-validator";

//* registering the user
export const registerUser: any = async (req: Request, res: Response) => {
    // validating request
    const middlewareErrors = validationResult(req);

    if (!req.body.fullName || !req.body.email || !req.body.password) {
        res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    if (!middlewareErrors.isEmpty()) {
        return res
            .status(400)
            .json({ success: false, message: middlewareErrors.array() });
    }

    // calling service
    const { userWithoutPassword, token } = await createUser(req.body);

    // returning response
    res.cookie("token", token, { secure: true, httpOnly: true })
        .status(201)
        .json({
            success: true,
            message: "User created successfully",
            data: userWithoutPassword,
            token,
        });
};

//* logging in the user
export const loginUser: any = async (req: Request, res: Response) => {
    // validate the request
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const middlewareErrors = validationResult(req);
    if (!middlewareErrors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: middlewareErrors.array(),
        });
    }

    // call the service
    const isValidUser = await signInUser(req.body);

    // return the response
    if (!isValidUser) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid email or password" });
    } else {
        return res
            .cookie("token", isValidUser.token, {
                secure: true,
                httpOnly: true,
            })
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
                data: {},
            });
    }
};
