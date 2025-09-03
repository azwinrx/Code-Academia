import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { to: "/beranda", label: "🏠 Beranda" },
    { to: "/course", label: "📘 Materi" },
    { to: "/riwayat", label: "⏱ Riwayat" },
    { to: "/bantuan", label: "💬 Bantuan" },
  ];

  return (
    <aside className="w-60 h-screen bg-[#132238] text-white flex flex-col p-4">
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
    </aside>
  );
}
