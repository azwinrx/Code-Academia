"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  TrophyIcon,
  UserGroupIcon,
  BookOpenIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import "../../App.css";

const navigation = [
  { name: "Tentang", href: "#about" },
  { name: "Fitur", href: "#features" },
  { name: "Statistik", href: "#stats" },
  { name: "Kontak", href: "#contact" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
              <span className="sr-only">Code Academia</span>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <CodeBracketIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Code Academia
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center space-x-4">
            <a
              href="/signup"
              className="text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up
            </a>
            <a
              href="/login"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Log in
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <span className="sr-only">Code Academia</span>
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <CodeBracketIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Code Academia
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-2">
                  <a
                    href="/signup"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                  >
                    Sign up
                  </a>
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Hero Section */}
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-32">
          <div className="hidden sm:mb-6 sm:flex sm:justify-center">
            <div className="relative rounded-full px-4 py-2 text-sm leading-6 text-gray-600 ring-1 ring-blue-600/20 hover:ring-blue-600/30 bg-blue-50/50 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-400/30">
              🎓 Platform Pembelajaran Coding Terdepan{" "}
              <a
                href="#about"
                className="font-semibold text-blue-600 dark:text-blue-400"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Pelajari Lebih Lanjut <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
              Selamat Datang di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Code Academia
              </span>
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Platform pembelajaran coding yang dirancang untuk mengembangkan
              kemampuan programming dari tingkat pemula hingga expert.
              Bergabunglah dengan ribuan developer yang telah memulai journey
              mereka bersama kami.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <a
                href="#about"
                className="rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-500 hover:to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                Jelajahi Platform
              </a>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Lihat Fitur <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div
          id="about"
          className="mx-auto max-w-7xl px-6 lg:px-8 pb-12 sm:pb-16 scroll-mt-20"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Tentang Code Academia
            </h2>
            <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Code Academia adalah platform pembelajaran coding yang
              dikembangkan khusus untuk kompetisi Hology Software Development.
              Kami menyediakan lingkungan belajar yang komprehensif dan
              interaktif.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:mt-16 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Visi Kami
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Menjadi platform pembelajaran coding terdepan yang dapat
                  diakses oleh semua kalangan, membantu mengembangkan talenta
                  digital Indonesia untuk menghadapi era teknologi masa depan.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Misi Kami
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Memberikan pendidikan coding berkualitas tinggi melalui metode
                  pembelajaran interaktif, praktik langsung, dan dukungan
                  komunitas yang solid untuk setiap pembelajaran.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div
          id="features"
          className="mx-auto max-w-7xl px-6 lg:px-8 pb-12 sm:pb-16 scroll-mt-20"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Fitur Unggulan Platform
            </h2>
            <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Code Academia menyediakan berbagai fitur canggih untuk mendukung
              perjalanan belajar coding Anda dengan pengalaman yang optimal.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:mt-16 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <AcademicCapIcon className="h-8 w-8 flex-none text-blue-600" />
                  Dashboard Pembelajaran
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Dashboard yang intuitif untuk melacak progress belajar,
                    mengakses course, dan melihat achievement yang telah dicapai
                    selama proses pembelajaran.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <BookOpenIcon className="h-8 w-8 flex-none text-blue-600" />
                  Course Management
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Sistem manajemen course yang terorganisir dengan baik,
                    memungkinkan akses mudah ke materi pembelajaran dan tracking
                    progress untuk setiap course.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <TrophyIcon className="h-8 w-8 flex-none text-blue-600" />
                  Progress Tracking
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Fitur tracking kemajuan belajar dengan riwayat detail
                    aktivitas, pencapaian milestone, dan analisis performa untuk
                    optimalisasi pembelajaran.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <UserGroupIcon className="h-8 w-8 flex-none text-blue-600" />
                  Support System
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Sistem bantuan yang responsif dengan akses ke dokumentasi,
                    FAQ, dan support team yang siap membantu mengatasi kendala
                    pembelajaran.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <CodeBracketIcon className="h-8 w-8 flex-none text-blue-600" />
                  Interactive Learning
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Pembelajaran interaktif dengan hands-on coding experience,
                    real-time feedback, dan integrated development environment
                    untuk praktik langsung.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <StarIcon className="h-8 w-8 flex-none text-blue-600" />
                  Personalized Experience
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Pengalaman belajar yang dipersonalisasi berdasarkan tingkat
                    kemampuan, preferensi belajar, dan goal karir yang ingin
                    dicapai oleh setiap user.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Stats Section */}
        <div
          id="stats"
          className="bg-white dark:bg-gray-800 py-12 sm:py-16 scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                  Statistik Platform
                </h2>
                <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Angka-angka yang menunjukkan kualitas dan pencapaian Code
                  Academia dalam dunia pendidikan coding
                </p>
              </div>
              <dl className="mt-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col bg-blue-50 dark:bg-blue-900/20 p-6">
                  <dt className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
                    Active Users
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-blue-900 dark:text-white">
                    2,500+
                  </dd>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Pengguna aktif bulanan
                  </p>
                </div>
                <div className="flex flex-col bg-blue-50 dark:bg-blue-900/20 p-6">
                  <dt className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
                    Learning Modules
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-blue-900 dark:text-white">
                    25+
                  </dd>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Modul pembelajaran tersedia
                  </p>
                </div>
                <div className="flex flex-col bg-blue-50 dark:bg-blue-900/20 p-6">
                  <dt className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
                    Completion Rate
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-blue-900 dark:text-white">
                    87%
                  </dd>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Tingkat penyelesaian course
                  </p>
                </div>
                <div className="flex flex-col bg-blue-50 dark:bg-blue-900/20 p-6">
                  <dt className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
                    Satisfaction Rate
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-blue-900 dark:text-white">
                    92%
                  </dd>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Tingkat kepuasan pengguna
                  </p>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div
          id="contact"
          className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-16 scroll-mt-20"
        >
          <div className="mx-auto max-w-2xl text-center" id="contact">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Hubungi Kami
            </h2>
            <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Ada pertanyaan tentang Code Academia? Tim kami siap membantu Anda
              dalam perjalanan belajar coding.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-4xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  support@codeacademia.com
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Live Chat
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  24/7 Customer Support
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Documentation
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Panduan lengkap penggunaan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-2xl text-center py-8 sm:py-12 pb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Mulai Journey Coding Anda
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Bergabunglah dengan Code Academia dan rasakan pengalaman belajar
            coding yang berbeda. Daftar sekarang untuk mengakses semua fitur
            pembelajaran kami.
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <a
              href="/signup"
              className="rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:from-blue-500 hover:to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              Daftar Sekarang
            </a>
            <a
              href="/login"
              className="text-base font-semibold leading-7 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Sudah punya akun? Login <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
