import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Document } from "mongoose";

interface ICaptainDocument extends Document {
    fullName: string;
    email: string;
    password: string;
    socketId?: string;
    status: "active" | "inactive";
    vehicle: {
        plate: string;
        capacity: number;
        vehicleType: "car" | "motorCycle" | "auto";
    };
    location?: {
        latitude?: number;
        longitude?: number;
    };
    generateAuthToken: () => string; // Add your custom method here
    comparePassword: (password: string) => Promise<boolean>;
}

const captainSchema = new mongoose.Schema<ICaptainDocument>(
    {
        fullName: {
            type: String,
            required: true,
            minLength: [3, "Name must be atleast 3 characters long"],
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
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
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        vehicle: {
            plate: {
                type: String,
                required: true,
                minLength: [
                    4,
                    "Number on plate must be atleast 4 characters long",
                ],
            },
            capacity: {
                type: Number,
                required: true,
                min: [1, "Atleast 1 vacant seat should be available"],
            },
            vehicleType: {
                type: String,
                required: true,
                enum: ["car", "motorCycle", "auto"],
            },
        },
        location: {
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
        },
    },
    { timestamps: true }
);

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "24h" }
    );

    return token;
};

//* hashing password before save
captainSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//* comparing password
captainSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

export const CaptainModel = mongoose.model<ICaptainDocument>(
    "Captain",
    captainSchema
);
