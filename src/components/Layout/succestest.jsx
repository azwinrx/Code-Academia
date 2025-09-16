import React, { useEffect, useState } from "react";
import { useAuth } from "../../helper/authUtils";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../helper/toastUtil";

const Success = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email,
        id: user.id,
        name: user.user_metadata?.name || "User",
      });

      // Show welcome toast
      showToast(`Welcome, ${user.user_metadata?.name || "User"}!`, "success");
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    showToast("Logged out successfully", "info");
    navigate("/login");
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
        <h2 className="text-center text-2xl font-semibold mb-6">SUCCESS</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-4">User Information</h3>
          <div className="bg-slate-700/30 p-4 rounded-md">
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {userData.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-semibold">ID:</span> {userData.id}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition duration-300 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Success;
