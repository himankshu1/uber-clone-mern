import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
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
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        await bcrypt.hash(this.password, 10);
    }
});

//* comparing password
userSchema.methods.comparePassword = async function (password: string) {
    await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model("User", userSchema);
