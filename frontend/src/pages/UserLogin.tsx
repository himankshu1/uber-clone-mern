import { Link } from "react-router";

export default function UserLogin() {
    return (
        <div className="p-7 flex flex-col justify-between h-screen">
            <form>
                <h3 className="text-xl mb-2">What's your email?</h3>
                <input
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="bg-zinc-100 mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
                />

                <h3 className="text-xl mb-2">Enter Password</h3>
                <input
                    required
                    type="password"
                    placeholder="*******"
                    className="bg-zinc-100 mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
                />

                <button className="bg-black text-white px-6 py-4 w-full font-medium mt-2 mb-4">
                    Login
                </button>

                <p className="text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600">
                        Create new account
                    </Link>
                </p>
            </form>

            <div>
                <button className="bg-[#FCDF29] px-6 py-4 w-full font-medium mt-2">
                    Sign in as Captain
                </button>
            </div>
        </div>
    );
}
