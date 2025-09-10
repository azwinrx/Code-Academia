import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../helper/authUtils";
import { getCoursesWithProgress } from "../../helper/supabaseMateri";

const pastelColors = [
  '#A2D1B0',
  '#77B1E3',
  '#F1AD8D',
  '#A9A6E5',
  '#A2CFD1',
  '#E37777',
];

const iconMap = {
  Percabangan: (
    <svg className="w-24 h-24 mb-2 text-white mx-auto" viewBox="0 0 512 512" fill="currentColor">
      <path fillRule="evenodd" d="M469.334 426.666V85.333H42.667v341.333zm-42.667-42.667H85.334V128h341.333zM256 277.333h21.334v-85.334H256zm0 21.333h85.334v-21.333H256zm-64-85.333h64v-21.334h-64zm0 42.666V149.333h-85.333v106.666zm0 106.667v-21.333h149.334v21.333h64V255.999h-64v64H192v-21.333h-85.333v64z" />
    </svg>
  ),
  Perulangan: (
    <svg className="w-24 h-24 mb-2 text-white mx-auto" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M12 4V2.21c0-.45-.54-.67-.85-.35l-2.8 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.32.31.86.09.86-.36V6c3.31 0 6 2.69 6 6c0 .79-.15 1.56-.44 2.25c-.15.36-.04.77.23 1.04c.51.51 1.37.33 1.64-.34c.37-.91.57-1.91.57-2.95c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-.79.15-1.56.44-2.25c.15-.36.04-.77-.23-1.04c-.51-.51-1.37-.33-1.64.34C4.2 9.96 4 10.96 4 12c0 4.42 3.58 8 8 8v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79a.5.5 0 0 0-.85.36z" />
    </svg>
  ),
  Perbandingan: (
    <svg className="w-24 h-24 mb-2 text-white mx-auto" viewBox="0 0 448 512" fill="currentColor">
      <path fillRule="evenodd" d="M426.1 94.4c16.8-5.6 25.8-23.7 20.2-40.5s-23.7-25.8-40.5-20.2l-384 128C8.8 166 0 178.2 0 192s8.8 26 21.9 30.4l384 128c16.8 5.6 34.9-3.5 40.5-20.2s-3.5-34.9-20.2-40.5l-293-97.7zM32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32z" />
    </svg>
  ),
  Aritmatika: (
    <svg className="w-24 h-24 mb-2 text-white mx-auto" viewBox="0 0 512 512" fill="currentColor">
      <path fillRule="evenodd" d="M170.667 64H128v64H64v42.667h64v64h42.667v-64h64V128h-64zm23.922 234.667l30.17 30.17-45.256 45.256 45.254 45.254-30.17 30.17-45.254-45.255-45.254 45.255-30.17-30.17 45.255-45.254-45.256-45.257 30.17-30.17 45.255 45.255zM277.333 128H448v42.667H277.333zm85.334 192c11.782 0 21.333-9.55 21.333-21.333s-9.55-21.334-21.333-21.334-21.334 9.551-21.334 21.334S350.884 320 362.667 320M448 384v-42.667H277.333V384zm-64 42.667c0 11.782-9.55 21.333-21.333 21.333s-21.334-9.55-21.334-21.333 9.551-21.334 21.334-21.334S384 414.884 384 426.667" />
    </svg>
  ),
  'Gerbang Logika': (
    <svg className="w-24 h-24 mb-2 text-white mx-auto"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        fillRule="evenodd"
        d="M22 12h-4M2 9h5m-5 6h5M6 5c10.667 2.1 10.667 12.6 0 14q2.709-7 0-14"
      />
      <path fillRule="evenodd" d="M14 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    </svg>
  ),
  Array: (
    <svg className="w-24 h-24 mb-2 text-white mx-auto" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M16 20q-.425 0-.712-.288T15 19t.288-.712T16 18h2V6h-2q-.425 0-.712-.288T15 5t.288-.713T16 4h2q.825 0 1.413.588T20 6v12q0 .825-.587 1.413T18 20zM6 20q-.825 0-1.412-.587T4 18V6q0-.825.588-1.412T6 4h2q.425 0 .713.288T9 5t-.288.713T8 6H6v12h2q.425 0 .713.288T9 19t-.288.713T8 20z" />
    </svg>
  ),
};

export default function Course() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user) {
      getCoursesWithProgress(user.id).then(setCourses);
    }
  }, [user]);

  const handleClick = (slug) => {
    navigate(`/materi/${slug}`);
  };

  return (
    <div className="pl-8 pr-6 pb-6 ">
      <div className="flex items-center justify-start mb-1">
        <h1 className="text-3xl font-bold text-black">Jelajahi Materi</h1>
        <img
          src="/Icon Kobi (maskot LogicBase)/kobiMelambai.svg"
          alt="Kobi"
          className="w-24 h-24 -ml-4"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {courses.map((course, idx) => {
          const progress = course.progress || 0;
          const statusText = progress === 100 ? 'Selesai' : `${progress}% Selesai`;

          return (
            <div
              key={course.id}
              onClick={() => handleClick(course.slug)}
              className="relative p-6 rounded-lg shadow-md cursor-pointer max-w-52 text-center content-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:rotate-1"
              style={{ backgroundColor: pastelColors[idx % pastelColors.length] }}
            >
              {iconMap[course.nama_materi] && iconMap[course.nama_materi]}
              <h2 className="text-lg font-semibold mb-2 text-white">
                {course.nama_materi}
              </h2>
              <p className="text-sm text-white">{statusText}</p>
              <div className="w-full bg-white/30 h-2 mt-2 rounded">
                <div
                  className="bg-white h-2 rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}