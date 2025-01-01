import { UserModel } from "../models/user.model";

type userData = {
    fullName: string;
    email: string;
    password: string;
};

export const createUser = async (userData: userData) => {
    // creating user
    // generating token
    // returning user
    try {
        const user = await UserModel.create({
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
        });

        const userObject = user.toObject();
        const { password, ...userWithoutPassword } = userObject;

        const token = user.generateAuthToken();

        return { userWithoutPassword, token };
    } catch (error) {
        console.log(`Error while creating user in db: ${error}`);
        throw new Error(`Error while creating user in db: ${error}`);
    }
};
