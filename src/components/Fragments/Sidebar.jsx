import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const menu = [
    { to: "/beranda", label: "Beranda", img: "/beranda.png" },
    { to: "/materi", label: "Materi", img: "/materi.png" },
    { to: "/riwayat", label: "Riwayat", img: "/riwayat.png" },
    { to: "/forum", label: "Forum", img: "/forum.png" },
  ];

 

  return (
    <aside className="w-60 h-screen bg-[#132238] text-white flex flex-col p-4 fixed z-20">
      <div className="flex items-center -ml-5 -mt-1">
        <img
          src="/Icon Kobi (maskot LogicBase)/kobiMelambai.svg"
          className="w-24"
        />
        <h1 className="text-3xl  font-bold -ml-8">LogicBase</h1>
      </div>
      <nav className="mt-10 flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200
              ${
                isActive
                  ? "bg-slate-400 text-[#132238] font-semibold"
                  : "hover:text-gray-300"
              }`
            }
          >
            <img className="w-10" src={item.img} alt="" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
