import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMateriBySlug } from "../helper/supabaseMateri";

export default function MateriDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [materi, setMateri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getMateriBySlug(slug);
      setMateri(data);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) return <p className="p-8 text-white">Loading...</p>;
  if (!materi)
    return <p className="p-8 text-red-600">Materi tidak ditemukan</p>;

  return (
    <div className="px-5 py-14">
      <header className="flex min-w-full bg-[#132238] fixed top-0 left-0 right-0 items-center">
        <button
          onClick={() => navigate(-1)}
          className="mt-3 mb-3 ml-2 px-4 py-2 w-36  bg-white/20 rounded hover:bg-white/30  "
        >
          ← Kembali
        </button>
        <h1 className="text-3xl w-[85%] text-center text-white font-bold mb-4">{materi.title}</h1>
      </header>

      <aside className="w-60 h-screen bg-[#132238] text-white flex flex-col p-4 fixed z-20 left-0 top-16">
      <nav className="flex flex-col gap-2">
        <div className="w-full bg-gray-200 h-2 mt-2 rounded">
              <div
                className="bg-gray-500 w-[20%] h-2 rounded"
              ></div>
              <p className="py-2">Progres: 20%</p>
            </div>
        <ul className="my-6 mx-2">
         <li className="my-3 text-xl flex items-center gap-2">
            <img src="../../public/check.png" className="w-5 h-5" />
            Pengenalan</li>
         <li className="my-3 text-xl flex items-center gap-2">
            <img src="../../public/pending.png" className="w-5 h-5" />Studi Kasus</li>
         <li className="my-3 text-xl flex items-center gap-2">
            <img src="../../public/pending.png" className="w-5 h-5" />
            Implementasi</li>
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-left transition-colors duration-200 hover:bg-red-600"
        >
          <span>📤</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>

      <div
        className={`min-h-screen px-8 mt-5 ml-60 shadow-lg rounded-lg shadow-black text-black`}
      >
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Penjelasan</h2>
          <p className="leading-relaxed">{materi.penjelasan}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contoh Kode</h2>
          <pre className="bg-black/20 p-4 rounded overflow-x-auto">
            <code>{materi.kode}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
