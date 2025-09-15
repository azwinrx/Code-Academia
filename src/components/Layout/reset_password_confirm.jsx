import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../helper/supabaseClient";
import { showToast } from "../../helper/toastUtil";

const ResetPasswordConfirm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Check for the hash fragment from the URL and handle session
  useEffect(() => {
    const handleAuthSession = async () => {
      // Check URL hash for tokens (from email link)
      const hash = window.location.hash;
      console.log("URL hash:", hash);
      console.log("Full URL:", window.location.href);

      if (hash && hash.includes("access_token")) {
        // Extract session from URL hash
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        console.log("Access token found:", !!accessToken);
        console.log("Refresh token found:", !!refreshToken);

        if (accessToken && refreshToken) {
          try {
            // Set session from URL parameters
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) {
              console.error("Session error:", error);
              setError("Invalid or expired reset link. Please try again.");
              showToast(
                "Invalid or expired reset link. Please try again.",
                "error"
              );
            } else {
              console.log("Session set successfully:", data);
              // Clear the URL hash for security
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname
              );
            }
          } catch (err) {
            console.error("Error setting session:", err);
            setError("Invalid or expired reset link. Please try again.");
            showToast(
              "Invalid or expired reset link. Please try again.",
              "error"
            );
          }
        } else {
          setError("Invalid reset link format. Please try again.");
          showToast("Invalid reset link format. Please try again.", "error");
        }
      } else {
        // No hash parameters found
        console.log("No hash parameters found in URL");
        setError("Invalid or expired reset link. Please try again.");
        showToast("Invalid or expired reset link. Please try again.", "error");
      }
    };

    handleAuthSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      showToast("Passwords do not match", "error");
      return;
    }

    // Password strength validation
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      showToast("Password must be at least 6 characters long", "error");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      // Sign out the user to force them to login with new password
      await supabase.auth.signOut();

      setSuccess(true);
      showToast(
        "Password has been reset successfully! Please login with your new password.",
        "success"
      );

      // Redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.message);
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
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
          Reset Your Password
        </h2>

        {success ? (
          <div className="text-center">
            <div className="text-green-500 mb-4">
              Your password has been reset successfully! Please login with your
              new password.
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 px-4 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition duration-300"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm text-gray-300 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-white bg-slate-700/30 border border-slate-600/30 rounded-md focus:outline-none focus:border-slate-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-300 mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-white bg-slate-700/30 border border-slate-600/30 rounded-md focus:outline-none focus:border-slate-500"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition duration-300 mb-4"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="text-center text-sm text-gray-300">
              Remember your password?{" "}
              <a href="/login" className="text-[#669DBD] hover:underline">
                Sign In
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
