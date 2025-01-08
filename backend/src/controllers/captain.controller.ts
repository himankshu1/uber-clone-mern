import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createCaptain, signInCaptain } from "../services/captain.service";
import { IAuthRequest } from "../middlewares/auth.middleware";
import { CaptainModel } from "../models/captain.model";
import { BlacklistTokenModel } from "../models/blacklistToken.model";

export const registerCaptain: any = async (req: Request, res: Response) => {
    // validate the request
    const middlewareErrors = validationResult(req);

    if (!middlewareErrors.isEmpty()) {
        console.log(middlewareErrors.array());
        return res
            .status(400)
            .json({ success: false, message: middlewareErrors.array() });
    }

    // call the service
    const response = await createCaptain(req.body);

    if (response.error) {
        return res
            .status(500)
            .json({ success: false, message: response.error });
    }

    // return the response
    return res
        .cookie("token", response.token, { secure: true, httpOnly: true })
        .status(201)
        .json({
            success: true,
            message: "Caption account created successfully",
            data: response.captain,
        });
};

export const loginCaptain: any = async (req: Request, res: Response) => {
    // validate the request
    const middlewareErrors = validationResult(req.body);
    if (!middlewareErrors.isEmpty()) {
        return res
            .status(400)
            .json({ success: false, message: middlewareErrors.array() });
    }

    // call the service
    const response = await signInCaptain(req.body);

    // return the response
    if (response.error) {
        return res
            .status(500)
            .json({ success: false, message: response.error });
    }

    res.cookie("token", response.token, { secure: true, httpOnly: true })
        .status(200)
        .json({
            success: true,
            message: "Logged in successfully!",
            data: response.isCaptainFound,
        });
};

export const getCaptainProfile: any = async (
    req: IAuthRequest,
    res: Response
) => {
    const { userId } = req;

    const captain = await CaptainModel.findById(userId).select("-password");

    res.status(200).json({ success: true, data: captain });
};

export const logoutCaptain = async (req: Request, res: Response) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await BlacklistTokenModel.create({ token });

    res.clearCookie("token");

    res.status(200).json({ success: true, message: "Logged out successfully" });
};
