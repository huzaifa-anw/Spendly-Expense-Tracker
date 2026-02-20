import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function LoginCard({setName}) {

    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false); 

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!form.email) {
            setError('Email is required');
            return;
        }

        if(!form.password) {
            setError('Password is required');
            return;
        }

        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/login",
                { email: form.email, password: form.password }
            );

            if(response.data.success) {
                setSuccess(true);
                setLoading(false);
                localStorage.setItem('token', response.data.accessToken);
                setName(response.data.user.name);
                navigate('/dashboard');
            }
            else{
                setSuccess(false);
                setLoading(false);
                setError(response.data.msg || 'Signup Failed')
            }

        } catch (err) {
            setLoading(false);
            if (err.response) {
                const data = err.response.data;

                if (data.errors) {
                    const firstError = data.errors[0];
                    setError(firstError?.message || data.message || "Validation failed");
                } else {
                    setError(data.msg || data.message || "Server error");
                }

            } else if (err.request) {
                setError("Network error. Please try again.");
            } else {
                setError(err.message || "Something went wrong");
            }
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Log In
        </h2>

        {error && <p className="text-red-600 mt-4 mb-2">{error}</p>}
        {success && <p className="text-green-500 mt-4 mb-2">{success}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            onChange={e => setForm(prev => ({...prev, email: e.target.value}))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={e => setForm(prev => ({...prev, password: e.target.value}))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginCard;