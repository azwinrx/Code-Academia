import { useContext, useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../helper/authUtils";
import { getCoursesWithProgress } from "../../helper/supabaseMateri";
import { useNavigate } from "react-router-dom";

// Re-usable components defined within the file

const pastelColors = [
  "#A2D1B0",
  "#77B1E3",
  "#F1AD8D",
  "#A9A6E5",
  "#A2CFD1",
  "#E37777",
];

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-black/10 rounded-full h-2.5">
    <div
      className="bg-white/80 h-2.5 rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const StatusBadge = ({ status }) => {
  const baseStyle = "px-3 py-1 text-xs font-semibold rounded-full";
  let specificStyle = "";
  switch (status) {
    case "Completed":
      specificStyle = "bg-green-800/20 text-green-900";
      break;
    case "In Progress":
      specificStyle = "bg-sky-800/20 text-sky-900";
      break;
    default:
      specificStyle = "bg-slate-800/20 text-slate-900";
  }
  return <span className={`${baseStyle} ${specificStyle}`}>{status}</span>;
};

const SkeletonCard = () => (
  <div className="bg-slate-800/50 rounded-xl p-6 ring-1 ring-slate-700">
    <div className="animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-slate-700 rounded w-3/4"></div>
        <div className="h-5 bg-slate-700 rounded-full w-16"></div>
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-2.5 bg-slate-700 rounded-full w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-8"></div>
      </div>
      <div className="mt-6 border-t border-slate-700 pt-4">
        <div className="h-6 w-1/2 mx-auto bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
);

// Main Riwayat Component

export default function Riwayat() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      async function loadCourses() {
        // Set loading to true only if there are no courses yet
        if (courses.length === 0) {
          setLoading(true);
        }
        const coursesData = await getCoursesWithProgress(user.id);
        const finishedOnly = coursesData.filter((c) => c.progress === 100);
        setCourses(finishedOnly);
        setLoading(false);
      }
      loadCourses();
    }
  }, [user]);

  const handleCourseClick = (slug) => {
    navigate(`/materi/${slug}`);
  };

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Riwayat Aktivitas</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div
          style={{ backgroundColor: pastelColors[2] }}
          className="text-center py-16 rounded-xl"
        >
          <h3 className="text-xl font-semibold text-black">
            Belum ada materi yang selesai bro
          </h3>
          <p className="text-slate-800 mt-2">
            Mulai kursus untuk melihat riwayat Anda di sini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              style={{
                backgroundColor: pastelColors[index % pastelColors.length],
              }}
              className="rounded-xl shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
              onClick={() => handleCourseClick(course.slug)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-slate-800">
                    {course.nama_materi}
                  </h2>
                  <StatusBadge status={course.status} />
                </div>
                <p className="text-sm text-slate-700 mb-6 h-10">
                  {course.deskripsi || "No description available."}
                </p>
                <div className="flex items-center gap-3">
                  <ProgressBar progress={course.progress} />
                  <span className="text-sm font-semibold text-slate-800">
                    {course.progress}%
                  </span>
                </div>
              </div>
              <div
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                className="px-6 py-4 rounded-b-xl"
              >
                <div className="w-full flex justify-center items-center gap-2 text-sm font-semibold text-white">
                  {course.status === "Completed"
                    ? "Review Materi"
                    : "Lanjutkan Belajar"}
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
