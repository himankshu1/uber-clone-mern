import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./pages/Landing.tsx";
import UserLogin from "./pages/UserLogin.tsx";
import UserSignup from "./pages/UserSignup.tsx";
import CaptainLogin from "./pages/CaptainLogin.tsx";
import CaptainSignup from "./pages/CaptainSignup.tsx";
import UserContext from "./context/UserContext.tsx";
import Home from "./pages/Home.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UserContext>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/signup" element={<UserSignup />} />
                    <Route path="/captain-login" element={<CaptainLogin />} />
                    <Route path="/captain-signup" element={<CaptainSignup />} />
                </Routes>
            </BrowserRouter>
        </UserContext>
    </StrictMode>
);
