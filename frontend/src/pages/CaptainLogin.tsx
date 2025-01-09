import { FormEvent, useState } from "react";
import { FormDataType } from "./UserLogin";
import { Link } from "react-router";

export default function CaptainLogin() {
    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        password: "",
    });

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        console.log(formData);
    };
    return (
        <div className="p-7 flex flex-col justify-between h-screen">
            <p className="text-2xl font-semibold text-zinc-700 underline">
                Continue as Captain
            </p>
            <form onSubmit={submitHandler}>
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

                <button className="bg-[#FCDF29] px-6 py-4 w-full font-medium mt-2 mb-4">
                    Login
                </button>

                <p className="text-center">
                    Don't have an account?{" "}
                    <Link to="/captain-signup" className="text-blue-600">
                        Create new account
                    </Link>
                </p>
            </form>

            <div>
                <Link
                    to="/login"
                    className="bg-[#4284f3] text-white px-6 py-4 w-full font-medium my-5 flex items-center justify-center"
                >
                    Sign in as user
                </Link>
            </div>
        </div>
    );
}
