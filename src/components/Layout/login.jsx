import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#669DBD]">
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
            className="w-full py-2 px-4 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition duration-300 mb-4"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <a href="signup" className="text-[#669DBD] hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
