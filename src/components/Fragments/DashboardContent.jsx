import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DashboardContent({ name }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [2, 3],
            backgroundColor: ["#3b82f6", "#1e293b"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  const courses = [
    {
      title: "Belajar Desain Grafis dari Nol",
      author: "Jane Doe",
      progress: 75,
      image: "https://placehold.co/600x400/10b981/ffffff?text=Grafis",
      alt: "Thumbnail kursus Desain Grafis",
      progressColor: "bg-emerald-500",
    },
    {
      title: "Mahir Digital Marketing",
      author: "John Smith",
      progress: 20,
      image: "https://placehold.co/600x400/ef4444/ffffff?text=Marketing",
      alt: "Thumbnail kursus Digital Marketing",
      progressColor: "bg-red-500",
    },
    {
      title: "Front-End Web Development",
      author: "Alex Johnson",
      progress: 100,
      image: "https://placehold.co/600x400/f59e0b/ffffff?text=Web",
      alt: "Thumbnail kursus Web Development",
      progressColor: "bg-amber-500",
    },
  ];

  return (
    <>
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <section id="header-sambutan">
          <h2 className="text-3xl font-bold text-black">Good morning,{name}</h2>
          <p className="mt-1 text-gray-600">Kamu sudah di jalur yang tepat untuk menjadi expert!</p>

          <div
            className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-black">Ringkasan Mingguan</h3>
              <p className="text-gray-600 text-sm mt-1">Kamu telah menyelesaikan 2 dari 5 target modul mingguanmu.
                Terus tingkatkan!</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="bg-blue-500/30 text-[#1D4ED8] p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor"><path d="M10.243 16.314L6 12.07l1.414-1.414l2.829 2.828l5.656-5.657l1.415 1.415z" /><path fill-rule="evenodd" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18" clip-rule="evenodd" /></g></svg>
                </div>
                <div>
                  <p className="font-semibold text-black">2 Modul Selesai</p>
                  <p className="text-sm text-gray-600">Kerja bagus!</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className="bg-yellow-500/30 text-[#A16207] p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8a.5.5 0 0 0-.36-.85H6c0-3.9 3.18-7.05 7.1-7c3.72.05 6.85 3.18 6.9 6.9c.05 3.91-3.1 7.1-7 7.1c-1.61 0-3.1-.55-4.28-1.48a.994.994 0 0 0-1.32.08c-.42.42-.39 1.13.08 1.49A8.86 8.86 0 0 0 13 21c5.05 0 9.14-4.17 9-9.26c-.13-4.69-4.05-8.61-8.74-8.74m-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26c.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-black">3 Jam Belajar</p>
                  <p className="text-sm text-gray-600">Total minggu ini</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="chart-container w-32 h-32 md:w-40 md:h-40">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold text-black">Lanjutkan Belajar</h3>
          <div
            className="mt-4 bg-white backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6 hover:bg-white/20 transition-colors duration-300">
            <img src="https://placehold.co/600x400/3b82f6/ffffff?text=UI/UX" alt="Thumbnail kursus UI/UX"
              className="w-full md:w-1/3 h-48 md:h-full object-cover rounded-lg" />
            <div className="w-full">
              <p className="text-sm text-gray-600">Dasar-Dasar UI/UX</p>
              <h4 className="text-xl font-bold mt-1 text-black">Video 5: Prinsip Desain Visual</h4>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progres</span>
                  <span>50%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div className="progress-bar-fill h-2.5 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
              <button
                className="mt-6 w-full md:w-auto bg-blue-600 text-black font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">Tonton
                Sekarang</button>
            </div>
          </div>
        </section>

        <section id="kursus-saya" className="mt-8">
          <h3 className="text-2xl font-bold text-black">Kursus Saya</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md hover:bg-white/20 transition-colors duration-300 text-black">
                <img src={course.image} alt={course.alt} className="w-full h-32 object-cover rounded-lg" />
                <h4 className="font-bold mt-3">{course.title}</h4>
                <p className="text-sm text-gray-600 mt-1">oleh {course.author}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{course.progress === 100 ? "Selesai" : "Progres"}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className={`${course.progressColor} h-2 rounded-full`} style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
