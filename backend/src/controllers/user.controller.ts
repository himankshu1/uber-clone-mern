import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import {
    createUser,
    getUserProfileById,
    signInUser,
} from "../services/user.service";
import { validationResult } from "express-validator";
import { IAuthRequest } from "../middlewares/auth.middleware";
import { BlacklistTokenModel } from "../models/blacklistToken.model";

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

//* user profile
export const getUserProfile: any = async (req: IAuthRequest, res: Response) => {
    // validate request - done at middleware
    // call service
    // return response

    const foundUser = await getUserProfileById(req.userId as string);

    return res
        .status(200)
        .json({ success: true, message: "User found!", data: foundUser });
};

//* logout user
export const logoutUser = async (req: Request, res: Response) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await BlacklistTokenModel.create({ token });

    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};
