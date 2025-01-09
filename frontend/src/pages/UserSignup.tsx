import { FormEventHandler, useState, useContext } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

type FormDataType = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function UserSignup() {
    const [formData, setFormData] = useState<FormDataType>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);

    const submitHandler: FormEventHandler = async (e) => {
        e.preventDefault();

        console.log(formData);

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/register`,
            formData
        );

        //? user created successfully
        if (response.status === 201) {
            const newUser = response.data;
            setUser(newUser);
        }
        //TODO saving user to context
        //TODO navigate to home page
        console.log(user);

        navigate("/home");
    };
    return (
        <div className="p-7 flex flex-col justify-between h-screen">
            <p className="text-2xl font-semibold text-zinc-700 underline">
                Registering as a User
            </p>

            <form onSubmit={submitHandler}>
                <h3 className="text-xl mb-2">Enter full name</h3>
                <input
                    required
                    type="text"
                    placeholder="full name"
                    className="bg-zinc-100 mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                        })
                    }
                />

                <h3 className="text-xl mb-2">What's your email?</h3>
                <input
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="bg-zinc-100 mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                        })
                    }
                />

                <h3 className="text-xl mb-2">Enter Password</h3>
                <input
                    required
                    type="password"
                    placeholder="*******"
                    className="bg-zinc-100 mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                        })
                    }
                />

                <h3 className="text-xl mb-2">Re-enter password</h3>
                <input
                    required
                    type="password"
                    placeholder="*******"
                    className="bg-zinc-100 mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                        })
                    }
                />

                <button className="bg-black text-white px-6 py-4 w-full font-medium mt-2 mb-4">
                    Create Account
                </button>

                <p className="text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600">
                        proceed to login
                    </Link>
                </p>
            </form>

            <div>
                <Link
                    to="/captain-login"
                    className="bg-[#FCDF29] px-6 py-4 w-full font-medium my-5 flex items-center justify-center"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
}
