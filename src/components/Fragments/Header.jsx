import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../helper/supabaseClient.js";
import { useAuth } from "../../helper/authUtils.js";

export default function Header() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { user, logout } = useAuth();

  // Fetch suggestions saat mengetik
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      const { data, error } = await supabase
        .from("judul_Materi")
        .select("id, nama_materi, slug")
        .ilike("nama_materi", `%${value.trim()}%`)
        .limit(10);
      if (!error) {
        setSuggestions(data);
        setShowDropdown(true);
      }
    } else {
      // Jika kosong, tampilkan semua materi
      const { data, error } = await supabase
        .from("judul_Materi")
        .select("id, nama_materi, slug")
        .limit(10);
      if (!error) {
        setSuggestions(data);
        setShowDropdown(true);
      }
    }
  };

  // Saat input pertama kali di klik/fokus, tampilkan semua materi
  const handleSearchFocus = async () => {
    if (!search.trim()) {
      const { data, error } = await supabase
        .from("judul_Materi")
        .select("id, nama_materi, slug")
        .limit(10);
      if (!error) {
        setSuggestions(data);
        setShowDropdown(true);
      }
    } else {
      setShowDropdown(true);
    }
  };

  // Handler pencarian saat tekan Enter
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) {
      if (suggestions.length > 0) {
        navigate(`/materi/${suggestions[0].slug}`);
      } else {
        navigate(`/materi?search=${encodeURIComponent(search.trim())}`);
      }
      setSearch("");
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  // Redirect ke detail materi saat sugesti diklik
  const handleSuggestionClick = (slug) => {
    setSearch("");
    setSuggestions([]);
    setShowDropdown(false);
    navigate(`/materi/${slug}`);
  };

  // Tutup dropdown jika klik di luar
  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  // Tampilkan profile hanya jika pencarian tidak aktif
  const handleProfileClick = () => {
    if (!search) {
      setShowProfile((prev) => !prev);
    }
  };

  return (
    <header className="w-full bg-[#132238] text-white p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <img
          src="/Icon Kobi (maskot LogicBase)/KobiMengajak.svg"
          className="h-24 absolute right-52"
        />
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari materi..."
            className="p-2 rounded-md text-black"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            onFocus={handleSearchFocus}
            onBlur={handleBlur}
          />
          {/* Dropdown hasil pencarian */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute left-0 mt-1 w-full bg-white text-black rounded shadow-lg z-30 max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 cursor-pointer hover:bg-sky-100 border-b"
                  onMouseDown={() => handleSuggestionClick(item.slug)}
                >
                  {item.nama_materi}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Icon profile */}
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
          {showProfile && !search && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-20 p-4">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => setShowProfile(false)}
                aria-label="Close"
              >
                &times;
              </button>
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
                    Bergabung sejak:{" "}
                    {/* Tampilkan tanggal bergabung jika ada */}
                  </div>
                </div>
              </div>
              <button
                className="w-full px-4 py-2 bg-[#132238] text-white rounded hover:bg-slate-500"
                onClick={logout}
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
