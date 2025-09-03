const materiList = [
  { title: "Percabangan", color: "bg-green-300", progress: "20%" },
  { title: "Perulangan", color: "bg-blue-300", progress: "50%" },
  { title: "Perbandingan", color: "bg-red-300", progress: "80%" },
  { title: "Aritmatika", color: "bg-purple-300", progress: "100%" },
  { title: "Logika", color: "bg-cyan-300", progress: "20%" },
  { title: "Struktur Dasar", color: "bg-pink-300", progress: "50%" },
];

export default function Course() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Jelajahi Materi</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {materiList.map((item) => (
          <div
            key={item.title}
            className={`${item.color} p-6 rounded-lg shadow-md cursor-pointer`}
          >
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-sm">{item.progress} Selesai</p>
            <div className="w-full bg-gray-200 h-2 mt-2 rounded">
              <div
                className="bg-gray-700 h-2 rounded"
                style={{ width: item.progress }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
