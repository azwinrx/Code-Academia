import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  getMateriDetailWithProgress,
  addProgress,
} from "../helper/supabaseMateri";
import { AuthContext } from "../helper/authUtils";

export default function MateriDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [materi, setMateri] = useState(null);
  const [subMateriList, setSubMateriList] = useState([]);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [activeSubMateri, setActiveSubMateri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const { materi, subMateriList, completedIds } =
          await getMateriDetailWithProgress(slug, user.id);
        if (!materi) {
          setError("Materi tidak ditemukan");
        } else {
          setMateri(materi);
          setSubMateriList(subMateriList);
          setCompletedIds(completedIds);
          if (subMateriList.length > 0) {
            setActiveSubMateri(subMateriList[0]);
          }
        }
      } catch (e) {
        console.error(e);
        setError("Gagal memuat data materi.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug, user, navigate]);

  const handleMarkComplete = async () => {
    if (!user || !activeSubMateri) return;

    await addProgress(user.id, activeSubMateri.id);
    setCompletedIds(new Set(completedIds).add(activeSubMateri.id));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );

  const progress =
    subMateriList.length > 0
      ? Math.round((completedIds.size / subMateriList.length) * 100)
      : 0;

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <aside className="w-80 bg-[#132238] flex flex-col h-screen fixed left-0 top-0 z-30 shadow-2xl">
        <div className="p-5 border-b border-slate-700/50">
          <button
            onClick={() => navigate("/materi")}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white hover:cursor-pointer hover:bg-slate-700 transition-colors mb-4 border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>All Courses</span>
          </button>
          <h1 className="text-xl font-bold text-white truncate">
            {materi?.nama_materi}
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {subMateriList.map((sub) => (
              <li key={sub.id}>
                <button
                  onClick={() => setActiveSubMateri(sub)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 border-none ${
                    activeSubMateri?.id === sub.id
                      ? "bg-sky-600/80 shadow-md border-none"
                      : "hover:bg-slate-700/50"
                  }`}
                >
                  <img
                    src={
                      completedIds.has(sub.id) ? "/check.png" : "/pending.png"
                    }
                    className="w-5 h-5 flex-shrink-0"
                    alt="status icon"
                  />
                  <span className="flex-1 text-sm font-medium">
                    {sub.judul}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

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

      <main className="ml-80 flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {activeSubMateri ? (
          <section>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-sky-300">
              {activeSubMateri.judul}
            </h2>
            <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg ring-1 ring-slate-700">
              <div className="prose prose-invert max-w-none text-lg leading-relaxed">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-4 text-sky-300">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mb-3 text-sky-300">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold mb-2 text-sky-300">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-slate-200 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 mb-4 text-slate-200">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-4 text-slate-200">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="mb-1 text-slate-200">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-yellow-300">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-slate-300">{children}</em>
                    ),
                    code: ({ children }) => (
                      <code className="bg-slate-700 text-pink-300 px-2 py-1 rounded text-sm font-mono">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-slate-700 p-4 rounded-lg overflow-x-auto mb-4 border border-slate-600">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-sky-500 pl-4 italic text-slate-300 mb-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {activeSubMateri.markdown_content}
                </ReactMarkdown>
              </div>
              {!completedIds.has(activeSubMateri.id) && (
                <button
                  onClick={handleMarkComplete}
                  className="mt-8 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-800 transition-colors w-full md:w-auto flex items-center justify-center gap-2 border-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Mark as Complete
                </button>
              )}
            </div>
          </section>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-xl">
              Select a lesson to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
