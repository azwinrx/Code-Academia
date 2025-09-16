import React, { useState, useEffect } from "react";
import { signInUser } from "../../helper/supabaseAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { showToast } from "../../helper/toastUtil";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user just registered
    const queryParams = new URLSearchParams(location.search);
    const registered = queryParams.get("registered");

    if (registered === "true") {
      showToast("Account created successfully! You can now log in.", "success");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await signInUser(email, password);

    if (error) {
      setError(error.message);
      showToast(error.message, "error");
      setLoading(false);
      return;
    }

    setLoading(false);
    showToast("Login successful!", "success");
    console.log("Login successful:", data);
    navigate("/beranda");
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full"
      style={{
        backgroundColor: "#0c0a18",
        backgroundImage: `
      radial-gradient(circle at 80% 70%, rgba(47, 72, 133, 0.3), transparent 40%),
      radial-gradient(circle at 20% 20%, rgba(68, 47, 133, 0.4), transparent 40%)
    `,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}>
      <div className="m-10 w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg text-white">
        <h2 className="text-center text-2xl font-semibold mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-white bg-slate-700/30 border border-slate-600/30 rounded-md focus:outline-none focus:border-slate-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-white bg-slate-700/30 border border-slate-600/30 rounded-md focus:outline-none focus:border-slate-500"
            />
          </div>

          <div className="text-right mb-4">
            <a
              href="reset-password"
              className="text-sm text-[#669DBD] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition duration-300 mb-4 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          <div className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#669DBD] hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
