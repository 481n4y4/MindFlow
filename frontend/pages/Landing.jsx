import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    if (window.innerWidth < 768) {
      setIsScrolled(true);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleMobileMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white">
      {/* Header/Navigation */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          window.innerWidth < 768 ? "bg-white shadow-md" : 
          (isScrolled ? "bg-white shadow-md" : "bg-transparent")
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">MF</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Mind<span className="text-blue-600">Flow</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Fitur
              </a>
              <a
                href="#tech"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Teknologi
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Tentang
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="px-5 py-2 text-gray-700 font-medium hover:text-blue-600 transition cursor-pointer"
              >
                Masuk
              </button>
              <button
                onClick={handleRegister}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer"
              >
                Daftar Gratis
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200 bg-white">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fitur
                </a>
                <a
                  href="#tech"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teknologi
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tentang
                </a>
                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => handleMobileMenuClick("/login")}
                    className="block w-full text-center py-2.5 text-gray-700 font-medium border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => handleMobileMenuClick("/register")}
                    className="block w-full text-center py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shadow"
                  >
                    Daftar Gratis
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section - DIPERBAIKI untuk MindFlow */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Hero Content */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
                ✨ Aplikasi Manajemen Workflow Modern
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Kelola <span className="text-blue-600">Alur Kerja</span> dan Ide Anda dengan Lebih Terstruktur
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl">
                MindFlow adalah aplikasi berbasis web yang membantu Anda mengelola alur kerja, ide, dan data secara terstruktur dengan fitur autentikasi JWT dan REST API yang lengkap.
              </p>
              
              {/* Stats Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-sm text-gray-500">Keamanan data</div>
                  <div className="text-lg font-semibold text-gray-900">JWT Auth</div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">⚡</div>
                  <div className="text-sm text-gray-500">Operasi lengkap</div>
                  <div className="text-lg font-semibold text-gray-900">CRUD API</div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">🎨</div>
                  <div className="text-sm text-gray-500">Tampilan modern</div>
                  <div className="text-lg font-semibold text-gray-900">Tailwind CSS</div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">5.0</div>
                  <div className="text-sm text-gray-500">Rating pengguna</div>
                  <div className="text-lg font-semibold text-gray-900">Ulasan</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleRegister}
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-lg shadow-lg flex items-center justify-center cursor-pointer w-full sm:w-auto"
                >
                  <span className="mr-2">🚀</span> Mulai Sekarang - Gratis
                </button>
                
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">5.0 dari 80+ ulasan</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-lg">
                {/* Background decorative elements */}
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-blue-100 rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-gradient-to-r from-blue-200 to-blue-100 rounded-3xl opacity-70"></div>
                
                {/* Main card */}
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-xl">MF</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">MindFlow Dashboard</h3>
                        <p className="text-gray-500">Workflow Management</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Online
                    </div>
                  </div>

                  {/* Stats inside card */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">15</div>
                      <div className="text-gray-600">Workflow Aktif</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">98%</div>
                      <div className="text-gray-600">Produktivitas</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Progress Hari Ini</span>
                      <span className="text-blue-600 font-bold">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600">✓</span>
                      </div>
                      <span className="text-gray-700">Autentikasi JWT Aman</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                        <span className="text-green-600">✓</span>
                      </div>
                      <span className="text-gray-700">CRUD Operations</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                        <span className="text-purple-600">✓</span>
                      </div>
                      <span className="text-gray-700">RESTful API</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - SESUAI DESKRIPSI */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
              ✨ Fitur Utama MindFlow
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solusi Lengkap untuk Manajemen Workflow
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Aplikasi berbasis web yang dirancang untuk membantu pengguna mengelola alur kerja, ide, dan data secara terstruktur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Autentikasi JWT */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-blue-300 transition-all">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Autentikasi JWT
              </h3>
              <p className="text-gray-600">
                Sistem register dan login pengguna dengan JSON Web Token untuk keamanan maksimal. Proteksi route menggunakan token untuk akses terbatas.
              </p>
            </div>

            {/* Feature 2 - CRUD Operations */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-6 group-hover:from-green-200 group-hover:to-green-300 transition-all">
                <span className="text-2xl">🗂️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                CRUD Operations
              </h3>
              <p className="text-gray-600">
                Manajemen data lengkap (Create, Read, Update, Delete) untuk task, catatan, dan workflow. Terhubung dengan database MongoDB.
              </p>
            </div>

            {/* Feature 3 - Frontend Modern */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-6 group-hover:from-purple-200 group-hover:to-purple-300 transition-all">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Frontend Modern
              </h3>
              <p className="text-gray-600">
                Menggunakan Tailwind CSS untuk styling yang responsif dan bersih. UI yang intuitif dan mudah digunakan oleh semua pengguna.
              </p>
            </div>

            {/* Feature 4 - RESTful API */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center mb-6 group-hover:from-yellow-200 group-hover:to-yellow-300 transition-all">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                RESTful API
              </h3>
              <p className="text-gray-600">
                Backend terpisah dengan struktur API yang rapi dan scalable. Arsitektur yang memudahkan pengembangan dan maintenance.
              </p>
            </div>

            {/* Feature 5 - Full Stack Development */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mb-6 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Full Stack Development
              </h3>
              <p className="text-gray-600">
                Proyek pembelajaran implementasi Full Stack Web Development dengan fokus pada authentication dan API development.
              </p>
            </div>

            {/* Feature 6 - Manajemen Workflow */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-6 group-hover:from-red-200 group-hover:to-red-300 transition-all">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Manajemen Workflow
              </h3>
              <p className="text-gray-600">
                Membantu pengguna mengatur alur pikir dan pekerjaan agar lebih terstruktur, meningkatkan fokus dan produktivitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Teknologi yang Digunakan
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dibangun dengan teknologi modern untuk performa, keamanan, dan skalabilitas terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                <span className="text-blue-600 text-2xl font-bold">R</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">React.js</h3>
              <p className="text-gray-600 text-center">Library JavaScript untuk membangun user interface yang interaktif</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center mb-6 mx-auto">
                <span className="text-green-600 text-2xl font-bold">T</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Tailwind CSS</h3>
              <p className="text-gray-600 text-center">Framework CSS utility-first untuk pengembangan UI yang cepat</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center mb-6 mx-auto">
                <span className="text-purple-600 text-2xl font-bold">J</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">JWT Auth</h3>
              <p className="text-gray-600 text-center">Autentikasi aman menggunakan JSON Web Tokens untuk proteksi data</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center mb-6 mx-auto">
                <span className="text-red-600 text-2xl font-bold">API</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">REST API</h3>
              <p className="text-gray-600 text-center">CRUD operations dengan desain RESTful API yang terstruktur</p>
            </div>
          </div>
        </div>
      </section>

      {/* About/CTA Section */}
      <section
        id="about"
        className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm mb-6">
            Full Stack Web Development Project
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Mengoptimalkan Alur Kerja Anda?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            MindFlow dikembangkan sebagai bagian dari pembelajaran dan implementasi Full Stack Web Development dengan fokus pada Authentication JWT & CRUD REST API.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRegister}
              className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg shadow-xl cursor-pointer"
            >
              Daftar Gratis Sekarang
            </button>
            <button
              onClick={handleLogin}
              className="inline-block px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-lg cursor-pointer"
            >
              Masuk ke Akun
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">MF</span>
                </div>
                <h1 className="text-2xl font-bold">
                  Mind<span className="text-blue-400">Flow</span>
                </h1>
              </div>
              <p className="text-gray-400">
                Kelola alur kerja, ide, dan data secara terstruktur.
              </p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Dokumentasi
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Kontak
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} MindFlow. Dibangun dengan
              React.js dan Tailwind CSS.
            </p>
            <p className="mt-2">
              Proyek pembelajaran Full Stack Web Development dengan fokus pada
              Authentication JWT & CRUD REST API.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}