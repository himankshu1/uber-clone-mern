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

export const signInUser = async (userData: Partial<userData>) => {
    // find & verify the user's email and password
    // generate & return a token

    const { email, password } = userData;

    try {
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            return false;
        }

        const isPasswordMatch = await user.comparePassword(password as string);
        if (!isPasswordMatch) {
            return false;
        }

        const token = user.generateAuthToken();

        return { user, token };
    } catch (error) {
        console.log(`Error while logging in the user ${error}`);
        throw new Error(`Error while logging in the user ${error}`);
    }
};
