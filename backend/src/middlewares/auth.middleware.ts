import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BlacklistTokenModel } from "../models/blacklistToken.model";

export interface IAuthRequest extends Request {
    userId?: string;
}

export const authUser: any = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    const isTokenBlacklisted = await BlacklistTokenModel.findOne({
        token: token,
    });

    if (!token || isTokenBlacklisted) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised request. Please login again",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.userId = (decoded as { _id: string })._id;
        return next();
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Couldn't validate the user" });
    }
};
