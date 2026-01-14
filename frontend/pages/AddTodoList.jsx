import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faCheckCircle,
  faExclamationCircle,
  faSpinner,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

export default function AddTodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // all, active, completed
  const navigate = useNavigate();

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
    setError("");
  };

  const fetchTodos = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data todos");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id) => {
    if (!editingTitle.trim()) {
      setError("Judul todo tidak boleh kosong");
      return;
    }

    try {
      await api.put(`/todos/${id}`, { title: editingTitle });
      setEditingId(null);
      setEditingTitle("");
      setSuccessMessage("Todo berhasil diperbarui!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError("Gagal mengupdate todo");
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/todos", {
        title,
        deadline: deadline || undefined,
      });

      setTodos((prev) => [res.data, ...prev]);
      setTitle("");
      setDeadline("");
      setSuccessMessage("Todo berhasil ditambahkan!");
      setTimeout(() => setSuccessMessage(""), 3000);
      navigate('/dashboard')
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Gagal menambah todo");

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="text-white text-lg"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    MindFlow
                  </h1>
                  <p className="text-xs text-slate-500">Tambah Todo</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="h-5 w-5 text-slate-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cari todo..."
                  className="pl-10 pr-4 py-2.5 w-64 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  title="Profil"
                >
                  <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Tambah Todo
          </h2>
        </div>

        {/* Todo Management Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Messages */}
          <div className="px-6 pt-4">
            {error && (
              <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="w-5 h-5 text-red-500 mr-2"
                  />
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl animate-fade-in">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="w-5 h-5 text-green-500 mr-2"
                  />
                  <span className="text-green-700 font-medium">
                    {successMessage}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Add Form */}
          <div className="px-6 py-4 border-b border-slate-200 bg-blue-50/50">
            <form onSubmit={addTodo} className="flex flex-col gap-3">
              {/* Title */}
              <h3 className="text-base font-bold text-slate-900">Judul Todo</h3>
              <input
                type="text"
                placeholder="Tambahkan todo baru..."
                className="w-full px-4 py-3.5 bg-white border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
              <h3 className="text-base font-bold text-slate-900">
                Tenggat Waktu
              </h3>
              {/* Deadline */}
              <input
                type="datetime-local"
                className="w-full px-4 py-3 bg-white border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={isLoading}
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={!title.trim() || isLoading}
                className={`px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all transform hover:scale-[1.02] ${
                  !title.trim() || isLoading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-200"
                }`}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  "Tambah"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-6">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="text-white text-sm"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">MindFlow</h3>
                  <p className="text-sm text-slate-600">
                    Streamline your workflow
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Bantuan
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Syarat Layanan
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Kontak
              </a>
            </div>
          </div>
          <div className="text-center py-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} MindFlow. Dibangun dengan ❤️ untuk
              produktivitas yang lebih baik.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
