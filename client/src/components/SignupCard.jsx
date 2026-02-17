import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

function SignupCard() {

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false); 

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/register",
                { name: form.name, email: form.email, password: form.password }
            );

            console.dir(response);

            if (response.data.success) {
                setSuccess(response.data.message || "Account created successfully!");
                localStorage.setItem('token', response.data.accessToken);
                navigate('/dashboard');
            } else {
                setError(response.data.msg || "Signup failed");
            }

        } catch (err) {

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
        } finally {
            setLoading(false);
        }
    };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign Up
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            autoComplete="name"
            onChange={(e) => setForm({...form, name: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Signing up..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupCard;
