"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon, // Icon hamburger menu untuk mobile navigation
  XMarkIcon, // Icon X untuk close mobile menu
  CodeBracketIcon, // Icon bracket code untuk logo dan representasi coding
  AcademicCapIcon, // Icon topi akademik untuk dashboard belajar/edukasi
  TrophyIcon, // Icon trophy untuk misi/achievement/quiz interaktif
  UserGroupIcon, // Icon grup user untuk tim bantuan/komunitas
  BookOpenIcon, // Icon buku terbuka untuk materi pembelajaran
  StarIcon, // Icon bintang untuk impian/visi dan tracking pemahaman
  HeartIcon, // Icon hati untuk impian/visi yang penuh kasih
  RocketLaunchIcon, // Icon roket untuk misi/tujuan yang ambisius
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
              <span className="sr-only">LogicBase</span>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <CodeBracketIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                LogicBase
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200 focus:outline-none"
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
                <span className="sr-only">LogicBase</span>
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <CodeBracketIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  LogicBase
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200 focus:outline-none"
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
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none"
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
              � Tempat Seru Belajar Coding untuk Anak-Anak{" "}
              <a
                href="#about"
                className="font-semibold text-blue-600 dark:text-blue-400"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Yuk Lihat! <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
              Hai Selamat Datang di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                LogicBase
              </span>
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tempat seru untuk belajar logika dasar coding! Kita akan belajar
              cara berpikir komputer melalui materi yang mudah dipahami, lalu
              menguji pemahaman dengan quiz yang menyenangkan. Bergabunglah
              dengan ribuan teman-teman lainnya yang sudah mulai belajar logika
              coding!
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <a
                href="#about"
                className="rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-500 hover:to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                🎯 Ayo Mulai Belajar!
              </a>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Lihat Fitur Keren <span aria-hidden="true">→</span>
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
              Tentang LogicBase
            </h2>
            <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
              LogicBase adalah tempat yang super seru untuk anak-anak belajar
              logika dasar coding! Di sini kita akan belajar cara berpikir
              seperti programmer melalui materi yang mudah dipahami, lalu
              menguji pemahaman dengan quiz yang seru!
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:mt-16 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-center gap-x-3 mb-4">
                  <HeartIcon className="h-8 w-8 flex-none text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Impian Kami
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Kami ingin semua anak-anak di Indonesia bisa belajar logika
                  dasar coding dengan cara yang menyenangkan! LogicBase dibuat
                  supaya kalian bisa memahami cara berpikir programmer dan siap
                  menghadapi masa depan yang penuh teknologi.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-center gap-x-3 mb-4">
                  <RocketLaunchIcon className="h-8 w-8 flex-none text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Misi Kami
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Mengajarkan logika dasar coding kepada anak-anak dengan cara
                  yang seru dan mudah dipahami! Kita akan belajar melalui materi
                  teks yang menarik, lalu menguji pemahaman dengan quiz
                  interaktif bersama teman-teman.
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
              Fitur-Fitur Keren LogicBase
            </h2>
            <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
              LogicBase punya sistem belajar yang seru! Kalian akan membaca
              materi tentang logika coding yang mudah dipahami, lalu menguji
              pemahaman dengan quiz yang menyenangkan!
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:mt-16 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <BookOpenIcon className="h-8 w-8 flex-none text-blue-600" />
                  Materi Logika Coding
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Materi pembelajaran logika dasar coding yang disusun dengan
                    bahasa sederhana dan mudah dipahami. Setiap topik dijelaskan
                    step by step dengan contoh yang menarik.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <TrophyIcon className="h-8 w-8 flex-none text-blue-600" />
                  Quiz Interaktif
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Setelah membaca materi, kalian akan mengerjakan quiz untuk
                    menguji pemahaman. Quiz dibuat menyenangkan dengan berbagai
                    jenis soal yang menantang!
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <AcademicCapIcon className="h-8 w-8 flex-none text-blue-600" />
                  Dashboard Belajar
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Tempat keren untuk melihat progres belajar kalian! Di sini
                    kalian bisa lihat materi apa saja yang sudah dipelajari dan
                    skor quiz yang sudah dikerjakan.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <UserGroupIcon className="h-8 w-8 flex-none text-blue-600" />
                  Tim Bantuan
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Ada kakak-kakak yang siap membantu kalau kalian kebingungan
                    dengan materi! Kalian juga bisa bertanya ke teman-teman lain
                    yang juga sedang belajar.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <CodeBracketIcon className="h-8 w-8 flex-none text-blue-600" />
                  Belajar Logika Bertahap
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Sistem pembelajaran yang tersusun dari dasar sampai mahir.
                    Mulai dari konsep sederhana hingga logika yang lebih
                    kompleks, semua dijelaskan dengan mudah!
                  </p>
                </dd>
              </div>

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <StarIcon className="h-8 w-8 flex-none text-blue-600" />
                  Tracking Pemahaman
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Setiap quiz akan memberikan feedback dan skor untuk melacak
                    tingkat pemahaman kalian. Kalian bisa melihat progress dan
                    area yang perlu dipelajari lebih lanjut!
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
                  📊 Statistik Keren LogicBase
                </h2>
                <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Wah, banyak banget anak-anak yang sudah bergabung dan belajar
                  logika coding di LogicBase! Lihat angka-angka keren tentang
                  sistem belajar materi + quiz ini!
                </p>
              </div>
              <dl className="mt-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col bg-blue-50 dark:bg-blue-900/20 p-6">
                  <dt className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
                    👦👧 Anak-Anak Aktif
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-blue-900 dark:text-white">
                    2,500+
                  </dd>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Anak-anak yang belajar setiap bulan
                  </p>
                </div>
                <div className="flex flex-col bg-blue-50 dark:bg-blue-900/20 p-6">
                  <dt className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
                    📚 Materi Logika
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-blue-900 dark:text-white">
                    25+
                  </dd>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Materi logika coding tersedia
                  </p>
                </div>
                <div className="flex flex-col bg-blue-50 dark:bg-blue-900/20 p-6">
                  <dt className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
                    ✅ Tingkat Kelulusan Quiz
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-blue-900 dark:text-white">
                    87%
                  </dd>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Anak-anak yang berhasil lulus quiz
                  </p>
                </div>
                <div className="flex flex-col bg-blue-50 dark:bg-blue-900/20 p-6">
                  <dt className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
                    😊 Tingkat Kebahagiaan
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-blue-900 dark:text-white">
                    92%
                  </dd>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Anak-anak yang senang belajar di sini
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
              📞 Hubungi Kami
            </h2>
            <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Ada pertanyaan atau butuh bantuan? Kakak-kakak di LogicBase siap
              membantu kalian! Jangan malu untuk bertanya ya!
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-4xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  support@logicbase.kids
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Chat Langsung
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Kakak-kakak siap membantu 24/7
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Panduan Belajar
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Buku panduan lengkap untuk anak-anak
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-2xl text-center py-8 sm:py-12 pb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            🚀 Yuk Mulai Petualangan Coding!
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Bergabunglah dengan LogicBase dan rasakan serunya belajar logika
            coding! Baca materi yang menarik, kerjakan quiz yang seru, dan mulai
            petualangan belajar logika bersama teman-teman lainnya.
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <a
              href="/signup"
              className="rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:from-blue-500 hover:to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              🎯 Daftar Sekarang!
            </a>
            <a
              href="/login"
              className="text-base font-semibold leading-7 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Sudah punya akun? Masuk Yuk! <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
