import { Link } from "react-router";

export default function Landing() {
    return (
        <div>
            <div className="h-screen flex justify-between flex-col w-full">
                <img
                    src="https://imgs.search.brave.com/JJ4exao_nANfwFI0Qt58izzaNwbHirENG5S6KgsriSw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29kb3QuZ292L3By/b2dyYW1zL2V4cHJl/c3NsYW5lcy9hc3Nl/dHMvaG92My91YmVy/LWxvZ28tYmxhY2sv/QEBpbWFnZXMvaW1h/Z2U"
                    alt=""
                />
                <div className="bg-white text-center">
                    <h2 className="mb-6 text-3xl font-semibold opacity-70">
                        Get started with Uber
                    </h2>
                    <Link
                        className="bg-black text-white px-6 py-4 w-11/12 font-medium mb-8 inline-block"
                        to="/login"
                    >
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
}
