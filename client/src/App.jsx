import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useState } from "react";

function App() {

    const [name, setName] = useState('');

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage setName={setName} /> } />
                    <Route path="/dashboard" element={<DashboardPage name={name}/>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App
