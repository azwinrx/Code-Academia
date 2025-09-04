import Header from "../Fragments/Header";
import Sidebar from "../Fragments/Sidebar";

export default function Dashboard({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-[#F7F5EF] min-h-screen ml-56 mt-10">{children}</main>
      </div>
    </div>
  );
}
