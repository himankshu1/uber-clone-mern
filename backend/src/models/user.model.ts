import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";

interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    socketId: string;
    generateAuthToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
            // minLength is not required as jwt hashed string will be saved
        },
        socketId: {
            type: String,
        },
    },
    { timestamps: true }
);

//* generating auth token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "15m" }
    );

    return token;
};

//* hashing password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//* comparing password
userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model<IUser>("User", userSchema);
