import React, { useState } from "react";

const Reset_Password = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication
    console.log("Login attempt:", { email });
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
              className="mb-3 w-full px-3 py-2 text-white bg-slate-700/30 border border-slate-600/30 rounded-md focus:outline-none focus:border-slate-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition duration-300 mb-4"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-300">
            Remember your password?{" "}
            <a href="signup" className="text-[#669DBD] hover:underline">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset_Password;
