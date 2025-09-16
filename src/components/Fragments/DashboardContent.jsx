import { useContext, useState, useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import { AuthContext } from '../../helper/authUtils';
import { getCoursesWithProgress } from '../../helper/supabaseMateri';
import { useNavigate } from 'react-router-dom';

const pastelColors = [
  '#A2D1B0',
  '#77B1E3',
  '#F1AD8D',
  '#A9A6E5',
  '#A2CFD1',
  '#E37777',
];

const DashboardSkeleton = () => (
  <main className="animate-pulse flex-1 p-6 md:p-8 overflow-y-auto">
    <div className="h-8 bg-slate-700 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-slate-700 rounded w-1/3 mb-8"></div>
    <div className="bg-slate-800/50 ring-1 ring-slate-700 p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 mb-8">
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-slate-700 rounded w-1/4"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-10 bg-slate-700 rounded w-1/2 mt-4"></div>
      </div>
      <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-700 rounded-full flex-shrink-0"></div>
    </div>
    <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
    <div className="bg-slate-800/50 ring-1 ring-slate-700 p-4 rounded-xl h-40 mb-8"></div>
    <div className="h-6 bg-slate-700 rounded w-1/4 mb-4"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="h-32 bg-slate-800/50 ring-1 ring-slate-700 rounded-xl"></div>
      <div className="h-32 bg-slate-800/50 ring-1 ring-slate-700 rounded-xl"></div>
      <div className="h-32 bg-slate-800/50 ring-1 ring-slate-700 rounded-xl"></div>
    </div>
  </main>
);

export default function DashboardContent() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      async function loadInitialData() {
        if (courses.length === 0) {
          setLoading(true);
        }
        const coursesData = await getCoursesWithProgress(user.id);
        setCourses(coursesData);
        setLoading(false);
      }
      loadInitialData();
    }
  }, [user]);

  useEffect(() => {
    if (loading || courses.length === 0 || !chartRef.current) return;

    const completedCount = courses.filter(c => c.progress === 100).length;
    const totalCourses = courses.length;

    const chartInstance = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [completedCount, totalCourses - completedCount],
            backgroundColor: ['#334155', 'rgba(0, 0, 0, 0.1)'], // Dark color for progress, light for track
            borderWidth: 0,
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "80%",
        plugins: { legend: { display: false } },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [loading, courses]);

  const handleCourseClick = (slug) => {
    navigate(`/materi/${slug}`);
  };

  const overallProgress = courses.length > 0 ? Math.round(courses.filter(c => c.progress === 100).length / courses.length * 100) : 0;
  const courseToContinue = courses.find(c => c.progress > 0 && c.progress < 100) || courses.find(c => c.progress === 0);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <main className="flex-1 p-6 md:p-8 overflow-y-auto">
      <section id="header-sambutan">
        <h2 className="text-3xl font-bold text-black">Selamat pagi, {user?.user_metadata.full_name || 'Petualang'}</h2>
        <p className="mt-1 text-slate-700">Kamu sedang berada di jalur yang tepat untuk menjadi ahli!</p>
      </section>

      <div style={{ backgroundColor: pastelColors[3] }} className="mt-6 text-slate-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="font-bold text-lg">Ringkasan Mingguan</h3>
          <p className="text-sm mt-1">Berikut adalah ringkasan dari perkembangan belajar kamu secara keseluruhan.</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-black/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-slate-800"><g fill="currentColor"><path d="M10.243 16.314L6 12.07l1.414-1.414l2.829 2.828l5.656-5.657l1.415 1.415z" /><path fillRule="evenodd" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18" clipRule="evenodd" /></g></svg>
            </div>
            <div>
              <p className="font-semibold">{courses.filter(c => c.progress === 100).length} Materi Selesai</p>
              <p className="text-sm">dari total {courses.length} materi</p>
            </div>
          </div>
        </div>
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          <canvas ref={chartRef}></canvas>
          <div className="absolute text-center">
            <p className="text-3xl font-bold">{overallProgress}%</p>
            <p className="text-sm">Selesai</p>
          </div>
        </div>
      </div>

      {courseToContinue && (
        <section className="mt-8">
          <h3 className="text-2xl font-bold text-black">Lanjutkan Belajar</h3>
          <div style={{ backgroundColor: pastelColors[5] }} className="mt-4 p-4 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 text-slate-800">
            <div className="w-full">
              <p className="text-sm">Status: {courseToContinue.status === 'Completed' ? 'Selesai' : courseToContinue.status === 'In Progress' ? 'Sedang Dikerjakan' : 'Belum Dimulai'}</p>
              <h4 className="text-xl font-bold mt-1">{courseToContinue.nama_materi}</h4>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{courseToContinue.progress}%</span>
                </div>
                <div className="w-full bg-black/10 rounded-full h-2.5">
                  <div style={{ backgroundColor: '#334155', width: `${courseToContinue.progress}%` }} className="h-2.5 rounded-full"></div>
                </div>
              </div>
              <button onClick={() => handleCourseClick(courseToContinue.slug)} className="mt-6 w-full md:w-auto bg-white/50 font-semibold py-2 px-6 rounded-lg hover:bg-white/80 transition-colors border-none focus:outline-none">
                Lanjutkan Belajar
              </button>
            </div>
          </div>
        </section>
      )}

      <section id="kursus-saya" className="mt-8">
        <h3 className="text-2xl font-bold text-black">Materi Saya</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {courses.filter(course => course.progress > 0).map((course, index) => (
            <div
              key={course.id}
              style={{ backgroundColor: pastelColors[index % pastelColors.length] }}
              className="p-4 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-slate-800 cursor-pointer"
              onClick={() => handleCourseClick(course.slug)}
            >
              <h4 className="font-bold mt-3 text-lg">{course.nama_materi}</h4>
              <p className="text-sm text-slate-700 mt-1">{course.deskripsi || 'No description'}</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{course.progress === 100 ? "Selesai" : "Progres"}</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-black/10 rounded-full h-2">
                  <div className="bg-white/80 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
