import Header from "../Fragments/Header";
import Sidebar from "../Fragments/Sidebar";
import skyBackground from "../../assets/Sky Background.png";

export default function Dashboard({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main
          className="p-6 min-h-screen ml-56 -mt-5 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${skyBackground})` }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
