import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtetedRoute from "./components/ProtectedRoute";


function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage /> } />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App
