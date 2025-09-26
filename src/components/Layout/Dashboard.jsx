import Header from "../Fragments/Header";
import Sidebar from "../Fragments/Sidebar";
import skyBackground from "../../assets/Sky Background.png";
import { useState } from "react";

export default function Dashboard({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col lg:ml-60">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main
          className="p-4 sm:p-6 min-h-screen bg-cover bg-center bg-no-repeat flex-1"
          style={{ backgroundImage: `url(${skyBackground})` }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
