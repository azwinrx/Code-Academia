import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../helper/authUtils.js";
import { showToast } from "../../helper/toastUtil.js";

export default function Sidebar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const menu = [
    { to: "/beranda", label: "🏠 Beranda" },
    { to: "/course", label: "📘 Materi" },
    { to: "/riwayat", label: "⏱ Riwayat" },
    { to: "/bantuan", label: "💬 Bantuan" },
  ];

  const handleLogout = async () => {
    await logout();
    showToast("You have been logged out.", "info");
    navigate("/login");
  };

  return (
    <aside className="w-60 h-screen bg-[#132238] text-white flex flex-col p-4 fixed z-20">
      <h1 className="text-xl font-bold mb-8">LogicBase</h1>
      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200
              ${isActive ? "bg-white text-[#132238] font-semibold" : "hover:text-gray-300"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-left transition-colors duration-200 hover:bg-red-600"
        >
          <span>📤</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
