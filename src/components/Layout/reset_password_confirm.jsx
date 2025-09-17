import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../helper/supabaseClient";
import { showToast } from "../../helper/toastUtil";

const pastelColors = [
  "#A2D1B0",
  "#77B1E3",
  "#F1AD8D",
  "#A9A6E5",
  "#A2CFD1",
  "#E37777",
];

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
        backgroundColor: "#5296A5",
        backgroundImage: `
          radial-gradient(circle at 20% 30%, ${pastelColors[0]}33, transparent 40%),
          radial-gradient(circle at 80% 70%, ${pastelColors[3]}33, transparent 40%),
          radial-gradient(circle at 40% 90%, ${pastelColors[1]}33, transparent 40%)
        `,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="m-10 w-full max-w-md p-8 rounded-lg shadow-lg text-slate-800"
        style={{ backgroundColor: pastelColors[4] }}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <img
              src="/Icon Kobi (maskot LogicBase)/kobiSenang.svg"
              alt="Kobi"
              className="w-12 h-12"
            />
            <h2 className="text-2xl font-semibold">Password Baru</h2>
          </div>
          <p className="text-slate-700">
            Masukkan password baru kamu untuk mengganti yang lama 🔐
          </p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="text-green-700 mb-4 bg-green-100 p-4 rounded-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">✅</span>
                <span className="font-semibold">Berhasil!</span>
              </div>
              Password kamu sudah berhasil diganti! Sekarang kamu bisa login
              dengan password baru 🎉
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 px-4 text-slate-800 rounded-md hover:shadow-lg transition duration-300 focus:outline-none font-semibold"
              style={{ backgroundColor: pastelColors[0] }}
            >
              Pergi ke Login 🏠
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm text-slate-700 mb-2 font-semibold"
              >
                Password Baru 🔑
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-slate-800 bg-white/70 border-2 border-white/50 rounded-md focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-slate-700 mb-2 font-semibold"
              >
                Konfirmasi Password Baru ✅
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-slate-800 bg-white/70 border-2 border-white/50 rounded-md focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm mb-4 text-center bg-red-50 p-2 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 text-slate-800 rounded-md hover:shadow-lg transition duration-300 mb-4 focus:outline-none font-semibold"
              style={{ backgroundColor: pastelColors[2] }}
              disabled={loading}
            >
              {loading ? "Sedang Reset..." : "Reset Password 🚀"}
            </button>

            <div className="text-center text-sm text-slate-700">
              Ingat passwordnya?{" "}
              <a
                href="/login"
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
              >
                Masuk Sekarang! 😊
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
