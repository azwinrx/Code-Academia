import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMateriBySlug, getSubMateriByMateriId } from "../helper/supabaseMateri";

export default function MateriDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [materi, setMateri] = useState(null);
  const [subMateriList, setSubMateriList] = useState([]);
  const [activeSubMateri, setActiveSubMateri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const materiData = await getMateriBySlug(slug);
        if (!materiData) {
          setError("Materi tidak ditemukan");
          setLoading(false);
          return;
        }
        setMateri(materiData);

        const subMateriData = await getSubMateriByMateriId(materiData.id);
        setSubMateriList(subMateriData);

        if (subMateriData.length > 0) {
          setActiveSubMateri(subMateriData[0]);
        }
      } catch (e) {
        console.error(e);
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);


  if (loading) return <p className="p-8 text-white">Loading...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!materi) return <p className="p-8 text-red-600">Materi tidak ditemukan</p>;

  const progress = subMateriList.length > 0 && activeSubMateri ? Math.round(((subMateriList.findIndex(s => s.id === activeSubMateri.id) + 1) / subMateriList.length) * 100) : 0;

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-80 bg-[#132238] flex flex-col h-screen fixed left-0 top-0 z-30 shadow-2xl">
        {/* Header Section */}
        <div className="p-5 border-b border-slate-700/50">
          <button
            onClick={() => navigate("/materi")}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>All Courses</span>
          </button>
          <h1 className="text-xl font-bold text-white truncate">{materi?.nama_materi}</h1>
        </div>

        {/* Sub-materi List with Scroll */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {subMateriList.map((sub) => (
              <li key={sub.id}>
                <button
                  onClick={() => setActiveSubMateri(sub)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${activeSubMateri?.id === sub.id
                      ? "bg-sky-600/80 shadow-md"
                      : "hover:bg-slate-700/50"
                    }`}
                >
                  <img
                    src={activeSubMateri?.id === sub.id ? "/check.png" : "/pending.png"}
                    className="w-5 h-5 flex-shrink-0"
                    alt="status icon"
                  />
                  <span className="flex-1 text-sm font-medium">{sub.judul}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section with Progress and Logout */}
        <div className="p-5 border-t border-slate-700/50">
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-80 flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {activeSubMateri ? (
          <section>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-sky-300">{activeSubMateri.judul}</h2>
            <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg ring-1 ring-slate-700">
              <div
                className="prose prose-invert max-w-none text-lg leading-relaxed 
                           prose-h1:text-sky-300 prose-h2:text-sky-400 prose-h3:text-sky-500
                           prose-p:text-slate-300
                           prose-code:bg-slate-900 prose-code:p-1 prose-code:rounded-md prose-code:text-amber-300
                           prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:pl-4 prose-blockquote:italic
                           prose-a:text-emerald-400 hover:prose-a:text-emerald-300"
                dangerouslySetInnerHTML={{ __html: activeSubMateri.konten }}
              />
            </div>
          </section>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-xl">Select a lesson to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}             