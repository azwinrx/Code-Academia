import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helper/authUtils.js";
import { showToast } from "../../helper/toastUtil.js";
import Swal from "sweetalert2";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      customClass: {
        popup: "bg-white text-black",
        confirmButton: "bg-[#132238] text-white px-4 py-2 rounded mr-2",
        cancelButton: "bg-gray-400 text-white px-4 py-2 rounded",
        title: "text-black",
        content: "text-black",
      },
      buttonsStyling: false,
    });
    if (result.isConfirmed) {
      await logout();
      showToast("You have been logged out.", "info");
      setShowDropdown(false);
      navigate("/login");
    }
  };

  // Format tanggal bergabung
  const formatJoinDate = (dateString) => {
    if (!dateString) return "Tidak diketahui";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <header className="w-full bg-[#132238] text-white p-4 flex items-center justify-between fixed z-10">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <img
          src="/Icon Kobi (maskot LogicBase)/KobiMengajak.svg"
          className="h-24 absolute right-52"
        />
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-md text-black"
        />
        <div className="relative">
          <div
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleProfileClick}
          >
            <img
              src="/Icon Kobi (maskot LogicBase)/kobiSenang.svg"
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover"
            />
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded shadow-lg z-20 p-4">
              <div
                className=" absolute top-1 right-30 rounded-full text-gray-500 hover:text-gray-800 text-2xl cursor-pointer"
                onClick={() => setShowDropdown(false)}
                aria-label="Close"
              >
                &times;
              </div>
              <div className="flex items-center gap-3 mb-4 border-b pb-2 mt-2">
                <img
                  src="/Icon Kobi (maskot LogicBase)/kobiSenang.svg"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <div className="font-semibold text-lg">
                    {user?.user_metadata?.name ||
                      user?.email?.split("@")[0] ||
                      "Nama Pengguna"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {user?.email || "user@email.com"}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Bergabung sejak: {formatJoinDate(user?.created_at)}
                  </div>
                </div>
              </div>
              <button
                className="w-full px-4 py-2 bg-[#132238] text-white rounded hover:bg-slate-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
