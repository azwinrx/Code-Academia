import React, { useState } from "react";
import { resetPassword } from "../../helper/supabaseAuth";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../helper/toastUtil";

const Reset_Password = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Sending reset password email to:", email);
    console.log("Current origin:", window.location.origin);
    console.log(
      "Expected redirect URL:",
      `${window.location.origin}/reset-password-confirm`
    );

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
      showToast(error.message, "error");
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
    showToast("Password reset instructions sent to your email!", "success");

    // We don't navigate immediately to allow the user to see the success message
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full"
      style={{
        backgroundColor: "#0c0a18",
        backgroundImage: `
      radial-gradient(circle at 80% 70%, rgba(47, 72, 133, 0.3), transparent 40%),
      radial-gradient(circle at 20% 20%, rgba(68, 47, 133, 0.4), transparent 40%)
    `,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="m-10 w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg text-white">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Reset Password
        </h2>

        {success ? (
          <div className="text-center">
            <div className="text-green-500 mb-4">
              Password reset link has been sent to your email. You will be
              redirected to the login page shortly.
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 px-4 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition duration-300"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-2"
              >
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
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>

            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}

            <div className="text-center text-sm text-gray-300">
              Remember your password?{" "}
              <a href="login" className="text-[#669DBD] hover:underline">
                Sign In
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reset_Password;
