export default function Header() {
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
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
          👤
        </div>
      </div>
    </header>
  );
}
