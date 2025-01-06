import { CaptainModel } from "../models/captain.model";

type CaptainData = {
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
};

export const createCaptain = async (data: CaptainData) => {
    try {
        const {
            fullName,
            email,
            password,
            status,
            vehicle: { plate, capacity, vehicleType },
            socketId,
        } = data;

        //* checking if the captain is already created
        const isCaptainFound = await CaptainModel.findOne({ email });
        if (isCaptainFound) {
            return { error: "User already exists" };
        }

        //* creating the captain
        const captain = await CaptainModel.create({
            fullName,
            email,
            password,
            status,
            vehicle: { plate, capacity, vehicleType },
        });

        //* generating a token
        const token = captain.generateAuthToken();

        return { captain, token };
    } catch (error) {
        return { error };
    }
};
