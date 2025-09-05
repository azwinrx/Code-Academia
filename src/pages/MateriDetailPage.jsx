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
   if (!materi) return <p className="p-8 text-red-600">Materi tidak ditemukan</p>;

   return (
      <div className={`min-h-screen p-8 text-black`}>
         <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 bg-white/20 rounded hover:bg-white/30"
         >
            ← Kembali
         </button>

         <h1 className="text-3xl font-bold mb-4">{materi.title}</h1>

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
   );
}