import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { createUser } from "../services/user.service";
import { validationResult } from "express-validator";

export const registerUser: any = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // validating request
    // calling service
    // returning response
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

    const { userWithoutPassword, token } = await createUser(req.body);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: userWithoutPassword,
        token,
    });
};
