import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
        console.log("Successfully connected to database");
    } catch (error) {
        console.log(`Error while connecting to mongodb ${error}`);
        process.exit(1);
    }
};
